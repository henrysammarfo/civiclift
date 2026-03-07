import { findServices } from './service_finder';
import { checkEligibility } from './eligibility_checker';

export function buildPlan(category: string, urgency: string, postcode: string, userDetails: any) {
    const services = findServices(category, urgency, postcode);
    const eligibility = checkEligibility(category, userDetails);

    const actionPlan = [];

    if (services.length > 0) {
        const topService = services[0];

        actionPlan.push({
            type: 'CALL_SCRIPT',
            title: `Call ${topService.name}`,
            content: `Hi, my name is [Your Name]. I am calling because I need help with ${category}. My postcode is ${postcode}. Can you assist or advise me on the next steps?`,
            target: topService.phone
        });

        if (topService.url) {
            actionPlan.push({
                type: 'WEB_ACTION',
                title: `Visit ${topService.name} website`,
                content: `Go to ${topService.url} to find more information or fill out contact forms.`
            });
        }
    }

    actionPlan.push({
        type: 'GATHER_DOCS',
        title: 'Gather required documents',
        content: eligibility.checklist.join('\n')
    });

    actionPlan.push({
        type: 'EMAIL_DRAFT',
        title: 'Draft email to local council/support',
        content: `Subject: Urgent Assistance Required - ${category}\n\nTo whom it may concern,\n\nI am a resident at ${postcode} experiencing urgent issues with ${category}. I am seeking immediate advice or support.\n\nThank you,\n[Your Name]`
    });

    actionPlan.push({
        type: 'REMINDER',
        title: 'Follow up reminder',
        content: 'Check back in 48 hours to ensure steps are being followed up on.'
    });

    return {
        sdg_tags: ['SDG1', 'SDG3', 'SDG10'],
        service_matches: services,
        action_plan: actionPlan,
        doc_checklist: eligibility.checklist
    };
}
