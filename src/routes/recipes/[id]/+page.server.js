
//import { supabase } from '$lib/supabase';

///** @type {import('./$types').PageServerLoad} **/
//export async function load({params}) {
//    const recipe = await supabase.from('recipes').select().eq('id', params.id)
//    return {
//        recipe: JSON.stringify(recipe.data[0])
//    };
//};

import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
    const { id } = params;
    
    /*
    console.log("id page.server.js")
    console.log(id)
    */
    
    const { data, error } = await supabase
        .from('recipes')
        .select(`
                    title,
                    description,
                    image_url,
                    ingredients,
                    instructions,
                    user:users (email),
                    created_at
        `)
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching recipe:', error);
        return {
            recipe: null
        };
    }

    return {
        recipe: data
    };
}