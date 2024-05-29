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