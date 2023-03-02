<script>
  function resizePrompt() {
    !alert("FOOL! Resize to 1200x700!");
  }
</script>

<div style="text-align: center">
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
  <p>Please resize your browser to a supported resolution.</p>
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
