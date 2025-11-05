// api/availability/+server.ts

import { json } from '@sveltejs/kit';
import { square } from '$lib/server/square';
import { serializeBigInt } from '$utils/serializeBigInt';
import type { RequestHandler } from './$types';

// POST /api/availability
export const POST: RequestHandler = async ({ request }) => {
    try {
        const body = await request.json();

        const {
            locationId,
            serviceVariationId,
            teamMemberIds = [],
            startAt,
            endAt
        } = body;

        if (!locationId || !serviceVariationId || !startAt || !endAt) {
            return json({ error: 'Missing required fields' }, { status: 400 });
        }

        const response = await square.bookings.searchAvailability({
            query: {
                filter: {
                    startAtRange: {
                        startAt,
                        endAt
                    },
                    locationId,
                    segmentFilters: [
                        {
                            serviceVariationId,
                            teamMemberIdFilter: {
                                any: teamMemberIds
                            }
                        }
                    ]
                }
            }
        });

        const availabilities = response.availabilities ?? [];
        const serialized = serializeBigInt({ availabilities });

        return json(serialized);
    } catch (err) {
        console.error('Square availability error:', err);
        return json({ error: 'Failed to fetch availability' }, { status: 500 });
    }
};

export const GET: RequestHandler = async () => {
  const startAt = new Date().toISOString();
  const endAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  const response = await square.bookings.searchAvailability({
    query: {
      filter: {
        startAtRange: { startAt, endAt },
        locationId: 'LNSS8MG6VB42H',
        segmentFilters: [
          {
            serviceVariationId: 'YOUR_SERVICE_VARIATION_ID',
            teamMemberIdFilter: { any: ['TM_ID_1'] }
          }
        ]
      }
    }
  });

  return json(response);
};