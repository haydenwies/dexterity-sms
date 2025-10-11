const CACHE_TAGS = {
	allContacts: (organizationId: string) => `${organizationId}-contacts`,
	allCampaigns: (organizationId: string) => `${organizationId}-campaigns`,
	campaign: (organizationId: string, campaignId: string) => `${organizationId}-campaigns-${campaignId}`,
	senders: (organizationId: string) => `${organizationId}-senders`
} as const

export { CACHE_TAGS }
