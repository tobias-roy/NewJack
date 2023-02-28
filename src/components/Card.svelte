<script>
  import { fly } from "svelte/transition";
  export let card;
  export let direction;
</script>

<!-- <div in:fade={{duration: 400}} out:fade={{duration: 200}}> -->
<div in:fly={{ y: direction, duration: 400 }}>
  {#if card != null && card != "rear"}
    <img class="size" src="src/lib/svg/cards/{card}.svg" alt="" />
  {:else if card == "rear"}
    <div class="size svgBackground" />
  {/if}
</div>

<style>
  .size {
    width: 80px;
    height: 100px;
  }
  .svgBackground {
    background-color: white;
    background-image: url($lib/svg/cards/rear.svg);
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 5px;
  }
</style>
