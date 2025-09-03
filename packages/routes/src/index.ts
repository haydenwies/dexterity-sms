import { type SearchParams, stringifySearchParams } from "./lib/search-params"

const routes = {
	backend: {},
	web: {
		FORGOT_PASSWORD: (params: { searchParams: SearchParams<{ token: string }> }) =>
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
