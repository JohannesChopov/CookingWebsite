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
        let user = session?.user || null;
        user_id = user?.id
        console.log(user_id)
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
