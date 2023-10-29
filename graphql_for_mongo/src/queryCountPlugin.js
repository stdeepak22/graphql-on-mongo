import { clearPreviousFiredQueries, getFiredQueries } from "@stdeepak22/db_mongo";


/**
 * To count the MongoDB queries for each GraphQL query, exclude the "IntrospectionQuery".
 * IntrospectionQuery = query that apollo sendbox execute to get meta data of types, query and mutation.
 */
export const queryCountPlugin = () => {
    return {
        async requestDidStart({ request }) {
            if (request.operationName !== 'IntrospectionQuery') {
                clearPreviousFiredQueries();
                return {
                    willSendResponse: async () => {
                        console.log('\t', new Date(), 'Executed', getFiredQueries().length, 'MongoDB queries.');
                    }
                }
            }
        }
    };
}