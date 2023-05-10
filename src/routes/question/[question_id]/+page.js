import { supabaseClient } from '$lib/supabase';

export async function load({ params }) {
    const question_id = params.question_id;
    const { data, error } = await supabaseClient.from('Questions').select().eq('id', params.question_id);
    let question = data
    return {
        data: {
            question_id,
            question,
            error
        }
    };
}