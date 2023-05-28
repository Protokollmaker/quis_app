
export async function load({ params }) {
    const question_id = params.question_id;
    return {
        data: {
            question_id
        }
    };
}