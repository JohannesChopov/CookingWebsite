<script>
  export let imageUrl;
  let width = window.innerWidth;
  let height = window.innerHeight;
</script>

<div class="image-container">
  <img src={imageUrl} alt="Recipe Image" class="fullscreen-image" />
</div>

<style>
  body {
    margin: 0;
    overflow-x: hidden;
  }

  .image-container {
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .fullscreen-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .image-container:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url({imageUrl}) center center / cover no-repeat;
    filter: blur(10px);
    z-index: -1;
  }
</style>
