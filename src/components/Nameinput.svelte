<script>
	import { name } from "../stores";
	let inputName;
	function saveName(){
		$name = inputName;
	}
</script>


<div class="corner">
	<p>Enter name</p>
	<input type="text" bind:value={inputName}>
	<button on:click={saveName}>Save name</button>
</div>

<style>
	
</style>
