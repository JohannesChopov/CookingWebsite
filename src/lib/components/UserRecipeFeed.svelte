<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import ModifyRecipe from './ModifyRecipe.svelte';
    import AddRecipe from './AddRecipe.svelte';

    let recipes = [];
    let user_id = null;

    let isEditing = false;
    let editingRecipeId = null;

    /*
    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            user_id = session.user.id;

            getRecipes(user_id)
            
        } else {
            console.error('User not logged in');
        }
    });
    */

    onMount(async () => {
        const data  = localStorage.getItem('userID');

        console.log(data)

        if (data !== null) {
            user_id = data;
            getRecipes(user_id)
        } else {
            console.error('User not logged in');
            user_id = null;
        }
    });

    const getRecipes = async (userID) => {
        const { data, error } = await supabase
                .from('recipes')
                .select('*')
                .eq('user_id', userID);

            if (error) {
                console.error('Error fetching recipes:', error);
            } else {
                recipes = data;
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
                    getRecipes(user_id)
                    //recipes = recipes.filter(recipe => recipe.id !== recipeId);
                }

            }

        }
        
    };

    const editRecipe = async (id) => {
        isEditing = true;
        editingRecipeId = id;
    };

</script>
{#if isEditing}
    <ModifyRecipe {editingRecipeId} />
{:else}
    <AddRecipe/>
{/if}
<div class="recipes-grid">
    {#each recipes as { id, title, description, image_url }}
        <div class="recipe-card">
            <a href={`/recipes/${id}`}>
                <img class="recipe-image" src={image_url} alt={title} />
                <div class="recipe-name">{title}</div>
                <p>{description}</p>
            </a>
            <grid class="button-grid">
                <button on:click={() => editRecipe(id)} class="edit-button">Edit</button>
                <button on:click={() => deleteRecipe(id, image_url)} class="delete-button">Remove</button>
            </grid>
        </div>
    {/each}
</div>
