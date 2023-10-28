import mongoose from 'mongoose'

let ObjectId = mongoose.Types.ObjectId;


let { ConnectDB, DisconnectDB, getFiredQueries, clearPreviousFiredQueries } = (() => {
    let queryFired = [];

    const getFiredQueries = (lastNQueries = -1) => {
        return lastNQueries === -1 ? queryFired : queryFired.slice(-1 * lastNQueries);
    };

    const clearPreviousFiredQueries = () => {
        queryFired = [];
    };


    const ConnectDB = async () => {
        try {

            mongoose.set('debug', (collectionName, method, query, doc) => {
                queryFired.push(`[${new Date().toISOString()}] ${method} with "${JSON.stringify(query)}" inside ${collectionName}`);
            });

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

    const DisconnectDB = async () => {
        await mongoose.disconnect();
    }

    return {
        getFiredQueries,
        clearPreviousFiredQueries,
        ConnectDB,
        DisconnectDB
    }
})();

export {
    ObjectId,
    getFiredQueries,
    clearPreviousFiredQueries,
    ConnectDB,
    DisconnectDB
}
