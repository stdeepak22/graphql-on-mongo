import { ConnectDB, DisconnectDB, ObjectId, getFiredQuries } from "./db/mongooseConnection.js";
import { User, Restaurant, Review } from "./db/schema/index.js";

await ConnectDB();
await TestLogic();
await DisconnectDB();



async function TestLogic() {
    // you can write your mongo code here and can quickly test it using "node src/index.js"
}