<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';

    let recipes = [];
    let user_id = null;

    onMount(async () => {
        // Get the current session
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            user_id = session.user.id;

            // Fetch recipes for the logged-in user
            const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .eq('user_id', user_id);

            if (error) {
                console.error('Error fetching recipes:', error);
            } else {
                recipes = data;
                console.log(data);
            }
        } else {
            console.error('User not logged in');
        }
    });
</script>

<div class="recipes-grid">
    {#each recipes as { title, description, image_url }}
        <div class="recipe-card">
            <img class="recipe-image" src={image_url} alt={title} />
            <div class="recipe-name">{title}</div>
            <p>{title}</p>
            <p>{description}</p>
        </div>
    {/each}
</div>
