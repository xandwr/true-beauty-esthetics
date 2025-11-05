import { json } from '@sveltejs/kit';
import { square } from '$lib/server/square';
import { serializeBigInt } from '$utils/serializeBigInt';
import type { RequestHandler } from './$types';

// GET /api/team-members
export const GET: RequestHandler = async () => {
    try {
        // Step 1: Search all active team members
        const teamResp = await square.teamMembers.search({
            query: {
                filter: { status: "ACTIVE" }
            }
        });

        const members = teamResp.teamMembers ?? [];

        // Step 2: Gather IDs for booking profile lookup
        const teamMemberIds = members.map((m) => m.id!).filter(Boolean);

        let bookingProfiles: any[] = [];

        if (teamMemberIds.length > 0) {
            const bookingProfilesResp = await square.bookings.bulkRetrieveTeamMemberBookingProfiles({
                teamMemberIds
            });

            const rawProfiles = bookingProfilesResp.teamMemberBookingProfiles ?? {};

            // Convert Record<string, GetTeamMemberBookingProfileResponse> into a clean array
            bookingProfiles = Object.values(rawProfiles).map((r: any) => r.teamMemberBookingProfile);
        }

        // Step 3: Merge data
        const enriched = members.map((member) => {
            const bookingProfile = bookingProfiles.find(
                (bp) => bp.teamMemberId === member.id
            );
            return {
                ...member,
                bookingProfile
            };
        });

        const serializedData = serializeBigInt({ teamMembers: enriched });
        return json(serializedData);
    } catch (err) {
        console.error('Square team members error:', err);
        return json({ error: 'Failed to fetch team members' }, { status: 500 });
    }
};
