import DataLoader from 'dataloader';
import { MongooseModel } from '@stdeepak22/db_mongo';

let enableCache = false;

const reviewDataLoaderById = new DataLoader(async ids => {
    ids = ids.map(c => c.toString());
    let reviews = await MongooseModel.Review.find({ _id: { $in: Array.from(new Set(ids)) } })
    return ids.map(id => reviews.find(u => u.id === id));
}, { cache: enableCache })

const reviewDataLoaderByUserId = new DataLoader(async ids => {
    ids = ids.map(c => c.toString());
    let reviews = await MongooseModel.Review.find({ user_id: { $in: Array.from(new Set(ids)) } })
    return ids.map(id => reviews.filter(u => u.user_id.equals(id)));
}, { cache: enableCache })

export {
    reviewDataLoaderById,
    reviewDataLoaderByUserId
}