export async function load({ params }) {
    const type = params.type;
    return {
        data: {
            Bookmarktype: type
        }
    };
}