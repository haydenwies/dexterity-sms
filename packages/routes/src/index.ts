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
		UPDATE_ORGANIZATION: (id: string) => `/organization/${id}`
	},
	web: {
		// auth
		SIGN_IN: "/sign-in",
		SIGN_UP: "/sign-up",
		RESET_PASSWORD: (params: { searchParams: SearchParams<{ token: string }> }) =>
			`/reset-password?${stringifySearchParams(params.searchParams)}`
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
