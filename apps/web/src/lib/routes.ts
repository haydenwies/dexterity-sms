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
	DASHBOARD: (organizationId: string) => `/organizations/${organizationId}`,

	// Contacts
	ALL_CONTACTS: (organizationId: string) => `/organizations/${organizationId}/contacts`,
	ALL_CONTACT_TAGS: (organizationId: string) => `/organizations/${organizationId}/contacts/tags`,
	ALL_CONTACT_FORMS: (organizationId: string) => `/organizations/${organizationId}/contacts/forms`,

	// Campaigns
	ALL_CAMPAIGNS: (organizationId: string) => `/organizations/${organizationId}/campaigns`,
	CAMPAIGN: (organizationId: string, campaignId: string) =>
		`/organizations/${organizationId}/campaigns/${campaignId}`,
	EDIT_CAMPAIGN: (organizationId: string, campaignId: string) =>
		`/organizations/${organizationId}/campaigns/${campaignId}/edit`,
	ALL_CAMPAIGN_TEMPLATES: (organizationId: string) => `/organizations/${organizationId}/campaigns/templates`,
	ALL_CAMPAIGN_SETTINGS: (organizationId: string) => `/organizations/${organizationId}/campaigns/settings`,

	// Messages
	ALL_MESSAGES: (organizationId: string) => `/organizations/${organizationId}/messages`,
	MESSAGE: (organizationId: string, messageThreadId: string) =>
		`/organizations/${organizationId}/messages/${messageThreadId}`,

	// Phone numbers
	PHONE_NUMBERS: (organizationId: string) => `/organizations/${organizationId}/phone-numbers`,

	// Billing
	BILLING: (organizationId: string) => `/organizations/${organizationId}/billing`,

	// Organization settings
	ORGANIZATION_SETTINGS: (organizationId: string) => `/organizations/${organizationId}/settings`
}

export { routes }
