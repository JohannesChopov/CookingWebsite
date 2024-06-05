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

            getRecipes(user_id)
            
        } else {
            console.error('User not logged in');
        }
    });

    const getRecipes = async (userID) => {
        // Fetch recipes for the logged-in user
        const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .eq('user_id', userID);

            if (error) {
                console.error('Error fetching recipes:', error);
            } else {
                recipes = data;
                //console.log(data);
            }
    }

    const deleteRecipe = async (recipeId, imageUrl) => {
        const {data, error: searchError} = await supabase
            .from('recipes')
            .select(`
                title,
                user_id
            `)
            .eq('id', recipeId)
            .single();
        
            console.log('Recipe found');
            console.log(data?.title);

        if (searchError) {
            console.error('Error searching image:', searchError)
        } else {

            const name = data.title
            
            const { error: imageError } = await supabase.storage
                .from('recipe-images')
                .remove(`public/${user_id}` + "/" + `${name}`);
                
            if (imageError) {
                console.error('Error deleting image:', imageError);
            } else {

                const { error: recipeError  } = await supabase
                    .from('recipes')
                    .delete()
                    .eq('id', recipeId);

                    console.log('Recipe deleted');

                if (recipeError) {
                    console.error('Error deleting recipe:', recipeError);
                } else {
                    console.log('Recipe and image deleted');
                    // Update the recipes list to reflect the deletion
                    getRecipes(user_id)
                    //recipes = recipes.filter(recipe => recipe.id !== recipeId);
                }

            }

        }
        
    };

</script>

<div class="recipes-grid">
    {#each recipes as { id, title, description, image_url }}
        <div class="recipe-card">
            <a href={`/recipes/${id}`}>
                <img class="recipe-image" src={image_url} alt={title} />
                <div class="recipe-name">{title}</div>
                <p>{title}</p>
                <p>{description}</p>
            </a>
                <button on:click={() => deleteRecipe(id, image_url)} class="delete-button">Remove</button>
        </div>
    {/each}
</div>

