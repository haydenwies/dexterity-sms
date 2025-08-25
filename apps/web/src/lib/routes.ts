const routes = {
	// Auth
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	FORGOT_PASSWORD: "/forgot-password",

	// Account
	ACCOUNT: "/account",

	// Organizations
	ALL_ORGANIZATIONS: "/organizations",

	// Dashboard
	HOME: (organizationId: string) => `/organizations/${organizationId}/dashboard`,

	// Organization
	ORGANIZATION: (organizationId: string) => `/organizations/${organizationId}`,
	ORGANIZATION_BILLING: (organizationId: string) => `/organizations/${organizationId}/billing`,

	// Contacts
	ALL_CONTACTS: (organizationId: string) => `/organizations/${organizationId}/contacts`,

	// Campaigns
	ALL_CAMPAIGNS: (organizationId: string) => `/organizations/${organizationId}/campaigns`,
	CAMPAIGN: (organizationId: string, campaignId: string) =>
		`/organizations/${organizationId}/campaigns/${campaignId}`,
	EDIT_CAMPAIGN: (organizationId: string, campaignId: string) =>
		`/organizations/${organizationId}/campaigns/${campaignId}/edit`,

	// Messages
	ALL_MESSAGES: (organizationId: string) => `/organizations/${organizationId}/messages`,
	MESSAGE: (organizationId: string, messageThreadId: string) =>
		`/organizations/${organizationId}/messages/${messageThreadId}`,

	// Phone numbers
	PHONE_NUMBERS: (organizationId: string) => `/organizations/${organizationId}/phone-numbers`
}

export { routes }
