const routes = {
	// Auth
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	FORGOT_PASSWORD: "/forgot-password",

	// Organizations
	ALL_ORGANIZATIONS: "/organizations",

	// Dashboard
	ORGANIZATION_HOME: (organizationId: string) => `/organizations/${organizationId}/home`,

	// Organization
	ORGANIZATION_SETTINGS: (organizationId: string) => `/organizations/${organizationId}/settings`,

	// Contacts
	ALL_CONTACTS: (organizationId: string) => `/organizations/${organizationId}/contacts`,

	// Campaigns
	ALL_CAMPAIGNS: (organizationId: string) => `/organizations/${organizationId}/campaigns`,
	EDIT_CAMPAIGN: (organizationId: string, campaignId: string) =>
		`/organizations/${organizationId}/campaigns/${campaignId}/edit`,

	// Messages
	ALL_MESSAGES: (organizationId: string) => `/organizations/${organizationId}/messages`,
	MESSAGE: (organizationId: string, messageThreadId: string) =>
		`/organizations/${organizationId}/messages/${messageThreadId}`,

	// Phone numbers
	SENDERS: (organizationId: string) => `/organizations/${organizationId}/phone-numbers`
}

export { routes }
