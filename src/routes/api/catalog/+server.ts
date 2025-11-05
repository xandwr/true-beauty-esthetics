// src/routes/api/catalog/+server.ts

import { json } from '@sveltejs/kit';
import { square } from '$lib/server/square';
import { serializeBigInt } from '$utils/serializeBigInt';
import type { RequestHandler } from './$types';

interface ServiceVariation {
    id: string;
    name: string;
    durationMinutes?: number;
    priceMoney?: {
        amount?: bigint;
        currency?: string;
    };
}

interface FlattenedService {
    serviceName: string;
    variations: ServiceVariation[];
}

interface CatalogResponse {
    categories: {
        [categoryName: string]: FlattenedService[];
    };
}

// GET /api/catalog?productType=APPOINTMENTS_SERVICE or ?productType=REGULAR
export const GET: RequestHandler = async ({ url }) => {
    try {
        // Get productType from query params, default to APPOINTMENTS_SERVICE
        const productTypeParam = url.searchParams.get('productType');
        const productType = productTypeParam === 'REGULAR' ? 'REGULAR' : 'APPOINTMENTS_SERVICE';

        // Fetch all categories first
        const categoryMap = new Map<string, string>();

        // Use list method to get all category objects
        for await (const category of await square.catalog.list({ types: 'CATEGORY' })) {
            if (category.type === 'CATEGORY' && category.id && category.categoryData?.name) {
                categoryMap.set(category.id, category.categoryData.name);
            }
        }

        // Fetch items with the specified product type
        const catalogData = await square.catalog.searchItems({
            sortOrder: "ASC",
            archivedState: "ARCHIVED_STATE_NOT_ARCHIVED",
            productTypes: [productType],
        });

        // Flatten the service structure grouped by categories
        const categorizedServices: CatalogResponse = {
            categories: {}
        };

        if (catalogData.items) {
            for (const item of catalogData.items) {
                if (item.type === 'ITEM' && item.itemData) {
                    const serviceName = item.itemData.name || 'Unnamed Service';

                    // Extract variations with all necessary fields
                    const variations: ServiceVariation[] = (item.itemData.variations || []).map((variation: any) => ({
                        id: variation.id,
                        name: variation.itemVariationData?.name || serviceName,
                        durationMinutes: variation.itemVariationData?.serviceDuration
                            ? Math.floor(Number(variation.itemVariationData.serviceDuration) / 60000)
                            : undefined,
                        priceMoney: variation.itemVariationData?.priceMoney ? {
                            amount: variation.itemVariationData.priceMoney.amount,
                            currency: variation.itemVariationData.priceMoney.currency
                        } : undefined
                    }));

                    const flattenedService: FlattenedService = {
                        serviceName,
                        variations
                    };

                    // Get category names for this item
                    const categoryNames = (item.itemData.categories || [])
                        .map((cat: any) => categoryMap.get(cat.id))
                        .filter((name: string | undefined): name is string => name !== undefined);

                    // If no categories, put in "Uncategorized"
                    const categories = categoryNames.length > 0 ? categoryNames : ['Uncategorized'];

                    // Add service to each category it belongs to
                    for (const categoryName of categories) {
                        if (!categorizedServices.categories[categoryName]) {
                            categorizedServices.categories[categoryName] = [];
                        }
                        categorizedServices.categories[categoryName].push(flattenedService);
                    }
                }
            }
        }

        const serializedData = serializeBigInt(categorizedServices);
        return json(serializedData);
    } catch (err) {
        console.error('Square catalog error:', err);
        return json({ error: 'Failed to fetch catalog' }, { status: 500 });
    }
};