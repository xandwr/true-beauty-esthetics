<!-- $components/catalog/catalogList.svelte -->

<script lang="ts">
    import { onMount } from "svelte";
    import CatalogItem from "./catalogItem.svelte";

    interface ServiceVariation {
        id: string;
        name: string;
        durationMinutes?: number;
        priceMoney?: {
            amount?: string;
            currency?: string;
        };
    }

    interface FlattenedService {
        serviceName: string;
        variations: ServiceVariation[];
        categoryName?: string;
    }

    export let productType: 'APPOINTMENTS_SERVICE' | 'REGULAR' = 'APPOINTMENTS_SERVICE';

    let items: FlattenedService[] = [];
    let error: string | null = null;

    onMount(async () => {
        try {
            const res = await fetch(`/api/catalog?productType=${productType}`);
            const data = await res.json();

            if (data.error) {
                error = data.error;
                return;
            }

            // Transform categorized data into flat array
            if (data.categories) {
                const flatItems: FlattenedService[] = [];
                for (const [categoryName, services] of Object.entries(data.categories)) {
                    for (const service of services as FlattenedService[]) {
                        flatItems.push({
                            ...service,
                            categoryName
                        });
                    }
                }
                items = flatItems;
            }
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
                category={item.categoryName ?? 'Uncategorized'}
                itemName={item.serviceName}
                variations={item.variations}
            />
        {/each}
    </div>
{/if}