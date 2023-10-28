import { clearPreviousFiredQueries, getFiredQueries } from "@stdeepak22/db_mongo";

export const queryCountPlugin = () => {
    return {
        async requestDidStart() {
            clearPreviousFiredQueries();
            return {
                willSendResponse: async () => {
                    console.log('\t', new Date().toISOString(), 'fired', getFiredQueries().length, 'quries.');
                }
            }
        }
    };
}