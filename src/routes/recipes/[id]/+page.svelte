<script>
    import Recipe from '$lib/components/Recipe.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    const {recipe} = data;
    /*
    console.log("id: +page.svelte");
    console.log(recipe?.title);
    */
    </script>

<svelte:head>
    <title>{recipe.title}</title>
</svelte:head>

{#if recipe}
    <Recipe {recipe} />
{:else}
    <p>Recipe not found.</p>
{/if}