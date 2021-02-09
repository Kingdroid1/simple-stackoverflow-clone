import express from 'express';
const router = express.Router();

//controller import
import { upvoteQuestion, downvoteQuestion, upvoteReply, downvoteReply } from '../controllers/rating/RatingController';
import authorizeUser from '../middleware/Authorization';

//routes
router.post('/question/upvote', authorizeUser, upvoteQuestion);
router.post('/question/downvote', authorizeUser, downvoteQuestion);
router.post('/reply/upvote', authorizeUser, upvoteReply);
router.post('/reply/downvote', authorizeUser, downvoteReply);

export { router as RatingRouter };