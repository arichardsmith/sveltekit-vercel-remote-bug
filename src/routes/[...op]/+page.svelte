<script lang="ts">
	import { page } from '$app/state';
	import { add, sqrt, sub } from '$lib/operations.remote';

	type OpDef = {
		name: string;
		args: number;
		run: (args: number[]) => Promise<number>;
	};

	const ops: Record<string, OpDef> = {
		add: {
			name: 'Add',
			args: 2,
			run: add
		},
		sub: { name: 'Subtract', args: 2, run: sub },
		sqrt: { name: 'Square Root', args: 1, run: sqrt }
	};

	const current_op_key: string | undefined = $derived(page.params.op);
	const current_op: OpDef | undefined = $derived(current_op_key ? ops[current_op_key] : undefined);

	const args: number[] = $state([]);

	let res: Promise<number> | undefined = $state();

	function calculate(e: Event) {
		e.preventDefault();

		if (current_op) {
			res = current_op.run(args.filter(Number.isFinite));
		} else {
			res = Promise.reject(new Error('Not a supported operation'));
		}
	}
</script>

<div class="layout">
	<header>
		<h1>The Overengineered Calculator</h1>
	</header>
	<nav>
		{#each Object.entries(ops) as [key, value] (key)}
			<a href={`/${key}`} class:current={key === page.params.op}>{value.name}</a>
		{/each}
	</nav>

	{#if current_op}
		<form onsubmit={calculate}>
			<div class="args">
				{#each { length: current_op.args }, n}
					<input type="number" bind:value={args[n]} />
				{/each}
			</div>
			<button>Calculate</button>
		</form>

		{#await res}
			<output>
				<pre>Loading...</pre>
			</output>
		{:then answer}
			<output>
				<pre class="answer">{answer}</pre>
			</output>
		{:catch e}
			<output class="error">
				{#if e instanceof Error}
					<p>{e.message}</p>
				{:else}
					<code><pre>{JSON.stringify(e, null, 2)}</pre></code>
				{/if}
			</output>
		{/await}
	{:else}
		<p class="not-found">Pick something to calculate above.</p>
	{/if}
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

	header h1 {
		color: var(--svorange);
		margin: 0;
	}

	nav {
		display: flex;
		justify-items: start;
		gap: 3ch;
	}

	nav a {
		color: var(--svorange);
		text-decoration: none;
	}

	nav:has(.current) a:not(.current) {
		color: var(--svade);
	}

	form {
		--gap: 5px;
		display: grid;
		gap: var(--gap);
	}

	.args {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(5ch, 1fr));
		gap: var(--gap);
	}

	input,
	button {
		padding: 4px 3px;
		border: 1px solid var(--svade);
		font-size: 2rem;
		font-family: monospace;
		color: var(--svorange);
		padding-inline: 6px;
	}

	button {
		padding-block: 6px;
		grid-column: -1 / 1;
		color: #fff;
		background-color: var(--svorange);
	}

	button:is(:hover, :focus-visible) {
		background-color: var(--svade);
	}

	output {
		background-color: var(--svaaade);
		color: var(--svorange);
		padding: 10px;
		min-height: calc(1lh);
	}

	.answer {
		font-size: 2rem;
		font-family: monospace;
	}

	output.error {
		background-color: var(--error);
		color: var(--error-text);
	}

	pre {
		font-family: monospace;
		white-space: pre-wrap;
		margin: 0;
	}

	.not-found {
		color: var(--svorange);
	}
</style>
