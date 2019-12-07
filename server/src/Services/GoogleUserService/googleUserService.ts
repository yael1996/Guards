import { User} from "../../mongo/models/user";
import { models } from "../../mongo/Connection";
import {Board} from "../../mongo/models/Board";



const GoogleAuthService = require('./googleAuthService'),
    {google} = require('googleapis'),
    mongoose = require('mongoose');

class GoogleUserService extends GoogleAuthService {
    constructor(config, scope) {
        super(config, scope);
    }

    async getGooglePlusApi(auth) {
        return await google.people({version: 'v1', auth});
    }

    // userLogin (user, code){
    //     this.getGoogleAuthClient(code)
    //         .then((res)=>{
    //             return res
    //         })
    //         .catch((err)=>{
    //
    //         });
    // }
    // async getNewUser(code){
    //     const newUser: User = await this.getGoogleAuthClient(code);
    //
    //     // return await this.getGoogleAuthClient(code)
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
    async getGoogleAuthClient(code) {
        // get the auth "tokens" from the request
        const auth = await super.createConnection();
        const data = await auth.getToken(code); //TODO: Create a new getAuth function in GoogleAuth?
        const tokens = data.tokens;

        // add the tokens to the google api so we have access to the account
        auth.setCredentials(tokens);

        return auth;
        // connect to google plus - need this to get the user's email
        // const peopleApi = await this.getGooglePlusApi(auth);
        // return this.getUserFromGoogleApi(tokens, auth);
    }

    async getUserFromGoogleApi(auth): Promise<User>{
        const peopleApi = await this.getGooglePlusApi(auth);
        const me = await peopleApi.people.get({
                resourceName: 'people/me',
            personFields: 'emailAddresses,names',
            auth: auth}
            );
        console.log(me);
        // get the google id and email
        // const userGoogleId = me.data.id;
        //TODO: ugly but current model has 1 name/email per user
        const userGoogleName = me.data.names[0];
        const userGoogleEmail = me.data.emailAddresses[0].value;
        //TODO: displayName exists - consider grabbing and using it in frontend

        const retUser: User = new models.user;

        retUser.firstname = userGoogleName.givenName;
        retUser.lastname = userGoogleName.familyName;
        retUser.email = userGoogleEmail;
        // retUser.tokens = tokens; //can be saved to the user if you ever want to get their details without making them log in again

        return retUser;

        // retUser.type = 'user';
        // retUser.boardId = "5de2e4f1157640446cbefab7";
        // return so we can login or sign up the user
    }

    async getUserFromDB(userEmail): Promise<User> {
        const userInDB = await models.user.findOne({email:userEmail});
        return (userInDB != null ? new models.user(userInDB) : null );
        //TODO: check if null is returned when user not found - also consider if 2 users exist with same email
            //     {
            //         firstname: userInDB[0].firstname,
            //         lastname: userInDB[0].lastname,
            //         email: userInDB[0].email,
            //         tokens: userInDB[0].tokens,
            //         type: userInDB[0].type,
            //         boardId: userInDB[0].boardId,
            //         satisfiedConstraints: userInDB[0].satisfiedConstraints,
            //         monthlyConstraints: userInDB[0].monthlyConstraints
            //     }
            // )

        }
}
module.exports = GoogleUserService;