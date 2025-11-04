<!-- $components/catalog/catalogItem.svelte -->

<script lang="ts">
    export let category: string;
    export let itemName: string;
    export let description: string | undefined = undefined;
</script>

<div class="border-2 rounded-xl p-2">
    <h1 class="uppercase text-sm">{category}</h1>
    <h1 class="uppercase font-semibold">{itemName}</h1>
    <h1 class="font-light">{description}</h1>
</div>