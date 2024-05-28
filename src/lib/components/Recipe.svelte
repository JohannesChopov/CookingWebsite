<script>
    export let strMeal = '';
    export let strMealThumb = '';
    export let strCategory = '';
    export let strArea = '';
    export let strInstruction = '';
    export let ingredients = '';
</script>

<article>
    <header><i>Recipe:</i></header>
    <figure>
        <img alt={strMeal} src={strMealThumb} loading="lazy" />
    </figure>
    <section>
        <h1>{strMeal}</h1>
        <dl>
            <dt>Category</dt>
            <dd>{strCategory ?? ''}</dd>
            <dt>Origin</dt>
            <dd>{strArea ?? ''}</dd>
            <dt>Instructions</dt>
            <dd>{strInstruction ?? ''}</dd>
            <dt>Ingredients</dt>
            <dd>{ingredients ?? ''}</dd>
        </dl>
    </section>
</article>