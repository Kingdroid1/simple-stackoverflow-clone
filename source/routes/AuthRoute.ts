import express from 'express';
import { GoogleAuth } from '../controllers/social-auth/google';
import { GitHubAuth } from '../controllers/social-auth/github';
const router = express.Router();

//Controller imports
import { signup, login } from '../controllers/auth/AuthController';

//Routes
router.post('/signup', signup);
router.post('/login', login);
router.get('/auth/google', GoogleAuth.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', GoogleAuth.authenticate('google', { failureRedirect: '/api/v1/google/error' }),
    (req, res) => {
        res.redirect('/api/v1/google/success');
    });
router.get('/auth/github', GitHubAuth.authenticate('github'));
router.get('/auth/github/callback', GitHubAuth.authenticate('github', { failureRedirect: '/api/v1/github/error' }),
    function (req, res) {
        res.redirect('/api/v1/github/success');
    });

export { router as AuthRouter }