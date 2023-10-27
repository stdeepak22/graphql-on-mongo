import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { readFile } from 'fs/promises'


let typeDefs = await readFile('src/typeDefs.gql', { encoding: 'utf-8' });

//const typeDefs = readFileSync(path.join(__dirname, 'typeDefs.gql'))

const aServer = new ApolloServer({
    typeDefs,
    resolvers: {
        Query: {
            users: () => {
                return [{
                    id: 'test1',
                    name: 'Deepak'
                }]
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