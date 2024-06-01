//import { recipes } from '$lib/components/RecipeFeed.svelte';
import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageServerLoad} */
export const load = async () => {
    //const db = supabase()
    //const {data, error} = await supabase.from('recipes').select('*');
    const {data, error} = await supabase.from('recipes').select('id, title, description, image_url, user:users (email)');

    console.log("page.server.js:")
    console.log(data)

    if (error) {
        console.error("Error fetching recipes:", error);
        return {
            recipes: []
        };
    }
    return {
        recipes:JSON.stringify(data)
        //recipes: data
    };
};
