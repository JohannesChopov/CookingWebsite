<div class="about-page">
    <h1 class="bold">My Goal</h1>
    <p>This website is the result of a project for the Full Stack Web Development course. It aims to provide a platform where users can share their own recipes and enjoy recipes shared by others.</p>
    
    <h1 class="bold">About Me</h1>
    <p>My name is Johannes Chopopv and I am a student in Electronics-ICT Engineering Technology at a joint programme of UHasselt and KULeuven. This website was created as part of a project in my coursework to demonstrate my skills in web development.</p>
    
    <h1 class="bold">Features</h1>
    <p>My website allows users to:</p>
        <ul>
            <li>Share their unique recipes</li>
            <li>Browse and enjoy recipes from other users</li>
            <li>Interact with a community of cooking enthusiasts</li>
        </ul>
    <div class="logo-grid">
        <div class="image-container">
            <a href="https://www.kuleuven.be/kuleuven/" target="_blank" rel="noopener noreferrer">
                <img src="src\lib\KULeuven.png" alt="KULeuven-logo">
            </a>
        </div> 
        <div class="image-container">
            <a href="https://www.uhasselt.be/nl" target="_blank" rel="noopener noreferrer">
                <img  src="src\lib\UHasselt.png" alt="UHasselt-logo">
            </a>
        </div>
    </div>
</div>

<style>
    .about-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 2rem;
        background: white;
        color: black;
    }

    .bold {
        font-weight: bold;
    }

    h1, h2 {
        color: var(--prim2);
        margin-bottom: 1rem;
    }

    p {
        margin-bottom: 2rem;
        font-size: 1.2rem;
        line-height: 1.6;
    }

    ul {
        list-style-type: disc;
        margin-left: 2rem;
        text-align: left;
    }

    li {
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
    }

    .logo-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        width: 100%;
        max-width: 800px;
        margin: 5rem;
    }

    .image-container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .logo-grid img {
        width: 50%;
        height: auto;
    }
</style>