<script>
  import Nameinput from "../../components/Nameinput.svelte";
  import NewJackGame from "../../components/NewJack.svelte";
  import { name } from "../../stores";
  let restart = {};

  function resetGame() {
    localStorage.clear();
    $name = "Guest";
    restart = {};
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
      <NewJackGame />
    {/if}
  {/key}
  {#if $name != "Guest"}
    <button on:click={resetGame}>Reset game</button>
  {/if}
</div>

<style>
</style>
