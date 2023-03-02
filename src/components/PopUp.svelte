<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  function dispatchEvent(){
    dispatch('buttonClick')
  }

  export let message = '';
  export let buttonText = '';
</script>

<div class="nameInputContainer">
  <div class="messageText">
    <h1>{message}</h1>
  </div>
  <button class="bottomBox" on:click={dispatchEvent}>{buttonText}</button>
</div>

<style>  
  .messageText{
    position: absolute;
    left: 23px;
    top: 0px;
  }

  .bottomBox{
    position: absolute;
    bottom: 20px;
  }

  .nameInputContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 200px;
    margin-top: 20vh;
  }

  .nameInputContainer > button {
    background: #02b6de;
    border-bottom: 6px inset rgba(0, 0, 0, 0.5);
    border-left: 6px inset rgba(0, 0, 0, 0.5);
    border-right: 6px inset rgba(255, 255, 255, 0.5);
    border-top: 6px inset rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: 1.2rem;
    min-width: 100px;
    padding: 0.3rem;
    text-transform: uppercase;
    width: auto;
  }

  .nameInputContainer > button:focus,
  .nameInputContainer > button:hover {
    background: #19eab2;
  }

  @media only screen and (min-width: 1360px) {
      .nameInputContainer {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      height: 50px;
      margin-top: 20vh;
    }
  }

  @media only screen and (max-width: 1360px) {
      .nameInputContainer > button {
      background: #02b6de;
      border-bottom: 3px inset rgba(0, 0, 0, 0.5);
      border-left: 3px inset rgba(0, 0, 0, 0.5);
      border-right: 3px inset rgba(255, 255, 255, 0.5);
      border-top: 3px inset rgba(255, 255, 255, 0.5);
      box-sizing: border-box;
      color: white;
      cursor: pointer;
      display: inline-block;
      font-size: 0.6rem;
      min-width: 50px;
      padding: 0.2rem;
      text-transform: uppercase;
      width: auto;
    }
    .messageText{
      position: absolute;
      left: 18px;
      top: 0px;
    }
  
    .bottomBox{
      position: absolute;
      bottom: 20px;
    }
  
    .messageText > h1 {
      font-size: 18px;
    }
  }

</style>
