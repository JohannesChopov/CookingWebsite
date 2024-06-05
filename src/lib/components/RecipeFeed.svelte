<script>
    import { supabase } from '$lib/supabase';

    
    export let recipes = [];

    console.log('test');
    console.log(recipes);
</script>

<div class="recipes-grid">
    {#each recipes as { id, title, description, image_url, user }}
            <div class="recipe-card">
                <a href={`/recipes/${id}`}>
                    <img class="recipe-image" src={image_url} alt={title} />
                    <div class="recipe-name">{title}</div>
                    <p>{description}</p>
                    <p>Creator: {user.email.split('@')[0]}</p>
                </a>
            </div>
    {/each}
</div>