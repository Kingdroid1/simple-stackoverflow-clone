import express from 'express';
const router = express.Router();

//controller import
import { replyToQuestion, fetchAllReplies, fetchReplyById, fetchOwnReplies } from '../controllers/reply/ReplyController';
import authorizeUser from '../middleware/Authorization';

//routes
router.post('/reply', authorizeUser, replyToQuestion);
router.get('/fetchall', fetchAllReplies);
router.get('/fetch/:replyId', fetchReplyById);
router.get('/fetch-my-replies', authorizeUser, fetchOwnReplies);

export { router as ReplyRouter };