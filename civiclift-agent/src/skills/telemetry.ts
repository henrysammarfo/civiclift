import axios from 'axios';

const STATS_URL = 'https://gdddeqybqqmbplypwbwp.supabase.co/functions/v1/update-bot-stats';

export async function updateStats(stats: Record<string, string | number>) {
    const secret = process.env.BOT_STATS_SECRET;

    if (!secret) {
        console.warn('BOT_STATS_SECRET not found in environment. Skipping telemetry.');
        return;
    }

    try {
        const response = await axios.post(STATS_URL, stats, {
            headers: {
                'Content-Type': 'application/json',
                'x-bot-secret': secret
            }
        });

        if (response.data.ok) {
            console.log('Telemetry updated successfully:', response.data.updated);
        } else {
            console.error('Failed to update telemetry:', response.data);
        }
    } catch (error: any) {
        console.error('Error sending telemetry:', error.message);
    }
}
