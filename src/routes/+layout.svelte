<div class="mainContainer">
    <slot/>
</div>

<script>
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