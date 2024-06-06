<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';
    import Instructions from './Instructions.svelte';
    import Ingredients from './Ingredients.svelte';
    import { ingredientsStore } from '../../stores/IngredientStore';
    import { stepsStore } from '../../stores/StepStore';
    import { get } from 'svelte/store';

    let title = '';
    let description = '';
    let image = null;
    let user_id = null;
    let imagePreview = null;
    let errorMessage = '';

    const handleFileChange = (event) => {
        image = event.target.files[0];
        const allowedTypes = ['image/jpeg', 'image/png'];

        if (image && allowedTypes.includes(image.type)) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview = e.target.result;
            };
            reader.readAsDataURL(image);
        } else {
            alert('Only images (JPEG, PNG) are allowed.');
            image = null;
            imagePreview = null;
            event.target.value = '';
        }
    };

    onMount(async () => {
        const data  = localStorage.getItem('userID');

        console.log(data)

        if (data !== null) {
            user_id = data;
        } else {
            console.error('User not logged in');
            user_id = null;
        }
    });

    /*
    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            user_id = session.user.id;
        } else {
            console.error('User not logged in');
            user_id = null;
        }
        console.log("ADDRECIPE" + user_id);
    });
    */

    const addRecipe = async () => {
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

        let image_url = null;
        if (image) {
            const filePath = `public/${user_id}` + "/" + `${title}`;
            const file = image;

            const { data, error } = await supabase.storage.from('recipe-images').upload(filePath, file);

            if (error) {
                console.error('Error uploading image:', error);
                return;
            }
            const { data: url } = await supabase.storage.from('recipe-images').getPublicUrl(filePath);

            image_url = `${url.publicUrl}?t=${new Date().getTime()}`;
        }

        const { error } = await supabase.from('recipes').insert([
            {
                user_id,
                title,
                description,
                ingredients,
                instructions: steps,
                image_url
            }
        ]);

        if (error) {
            console.error('Error adding recipe:', error);
        } else {
            console.log("Recipe added");
            window.location.reload();
        }
    };
</script>

<form lang="en" on:submit|preventDefault={addRecipe} >

    <h2>Give Your Recipe a Title</h2>
    <input type="text" bind:value={title} placeholder="Title" required maxlength="30"/>

    <h2>Give Your Recipe a Description</h2>
    <textarea bind:value={description} placeholder="Description" required maxlength="300"></textarea>

    <h2>Add the Recipe Ingredients</h2>
    <Ingredients/>

    <h2>Add the Recipe Instructions</h2>
    <Instructions/>

    {#if imagePreview}
        <img src={imagePreview} alt="Image preview" style="max-width: 100%; height: auto;" />
    {/if}

    <h2>Choose an Image For Your Recipe</h2>
    <input type="file" on:change={handleFileChange} required/>
    <button type="submit">Add Recipe</button>
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
</form>

<style>

    h2 {
        color: black;
    }

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
