<script>
	import { goto } from '$app/navigation';
	import { dealCard, name } from "../stores";
	import Header from './Header.svelte';
	import './styles.css';

</script>

<div class="app">	
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<div class="vertical-align">
			<a href="https://ludomani.dk/" target="_blank" rel="noreferrer">Få hjælp til at stoppe</a>
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.vertical-align{
		margin: -5px;
  	top: 50%;
  	-ms-transform: translateY(-50%);
  	transform: translateY(-50%);
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 85rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer > div > button{
		margin-left: 50px;
	}

	footer a {
		font-weight: bold;
		margin-bottom: 10px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
