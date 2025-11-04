<!-- $components/catalog/catalogItem.svelte -->

<script>
    export let category;
    export let itemName;
</script>

<div class="border-4 rounded-xl p-2 w-fit h-fit">
    <h1 class="font-semibold uppercase">{category}</h1>
    <h1 class="text-xl uppercase">{itemName}</h1>
</div>
