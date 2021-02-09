import { Reply, Question } from '../../models/Question';
import { User } from '../../models/User';
/**
 * @POST /api/v1/replies/reply
 * @name Reply To Questions And Replies
 * @param {Object} req
 * @param {Object} res
 */
const replyToQuestion = async (req: any, res: any) => {

    //grab loggedin user's id on req object
    const userId = req.user.userId;
    const { questionId, replyBody } = req.body;

    try {
        const user: any = await User.findOne({ _id: userId });
        const questionToReply: any = await Question.findOne({ _id: questionId });
        new Reply({
            userId: userId,
            questionId: questionId,
            title: questionToReply.title,
            replyBody: replyBody
        }).save().then((result) => {
            //update user model
            user.replies.push(result._id);
            user.save();
            return res.status(201).send({
                success: true,
                data: result,
                message: 'Your reply has been submitted! Thanks for contributing to the forum.'
            })
        })
    } catch (err) {
        return res.status(500).send({ message: 'Could not submit your reply', error: err.message });
    }
}

/**
 * @GET /api/v1/replies/fetchall
 * @name Fetch All Replies
 * @param {Object} req
 * @param {Object} res
 */
const fetchAllReplies = async (req: any, res: any) => {
    try {
        const replies = await Reply.find();
        if (replies.length == 0) {
            return res.status(404).send({
                data: replies,
                message: 'No records found'
            })
        } else {
            return res.send({
                success: true,
                data: replies,
                message: `${replies.length} replies fetched`
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not fetch requested data.', error: err.message });
    }
}

/**
 * @GET /api/v1/replies/fetch/:replyId
 * @name Fetch Reply By Id
 * @param {Object} req
 * @param {Object} res
 */
const fetchReplyById = async (req: any, res: any) => {
    const replyId = req.params.replyId;
    try {
        const reply: any = await Reply.findOne({ _id: replyId });
        if (!reply) {
            return res.status(404).send({
                data: reply,
                message: 'No record found for given ID'
            })
        } else {
            return res.send({
                success: true,
                data: reply,
                message: 'Reply record fetched'
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not fetch requested data.', error: err.message });
    }
}

/**
 * @GET /api/v1/replies/fetch-my-replies
 * @name Fetch Own Replies
 * @param {Object} req
 * @param {Object} res
 */
const fetchOwnReplies = async (req: any, res: any) => {
    const userId = req.user.userId;
    try {
        const replies = await Reply.find({ _id: userId });
        if (replies.length == 0) {
            return res.status(404).send({
                data: replies,
                message: 'No records found! You have made zero replies in the forum.'
            })
        } else {
            return res.send({
                success: true,
                data: replies,
                message: `${replies.length} replies records fetched`
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not fetch requested data.', error: err.message });
    }
}

export { replyToQuestion, fetchAllReplies, fetchReplyById, fetchOwnReplies };