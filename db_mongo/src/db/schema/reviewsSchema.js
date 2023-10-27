import mongoose, { Schema } from "mongoose";


const reviewSchema = new Schema({
    addedAt: Date,
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    rating: Number,
    comment: String,
});

const Review = mongoose.model('Review', reviewSchema);

export {
    Review,
    reviewSchema
}