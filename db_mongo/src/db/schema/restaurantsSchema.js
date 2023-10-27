import mongoose, { Schema } from "mongoose";


const restaurantSchema = new Schema({
    name: String,
    phoneNumber: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

export {
    restaurantSchema,
    Restaurant
}