<script>
    import { supabase } from '$lib/supabase';

    
    export let recipes = [];

    console.log('test');
    console.log(recipes);

    /*
    const getUser = () => {
        const user = localStorage.getItem("userID");
        console.log(user);
    }
    */
    
</script>
<!--
<div class="recipes-grid">
    {#each recipes as { id, title, description, image_url, user }}
            <div class="recipe-card">
                <a href={`/recipes/${id}`}>
                    <div class="recipe-card-image-container">
                        <img class="recipe-card-image" src={image_url} alt={title} />
                    </div>
                    <div class="recipe-card-name">{title}</div>
                    <p>{user.email.split('@')[0]}</p>
                </a>
            </div>
    {/each}
</div>

<style>
    .recipes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
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
        overflow: hidden;
    }
    
    .recipe-card:hover {
        transform: translateY(-5px);
    }

    .recip-card-image-container {
        width: 100%;
        height: 200px; /* Fixed height */
        background: gray;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
    }
    
    .recipe-card img {
        width: 100%;
        height: auto;
        border-bottom: 1px solid #ccc;
    }

    .recipe-name {
        padding: 16px;
        font-size: 1.2rem;
        text-align: center;
        font-weight: bold;
    }

    .recipe-card p {
        padding: 0 16px 16px;
        font-size: 1rem;
        color: #555;
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
        color: black;
    }
</style>
-->
<div class="recipes-grid">
    {#each recipes as { id, title, description, image_url, user }}
        <div class="recipe-card">
            <a href={`/recipes/${id}`}>
                <div class="recipe-card-image-container">
                    <img class="recipe-card-image" src={image_url} alt={title} />
                </div>
                <div class="recipe-card-name">{title}</div>
                <p>{user.email.split('@')[0]}</p>
            </a>
        </div>
    {/each}
</div>

<style>
    .recipes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
        padding: 16px;
        overflow-y: auto;
    }

    .recipe-card {
        background: var(--prim2);
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        overflow: hidden;
        position: relative;

        overflow-wrap: break-word;
        word-wrap: break-word;
        word-break: break-all;

        max-width: 100%;
        box-sizing: border-box;
    }
    
    .recipe-card:hover {
        transform: translateY(-5px);
    }

    .recipe-card-image-container {
        width: 100%;
        height: 200px;
        background: lightgray;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        position: relative;
    }

    .recipe-card-image-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(transparent, rgba(0, 0, 0, 0.5)),
                    linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.5)),
                    linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.5)),
                    linear-gradient(270deg, transparent, rgba(0, 0, 0, 0.5));
        mask-image: radial-gradient(circle, transparent 70%, black 100%);
        mask-composite: intersect;
        pointer-events: none;
        z-index: 1;
    }

    .recipe-card-image {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
    }

    .recipe-card-name {
        padding: 10px;
        font-size: 1.2rem;
        text-align: center;
        font-weight: bold;
    }

    .recipe-card p {
        padding: 0 10px 10px;
        font-size: 0.7rem;
        color: white;
        text-align: center;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
</style>


