<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
    import Instructions from './Instructions.svelte';
    import Ingredients from './Ingredients.svelte';
    import { ingredientsStore } from '../../stores/IngredientStore';
    import { stepsStore } from '../../stores/StepStore';
    import { get } from 'svelte/store';

    export let editingRecipeId = null;

    let title = '';
    let description = '';
    let image = null;
    let user_id = null;
    let imagePreview = null;
    let errorMessage = '';

    const loadRecipe = async () => {
        const { data, error } = await supabase
            .from('recipes')
            .select('*')
            .eq('id', editingRecipeId)
            .single();

        if (error) {
            console.error('Error loading recipe:', error);
            return;
        }

        title = data.title;
        description = data.description;
        ingredientsStore.set(data.ingredients.map(([ingredient_name, unit, amount]) => ({ ingredient_name, unit, amount })));
        stepsStore.set(data.instructions);
        imagePreview = data.image_url;

        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            user_id = session.user.id;
        } else {
            console.error('User not logged in');
            user_id = null;
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (file && allowedTypes.includes(file.type)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview = e.target.result;
            };
            reader.readAsDataURL(file);
            image = file;
        } else {
            alert('Only images (JPEG, PNG) are allowed.');
            image = null;
            imagePreview = null;
            event.target.value = '';
        }
    };

    const updateRecipe = async () => {
        const steps = get(stepsStore);
        const ingredients = get(ingredientsStore).map(({ ingredient_name, unit, amount }) => [ingredient_name, unit, amount]);

        if (ingredients.length === 0) {
            errorMessage = 'Please add at least one ingredient.';
            return;
        }

        if (steps.length === 0) {
            errorMessage = 'Please add at least one instruction step.';
            return;
        }

        let image_url = imagePreview;

        if (image) {

            const { error: deleteError } = await supabase.storage.from('recipe-images').remove([oldImagePath]);
            // Delete the old image if a new image is uploaded
            const oldImagePath = imagePreview.replace(supabase.storage.from('recipe-images').getPublicUrl('').data.publicUrl, '');

            if (deleteError) {
                console.error('Error deleting old image:', deleteError);
                return;
            }

            // Upload the new image
            const filePath = `public/${user_id}/${title}`;
            const { data, error } = await supabase.storage.from('recipe-images').upload(filePath, image);

            if (error) {
                console.error('Error uploading new image:', error);
                return;
            }

            const { data: url } = await supabase.storage.from('recipe-images').getPublicUrl(filePath);
            image_url = url.publicUrl;
        }

        const updatedRecipe = {
            title,
            description,
            ingredients,
            instructions: steps,
            image_url
        };

        console.log('Updated Recipe:', updatedRecipe);

        const { error } = await supabase.from('recipes').update(updatedRecipe).eq('id', editingRecipeId);

        if (error) {
            console.error('Error updating recipe:', error);
        } else {
            console.log("Recipe updated");

            ingredientsStore.set([]);
            stepsStore.set([]);

            window.location.reload();
        }
    };

    onMount(loadRecipe);
</script>

<form on:submit|preventDefault={updateRecipe}>
    <input type="text" bind:value={title} placeholder="Title" required maxlength="50"/>
    <textarea bind:value={description} placeholder="Description" required maxlength="500"></textarea>

    <Ingredients/>

    <Instructions/>

    {#if imagePreview}
        <img src={imagePreview} alt="Image preview" style="max-width: 100%; height: auto;" />
    {/if}

    <input type="file" on:change={handleFileChange}/>
    <button type="submit">Update Recipe</button>
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
</form>

<style>
    form {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    input[type="text"],
    textarea {
        width: 100%;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }
    textarea {
        height: 100px;
        overflow: auto;
        resize: none;
    }

    input[type="file"] {
        font-size: 1rem;
        color: black;
    }

    button {
        background-color: #28a745;
        color: white;
        padding: 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
        transition: background-color 0.3s;
    }

    button:hover {
        background-color: #218838;
    }
</style>
