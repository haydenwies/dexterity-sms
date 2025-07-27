export const routes = {
	SIGN_IN: "/sign-in",
	SIGN_UP: "/sign-up",
	FORGOT_PASSWORD: "/forgot-password",

	ALL_ORGANIZATIONS: "/organizations",

	DASHBOARD: (organizationId: string) => `/organizations/${organizationId}`,

	ALL_CONTACTS: (organizationId: string) => `/organizations/${organizationId}/contacts`
}
