<script>
  import { createEventDispatcher } from "svelte";
  import { name, startedGame } from "../stores";

  const dispatch = createEventDispatcher();
  function startNewHand() {
    $startedGame = false;
    dispatch("startNewHand");
  }

  export let gameStatus;
</script>

<div
  class:draw={gameStatus == "draw"}
  class:won={gameStatus == "won"}
  class:lost={gameStatus == "lost"}
>
  <div class="nameInputContainer">
    {#if gameStatus == "lost"}
      <div class="lostScreen">
        <h1>House wins!</h1>
      </div>
    {/if}

    {#if gameStatus == "won"}
      <div class="lostScreen">
        <h1 style="color: green;">{$name} wins!</h1>
      </div>
    {/if}

    {#if gameStatus == "draw"}
      <div class="lostScreen">
        <div class="pushResult">
          <h1>Push!</h1>
        </div>
      </div>
    {/if}
    <button on:click={startNewHand}>Play again!</button>
  </div>
</div>

<style>
  .draw {
    position: absolute;
    left: 0px;
    top: -260px;
    width: 300px;
  }

  .lost {
    position: absolute;
    left: 0px;
    top: -260px;
    width: 300px;
  }

  .won {
    position: absolute;
    left: 20px;
    top: -260px;
    width: 300px;
  }
  .nameInputContainer {
    position: absolute;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    height: 200px;
    left: 45px;
    top: 240px;
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
