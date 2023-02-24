<svelte:head>
	<title>NewJack</title>
	<meta name="description" content="The game NewJack" />
</svelte:head>

<script>
  import Nameinput from "../../components/Nameinput.svelte";
  import NewJackGame from "../../components/NewJack.svelte";
  import { name } from "../../stores";

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
