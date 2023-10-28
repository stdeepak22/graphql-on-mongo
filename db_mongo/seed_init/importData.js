import { ConnectDB, DisconnectDB, ObjectId } from "../src/db/mongooseConnection.js";
import { Restaurant, Review, User } from "../src/db/schema/index.js";
import { readFile } from 'fs/promises'

const getJson = async (filePath) => {
    return JSON.parse(await readFile(filePath, { encoding: 'utf-8' }))
}

const getIdToObjectId = (o) => {
    return ({ ...o, _id: new ObjectId(o._id) });
}

await ConnectDB();

let UsersList = await getJson('./seed_init/dummy-data/30_Users.json');
let RestaurantsList = await getJson('./seed_init/dummy-data/100_Restaurants.json');
let ReviewsList = await getJson('./seed_init/dummy-data/294_Reviews.json');

await User.insertMany(UsersList.map(getIdToObjectId)).then(() => {
    console.log(`Users inserted`);
}).catch(() => {
    console.log(`Something went wrong, "Users" not inserted.`);
})

await Restaurant.insertMany(RestaurantsList.map(getIdToObjectId)).then(() => {
    console.log(`Restaurant inserted`);
}).catch(() => {
    console.log(`Something went wrong, "Restaurant" not inserted.`);
})

await Review.insertMany(ReviewsList.map(getIdToObjectId)).then(() => {
    console.log(`Review inserted`);
}).catch(() => {
    console.log(`Something went wrong, "Review" not inserted.`);
})

await DisconnectDB();