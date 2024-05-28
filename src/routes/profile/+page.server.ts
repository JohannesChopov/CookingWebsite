// src/routes/profile/+page.server.ts
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.getSession();
    console.log('Session in profile load:', session); // Add this line for debugging
    return {
        session
    };
};
