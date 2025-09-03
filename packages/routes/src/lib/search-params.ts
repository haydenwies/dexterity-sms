type SearchParams<T extends Record<string, string> = Record<string, string>> = T

const stringifySearchParams = <T extends Record<string, string>>(searchParams: SearchParams<T>) => {
	return Object.entries(searchParams)
		.map(([key, value]) => `${key}=${value}`)
		.join("&")
}

export { stringifySearchParams, type SearchParams }
