<script>
    import { text } from '@sveltejs/kit';
    import { stepsStore } from '../../stores/StepStore';
    import { get } from 'svelte/store';

    let stepInput = '';
    const maxSteps = 20;
    const maxStepLength = 400;

    $: steps = get(stepsStore);

    const addStep = () => {
        if (stepInput.trim() !== '' && steps.length < maxSteps && text.length <= maxStepLength) {
            stepsStore.update(steps => [...steps, stepInput]);
            stepInput = '';
        }
    };

    const updateStep = (index, text) => {
        if (text.length <= maxStepLength) {
            stepsStore.update(steps => steps.map((step, i) => i === index ? text : step));
        }
    };

    const removeStep = (index) => {
        stepsStore.update(steps => steps.filter((_, i) => i !== index));
    };
</script>

<div class="steps-container">
    <div class="steps-list">
        {#each $stepsStore as text, index}
            <div class="step-item">
                <label for="step-{index}">Step {index + 1}: </label>
                <input 
                    id="step-{index}" 
                    type="text" 
                    bind:value={$stepsStore[index]} 
                    on:input={(e) => updateStep(index, e.target.value)} 
                    maxlength={maxStepLength}
                />
                <button type="button" on:click={() => removeStep(index)}>
                    <i class="material-icons">delete</i>
                </button>
            </div>
        {/each}
    </div>
    <div class="add-step">
        <label for="step-input">Step {$stepsStore.length + 1}: </label>
        <input 
            id="step-input" 
            type="text" 
            bind:value={stepInput} 
            placeholder="Add a step..." 
            maxlength={maxStepLength}
        />
        <button type="button" on:click={addStep} disabled={$stepsStore.length >= maxSteps}>
            <i class="material-icons">add</i>
        </button>
    </div>
    {#if $stepsStore.length >= maxSteps}
        <p>Maximum of {maxSteps} steps reached</p>
    {/if}
</div>

<style>
    p {
        color: red;
    }
    .steps-container {
        margin: 20px 0;
    }
    label {
        color: black;
    }

    .step-item label {
        margin: 1rem;
    }

    /*
    .steps-list {
        margin-bottom: 10px;
    }
    */

    .step-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        margin: 1rem;
    }
    .step-item input {
        flex: 1;
        margin: 1rem;
    }
    .step-item button {
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;
        margin: 1rem;
    }
    .step-item button:hover {
        background-color: darkred;
    }

    .add-step label {
        margin: 1rem;
    }

    .add-step {
        display: flex;
        align-items: center;
        margin: 1rem;
    }
    .add-step input {
        flex: 1;
        margin: 1rem;
    }
    .add-step button {
        background-color: green;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;
        margin: 1rem;
    }
    .add-step button:hover {
        background-color: darkgreen;
    }
</style>
