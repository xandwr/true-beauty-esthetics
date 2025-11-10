<!-- $components/catalog/catalogItem.svelte -->

<script lang="ts">
    interface ServiceVariation {
        id: string;
        name: string;
        durationMinutes?: number;
        priceMoney?: {
            amount?: string;
            currency?: string;
        };
    }

    export let category: string;
    export let itemName: string;
    export let description: string | undefined = undefined;
    export let variations: ServiceVariation[] = [];

    function formatPrice(amount?: string, currency?: string): string {
        if (!amount) return '';
        const numAmount = parseFloat(amount) / 100;
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency || 'USD'
        }).format(numAmount);
    }
</script>

<div class="border-2 rounded-xl p-4">
    <h1 class="uppercase text-sm text-gray-600">{category}</h1>
    <h1 class="uppercase font-semibold text-lg mt-1">{itemName}</h1>
    {#if description}
        <p class="font-light text-gray-700 mt-2">{description}</p>
    {/if}

    {#if variations.length > 0}
        <div class="mt-3 space-y-2">
            {#each variations as variation}
                <div class="flex justify-between items-center text-sm">
                    <div>
                        <span class="font-medium">{variation.name}</span>
                        {#if variation.durationMinutes}
                            <span class="text-gray-500 ml-2">({variation.durationMinutes} min)</span>
                        {/if}
                    </div>
                    {#if variation.priceMoney?.amount}
                        <span class="font-semibold">
                            {formatPrice(variation.priceMoney.amount, variation.priceMoney.currency)}
                        </span>
                    {/if}
                </div>
            {/each}
        </div>
    {/if}
</div>