<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import { get } from 'svelte/store';
    import { ingredientsStore } from '../../stores/IngredientStore';

    let search = '';
    let searchResults = [];
    const maxIngredients = 20;

    const fetchIngredients = async () => {
        if (search.trim() !== '') {
            const { data, error } = await supabase
                .from('ingredients')
                .select('ingredient_name, unit')
                .ilike('ingredient_name', `%${search}%`);

            if (error) {
                console.error('Error fetching ingredients:', error);
            } else {
                const selectedIngredients = get(ingredientsStore).map(i => i.ingredient_name);
                searchResults = data.filter(ingredient => !selectedIngredients.includes(ingredient.ingredient_name));
            }
        } else {
            searchResults = [];
        }
    };

    const addIngredient = (ingredient) => {
        if (get(ingredientsStore).length < maxIngredients) {
            ingredientsStore.update(ingredients => [
                ...ingredients,
                { ...ingredient, amount: '' }
            ]);
            search = '';
            searchResults = [];
            //console.log("Ingredients: ", get(ingredientsStore));
        }
    };

    const removeIngredient = (index) => {
        ingredientsStore.update(ingredients => ingredients.filter((_, i) => i !== index));
    };

    const handleAmountChange = (event, index) => {
        const newValue = parseFloat(event.target.value);

        ingredientsStore.update(ingredients => {
            const updatedIngredients = [...ingredients];
            const unit = updatedIngredients[index].unit;
            const limit = unit ? 10000 : 50;

            const clampedValue = Math.max(1, Math.min(newValue, limit));
            updatedIngredients[index].amount = clampedValue;
            return updatedIngredients;
        });
    };

</script>

<div class="ingredients-container">
    <input type="text" bind:value={search} placeholder="Search for ingredients..." on:input={fetchIngredients} />

    <div class="search-results">
        {#each searchResults as ingredient}
            <div class="search-result { $ingredientsStore.length >= maxIngredients ? 'disabled' : '' }" on:click={() => addIngredient(ingredient)}>
                {ingredient.ingredient_name} {ingredient.unit ? `(${ingredient.unit})` : ''}
            </div>
        {/each}
    </div>

    <div class="selected-ingredients">
        {#each $ingredientsStore as { ingredient_name, unit, amount }, index}
            <div class="ingredient-item">
                <span>{ingredient_name} {unit ? `(${unit})` : ''}</span>
                <input type="number" bind:value={$ingredientsStore[index].amount} placeholder="Amount" required on:input={(event) => handleAmountChange(event, index)} />
                <button on:click={() => removeIngredient(index)}>Remove</button>
            </div>
        {/each}
    </div>
    {#if $ingredientsStore.length >= maxIngredients}
        <p style="color: red;">Maximum of {maxIngredients} ingredients reached</p>
    {/if}
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
    .search-result.disabled {
        pointer-events: none;
        color: gray;
    }
    .search-result:hover:not(.disabled) {
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
