export interface EligibilityResult {
    flags: Record<string, boolean>;
    checklist: string[];
}

export function checkEligibility(category: string, userDetails: any): EligibilityResult {
    const result: EligibilityResult = {
        flags: { likelyEligible: true },
        checklist: []
    };

    if (category.toLowerCase() === 'housing') {
        result.checklist.push('Tenancy agreement');
        result.checklist.push('Proof of income/benefits');
        result.checklist.push('Notice of eviction (if applicable)');
    } else if (category.toLowerCase() === 'food') {
        result.checklist.push('Voucher from GP or social worker (if required by specific bank)');
        result.checklist.push('ID for registration');
    } else if (category.toLowerCase() === 'legal') {
        result.checklist.push('Relevant correspondence/letters');
        result.checklist.push('Proof of income (for legal aid assessment)');
    } else {
        result.checklist.push('Proof of ID');
        result.checklist.push('Proof of address');
    }

    result.checklist.push('DISCLAIMER: I am an AI assistant, not a legal adviser. Please verify all requirements with official sources.');
    return result;
}
