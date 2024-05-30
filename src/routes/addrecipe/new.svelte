<script>
    import { supabase } from '$lib/supabase';
    let title = '';
    let description = '';
    let ingredients = '';
    let instructions = '';
    let image = null;
    let user_id = 1; // Example user ID, replace with actual logged-in user ID

    const handleFileChange = (event) => {
        image = event.target.files[0];
    };

    const addRecipe = async () => {
        let imageUrl = null;
        if (image) {
            const { data, error } = await supabase.storage.from('recipe-images').upload(`public/${image.name}`, image);
            if (error) {
                console.error('Error uploading image:', error);
                return;
            }
            imageUrl = data.Key;
        }

        const { error } = await supabase.from('recipes').insert([
            {
                user_id,
                title,
                description,
                ingredients,
                instructions,
                image_url: imageUrl
            }
        ]);

        if (error) {
            console.error('Error adding recipe:', error);
        } else {
            // Redirect to recipe list or show success message
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
