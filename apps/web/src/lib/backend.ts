const getFrontendUrl = () => {
	return process.env.NEXT_PUBLIC_FRONTEND_URL
}

const getBackendUrl = () => {
	return process.env.NEXT_PUBLIC_BACKEND_URL
}

export { getBackendUrl, getFrontendUrl }
