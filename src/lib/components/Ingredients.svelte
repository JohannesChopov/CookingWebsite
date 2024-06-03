<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { writable } from 'svelte/store';

    import { ingredientsStore } from '../../stores/IngredientStore';
    import { get } from 'svelte/store';

    let search = '';
    let searchResults = [];
    let selectedIngredients = writable([]);

    const fetchIngredients = async () => {
        if (search.trim() !== '') {
            const { data, error } = await supabase
                .from('ingredients')
                .select('ingredient_name, unit')
                .ilike('ingredient_name', `%${search}%`);

            if (error) {
                console.error('Error fetching ingredients:', error);
            } else {
                searchResults = data;
            }
        } else {
            searchResults = [];
        }
    };

    const addIngredient = (ingredient) => {
        selectedIngredients.update(ingredients => [
            ...ingredients, 
            { ...ingredient, amount: '' }
        ]);
        search = '';
        searchResults = [];
    };

    const removeIngredient = (index) => {
        selectedIngredients.update(ingredients => ingredients.filter((_, i) => i !== index));
    };
</script>

<div class="ingredients-container">
    <input type="text" bind:value={search} placeholder="Search for ingredients..." on:input={fetchIngredients} />

    <div class="search-results">
        {#each searchResults as ingredient}
            <div class="search-result" on:click={() => addIngredient(ingredient)}>
                {ingredient.ingredient_name} ({ingredient.unit})
            </div>
        {/each}
    </div>

    <div class="selected-ingredients">
        {#each $selectedIngredients as { ingredient_name, unit, amount }, index}
            <div class="ingredient-item">
                <span>{ingredient_name} ({unit})</span>
                <input type="number" bind:value={$selectedIngredients[index].amount} placeholder="Amount" />
                <button on:click={() => removeIngredient(index)}>Remove</button>
            </div>
        {/each}
    </div>
</div>

<style>
    p {
        color: black;
    }

    .ingredients-container {
        color: black;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .search-results {
        display: flex;
        flex-direction: column;
        gap: 5px;
        background: #f0f0f0;
        padding: 10px;
        border-radius: 4px;
        max-height: 200px;
        overflow-y: auto;
    }
    .search-result {
        padding: 5px;
        cursor: pointer;
    }
    .search-result:hover {
        background: #e0e0e0;
    }
    .selected-ingredients {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .ingredient-item {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    .ingredient-item input {
        width: 80px;
    }
</style>
