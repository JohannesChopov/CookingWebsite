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
    <div class="user-recipes">
        <h1 class="bold">Your Recipes</h1>
        <div class="recipes-grid">
            {#each recipes as { id, title, description, image_url }}
                <div class="recipe-card">
                    <a href={`/recipes/${id}`}>
                        <div class="recipe-card-image-container">
                            <img class="recipe-card-image" src={image_url} alt={title} />
                        </div>
                        <div class="recipe-card-name">{title}</div>
                    </a>
                    <grid class="button-grid">
                        <button on:click={() => editRecipe(id)} class="edit-button">
                            <i class="material-icons">edit</i>
                        </button>
                        <button on:click={() => deleteRecipe(id, image_url)} class="delete-button">
                            <i class="material-icons">delete</i>
                        </button>
                    </grid>
                </div>
            {/each}
        </div>
    </div>

    <div class="add-recipe-container">
        <h1 class="bold"> Not Enough?</h1>
        <h1 class="bold"> Add more</h1>
    </div>
    <AddRecipe/>
{/if}


<style>
    .add-recipe-container h1{
        color: var(--prim2);

        display: flex;

        justify-content: center; 
        align-items: center;

        padding: 2rem;
    }

    .user-recipes {
        background-color: var(--prim2);

    }

    .user-recipes h1 {
        color: white;

        display: flex;

        justify-content: center; 
        align-items: center;

        padding: 2rem;
    } 

    .recipes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        padding: 16px;
        overflow-y: auto;

        padding-bottom: 2rem;
    }

    .recipe-card {
        color: var(--prim2);
        background: white;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        overflow: hidden;
        position: relative;

        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-all;

        max-width: 100%;
        box-sizing: border-box;
    }
    
    .recipe-card:hover {
        transform: translateY(-5px);
    }

    .recipe-card-image-container {
        width: 100%;
        height: 200px;
        background: lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
    }

    .recipe-card-image-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.5)),
                    linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5)),
                    linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5)),
                    linear-gradient(270deg, transparent, rgba(0, 0, 0, 0.5));
        mask-image: radial-gradient(circle, transparent 70%, black 100%);
        mask-composite: intersect;
        pointer-events: none;
        z-index: 1;
    }

    .recipe-card-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .recipe-card-name {
        padding: 10px;
        font-size: 1.2rem;
        text-align: center;
        font-weight: bold;
    }

    .recipe-card p {
        padding: 0 10px 10px;
        font-size: 0.7rem;
        color: white;
        text-align: center;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    .button-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
        
    }
    .delete-button {
        background: red;
        color: white;
        border: none;
        padding: 5px;
        border-radius: 5px;
        cursor: pointer;
        margin: 15px;
    }

    .delete-button:hover {
        background: darkred;
    }

    .edit-button {
        background: green;
        color: white;
        border: none;
        padding: 5px;
        
        border-radius: 5px;
        cursor: pointer;
        margin: 15px;
    }

    .edit-button:hover {
        background: darkgreen;
    }

</style>
