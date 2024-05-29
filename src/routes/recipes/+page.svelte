<script>
    export let data;
    $: recipes = data?.recipes;
</script>

<svelte:head>
    <title>Recipes</title>
</svelte:head>

<a href="/">Home</a>

<h1>Recipes</h1>

<div class="recipes-grid">
    {#each recipes as {strMeal, idMeal, strMealThumb}}
        <div class="recipe-card">
            <a href={`/recipes/${idMeal}`}>
                <img src={strMealThumb} alt={strMeal} class="recipe-image" />
                <div class="recipe-name">{strMeal}</div>
            </a>
        </div>
    {/each}
</div>

<!--
<style>
    .recipes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
    padding: 16px;
    overflow-y: auto;
}

.recipe-card {
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s;
}

.recipe-card:hover {
    transform: translateY(-5px);
}

.recipe-image {
    width: 100%;
    height: auto;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
}

.recipe-name {
    padding: 16px;
    text-align: center;
    font-size: 1.2rem;
}

@media (max-width: 600px) {
    .recipe-name {
        font-size: 1rem;
    }
}
</style>
-->