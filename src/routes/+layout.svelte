<div class="mainContainer">
    <header class="layout-header">Header</header>
    <slot/>
    <footer class="layout-footer">Footer</footer>
</div>


<script>
    import '../style.css';
    
    import {invalidate} from '$app/navigation'
    import {onMount} from 'svelte'
    /*import { supabase } from '$lib/supabase';*/

    

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
    .mainContainer {
        min-height: 100vh;
        background: linear-gradient(to right, #97e75b, #1ab63e);
        color: white;
        position: relative;
        display: felx;
        flex-direction: column;
    }
</style>