import DataLoader from 'dataloader';
import { MongooseModel } from '@stdeepak22/db_mongo';

let enableCache = false;

const restaurantDataLoaderByReviewId = new DataLoader(async ids => {
    ids = ids.map(c => c.toString());
    let restaurants = await MongooseModel.Restaurant.find({ reviews: { $in: Array.from(new Set(ids)) } })
    return ids.map(id => restaurants.find(u => u.reviews.includes(id)));
}, { cache: enableCache })


export {
    restaurantDataLoaderByReviewId
}