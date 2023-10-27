import mongoose from 'mongoose'


export const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/restaurants_reviews', {
            authSource: "admin",
            user: 'root_secure',
            pass: 'pass_secure',
        })
        console.log('connected to mongo server.');
    } catch (error) {
        console.error("not able to connect", error);
    }
}

export const DisconnectDB = async () => {
    await mongoose.disconnect();
}