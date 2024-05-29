<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    
    let user = null;

    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;
    });
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>


<h1>Welcome to RecipeGram, {user ? user.email : 'You are currently visiting as Guest. Login to your account.'}</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p> Lorem Ipsum. </p>

<a href="/about">About</a>
<a href="/recipes">Recipes</a>
<a href="/login">{user ? 'Profile' : 'Login'}</a>

<h2> Dit is een voorbeeld website </h2>
