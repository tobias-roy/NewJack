<script>
  import Nameinput from "../../components/Nameinput.svelte";
  import NewJackGame from "../../components/NewJack.svelte";
  import { housePoints, name, shuffleCards, startedGame, userPoints } from "../../stores";
  let restart = {};
  let newJackComponent;

  function resetApp() {
    $name = "Guest";
    $userPoints = 2000;
    $housePoints = 5000;
    $shuffleCards = false;
    $startedGame = false;
    restart = {};
    newJackComponent.resetApplication();
  }
</script>

<svelte:head>
  <title>NewJack</title>
  <meta name="description" content="The game NewJack" />
</svelte:head>

<div>
  {#key restart}
    {#if $name == "Guest"}
      <Nameinput />
    {:else}
      <NewJackGame bind:this={newJackComponent} />
    {/if}
  {/key}
  {#if $name != "Guest"}
    <button class="resetButton retroButton" on:click={resetApp}
      >Reset game</button
    >
  {/if}
</div>

<style>
  .resetButton {
    position: absolute;
    left: calc(50% - 50px);
  }

  .retroButton {
    margin-top: 10px;
    background: #7c7c7c;
    border-bottom: 6px inset rgba(0, 0, 0, 0.5);
    border-left: 6px inset rgba(0, 0, 0, 0.5);
    border-right: 6px inset rgba(255, 255, 255, 0.5);
    border-top: 6px inset rgba(255, 255, 255, 0.5);
    box-sizing: border-box;
    color: white;
    cursor: pointer;
    display: inline-block;
    font-size: 0.8rem;
    min-width: 100px;
    padding: 0.3rem;
    text-transform: uppercase;
    width: auto;
  }
</style>
