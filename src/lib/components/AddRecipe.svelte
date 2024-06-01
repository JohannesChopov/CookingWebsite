<script>
    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    let title = '';
    let description = '';
    let ingredients = '';
    let instructions = '';
    let image = null;
    let user_id = null; // Example user ID, replace with actual logged-in user ID

    const handleFileChange = (event) => {
        image = event.target.files[0];
    };

    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            user_id = session.user.id;
            console.log(user_id);
        } else {
            console.error('User not logged in');
            // Handle the case when there is no session or user
            user_id = null; // or any appropriate default action
        }
    });

    const addRecipe = async () => {
        let image_url = null;
        if (image) {

            const filePath = `public/${image.name}`
            const file = image

            const { data, error } = await supabase.storage.from('recipe-images').upload(filePath, file);
            /*location.reload();*/
            if (error) {
                console.error('Error uploading image:', error);
                return;
            }
            const { data: url } = supabase.storage.from('recipe-images').getPublicUrl(filePath);

            console.log(url.publicUrl)
            image_url = url.publicUrl;
        }

        const { error } = await supabase.from('recipes').insert([
            {
                user_id,
                title,
                description,
                ingredients,
                instructions,
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

<form on:submit|preventDefault={addRecipe}>
    <input type="text" bind:value={title} placeholder="Title" required />
    <textarea bind:value={description} placeholder="Description"></textarea>
    <textarea bind:value={ingredients} placeholder="Ingredients"></textarea>
    <textarea bind:value={instructions} placeholder="Instructions"></textarea>
    <input type="file" on:change={handleFileChange} />
    <button type="submit">Add Recipe</button>
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