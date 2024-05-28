<script context="module" lang="ts">
    import type { PageServerLoad } from './$types.js';

    export const load: PageServerLoad = async ({ locals }) => {
        const session = await locals.getSession();
        return {
            session
        };
    };
</script>

<script>
    import { supabase } from '$lib/supabase';
    import { goto } from '$app/navigation';

    export let data;

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error logging out:', error);
        } else {
            goto('/login');
        }
    };
</script>

{#if data.session}
    <p>Welcome, {data.session.user.email}</p>
    <button on:click={handleLogout}>Logout</button>
{:else}
    <p>Please log in.</p>
    <a href="/login">Login</a>
{/if}
