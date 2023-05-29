export async function load({ params }) {
    const group_id = params.group_id;
    return {
        data: {
            group_id
        }
    };
}