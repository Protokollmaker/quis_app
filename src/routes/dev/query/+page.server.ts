import { supabaseClient } from '$lib/func/Clients/supabase';

export async function load() {
    const { data, error } = await supabaseClient.from('User').select();
    console.log(error);
    console.log(data);
    return {
        question: data ?? []
    };
}