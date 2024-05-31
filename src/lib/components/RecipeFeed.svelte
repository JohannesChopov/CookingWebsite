<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';

    let recipes = [];

    onMount(async () => {
        const { data, error } = await supabase.from('recipes').select('*');
        if (error) {
            console.error('Error fetching recipes:', error);
        } else {
            recipes = data;
            console.log(data)
        }
        console.log(data)
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
