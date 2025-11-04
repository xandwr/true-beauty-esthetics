<script lang="ts">
	import "../app.css";
    import Navbar from '$components/navbar.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<main>
	<Navbar />
	{@render children()}
</main>

