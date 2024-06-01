<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';

    let recipes = [];

    console.log('test');

    onMount(async () => {
        // Fetch recipes along with the creator's email
        const { data, error } = await supabase
            .from('recipes')
            .select('title, description, image_url, users(email)');

        if (error) {
            console.error('Error fetching recipes:', error);
        } else {
            recipes = data;
            console.log(data);
        }
    });
</script>

<div class="recipes-grid">
    {#each recipes as { title, description, image_url, users }}
            <div class="recipe-card">
                <a href={`src\routes\recipes\${id}`}>
                    <img class="recipe-image" src={image_url} alt={title} />
                    <div class="recipe-name">{title}</div>
                    <p>{description}</p>
                    <p>Creator: {users.email}</p>
                </a>
            </div>
    {/each}
</div>
