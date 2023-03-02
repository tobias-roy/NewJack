<script>
  import { housePoints } from "../stores";

  function depositFunds(){
    $housePoints = 25000;
  }
</script>

<div class="blurGame">
  <div class="topText">
    <h1>The house is out of funds..</h1>
    <h1>I guess you won then..</h1>
  </div>
  <div class="svgContainer">
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <lottie-player src="https://assets4.lottiefiles.com/packages/lf20_uktq0eKz9C.json"  background="transparent"  speed="1"  style="width: 600px; height: 600px;"  loop autoplay></lottie-player>
  </div>
  <button on:click={depositFunds}>Continue playing</button>
</div>

<style>
  .svgContainer{
    position: absolute;
    left: calc(50% - 72px);
    top: calc(50% - 300px);
    z-index: 5;
  }

  .topText{
    text-align: center;
    position: absolute;
    z-index: 6;
    left: calc(50% - 242px);
    top: 200px;
    color: black;
    font-size: 60px;
  }

  .blurGame{
    background-color: rgb(255, 255, 255);
    height: 748px;
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
