import { Router } from "express";
import { models } from "../../mongo/connection";

const GoogleAuthService = require('../../Services/GoogleUserService/googleAuthService');

const GoogleUserService = require("../../Services/GoogleUserService/googleUserService");

const router = Router();


router.get("/login", async (req, res) => {
        let gu = new GoogleUserService(googleConfig,defaultScope); //TODO: grab googleConfig and defaultScope from env property
        gu.getGoogleUrl()
            .then((url=>{
                console.log(url);
                res.redirect(url) //redirect goes to /google
            }))
            .catch((err=>{
                console.log("Failed to get GoogleURL \n %v",err)
            }))
    })
    .get('/google-auth', async (req, res)=> {
        //TODO: here we check if this is a registered user or not and redirect accordingly (register or dashboard(with ID))

        let code = req.query.code;
        let gu = new GoogleUserService(googleConfig, defaultScope); //TODO: grab googleConfig and defaultScope from env property
        let redirectUrl;
        gu.getGoogleAuthClient(code)
            .then((auth) => {
                gu.getUserFromGoogleApi(auth).then((googleUser) => {
                    gu.getUserFromDB(googleUser.email).then((dbUser)=> {
                        if (dbUser != null) {
                            //user found in DB
                            redirectUrl = process.env.CLIENT_URL+"login?user=" + Buffer.from(JSON.stringify(dbUser)).toString("base64");
                            console.log(redirectUrl)
                            res.redirect(redirectUrl)

                        } else {
                            redirectUrl = process.env.CLIENT_URL+"register?user=" + Buffer.from(JSON.stringify(googleUser)).toString("base64");
                            console.log(redirectUrl)
                            res.redirect(redirectUrl)//redirect to site/register
                        }
                    });


                })

                    .catch((err) => {
                        console.log("failed to get Google Auth, %v", err)
                    });
            });
    });

router.get("/", async (req, res) => {
    try {
        const result = await models.user.find();
        res.status(200).json(result || []).end();
    } catch (error) {
        res.status(400).json({ error: error.message }).end();
    }
});
router.get("/:id", async (req, res) => {
    try {
        const result = await models.user.findById(req.params.id);
        res.status(200).json(result || {}).end();
    } catch (error) {
        res.status(400).json({ error: error.message }).end();
    }
});
router.post("/", async (req, res) => {
    try {
        const result = await models.user.create(req.body);
        res.status(201).json(result).end();
    } catch (error) {
        res.status(406).json({ error: error.message }).end();
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const result = await models.user.findByIdAndRemove(req.params.id);
        res.status(200).json(result).end();
    } catch (error) {
        res.status(400).json({ error: error.message }).end();
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const user = await models.user.findById(req.params.id);
        if (!user) {
            return res.sendStatus(404);
        }
        Object.getOwnPropertyNames(req.body).forEach((name) => {
            user[name] = req.body[name];
        });
        const result = await user.save();
        res.status(200).json(result).end();
    } catch (error) {
        res.status(400).json({ error: error.message }).end();
    }
});

export { router };

const googleConfig_old = {
    clientId: '1016798324260-cn24vnlh62ijn94h2sguklrelvpjntgu.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: 'JSzG4-1lYJS7wCVKkJcNlxNV', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'http://localhost:3000/user/google-auth' // this must match your google api settings
};

const googleConfig = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: process.env.GOOGLE_REDIRECT // this must match your google api settings
};

// let ga = new GoogleAuthService(googleConfig,defaultScope);
// console.log(ga.getGoogleUrl());

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile',

];