import { type SearchParams, stringifySearchParams } from "./lib/search-params"

const routes = {
	backend: {
		// auth
		SIGN_IN: "/auth/sign-in",
		SIGN_UP: "/auth/sign-up",
		SIGN_OUT: "/auth/sign-out",
		FORGOT_PASSWORD: "/auth/forgot-password",
		RESET_PASSWORD: "/auth/reset-password",

		// organization
		GET_ALL_ORGANIZATIONS: "/organization",
		GET_ORGANIZATION: (id: string) => `/organization/${id}`,
		CREATE_ORGANIZATION: "/organization",
		UPDATE_ORGANIZATION: (id: string) => `/organization/${id}`,

		// contact
		GET_ALL_CONTACTS: (organizationId: string) => `/organizations/${organizationId}/contacts`,
		GET_CONTACT: (organizationId: string, contactId: string) =>
			`/organizations/${organizationId}/contacts/${contactId}`,
		CREATE_CONTACT: (organizationId: string) => `/organizations/${organizationId}/contacts`,
		UPLOAD_CONTACT_CSV: (organizationId: string) => `/organizations/${organizationId}/contacts/csv`,
		UPDATE_CONTACT: (organizationId: string, id: string) => `/organizations/${organizationId}/contacts/${id}`,
		DELETE_MANY_CONTACTS: (organizationId: string) => `/organizations/${organizationId}/contacts`,
		DELETE_CONTACT: (organizationId: string, id: string) => `/organizations/${organizationId}/contacts/${id}`,

		// campaign
		GET_MANY_CAMPAIGNS: (organizationId: string) => `/organizations/${organizationId}/campaigns`,
		GET_CAMPAIGN: (organizationId: string, campaignId: string) =>
			`/organizations/${organizationId}/campaigns/${campaignId}`,
		CREATE_CAMPAIGN: (organizationId: string) => `/organizations/${organizationId}/campaigns`,
		UPDATE_CAMPAIGN: (organizationId: string, campaignId: string) =>
			`/organizations/${organizationId}/campaigns/${campaignId}`,
		DELETE_MANY_CAMPAIGNS: (organizationId: string) => `/organizations/${organizationId}/campaigns`,
		DELETE_CAMPAIGN: (organizationId: string, campaignId: string) =>
			`/organizations/${organizationId}/campaigns/${campaignId}`,
		SEND_TEST_CAMPAIGN: (organizationId: string, campaignId: string) =>
			`/organizations/${organizationId}/campaigns/${campaignId}/send-test`,
		SEND_CAMPAIGN: (organizationId: string, campaignId: string) =>
			`/organizations/${organizationId}/campaigns/${campaignId}/send`,
		CANCEL_CAMPAIGN: (organizationId: string, campaignId: string) =>
			`/organizations/${organizationId}/campaigns/${campaignId}/cancel`
	},
	web: {
		// auth
		SIGN_IN: "/sign-in",
		SIGN_UP: "/sign-up",
		RESET_PASSWORD: (params: { searchParams: SearchParams<{ token: string }> }) =>
			`/reset-password?${stringifySearchParams(params.searchParams)}`,

		// organization
		ALL_ORGANIZATIONS: "/organizations",
		ORGANIZATION: (id: string) => `/organizations/${id}`
	}
}

// const routes = {
// 	backend: {},
// 	web: {
// 		host: "https://localhost:3000",
// 		routes: {
// 			FORGOT_PASSWORD: {
// 				path: "/reset-password",
// 				searchParams: {
// 					token: "string"
// 				}
// 			}
// 		}
// 	}
// }

export { routes }
