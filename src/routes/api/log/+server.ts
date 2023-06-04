//import axiomClient from "$lib/func/Client/axiom";
import { axiomClient } from "$lib/func/Clients/axiom";
import { json } from '@sveltejs/kit';

export async function GET({ params }: any) {
    console.log(params)
    //const dataobject: any = await res?.body.json();
    //console.log(dataobject)
    try {
        await axiomClient.ingestEvents("ihk-quiz", [{
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
