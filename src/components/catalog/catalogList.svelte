<!-- $components/catalog/catalogList.svelte -->

<script lang="ts">
    import { onMount } from "svelte";
    import CatalogItem from "./catalogItem.svelte";

    interface CatalogEntry {
        categoryNames?: string[];
        itemData?: {
            name?: string;
            description?: string | null;
        };
        [key: string]: any;
    }

    let items: CatalogEntry[] = [];
    let error: string | null = null;

    onMount(async () => {
        try {
            const res = await fetch('/api/catalog');
            const data = await res.json();

            if (data.error) {
                error = data.error;
                return;
            }

            items = data.items || data.objects || [];
        } catch (err) {
            console.error(err);
            error = 'Failed to load catalog';
        }
    })
</script>

{#if error}
    <p class="text-red-500">{error}</p>
{:else if !items.length}
    <p>Loading catalog...</p>
{:else}
    <div class="grid gap-4">
        {#each items as item}
            <CatalogItem
                category={item.categoryNames?.join(', ') ?? ''}
                itemName={item.itemData?.name ?? 'Unnamed'}
                description={item.itemData?.description ?? undefined}
            />
        {/each}
    </div>
{/if}