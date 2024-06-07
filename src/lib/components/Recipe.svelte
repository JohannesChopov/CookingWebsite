
<script>
    import {onMount} from 'svelte'

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


    <div id="recipe-header-grid">
        <div id="recipe-header-details">
            <div id="recipe-header-card">
                <h1 id="recipe-title" class="italic">{recipe.title}</h1>
                <h2 id="recipe-creator" class="normal">{recipe.user.email}</h2>
            </div>
        </div>
        <div id="recipe-header-image">
            <figure>
                <img id="recipe-image" alt={recipe.title} src={recipe.image_url} loading="lazy" />
            </figure>
        </div>
    </div>

    <div id="recipe-details-grid">
        <div id="recipe-details-image">
            <img id="recipe-image-small" alt={recipe.title} src={recipe.image_url} loading="lazy" />
        </div>
        <div id="recipe-details-description" class="italic">
            {recipe.description}
        </div>
        <div id="recipe-details-ingredients">
            <h1 class="bold">Ingredients</h1>
            <ul>
                {#each recipe.ingredients as [ingredient_name, unit, amount]}
                    <li>{ingredient_name} {amount} {unit || ''}</li>
                {/each}
            </ul>
        </div>
        <div id="recipe-details-instructions">
            <h1 class="bold">Instructions</h1>
            <ul>
                {#each recipe.instructions as instruction, index}
                <li><span class="extra-bold">Step {index + 1}:</span> {instruction}</li>
                {/each}
            </ul>
        </div>
    </div>
  
  <style>
    #recipe-header-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
        width: 100%; /* Full viewport width */
        height: 100vh; /* Full viewport height */
        
        overflow: hidden;
    }

    #recipe-header-details {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    #recipe-header-card {
        background-color: white;
        border: 2px solid black;
        margin: 2rem;
        padding: 2rem;
    }

    #recipe-title {
        font-size: 2rem;
        color: var(--prim2);
        word-break: break-word;
        overflow-wrap: break-word;
        /*
        padding-left: 2rem;
        padding-right: 2rem;
        */
    }

    #recipe-creator {
        font-size: 1.5rem;
        color: gray;
        word-break: break-word;
        overflow-wrap: break-word;
        padding-left: 2rem;
        padding-right: 2rem;
    }

    /* Media query for smaller screens */
    @media (max-width: 600px) {
        #recipe-header-card {
            margin: 0.5rem;
            padding: 0.5rem;
        }
        #recipe-title {
            font-size: 1rem; /* Smaller font size for small screens */
            padding-left: 1rem;
            padding-right: 1rem;
        }

        #recipe-creator {
            font-size: 1rem; /* Smaller font size for small screens */
            padding-left: 1rem;
            padding-right: 1rem;
        }
    }

    #recipe-header-image {
        display: flex;
        justify-content: center; /* Center image horizontally */
        align-items: center; /* Center image vertically */
        background-color: lightgrey;
    }

    #recipe-header-image figure {
        margin: 2rem; /* Remove default margin */
        object-fit: cover;
    }

    #recipe-header-image img {
        max-width: 100%;
        max-height: 80vh; /* Adjust the max height as needed */
        width: auto; /* Maintain aspect ratio */
        height: auto; /* Maintain aspect ratio */
        object-fit: cover;

        /*filter: blur(5px);*/
    }
    
    #recipe-header-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr); /* Two equal-width columns */
        width: 100%; /* Full viewport width */
        height: 100vh; /* Full viewport height */
        
        overflow: hidden;
    }

    #recipe-details-grid {
        background-color: var(--prim2);
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-template-rows: auto auto auto;
        width: 100%;
        
        box-sizing: border-box;
    }

    #recipe-details-image {
        grid-row: 1/2;
        grid-column: 1/2;

        display: flex;

        justify-content: center;
        align-items: center;

        /*padding: 1rem;*/
        /*background-color: green;*/
    }

    #recipe-details-description {
        margin: 3rem;

        grid-row: 1/2;
        grid-column: 2/3;

        padding: 2rem;

        font-size: 2rem;

        color: var(--sec2);

        display: flex;

        justify-content: center; 
        align-items: center; 

        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-all;

        max-width: 100%;
        box-sizing: border-box;
    }

    #recipe-image-small {
        max-width: 60%;
        max-height: 60%;
        object-fit: cover;
    }

    #recipe-details-ingredients h1 {
        margin: 2rem;
    }

    #recipe-details-ingredients {
        grid-row: 2 / 3; 
        grid-column: 1 / 3;
        background-color: var(--sec2);
        color: var(--prim2);

        display: flex;
        flex-direction: column;

        justify-content: flex-start; 
        align-items: center;
        /*
        max-width: 100%;
        overflow-wrap: break-word;
        word-wrap: break-word;
        */
    }

    #recipe-details-ingredients ul {
        list-style: none;
        padding-left: 10rem;
        padding-right: 10rem;
        padding-bottom: 4rem;
        margin: 0;
        width: 100%; 
        text-align: center; 
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    #recipe-details-ingredients li {
        font-size: 1.5rem;
        margin: 1rem 0;
    }

    #recipe-details-instructions h1 {
        margin: 2rem;
    }

    #recipe-details-instructions {
        grid-row: 3 / 4; 
        grid-column: 1 / 3;
        background-color: var(--prim2);
        color: var(--sec2);

        display: flex;
        flex-direction: column;

        justify-content: flex-start; 
        align-items: center;
        /*
        max-width: 100%;
        overflow-wrap: break-word;
        word-wrap: break-word;
        */
    }

    #recipe-details-instructions ul {
        list-style: none;
        padding-left: 10rem;
        padding-right: 10rem;
        padding-bottom: 4rem;
        margin: 0;
        width: 100%;
        text-align: center;
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    #recipe-details-instructions li {
        font-size: 1.5rem;
        margin: 1rem; 
    }
  </style>