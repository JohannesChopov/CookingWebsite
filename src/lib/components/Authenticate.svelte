<script lang="ts">
    import { createClient } from '@supabase/supabase-js'
    import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from "$env/static/public";
    import { onMount } from 'svelte';
    
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
    console.log(supabase)

    let user: any;

    let email = "";
    
    let password = "";
    let confirmPass = "";
    let error = "";
    let isRegistering = false;

    /*
    const signInWithPassword = async () => {
        const {user, error} = await supabase.auth.signInWithPassword({ email, password });
        console.log(user, error);
    }
    */
    const signOut = () => {
        supabase.auth.signOut();
    };

    onMount(() => {
        supabase.auth.onAuthStateChange((event, session) => {
            user = session?.user;
        })
    })

    const handleAuth = async (event) => {
        event.preventDefault();
        error = "";

        if (isRegistering && password !== confirmPass) {
            error = "Passwords do not match.";
            return;
        }

        let authResponse;
        if (isRegistering) {
            // Handle user registration
            authResponse = await supabase.auth.signUp({ email, password });
        } else {
            // Handle user login
            authResponse = await supabase.auth.signInWithPassword({ email, password });
        }

        const { user, session, error: authError } = authResponse;

        if (authError) {
            error = authError.message;
        } else {
            // Redirect or perform further actions after successful auth
            window.location.href = "/profile";
        }
    };

    const toggleAuthMode = () => {
        isRegistering = !isRegistering;
        error = "";
        email = "";
        password = "";
        confirmPass = "";
    };
</script>

{#if user}
    <p>Signed in as {user.email}</p>
    <button on:click={signOut}>{'SignOut'}</button>
{:else}
    <div class="authContainer">
        <form on:submit|preventDefault={handleAuth}>
            <h1>{isRegistering ? 'Register' : 'Login'}</h1>
            {#if error}
                <p class="error">{error}</p>
            {/if}
            <label>
                <input bind:value={email} type="email" placeholder="Email" required />
            </label>
            <label>
                <input bind:value={password} type="password" placeholder="Password" required />
            </label>

            {#if isRegistering}
                <label>
                    <input bind:value={confirmPass} type="password" placeholder="Confirm Password" required />
                </label>
            {/if}
            <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            <p>
                {#if isRegistering}
                    Already have an account? <a href="javascript:void(0)" on:click={toggleAuthMode}>Login</a>
                {:else}
                    Don't have an account? <a href="javascript:void(0)" on:click={toggleAuthMode}>Register</a>
                {/if}
            </p>
        </form>
    </div>
{/if}

<!--
<div class="authContainer">
    <form on:submit|preventDefault={signInWithMagicLink}>
        <h1>{isRegistering ? 'Register' : 'Login'}</h1>
        {#if error}
            <p class="error">{error}</p>
        {/if}
        <label>
            <input bind:value={email} type="email" placeholder="Email" required />
        </label>
        
        {#if isRegistering}
            <label>
                <input bind:value={confirmPass} type="password" placeholder="Confirm Password" required />
            </label>
        {/if}
        <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
        <p>
            {#if isRegistering}
                Already have an account? <a href="javascript:void(0)" on:click={toggleAuthMode}>Login</a>
            {:else}
                Don't have an account? <a href="javascript:void(0)" on:click={toggleAuthMode}>Register</a>
            {/if}
        </p>
    </form>
    <button on:click={signOut}>{'SignOut'}</button>
</div>
-->
<style>
    .authContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 1;
        padding: 24px;
    }
    form {
        display: flex;
        flex-direction: column;
        gap: 8px;
        width: 400px;
        max-width: 100%;
        margin: 0 auto;
    }

    h1 {
        text-align: center;
        font-size: 3rem;
    }

    form input {
        width: 100%;
        border: none;
        background: transparent;
        color: white;
        padding: 14px;
    }

    form label {
        position: relative;
        border: 1px solid white;
        border-radius: 5px;
    }

    form input:focus {
        border: none;
        outline: none;
    }

    form button {
        background: green;
        color: white;
        border: none;
        padding: 14px 0;
        border-radius: 5px;
        font-size: 1.2rem;
    }

    form button:hover {
        background-color: lightgreen;
    }

    .error {
        color: red;
        text-align: center;
    }

    p {
        text-align: center;
    }

    a {
        color: lightblue;
        cursor: pointer;
        text-decoration: underline;
    }
</style>