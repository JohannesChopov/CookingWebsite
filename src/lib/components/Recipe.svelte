<script>
    import { ingredientsStore } from "../../stores/IngredientStore";
    import Ingredients from "./Ingredients.svelte";

    export let recipe = {
        created_at: null,
        user: { email: '' },
        title: '',
        description: '',
        ingredients: [],
        instructions: [],
        image_url: ''
    };
</script>

<article class="recipe-article">
    <header><i>Recipe:</i></header>
    <figure>
        <img alt={recipe.title} src={recipe.image_url} loading="lazy" />
    </figure>
    <section>
        <h1>{recipe.title}</h1>
        <dl>
            <dt>date</dt>
            <dd>{recipe.created_at ?? ''}</dd>
            <dt>creator</dt>
            <dd>{recipe.user.email ?? 'Unknown'}</dd>
            <dt>description</dt>
            <dd>{recipe.description ?? ''}</dd>
            <dt>ingredients</dt>         
            <dd>
                <ul>
                    {#each recipe.ingredients as [ingredient_name, unit, amount]}
                        <li>{amount} {unit || ''} {ingredient_name}</li>
                    {/each}
                </ul>
            </dd>
            <!--
            <dd>
                <ul>
                    {#each recipe.ingredients as ingredient}
                        <li> {ingredient}</li>
                    {/each}
                </ul>
            </dd>
            -->
            <dt>instructions</dt>
            <dd>
                <ul>
                    {#each recipe.instructions as instruction, index}
                        <li>Step {index + 1}: {instruction}</li>
                    {/each}
                </ul>
            </dd>
        </dl>
    </section>
</article>

<style>
    .recipe-article {
        max-width: 800px;
        margin: auto;
        padding: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .recipe-article header {
        font-size: 1.5rem;
        color: #333;
        text-align: center;
        margin-bottom: 20px;
    }

    .recipe-article figure {
        text-align: center;
    }

    .recipe-article img {
        max-width: 100%;
        border-radius: 8px;
        margin-bottom: 20px;
    }

    .recipe-article h1 {
        font-size: 2rem;
        color: #1ab63e;
        text-align: center;
        margin-bottom: 20px;
    }

    .recipe-article dl {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 10px;
    }

    .recipe-article dt {
        font-weight: bold;
        color: #333;
    }

    .recipe-article dd {
        margin: 0;
        color: #555;
    }

    .recipe-article section {
        margin-top: 20px;
    }

    .recipe-article ul {
        list-style-type: none;
        padding: 0;
    }

    .recipe-article li {
        margin-bottom: 10px;
        color: #555;
    }
</style>

