<script>
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  function dispatchEvent(){
    dispatch('buttonClick')
  }

  export let message = '';
  export let buttonText = '';
</script>

<div class="won">
  <div class="nameInputContainer">
    <div class="lostScreen">
      <h1>{message}</h1>
    </div>
    <button on:click={dispatchEvent}>{buttonText}</button>
  </div>
</div>

<style>  
  .won{
    position: absolute;
    left: 5px;
    top: -200px;
    width: 300px;
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


</style>
