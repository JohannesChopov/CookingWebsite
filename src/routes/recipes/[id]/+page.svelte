<!--
<script>
    import Recipe from '$lib/components/Recipe.svelte'
    export let data;
    $: recipe = data?.recipe;
</script>

<svelte:head>
    <title>{recipe.strMeal}</title>
</svelte:head>

<Recipe {...recipe}/>

<a href="/recipes">Recipes</a>
-->
<script context="module">
    import { supabase } from '$lib/supabase';
    
    console.log("HAHAHAHAHAH")
    
    export async function load({ params }) {
        const { id } = params;
        const { data, error } = await supabase
            .from('recipes')
            .select('*, users(email)');
    
        if (error) {
            console.error('Error fetching recipe:', error);
            return { status: 404, error: new Error('Recipe not found') };
        }
    
        return {
            props: {
                recipe: data
            }
        };
    }
    </script>
    
    <script>
        export let recipe;
    </script>
    
    <div class="recipe-details">
        <h1>{recipe.title}</h1>
        <img src={recipe.image_url} alt={recipe.title} />
        <p>{recipe.description}</p>
        <h2>Ingredients</h2>
        <p>{recipe.ingredients}</p>
        <h2>Instructions</h2>
        <p>{recipe.instructions}</p>
        <h3>Created by: {recipe.users.email}</h3>
    </div>