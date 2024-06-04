<script>
    import RecipeFeed from "$lib/components/RecipeFeed.svelte";

    /** @type {import('./$types').PageData} */
    // data uit page.js (eventueel doorgelinkt vanuit page.server.js)
    export let data;
    // @ts-ignore
    const recipes = JSON.parse(data.recipes)

    console.log("dit zijn de recepten")
    console.log(recipes)


</script>

<RecipeFeed {recipes}/>

<svelte:head>
    <title>Recipes</title>
</svelte:head>
