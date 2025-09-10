/**
 * Utility function to create standardized API errors
 */
export class ActionError extends Error {
	public readonly code?: string
	public readonly statusCode?: number

	constructor(message: string, code?: string, statusCode?: number) {
		super(message)
		this.name = "ActionError"
		this.code = code
		this.statusCode = statusCode
	}
}

/**
 * Utility to handle fetch responses with proper error throwing
 */
export const handleFetchResponse = async <T = any>(response: Response): Promise<T> => {
	if (!response.ok) {
		let errorMessage = `Request failed with status ${response.status}`
		let errorCode: string | undefined

		try {
			const errorData = await response.json()
			errorMessage = errorData.message || errorMessage
			errorCode = errorData.code
		} catch {
			// If we can't parse JSON, use the status text
			errorMessage = response.statusText || errorMessage
		}

		throw new ActionError(errorMessage, errorCode, response.status)
	}

	// Handle different content types
	const contentType = response.headers.get("content-type")

	if (contentType?.includes("application/json")) {
		return await response.json()
	}

	if (contentType?.includes("text/")) {
		return (await response.text()) as T
	}

	// For other types, return as text
	return (await response.text()) as T
}

/**
 * Utility to create fetch headers with authorization
 */
export const createAuthHeaders = (
	sessionToken?: string,
	additionalHeaders: Record<string, string> = {}
): HeadersInit => {
	const headers: Record<string, string> = {
		"Content-Type": "application/json",
		...additionalHeaders
	}

	if (sessionToken) {
		headers.Authorization = `Bearer ${sessionToken}`
	}

	return headers
}
