<script>
    export let data;
    $: recipes = data?.recipes;
</script>

<svelte:head>
    <title>Recipes</title>
</svelte:head>

<a href="/">Home</a>

<h1>Recipes</h1>

<ul>
    {#each recipes as {strMeal, idMeal, strMealThumb}}
        <li>
            <a href={`/recipes/${idMeal}`}>
                {strMeal}
                <img src={strMealThumb} alt={strMeal} width="50" />
            </a>
        </li>
    {/each}
</ul>



<style>
    h1, h2 {
        color: blue;   
    }
</style>