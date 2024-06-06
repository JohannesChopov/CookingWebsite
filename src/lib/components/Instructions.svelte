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
    <h2>Add Recipe Instructions</h2>
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
                <button type="button" on:click={() => removeStep(index)}>Remove</button>
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
        <button type="button" on:click={addStep} disabled={$stepsStore.length >= maxSteps}>+</button>
    </div>
    {#if $stepsStore.length >= maxSteps}
        <p style="color: red;">Maximum of {maxSteps} steps reached</p>
    {/if}
</div>

<style>
    h2 {
        color: black;
    }
    p {
        color: green;
    }
    label {
        color: black;
    }

    .steps-container {
        margin: 20px 0;
    }
    .steps-list {
        margin-bottom: 10px;
    }
    .step-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
    }
    .step-item input {
        flex: 1;
    }
    .step-item button {
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;
    }
    .step-item button:hover {
        background-color: darkred;
    }
    .add-step {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 10px;
    }
    .add-step input {
        flex: 1;
    }
    .add-step button {
        background-color: green;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        border-radius: 5px;
    }
    .add-step button:hover {
        background-color: darkgreen;
    }
</style>
