import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    questionId: { type: Schema.Types.ObjectId },
    replyId: { type: Schema.Types.ObjectId },
    isUpvoted: { type: Boolean, default: false },
    isDownvoted: { type: Boolean, default: false }
}, { timestamps: true });

export const Rating = mongoose.model('Rating', RatingSchema);