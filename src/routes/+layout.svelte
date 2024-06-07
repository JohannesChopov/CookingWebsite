<div class="mainContainer">
    <h1 id="website-title" class="bold-italic"> 
        RecipeGram
    </h1>
    <header class="layout-header">
        <nav>
            <!--<a href="/">Home</a>-->
            <a href="/recipes">Explore</a>
            <a href="/login">Profile</a>
            <a href="/contact">Contact</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <slot/>
    </main>
    <footer class="layout-footer">
        <div class="footer-grid">
            <div id="footer-name" class="bold-italic">RecipeGram</div>
            <div class="footer-link">
                <a id="contact-link" class="bold" href="/contact">Contact Us</a>
            </div>
        </div>
    </footer>
</div>

<script>
    
    import '../style.css';

    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'

    export let data
    /*
    let { supabase, session} = data
    $: ({supabase, session} = data)
    
    onMount(() => {
        const {data} = supabase.auth.onAuthStateChange((event, _session) => {
            if (_session?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        })
        
        return () => data.subscription.unsubscribe()
        
    })
    */


    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;
    });
    
</script>