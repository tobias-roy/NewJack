<svelte:head>
	<title>NewJack</title>
	<meta name="description" content="The game NewJack" />
</svelte:head>

<script>
  import { name } from "../../stores";
  import NewJackGame from "../Card.svelte";
  import Nameinput from "../Nameinput.svelte";

</script>

<div>
	{#if $name == null}
		<Nameinput />
		{:else}
		<NewJackGame />
	{/if}
</div>

<style>

</style>