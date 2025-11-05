// api/locations/+server.ts
import { json } from '@sveltejs/kit';
import { square } from '$lib/server/square';
import { serializeBigInt } from '$utils/serializeBigInt';
import type { RequestHandler } from './$types';

// GET /api/locations
export const GET: RequestHandler = async () => {
    try {
        const response = await square.locations.list();

        // Optional sanity filter — only return active locations
        const activeLocations = response.locations?.filter(
            (loc) => loc.status === 'ACTIVE'
        ) ?? [];

        const serializedData = serializeBigInt({ locations: activeLocations });
        return json(serializedData);
    } catch (err) {
        console.error('Square locations error:', err);
        return json({ error: 'Failed to fetch locations' }, { status: 500 });
    }
};
