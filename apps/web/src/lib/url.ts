const getWebPublicUrl = () => {
	const frontendUrl = process.env.NEXT_PUBLIC_WEB_PUBLIC_URL
	if (!frontendUrl) throw new Error("NEXT_PUBLIC_WEB_PUBLIC_URL is not set")

	return frontendUrl
}

const getBackendPrivateUrl = () => {
	const backendUrl = process.env.BACKEND_PRIVATE_URL
	if (!backendUrl) throw new Error("BACKEND_PRIVATE_URL is not set")

	return backendUrl
}

const getBackendPublicUrl = () => {
	const backendUrl = process.env.NEXT_PUBLIC_BACKEND_PUBLIC_URL
	if (!backendUrl) throw new Error("NEXT_PUBLIC_BACKEND_PUBLIC_URL is not set")

	return backendUrl
}

export { getBackendPrivateUrl, getBackendPublicUrl, getWebPublicUrl }
