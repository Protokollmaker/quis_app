import { env } from '$lib/env';
import { Client } from '@axiomhq/axiom-node';
import { json } from '@sveltejs/kit';


const client = new Client({
    token: env.AXIOM_TOKEN,
    orgId: env.AXIOM_ORG_ID,
});

export async function POST({ params }) {
    console.log(params)
    //const dataobject: any = await res?.body.json();
    //console.log(dataobject)
    try {
        await client.ingestEvents("ihk-quiz", [{
            from: 'forntend',
            client: "id",
            message: "dataobject"
        }]);
    } catch (e) {
        console.log(e)
        return json({ "error": "Invalid json" }, { status: 400 })
    }

    return json({ "error": null }, { status: 201 });
}
