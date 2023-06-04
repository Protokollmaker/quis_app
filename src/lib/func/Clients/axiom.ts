import { env } from '$lib/env';
import { Client } from '@axiomhq/axiom-node';

export const axiomClient = new Client({
    token: env.AXIOM_TOKEN,
    orgId: env.AXIOM_ORG_ID,
});
