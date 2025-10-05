const getFrontendUrl = () => {
	const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
	if (!frontendUrl) throw new Error("NEXT_PUBLIC_FRONTEND_URL is not set")

	return frontendUrl
}

const getBackendUrl = () => {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
	if (!backendUrl) throw new Error("NEXT_PUBLIC_BACKEND_URL is not set")

	return backendUrl
}

export { getBackendUrl, getFrontendUrl }
