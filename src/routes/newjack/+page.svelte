<script>
  import { browser } from '$app/environment';
  import Nameinput from "../../components/Nameinput.svelte";
  import NewJackGame from "../../components/NewJack.svelte";
  import UnsupportedResolution from '../../components/UnsupportedResolution.svelte';
  import { housePoints, name, shuffleCards, startedGame, userPoints } from "../../stores";
  let restart = {};
  let newJackComponent;
  let unsupportedResolution = false;

  if(browser){
    addEventListener("resize", (event) => {
      onresize = event => {
        if(window.innerWidth < 900){
          unsupportedResolution = true;
        } else {
          unsupportedResolution = false;
        }
      };
    })
  }

  function resetApp() {
    $name = null;
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
    {#if $name == null && !unsupportedResolution}
      <Nameinput />
    {:else if !unsupportedResolution}
      <NewJackGame bind:this={newJackComponent} />
    {/if}
    {#if unsupportedResolution}
      <UnsupportedResolution />
    {/if}
  {/key}
  {#if $name != null}
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

  @media only screen and (max-width: 1360px) {
    .resetButton{
      bottom: 50px;
      left: calc(50% - 32px);
    }

    .retroButton {
    border-bottom: 4px inset rgba(0, 0, 0, 0.5);
    border-left: 4px inset rgba(0, 0, 0, 0.5);
    border-right: 4px inset rgba(255, 255, 255, 0.5);
    border-top: 4px inset rgba(255, 255, 255, 0.5);
    font-size: 0.6rem;
    min-width: 65px;
    padding: 0.2rem;
  }
  }
</style>
