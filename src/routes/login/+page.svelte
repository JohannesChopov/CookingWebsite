<script>
    import Authenticate from "$lib/components/Authenticate.svelte";
    import AddRecipe from "$lib/components/AddRecipe.svelte";
    import RecipeFeed from "$lib/components/RecipeFeed.svelte";
    import UserRecipeFeed from "$lib/components/UserRecipeFeed.svelte";

    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    let user = null;

    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;
        console.log(user)
    });
</script>

<Authenticate {user}/>

{#if user}
    <UserRecipeFeed/>
{:else}
    <p style="align: center">Please log in to add a recipe.</p>
{/if}


