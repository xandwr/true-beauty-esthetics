// src/routes/api/catalog/+server.ts

import { json } from '@sveltejs/kit';
import { square } from '$lib/server/square';
import { serializeBigInt } from '$utils/serializeBigInt';
import { getCatalogItems, getCatalogCategories } from '$utils/catalogTypes';

// GET /api/catalog
export async function GET() {
    try {
        const response = await square.catalog.list();

        // Process catalog objects with type safety
        const objects = response.data;

        // Filter by type using helper functions
        const items = getCatalogItems(objects);
        const categories = getCatalogCategories(objects);

        const serializedResponse = serializeBigInt(response);
        return json(serializedResponse);
    } catch (err) {
        console.error('Square catalog error:', err);
        return json({ error: 'Failed to fetch catalog' }, { status: 500 });
    }
}