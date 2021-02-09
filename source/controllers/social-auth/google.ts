import express from 'express';
import passport from 'passport';
import Strategy from 'passport-google-oauth';
import { googleConfig } from '../../config/secrets';
const googleRouter = express.Router();
const GoogleStrategy = Strategy.OAuth2Strategy;

let userProfile: any;

//passport config
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: googleConfig.ClientID,
    clientSecret: googleConfig.ClientSecret,
    callbackURL: googleConfig.CallBackURL,
},
    function verify(accessToken: any, refreshToken: any, profile: any, done: any) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

//routes to redirect on success or failure
googleRouter.get('/success', (req, res) => res.json(userProfile));
googleRouter.get('/error', (req, res) => {
    return res.send("error logging in");
});

export { passport as GoogleAuth, googleRouter }
