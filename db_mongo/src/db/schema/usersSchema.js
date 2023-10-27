import mongoose, { Schema } from "mongoose";


const userSchema = new Schema({
    name: String,
    email: String,
    phone: String,
    age: Number
});

const User = mongoose.model("User", userSchema);

export {
    User,
    userSchema
}