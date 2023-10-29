import DataLoader from 'dataloader';
import { MongooseModel } from '@stdeepak22/db_mongo';

let enableCache = false;

const userDataLoaderById = new DataLoader(async ids => {
    ids = ids.map(c => c.toString());
    let users = await MongooseModel.User.find({ _id: { $in: Array.from(new Set(ids)) } })
    return ids.map(id => users.find(u => u.id === id));
}, { cache: enableCache })

export {
    userDataLoaderById
}