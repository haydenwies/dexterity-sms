export const routes = {
	// Auth
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	FORGOT_PASSWORD: "/forgot-password",

	// Account
	ACCOUNT: "/account",

	// Organizations
	ORGANIZATIONS: "/organizations",

	// Dashboard
	DASHBOARD: (organizationId: string) => `/organizations/${organizationId}`,

	// Contacts
	ALL_CONTACTS: (organizationId: string) => `/organizations/${organizationId}/contacts`,
	CONTACT_TAGS: (organizationId: string, contactId: string) =>
		`/organizations/${organizationId}/contacts/${contactId}/tags`,
	CONTACT_GROUPS: (organizationId: string, contactId: string) =>
		`/organizations/${organizationId}/contacts/${contactId}/groups`,
	CONTACT_FORMS: (organizationId: string, contactId: string) =>
		`/organizations/${organizationId}/contacts/${contactId}/forms`,
	CONTACT: (organizationId: string, contactId: string) => `/organizations/${organizationId}/contacts/${contactId}`,

	// Campaigns
	ALL_CAMPAIGNS: (organizationId: string) => `/organizations/${organizationId}/campaigns`,
	ALL_CAMPAIGN_TEMPLATES: (organizationId: string) => `/organizations/${organizationId}/campaigns/templates`,
	ALL_CAMPAIGN_SETTINGS: (organizationId: string) => `/organizations/${organizationId}/campaigns/settings`,
	CAMPAIGN: (organizationId: string, campaignId: string) =>
		`/organizations/${organizationId}/campaigns/${campaignId}`,
	EDIT_CAMPAIGN: (organizationId: string, campaignId: string) =>
		`/organizations/${organizationId}/campaigns/${campaignId}/edit`,

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
