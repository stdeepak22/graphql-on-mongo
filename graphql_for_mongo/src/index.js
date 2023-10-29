import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile } from 'fs/promises'
import { DB, MongooseModel } from '@stdeepak22/db_mongo'
import { queryCountPlugin } from './queryCountPlugin.js';
import { restaurantDataLoaderByReviewId, reviewDataLoaderById, reviewDataLoaderByUserId, userDataLoaderById } from './entity-dataloader/index.js';

let typeDefs = await readFile('src/typeDefs.gql', { encoding: 'utf-8' });
await DB.ConnectDB();


const aServer = new ApolloServer({
    typeDefs,
    plugins: [queryCountPlugin()],
    resolvers: {
        Query: {
            users: async () => await MongooseModel.User.find(),
            userById: async (_, { id }) => await MongooseModel.User.findById(id),
            restaurants: async () => await MongooseModel.Restaurant.find(),
            restaurantById: async (_, { id }) => await MongooseModel.Restaurant.findById(id),
            reviews: async () => await MongooseModel.Review.find(),
            reviewById: async (_, { id }) => await MongooseModel.Review.findById(id)
        },
        User: {
            reviews: async (user) => {
                return await reviewDataLoaderByUserId.load(user.id);
            }
        },
        Review: {
            user: async (review) => {
                return await userDataLoaderById.load(review.user_id);
            },
            restaurant: async (review) => {
                return await restaurantDataLoaderByReviewId.load(review.id)
            }
        },
        Restaurant: {
            reviews: async (restaurant) => {
                if (restaurant.reviews.length) {
                    return await reviewDataLoaderById.loadMany(restaurant.reviews);
                } else {
                    return [];
                }
            }
        }
    }
});


const Srvr = await startStandaloneServer(aServer, {
    listen: {
        port: 4000
    }
});


console.log(`Apollo server started at - ${Srvr.url}`);

//await aServer.stop();