<!-- $components/catalog/catalogItem.svelte -->

<script lang="ts">
    export let category: string;
    export let itemName: string;
    export let description: string | undefined = undefined;
</script>

<div>
    <h1>{category}</h1>
    <h1>{itemName}</h1>
    <h1>{description}</h1>
</div>