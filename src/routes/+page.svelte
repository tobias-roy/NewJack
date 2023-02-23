<script>
	import blackjack from '$lib/images/blackjackfront.png';
	import { fade } from 'svelte/transition';
	import Gamestart from './Gamestart.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<div in:fade class="front-image">
		<img src={blackjack} alt="Welcome"/>
	</div>
	<Gamestart />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	.front-image img{
		height: 400px;
		width: 400px;
	}

</style>
