import { axiomClient } from "$lib/func/Clients/axiom";
import { json } from '@sveltejs/kit';

export async function POST({ request, cookies }) {
    const auth = cookies.get('supabase-auth-token');
    let sessionid: undefined | string = undefined;
    let userid: undefined | string = undefined;
    if (auth) {
        const jwt = parseJwt(auth);
        sessionid = jwt?.session_id;
        userid = jwt?.sub;
    }
    if (!sessionid)
        return json({ "error": "not loged in" }, { status: 401 });
    const body = await request.json();
    try {
        await axiomClient.ingestEvents("elektrikerfragen", [{
            from: 'forntend',
            userid: userid,
            sessionid: sessionid,
            message: body
        }]);
    } catch (e) {
        console.log(e);
        return json({ "error": "Invalid json" }, { status: 400 });
    }
    return json({ "error": null }, { status: 201 });
}

function parseJwt(token: string) {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
}