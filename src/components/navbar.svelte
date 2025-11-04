<!-- $components/navbar.svelte -->

<script>
    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
    ];
</script>

<header class="flex items-center justify-between p-4 bg-orange-200">
    <h1 class="text-xl font-bold">True Beauty Esthetics</h1>

    <nav class="flex gap-4">
        {#each navLinks as { name, href }}
            <a {href} class="hover:underline">{name}</a>
        {/each}
    </nav>
</header>
