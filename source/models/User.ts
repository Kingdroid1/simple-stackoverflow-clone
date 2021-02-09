import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    displayName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    questionsAsked: [{ questionId: Schema.Types.ObjectId }],
    replies: [{ replyId: Schema.Types.ObjectId }]
}, { timestamps: true });

// Validate Email
UserSchema.path("email").validate(function (email: any) {
    let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    return emailRegex.test(email);
}, "The e-mail field cannot be empty, and must be formatted properly");

export const User = mongoose.model('User', UserSchema);