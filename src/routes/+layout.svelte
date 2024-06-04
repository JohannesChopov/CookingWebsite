<div class="mainContainer">
    <header class="layout-header">
        <nav>
            <a href="/">Home</a>
            <a href="/recipes">Recipes</a>
            <a href="/login">Profile</a>
            <a href="/about">About</a>
        </nav>
    </header>
    <main>
        <slot/>
    </main>
    <footer class="layout-footer">Extra info</footer>
</div>

<script>
    
    import '../style.css';

    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'

    export let data
    
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
    
    onMount(async () => {
        const { data: { session } } = await supabase.auth.getSession();
        user = session?.user || null;
    });
    
</script>

<style>
    
</style>