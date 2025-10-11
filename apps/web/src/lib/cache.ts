const CACHE_TAGS = {
	contacts: (organizationId: string) => `${organizationId}-contacts`
} as const

export { CACHE_TAGS }
