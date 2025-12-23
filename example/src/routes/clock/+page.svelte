<script lang="ts">
	import { get_time } from '$lib/time.remote';

	let internal_time = $state(new Date());
	let server_time: Date | undefined = $state();
	let error: any | undefined = $state();

	async function update_time() {
		internal_time = new Date();

		try {
			const res = await get_time('foo');
			server_time = new Date(res);
		} catch (err) {
			error = err;
			server_time = undefined;
		}
	}

	let int: number | undefined;

	$effect(() => {
		int = setInterval(() => {
			if (error) {
				clearInterval(int);
			} else {
				update_time();
			}
		}, 1000);

		return () => clearInterval(int);
	});

	function hh_mm_ss(date: Date) {
		return [date.getHours(), date.getMinutes(), date.getSeconds()]
			.map((x) => x.toString().padStart(2, '0'))
			.join(':');
	}
</script>

<header>
	<h1>The Overengineered Clock</h1>
</header>
<nav>
	<a href={`/clock`} class="current">Clock</a>
	<a href={`/`}>Calculator</a>
</nav>

<main>
	<section class:error={error !== undefined}>
		{#if error !== undefined}
			<code
				><pre>{error instanceof Error ? error.message : JSON.stringify(error, null, 2)}</pre></code
			>
		{:else if server_time}
			<time>{hh_mm_ss(server_time)}</time>
		{:else}
			<span>??:??:??</span>
		{/if}
		<aside>The {error !== undefined ? 'error' : 'time'} returned by the remote function</aside>
	</section>
	<section>
		<time>{hh_mm_ss(internal_time)}</time>
		<aside>The local time when the server time was requested</aside>
	</section>
</main>

<style>
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

	main {
		display: grid;
		gap: 20px;
	}

	section {
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 3ch;

		padding: 10px;
		background-color: var(--svaaade);
		color: var(--svorange);
	}

	section.error {
		background-color: var(--error);
		color: var(--error-text);
	}

	time,
	section span {
		font-family: monospace;
		font-size: 2rem;
	}

	pre {
		font-family: monospace;
		white-space: pre-wrap;
		margin: 0;
	}
</style>
