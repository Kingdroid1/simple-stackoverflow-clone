import { Question } from '../../models/Question';
import { User } from '../../models/User';

/**
 * @POST /api/v1/questions/ask
 * @name Ask Question
 * @param {Object} req
 * @param {Object} res
 */
const askQuestion = async (req: any, res: any) => {

    //grab loggedin user's id on req object
    const userId = req.user.userId;
    const { title, body, tagName } = req.body;

    const tagObject = { tagName: tagName };
    let tagArr = [tagObject];

    try {
        const user: any = await User.findOne({ _id: userId });
        if (title && body) {
            new Question({
                userId: userId,
                title: title.toLowerCase().trim(),
                body: body,
                tags: tagArr
            }).save().then((result) => {
                //update user model
                user.questionsAsked.push(result._id);
                user.save();
                return res.status(201).send({
                    success: true,
                    data: result,
                    message: 'Your question has been submitted! Expect the forum to respond shortly.'
                })
            })
        } else {
            res.status(422).send('Fields cannot be empty');
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not submit your question', error: err.message });
    }
}

/**
 * @GET /api/v1/questions/fetchall
 * @name Fetch All Questions
 * @param {Object} req
 * @param {Object} res
 */
const fetchAllQuestions = async (req: any, res: any) => {
    try {
        const questions = await Question.find();
        if (questions.length == 0) {
            return res.status(404).send({
                data: questions,
                message: 'No records found'
            })
        } else {
            return res.send({
                success: true,
                data: questions,
                message: `${questions.length} questions fetched`
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not fetch requested data.', error: err.message });
    }
}

/**
 * @GET /api/v1/questions/fetch/:questionId
 * @name Fetch Question By Id
 * @param {Object} req
 * @param {Object} res
 */
const fetchQuestionById = async (req: any, res: any) => {
    const questionId = req.params.questionId;
    try {
        const question: any = await Question.findOne({ _id: questionId });
        if (!question) {
            return res.status(404).send({
                data: question,
                message: 'No record found for given ID'
            })
        } else {
            return res.send({
                success: true,
                data: question,
                message: 'Question record fetched'
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not fetch requested data.', error: err.message });
    }
}

/**
 * @GET /api/v1/questions/fetch-my-questions
 * @name Fetch Own Questions
 * @param {Object} req
 * @param {Object} res
 */
const fetchOwnQuestions = async (req: any, res: any) => {
    const userId = req.user.userId;
    try {
        const questions = await Question.find({ _id: userId });
        if (questions.length == 0) {
            return res.status(404).send({
                data: questions,
                message: 'No records found! You have asked zero questions in the forum.'
            })
        } else {
            return res.send({
                success: true,
                data: questions,
                message: `${questions.length} question records fetched`
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not fetch requested data.', error: err.message });
    }
}

export { askQuestion, fetchAllQuestions, fetchQuestionById, fetchOwnQuestions };