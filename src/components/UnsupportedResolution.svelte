<script>
  function resizePrompt() {
    !alert("FOOL! Resize to 1200x700!");
  }
</script>

<div>
  <div class="errorImage">
    <script
      src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
    ></script>
    <lottie-player
      src="https://assets8.lottiefiles.com/packages/lf20_ddxv3rxw.json"
      background="transparent"
      speed="1"
      style="width: 300px; height: 300px;"
      loop
      autoplay
    />
  </div>
  <button class="errorButton" on:click={resizePrompt}
    >Press to solve error</button
  >
</div>

<style>
  .errorImage {
    position: absolute;
    left: calc(50% - 150px);
    top: 200px;
  }

  .errorButton {
    position: absolute;
    left: calc(50% - 86px);
    bottom: 30%;
  }
</style>
