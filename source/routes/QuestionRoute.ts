import express from 'express';
const router = express.Router();

//controller import
import { askQuestion, fetchAllQuestions, fetchQuestionById, fetchOwnQuestions } from '../controllers/question/QuestionController';
import authorizeUser from '../middleware/Authorization';

//routes
router.post('/ask', authorizeUser, askQuestion);
router.get('/fetchall', fetchAllQuestions);
router.get('/fetch/:questionId', fetchQuestionById);
router.get('/fetch-my-questions', authorizeUser, fetchOwnQuestions);

export { router as QuestionRouter };