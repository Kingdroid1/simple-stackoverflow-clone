import express from 'express';
import passport from 'passport';
import GitHubStrategy from 'passport-github';
import { githubConfig } from '../../config/secrets';
const gitHubRouter = express.Router();
const Strategy = GitHubStrategy.Strategy;

let userProfile: any;

//passport config
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj: any, cb) {
    cb(null, obj);
});

passport.use(new Strategy({
    clientID: githubConfig.ClientID,
    clientSecret: githubConfig.ClientSecret,
    callbackURL: githubConfig.CallBackURL
},
    function verify(accessToken: any, refreshToken: any, profile: any, done: any) {
        userProfile = profile;
        return done(null, userProfile);
    }
));

//routes to redirect on success or failure
gitHubRouter.get('/success', (req, res) => res.json(userProfile));
gitHubRouter.get('/error', (req, res) => {
    return res.send("error logging in");
});

export { passport as GitHubAuth, gitHubRouter }
