<script>
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    let user = null;

    // Function to save user session to local storage
    const saveSessionToLocalStorage = (session) => {
        if (session) {
            localStorage.setItem('user_session', JSON.stringify(session));
        } else {
            localStorage.removeItem('user_session');
        }
    };

    // Fetch the current session once when the component is mounted
    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;
        saveSessionToLocalStorage(session);
    });

    // Listen for auth state changes
    onMount(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            user = session?.user || null;
            saveSessionToLocalStorage(session);
        });

        // Clean up listener on component unmount
        return () => {
            authListener.unsubscribe();
        };
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
