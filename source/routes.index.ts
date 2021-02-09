import express from 'express';
const router = express.Router();

//route imports
import { AuthRouter } from './routes/AuthRoute';
import { googleRouter } from '../source/controllers/social-auth/google';
import { gitHubRouter } from '../source/controllers/social-auth/github';
import { QuestionRouter } from './routes/QuestionRoute';
import { ReplyRouter } from './routes/ReplyRoute';
import { RatingRouter } from './routes/RatingRoute';


//Use
router.use('/auth', AuthRouter);
router.use('/google', googleRouter);
router.use('/github', gitHubRouter);
router.use('/questions', QuestionRouter);
router.use('/replies', ReplyRouter);
router.use('/rating', RatingRouter);

export { router as Routes }