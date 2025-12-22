<script lang="ts">
	import { capitalise } from './example.remote';

	let result: Promise<string> | undefined = $state();

	let input: string = $state('');

	function make_loud(e: Event) {
		e.preventDefault();

		result = capitalise(input);
	}
</script>

<main>
	<form onsubmit={make_loud}>
		<label for="message">Message</label>
		<input type="text" bind:value={input} />
		<button>Make LOUD</button>
	</form>

	<output>
		{#await result}
			<pre>Loading...</pre>
		{:then loud_value}
			<pre>{loud_value}</pre>
		{:catch e}
			<code><pre>{JSON.stringify(e, null, 2)}</pre></code>
		{/await}
	</output>
</main>

<style>
	main {
		--pad: 10px;

		margin: 0 auto;
		max-width: 800px;

		display: grid;
		gap: 5px;
	}

	form {
		display: grid;
		grid-template-columns: 1fr auto;
		row-gap: 2px;
		column-gap: 5px;

		padding: var(--pad);
	}

	label {
		grid-column: span 2;
	}

	button {
		flex: 0 0 auto;
	}

	input,
	button {
		padding: 4px 3px;
		border: 1px solid #444;
	}

	button {
		padding-inline: 6px;
		background: #444;
		color: #fff;
	}

	output {
		background-color: #f5f5f5;
		padding: var(--pad);
		min-height: calc(1lh + var(--pad) * 2);
	}

	pre {
		font-family: monospace;
		white-space: pre-wrap;
		text-align: left;
	}
</style>
