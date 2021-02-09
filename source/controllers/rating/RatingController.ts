import { Rating } from '../../models/Rating';
import { Question, Reply } from '../../models/Question';

/**
 * @POST /api/v1/rating/question/upvote
 * @name Upvote A Question
 * @param {Object} req
 * @param {Object} res
 */
const upvoteQuestion = async (req: any, res: any) => {
    //grab userId on req object
    const userId = req.user.userId;
    const questionId = req.body.questionId;

    try {
        const questionToUpvote: any = await Question.findOne({ _id: questionId });
        if (questionToUpvote) {
            new Rating({
                userId: userId,
                questionId: questionId,
                isUpvoted: true
            }).save().then((result) => {
                return res.status(201).send({
                    success: true,
                    data: result,
                    message: 'Thanks for your feedback! Your vote has been recorded.'
                })
            });
            //update Question records
            questionToUpvote.upvotes = questionToUpvote.upvotes + 1;
            questionToUpvote.save();
        } else {
            return res.status(404).send({
                data: questionToUpvote,
                message: 'Resource was not found'
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not submit your vote', error: err.message });
    }
}

/**
 * @POST /api/v1/rating/question/downvote
 * @name Downvote A Question
 * @param {Object} req
 * @param {Object} res
 */
const downvoteQuestion = async (req: any, res: any) => {
    //grab userId on req object
    const userId = req.user.userId;
    const questionId = req.body.questionId;

    try {
        const questionToDownvote: any = await Question.findOne({ _id: questionId });
        if (questionToDownvote) {
            new Rating({
                userId: userId,
                questionId: questionId,
                isDownvoted: true
            }).save().then((result) => {
                return res.status(201).send({
                    success: true,
                    data: result,
                    message: 'Thanks for your feedback! Your vote has been recorded.'
                })
            });
            //update Question records
            questionToDownvote.downvotes = questionToDownvote.downvotes + 1;
            questionToDownvote.save();
        } else {
            return res.status(404).send({
                data: questionToDownvote,
                message: 'Resource was not found'
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not submit your vote', error: err.message });
    }
}

/**
 * @POST /api/v1/rating/reply/upvote
 * @name Upvote A Reply
 * @param {Object} req
 * @param {Object} res
 */
const upvoteReply = async (req: any, res: any) => {
    //grab userId on req object
    const userId = req.user.userId;
    const replyId = req.body.replyId;

    try {
        const replyToUpvote: any = await Reply.findOne({ _id: replyId });
        if (replyToUpvote) {
            new Rating({
                userId: userId,
                replyId: replyId,
                isUpvoted: true
            }).save().then((result) => {
                return res.status(201).send({
                    success: true,
                    data: result,
                    message: 'Thanks for your feedback! Your vote has been recorded.'
                })
            });
            //update Reply records
            replyToUpvote.upvotes = replyToUpvote.upvotes + 1;
            replyToUpvote.save();
        } else {
            return res.status(404).send({
                data: replyToUpvote,
                message: 'Resource was not found'
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not submit your vote', error: err.message });
    }
}

/**
 * @POST /api/v1/rating/reply/downvote
 * @name Downvote A Reply
 * @param {Object} req
 * @param {Object} res
 */
const downvoteReply = async (req: any, res: any) => {
    //grab userId on req object
    const userId = req.user.userId;
    const replyId = req.body.replyId;

    try {
        const replyToDownvote: any = await Reply.findOne({ _id: replyId });
        if (replyToDownvote) {
            new Rating({
                userId: userId,
                replyId: replyId,
                isDownvoted: true
            }).save().then((result) => {
                return res.status(201).send({
                    success: true,
                    data: result,
                    message: 'Thanks for your feedback! Your vote has been recorded.'
                })
            });
            //update Reply records
            replyToDownvote.downvotes = replyToDownvote.downvotes + 1;
            replyToDownvote.save();
        } else {
            return res.status(404).send({
                data: replyToDownvote,
                message: 'Resource was not found'
            })
        }
    } catch (err) {
        return res.status(500).send({ message: 'Could not submit your vote', error: err.message });
    }
}
export { upvoteQuestion, downvoteQuestion, upvoteReply, downvoteReply };