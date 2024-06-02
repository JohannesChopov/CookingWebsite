import { supabase } from '$lib/supabase';

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ request }) => {
    const { data: { session } } = await supabase.auth.getSession();
    return {
        session,
    };
};
