<svelte:head>
	<title>NewJack</title>
	<meta name="description" content="The game NewJack" />
</svelte:head>

<script>
  import { name } from "../../stores";
  import Card from "../Card.svelte";
  import Nameinput from "../Nameinput.svelte";
  import NewJackGame from "../NewJack.svelte";

</script>

<div>
	<Card card="spade2"/>
	{#if $name == null}
		<Nameinput />
		{:else}
		<NewJackGame />
	{/if}
</div>

<style>

</style>
