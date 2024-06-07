<script>

    import Authenticate from "$lib/components/Authenticate.svelte";
    import AddRecipe from "$lib/components/AddRecipe.svelte";
    import RecipeFeed from "$lib/components/RecipeFeed.svelte";
    import UserRecipeFeed from "$lib/components/UserRecipeFeed.svelte";

    import { supabase } from '$lib/supabase';
    import { onMount } from 'svelte';

    let user = null;

    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;
        if (user) {
            email = user.email;
        }
        //console.log(user);
    });

    let name = '';
    let email = '';
    let message = '';

    const handleSubmit = () => {
        const mailtoLink = `mailto:jchopov10240@gmail.com?subject=Message from ${name}&body=${message} (From: ${email})`;
        window.location.href = mailtoLink;
    };
</script>

<div class="contactpage">
    
    <div class="contact-container">
    
        <h1 class="bold">Contact Us</h1>

        <form on:submit|preventDefault={handleSubmit}>
            <label for="name">Name:</label>
            <input type="text" id="name" bind:value={name} required />

            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required />

            <label for="message">Message:</label>
            <textarea id="message" bind:value={message} required></textarea>

            <button type="submit">
                <i class="fa fa-envelope"></i>
            </button>
        </form>
    </div>
</div>
<div class="links-grid">
    <p><a class="iconlink" href="https://github.com/JohannesChopov" target="_blank" rel="noopener noreferrer"><i class="fa fa-github"></i></a></p>
    <p><a class="iconlink" href="https://www.linkedin.com/in/johannes-chopov-489b95205/" target="_blank" rel="noopener noreferrer"><i class="fa fa-linkedin"></i>
</div>

<style>

    .links-grid {
        display: flex;
        justify-content: center;
        gap: 4rem;
        padding: 1rem;
    }

    .iconlink {
        text-decoration: none;
        color: var(--prim2);
        font-size: 3rem;
        transition: color 0.3s;
    }

    .iconlink:hover {
        color: gray;
}

    .icons {
        display: flex;
        justify-content: center;
        gap: 2rem;
        margin-top: 2rem;
    }

    .icons a {
        font-size: 2rem;
        color: var(--prim2);
        transition: color;
    }

    .icons a:hover {
        color: var(--sec2);
    }

    .contactpage{

        padding: 4rem;

        display: flex;

        justify-content: center;

        align-items: center;

        background: white;
    }

    .contact-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        width: 30%;
    }

    h1 {
        margin: 2rem;
        color: var(--prim2);
    }

    form {
        display: flex;
        flex-direction: column;

        width: 100%;
        max-width: 600px;

        justify-content: center; 
        align-items: center;
    }

    label {
        margin-bottom: 5px;
        font-weight: bold;
        color: var(--prim2);
    }

    input, textarea {
        width: 100%;

        padding: 10px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        color: var(--prim2);
    }

    button {
        padding: 10px;
        background-color: #28a745;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 1rem;
    }

    button:hover {
        background-color: #218838;
    }

</style>