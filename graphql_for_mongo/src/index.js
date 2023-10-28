import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile } from 'fs/promises'
import { DB, MongooseModel } from '@stdeepak22/db_mongo'
import { queryCountPlugin } from './queryCountPlugin.js';

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
                return await MongooseModel.Review.find({ user_id: user.id });
            }
        },
        Review: {
            user: async (review) => {
                return await MongooseModel.User.findById(review.user_id)
            },
            restaurant: async (review) => {
                return await MongooseModel.Restaurant.findOne({ reviews: review.id })
            }
        },
        Restaurant: {
            reviews: async (restaurant) => {
                if (restaurant.reviews.length) {
                    return await MongooseModel.Review.find({ _id: { $in: restaurant.reviews } })
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