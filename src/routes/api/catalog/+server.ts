// src/routes/api/catalog/+server.ts

import { json } from '@sveltejs/kit';
import { square } from '$lib/server/square';
import { serializeBigInt } from '$utils/serializeBigInt';

// GET /api/catalog
export async function GET() {
    try {
        const response = await square.catalog.list();
        const serializedResponse = serializeBigInt(response);
        return json(serializedResponse);
    } catch (err) {
        console.error('Square catalog error:', err);
        return json({ error: 'Failed to fetch catalog' }, { status: 500 });
    }
}