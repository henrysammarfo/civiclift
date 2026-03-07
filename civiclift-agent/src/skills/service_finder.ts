import * as fs from 'fs';
import * as path from 'path';

interface Service {
    id: string;
    name: string;
    category: string;
    urgency_level: string;
    postcode: string;
    lat: number;
    lon: number;
    phone: string;
    url: string;
    description: string;
}

const servicesPath = path.join(__dirname, '../../data/services.uk.london.json');
let services: Service[] = [];

try {
    const data = fs.readFileSync(servicesPath, 'utf-8');
    services = JSON.parse(data);
} catch (e) {
    console.error("Failed to load services data", e);
}

// Simple postcode to lat/lon mock for ranking by distance
function mockPostcodeToCoords(postcode: string): { lat: number, lon: number } {
    // Just returning a central London point for this mock
    return { lat: 51.5072, lon: -0.1276 };
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    // Simple euclidean distance for mock purposes
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(lon1 - lon2, 2));
}

export function findServices(category: string, urgency: string, userPostcode: string): Service[] {
    const userCoords = mockPostcodeToCoords(userPostcode);

    // Filter by category and urgency (basic matching for the hackathon)
    let matched = services.filter(s =>
        s.category.toLowerCase() === category.toLowerCase() ||
        s.urgency_level.toLowerCase() === urgency.toLowerCase()
    );

    // If no direct matches, return all for ranking
    if (matched.length === 0) matched = services;

    // Rank by distance
    matched.sort((a, b) => {
        const distA = calculateDistance(userCoords.lat, userCoords.lon, a.lat, a.lon);
        const distB = calculateDistance(userCoords.lat, userCoords.lon, b.lat, b.lon);
        return distA - distB;
    });

    return matched.slice(0, 3);
}
