<script>
  import { createEventDispatcher } from "svelte";
  import { name, startedGame } from "../stores";

  const dispatch = createEventDispatcher();
  function startNewHand(){
    $startedGame = false;
    dispatch('startNewHand')
  }


  export let gameStatus;
</script>

<div class="endScreen">
  <div class="nameInputContainer">
    {#if gameStatus == 'lost'}
    <div class="lostScreen">
      <h1>House wins!</h1>
    </div>
  {/if}

  {#if gameStatus == 'won'}
    <div class="lostScreen">
      <h1 style="color: green;">{$name} wins!</h1>
    </div>
  {/if}

  {#if gameStatus == 'draw'}
    <div class="lostScreen">
      <h1>Push!</h1>
    </div>
  {/if}
    <button on:click={startNewHand}>Play again!</button>
  </div>
</div>

<style>
  .nameInputContainer {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 200px;
    margin-top: 20vh;
  }

  .nameInputContainer > button {
    background: #7c7c7c;
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
    background: #bcbcbc;
  }

  .endScreen{
    position: absolute;
    left: calc(50% - 110px);
    top: -100%;
  }
</style>
