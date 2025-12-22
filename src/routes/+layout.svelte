<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="layout">
	{@render children()}
</div>

<style>
	.layout {
		--svorange: #ff3e00;
		--svade: #ff8e60;
		--svaaade: #ffd8a8;
		--error: #ffc9c9;
		--error-text: #b02525;

		margin: 0 auto;
		max-width: 800px;

		display: grid;
		gap: 10px;
	}
</style>
