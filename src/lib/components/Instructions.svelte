<script>
    let steps = [];
    let stepInput = '';

    const addStep = () => {
        if (stepInput.trim() !== '') {
            steps = [...steps, { index: steps.length + 1, text: stepInput }];
            stepInput = '';
        }

        console.log(steps)
    };

    const removeStep = (index) => {
        steps = steps.filter(step => step.index !== index);
        steps = steps.map((step, i) => ({ ...step, index: i + 1 }));
    };
</script>

<div class="steps-container">
    <h2>Add Recipe Instructions</h2>
    <div class="steps-list">
        {#each steps as { index, text }}
            <div class="step-item">
                <p>Step {index}: {text}</p>
                <button on:click={() => removeStep(index)}>Remove</button>
            </div>
        {/each}
    </div>
    <div class="add-step">
        <label for="step-input">Step {steps.length + 1}: </label>
        <input id="step-input" type="text" bind:value={stepInput} placeholder="Add a step..." />
        <button on:click={addStep}>+</button>
    </div>
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
    .step-item p {
        margin: 0;
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
