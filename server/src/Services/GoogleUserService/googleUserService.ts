import {JSONUser, User} from "../../mongo/models/user";


const GoogleAuthService = require('./googleAuthService'),
    {google} = require('googleapis'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');


class GoogleUserService extends GoogleAuthService {
    constructor(config, scope) {
        super(config, scope);
    }

    async getGooglePlusApi(auth) {
        return await google.plus({version: 'v1', auth});
    }

    // userLogin (user, code){
    //     this.getGoogleAccountFromCode(code)
    //         .then((res)=>{
    //             return res
    //         })
    //         .catch((err)=>{
    //
    //         });
    // }
    // async getNewUser(code){
    //     const newUser: User = await this.getGoogleAccountFromCode(code);
    //
    //     // return await this.getGoogleAccountFromCode(code)
    //     //     .then((newUser)=>{
    //     //         return new User ({
    //     //             _id: newUser.id,
    //     //             firstname: newUser.name.givenName,
    //     //             lastname: newUser.name.familyName,
    //     //             email: newUser.email,
    //     //             // tokens: this.getTokens(newUser)
    //     //         });
    //     //     })
    //     //     .catch((err)=>{
    //     //         console.log(err)
    //     //     });
    // }
    getTokens(user){
        user.tokens.forEach(function(token){
            return token
        })
    }
    /**
     * Extract the email and id of the google account from the "code" parameter.
     */
    async getGoogleAccountFromCode(code): User {
        // get the auth "tokens" from the request
        const auth = await super.createConnection();
        const data = await auth.getToken(code); //TODO: Create a new getAuth function in GoogleAuth?
        const tokens = data.tokens;

        // add the tokens to the google api so we have access to the account
        auth.setCredentials(tokens);

        // connect to google plus - need this to get the user's email
        const plusApi = await this.getGooglePlusApi(auth);
        return this.getUserFromGoogleApi(plusApi, tokens);
    }

    async getUserFromGoogleApi(api, tokens): User{
        const me = await api.people.get({userId: 'me'});

        // get the google id and email
        // const userGoogleId = me.data.id;
        const userGoogleName = me.data.name;
        const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;

        const retUser: User = new User;

        retUser.firstname = userGoogleName;
        retUser.email = userGoogleEmail;
        retUser.tokens = tokens;
        // return so we can login or sign up the user
        return retUser;
    }
}
module.exports = GoogleUserService;