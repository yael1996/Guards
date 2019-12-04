import { Router } from "express";
import { models } from "../../mongo/connection";

const GoogleAuthService = require('../../Services/GoogleUserService/googleAuthService');

const GoogleUserService = require("../../Services/GoogleUserService/googleUserService");

const router = Router();


router.post("/register", async (req, res) => {
    let code = req.body.code;
    let gu = new GoogleUserService(googleConfig,defaultScope); //TODO: grab googleConfig and defaultScope from env property
    //get new user object to save in DB
    gu.getGoogleAccountFromCode(code)
        .then((newUser) => {
            console.log(newUser._id);
            //save user in DB
            newUser.save(function (err, task) {
                if (err) res.send(err);
                res.json(task)
            });
        })
        .catch((err) => {
            console.log(err)
        });
});

router.get("/", async (req, res) => {
    try {
        const result = await models.user.find();
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
    }
    res.end(await models.user.find());
});
router.get("/:id", async (req, res) => {
    try {
        const result = await models.user.findById(req.params.id);
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
    }
});
router.post("/", async (req, res) => {
    try {
        const result = await models.user.create(req.body);
        res.status(201).end(result);
    } catch (error) {
        res.status(406).end(error);
    }
});
router.delete("/:id", async (req, res) => {
    try {
        const result = await models.user.findByIdAndRemove(req.params.id);
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
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
        res.status(200).end(result);
    } catch (error) {
        res.status(400).end(error);
    }
});

export { router };

const googleConfig = {
    clientId: '1016798324260-bba0ir8efu5qd30ajuulpogqototugpc.apps.googleusercontent.com', // e.g. asdfghjkljhgfdsghjk.apps.googleusercontent.com
    clientSecret: 'ashtkFhSmw1o-Vg69cb1eaH3', // e.g. _ASDFA%DFASDFASDFASD#FAD-
    redirect: 'http://localhost:3000/google-auth' // this must match your google api settings
};

// let ga = new GoogleAuthService(googleConfig,defaultScope);
// console.log(ga.getGoogleUrl());

const defaultScope = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/userinfo.email',
];