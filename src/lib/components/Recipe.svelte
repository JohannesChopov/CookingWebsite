<script>
    export let recipeID;
    export let creationDate;
    export let creator;
    export let recipeTitle;
    export let description;
    export let ingredients;
    export let instructions;
    export let imageURL;
</script>

<article>
    <header><i>Recipe:</i></header>
    <figure>
        <img alt={recipeTitle} src={imageURL} loading="lazy" />
    </figure>
    <section>
        <h1>{recipeTitle}</h1>
        <dl>
            <dt>id</dt>
            <dd>{recipeID ?? ''}</dd>
            <dt>date</dt>
            <dd>{creationDate ?? ''}</dd>
            <dt>creator</dt>
            <dd>{creator ?? ''}</dd>
            <dt>description</dt>
            <dd>{description ?? ''}</dd>
            <dt>ingredients</dt>
            <dd>{ingredients ?? ''}</dd>
            <dt>instructions</dt>
            <dd>{instructions ?? ''}</dd>
        </dl>
    </section>
</article>