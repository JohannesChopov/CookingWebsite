import { redirect } from "@sveltejs/kit";

export const GET = async ({ url, locals: { supabase}}) => {
    if (code) {
        await supabase.auth.exchangeCodeForSession(code)
    }

    throw redirect(303, '/profile')
}