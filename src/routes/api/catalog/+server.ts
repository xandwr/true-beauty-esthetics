// src/routes/api/catalog/+server.ts

import { json } from '@sveltejs/kit';
import { square } from '$lib/server/square';
import { serializeBigInt } from '$utils/serializeBigInt';

// GET /api/catalog
export async function GET() {
    try {
        // Fetch all categories first
        const categoryMap = new Map<string, string>();

        // Use list method to get all category objects
        for await (const category of await square.catalog.list({ types: 'CATEGORY' })) {
            if (category.type === 'CATEGORY' && category.id && category.categoryData?.name) {
                categoryMap.set(category.id, category.categoryData.name);
            }
        }

        // Fetch items
        const catalogData = await square.catalog.searchItems({
            sortOrder: "ASC",
            archivedState: "ARCHIVED_STATE_NOT_ARCHIVED",
        });

        // Resolve category names for each item
        if (catalogData.items) {
            for (const item of catalogData.items) {
                if (item.type === 'ITEM' && item.itemData?.categories) {
                    const categoryNames = item.itemData.categories
                        .map((cat: any) => categoryMap.get(cat.id))
                        .filter((name: string | undefined): name is string => name !== undefined);

                    // Add resolved category names to the item
                    (item as any).categoryNames = categoryNames;
                }
            }
        }

        const serializedData = serializeBigInt(catalogData);
        return json(serializedData);
    } catch (err) {
        console.error('Square catalog error:', err);
        return json({ error: 'Failed to fetch catalog' }, { status: 500 });
    }
}