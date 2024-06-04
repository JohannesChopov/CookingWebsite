<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { get } from 'svelte/store';
    import { ingredientsStore } from '../../stores/IngredientStore';

    let search = '';
    let searchResults = [];

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
        ingredientsStore.update(ingredients => [
            ...ingredients,
            { ...ingredient, amount: '' }
        ]);
        search = '';
        searchResults = [];
        console.log("Ingredients: ", get(ingredientsStore));
    };

    const removeIngredient = (index) => {
        ingredientsStore.update(ingredients => ingredients.filter((_, i) => i !== index));
    };

    // Function to handle input change for amount
    const handleAmountChange = (event, index) => {
        const newValue = parseFloat(event.target.value);

        // Ensure value is a number between 0 and 50 (inclusive)
        const clampedValue = Math.max(0, Math.min(newValue, 50));

        ingredientsStore.update(ingredients => {
        const updatedIngredients = [...ingredients];
        updatedIngredients[index].amount = clampedValue;
        return updatedIngredients;
        });
    };

</script>

<div class="ingredients-container">
    <input type="text" bind:value={search} placeholder="Search for ingredients..." on:input={fetchIngredients} />

    <div class="search-results">
        {#each searchResults as ingredient}
            <div class="search-result" on:click={() => addIngredient(ingredient)}>
                {ingredient.ingredient_name} {ingredient.unit ? `(${ingredient.unit})` : ''}
            </div>
        {/each}
    </div>

    <div class="selected-ingredients">
        {#each $ingredientsStore as { ingredient_name, unit, amount }, index}
            <div class="ingredient-item">
                <span>{ingredient_name} {unit ? `(${unit})` : ''}</span>
                <input type="number" bind:value={$ingredientsStore[index].amount} placeholder="Amount" on:input={(event) => handleAmountChange(event, index)} />
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
