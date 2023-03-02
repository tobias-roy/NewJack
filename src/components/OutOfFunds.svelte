<script>
  import { userPoints } from "../stores";

  function depositFunds(){
    $userPoints = 5000;
  }
</script>

<div>
  <h1 class="topText">You are out of funds.</h1>
  <div class="svgContainer">
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_8fBXZH.json"  background="transparent"  speed="1"  style="width: 1200px; height: 1200px;"  loop autoplay></lottie-player>
  </div>
  <button on:click={depositFunds}>Use my valueables</button>
</div>

<style>
  .svgContainer{
    position: absolute;
    left: calc(50% - 600px);
    top: calc(50% - 600px);
    z-index: 5;
  }

  .topText{
    text-align: center;
    position: absolute;
    z-index: 6;
    left: calc(50% - 311px);
    top: 200px;
    color: black;
    font-size: 60px;
  }

  button {
      z-index: 10;
      left: calc(50% - 146px);
      bottom: 200px;
      position: absolute;
      background: #de3202;
      border-bottom: 12px inset rgba(0, 0, 0, 0.5);
      border-left: 12px inset rgba(0, 0, 0, 0.5);
      border-right: 12px inset rgba(255, 255, 255, 0.5);
      border-top: 12px inset rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-size: 1.5rem;
      min-width: 150px;
      padding: 0.5rem;
      text-transform: uppercase;
      width: auto;
    }
</style>
