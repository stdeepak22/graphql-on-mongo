import { ConnectDB, DisconnectDB } from "./db/mongooseConnection.js";
import { Restaurant, Review, User } from "./db/schema/index.js";

await ConnectDB();

console.log('user count is ', await User.count());
console.log('review count is ', await Review.count());
console.log('restaurant count is ', await Restaurant.count());


console.log('review with rating 5 Star ', await Review.count({ rating: 5 }));

DisconnectDB();