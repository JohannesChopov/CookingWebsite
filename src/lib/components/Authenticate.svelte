<script lang="ts">
    import { onMount } from 'svelte';
    import { supabase } from '$lib/supabase';
    import UserRecipeFeed from './UserRecipeFeed.svelte';

    export let user: any = null;
    let loading = true;

    let email = "";
    let password = "";
    let confirmPass = "";
    let error = "";
    let isRegistering = false;

    // Sign out function
    const signOut = async () => {
        const { error: signOutError } = await supabase.auth.signOut();
        if (signOutError) {
            console.error('Error logging out:', signOutError);
        } else {
            user = null;
            window.location.href = "/login";
            localStorage.clear();
        }
    };
    
    
    // Listen for auth state changes
    onMount(() => {
        const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
            user = session?.user || null;
            loading = false;
            
            if (user) {
                localStorage.setItem('userID', user.id);
            }
        });

        // Clean up listener on component unmount
        return () => {
            authListener?.subscription?.unsubscribe();
        };
    });
    
    
    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;
        
        loading = false;

        if (user) {
            localStorage.setItem('userID', user.id);
        }
    });
    
    

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
            //window.location.reload();
            //window.location.href = "/recipes";
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

{#if loading}
    <p>Loading...</p>
{:else}
    {#if user}
        <div class="loggedInContainer">
            <p>You are currently signed in with {user.email}</p>
        </div>
        <UserRecipeFeed/>
        <div class="logoutContainer">
            <h2>
                Want to log out?
            </h2>
            <button class="logout" on:click={signOut}>
                <i class="material-icons">logout</i>
            </button>
        </div>
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
{/if}


<style>

    .authContainer label {
        color:black;
    }

    .authContainer {

        color: black;

        margin: 3rem auto;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        padding: 24px;
        width: 100%;
        max-width: 400px;
        background: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 16px;
        width: 100%;
    }

    h1 {
        text-align: center;
        font-size: 2rem;
        margin-bottom: 16px;
    }

    label {
        display: flex;
        flex-direction: column;
        font-size: 1rem;
        color: #333;
    }

    input {
        color: black;
        padding: 12px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 1rem;
    }

    button {
        padding: 12px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        cursor: pointer;
    }

    button:hover {
        background-color: #218838;
    }

    .error {
        color: red;
        text-align: center;
    }

    p {
        text-align: center;
    }

    a {
        color: #007bff;
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    .logoutContainer {
        color: white;
        background-color: var(--prim2);
        padding: 5rem;

        display: flex;

        flex-direction: column;
        align-items: center;

        gap: 3rem;
    }

    .logout {
        padding: 10px 20px;
        background-color: red;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        }

    .logout:hover {
        background-color: darkred;
    }

    p {
        color: black;
        font-size: 2rem;
        padding: 4rem;   
    }

    .loggedInContainer {
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
        color: black;
        padding: 14px;
    }

    form label {
        position: relative;
        border: 1px solid gray;
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