<script>
  import errorImg from "../lib/images/error.png";

  function resizePrompt(){
    !alert('FOOL! Resize to 1200x700!')
  }
</script>

<div>
  <img class="errorImage" src="{errorImg}" alt="">
  <button class="errorButton" on:click={resizePrompt}>Press to solve error</button>
</div>

<style>
  .errorImage{
    position: absolute;
    left: calc(50% - 360px);
  }

  .errorButton{
    position: absolute;
    left: calc(50% - 86px);
    bottom: 30%;
  }
</style>
