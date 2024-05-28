<script>

    import {supabase} from "../supabase.js";
    console.log(supabase);

    let user = 'Johannes';
</script>

<svelte:head>
    <title>Home</title>
</svelte:head>



<h1>Welcome to SvelteKit, {user}!</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<p> Lorem Ipsum. </p>

<a href="/about">About</a>
<a href="/recipes">Recipes</a>
<a href="/login">Login</a>
<a href="/profile">Profile</a>

<h2> Dit is een voorbeeld website </h2>
