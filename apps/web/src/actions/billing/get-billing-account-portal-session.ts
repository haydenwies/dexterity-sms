"use server"

const getBillingAccountPortalSession = async (): Promise<string> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	return "https://google.com"
}

export { getBillingAccountPortalSession }
