import { findServices } from './skills/service_finder';
import { checkEligibility } from './skills/eligibility_checker';
import { buildPlan } from './skills/plan_builder';

export function runOrchestrator(userInput: string, userDetails: any) {
    const categoryMatch = userInput.match(/housing|food|health|employment|legal/i);
    const category = categoryMatch ? categoryMatch[0].toLowerCase() : 'general';

    const postcodeMatch = userInput.match(/[A-Z]{1,2}[0-9][A-Z0-9]? [0-9][A-Z]{2}/i);
    const postcode = postcodeMatch ? postcodeMatch[0] : 'London';

    const urgencyMatch = userInput.match(/urgent|critical|emergency|desperate/i);
    const urgency = urgencyMatch ? 'urgent' : 'medium';

    if (!categoryMatch || !postcodeMatch) {
        return {
            triage_questions: [
                !categoryMatch ? "What specific category do you need help with? (housing, food, health, employment, legal)" : null,
                !postcodeMatch ? "What is your postcode?" : null
            ].filter(Boolean),
            status: 'pending_triage'
        };
    }

    const plan = buildPlan(category, urgency, postcode, userDetails);

    return {
        triage_questions: [],
        status: 'plan_ready',
        ...plan
    };
}
