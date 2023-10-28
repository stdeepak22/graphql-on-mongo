import { ConnectDB, DisconnectDB, ObjectId, getFiredQueries, clearPreviousFiredQueries } from "./src/db/mongooseConnection.js";
import { Restaurant, Review, User } from "./src/db/schema/index.js";

export let DB = {
    ConnectDB,
    DisconnectDB,
};

export { ObjectId, getFiredQueries, clearPreviousFiredQueries }

export let MongooseModel = {
    Restaurant,
    Review,
    User
}
