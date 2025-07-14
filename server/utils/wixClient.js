import { createClient, ApiKeyStrategy } from '@wix/sdk';
import * as wixStores from '@wix/stores';

const myWixClient = createClient({
    modules: {
        stores: wixStores,
    },
    auth: ApiKeyStrategy({
        apiKey: process.env.CLIENT_KEY,
    }),
});

export default myWixClient;