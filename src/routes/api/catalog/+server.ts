// src/routes/api/catalog/+server.ts

import { json } from '@sveltejs/kit';
import { square } from '$lib/server/square';
import { serializeBigInt } from '$utils/serializeBigInt';

// GET /api/catalog
export async function GET() {
    try {
        const catalogData = await square.catalog.searchItems({
            sortOrder: "ASC",
            archivedState: "ARCHIVED_STATE_NOT_ARCHIVED",
        });
        const serializedData = serializeBigInt(catalogData);
        return json(serializedData);
    } catch (err) {
        console.error('Square catalog error:', err);
        return json({ error: 'Failed to fetch catalog' }, { status: 500 });
    }
}