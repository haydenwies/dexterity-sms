/**
 * Migration Examples for @repo/action-client
 *
 * This file shows how to migrate existing server actions to use the new action client.
 */

import { routes } from "@repo/routes"
import { createActionClient, createAuthHeaders, handleFetchResponse, sessionMiddleware } from "../src"
// Assuming you have these utilities available
// import { getCookie, setCookie, Cookie } from "~/lib/cookies"
// import { getBackendUrl } from "~/lib/backend"

// =============================================================================
// Example 1: Sign In Action (No Auth Required)
// =============================================================================

// BEFORE: Traditional approach
/*
"use server"

const signInOld = async (dto: SignInDto): Promise<ActionResponse<undefined>> => {
	const backendUrl = getBackendUrl()

	const res = await fetch(`${backendUrl}${routes.backend.SIGN_IN}`, {
		method: "POST",
		body: JSON.stringify(dto),
		headers: {
			"Content-Type": "application/json"
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		return actionError(errData.message)
	}

	const sessionToken = await res.text()
	await setCookie(Cookie.SESSION_TOKEN, sessionToken)

	return actionSuccess(undefined)
}
*/

// AFTER: Using action client
export const signIn = createActionClient().action(async (dto: any /* SignInDto */) => {
	// const backendUrl = getBackendUrl()
	const backendUrl = "http://localhost:3001" // placeholder

	const response = await fetch(`${backendUrl}${routes.backend.SIGN_IN}`, {
		method: "POST",
		body: JSON.stringify(dto),
		headers: createAuthHeaders()
	})

	// This will throw an ActionError if response is not ok
	const sessionToken = await handleFetchResponse<string>(response)

	// Set cookie (assuming setCookie is available)
	// await setCookie(Cookie.SESSION_TOKEN, sessionToken)

	return { success: true } // Return whatever you need
})

// =============================================================================
// Example 2: Get Organization (Auth Required)
// =============================================================================

// BEFORE: Traditional approach
/*
"use server"

const getOrganizationOld = async (organizationId: string): Promise<ActionResponse<OrganizationModel>> => {
	const backendUrl = getBackendUrl()
	const sessionToken = await getCookie(Cookie.SESSION_TOKEN)
	if (!sessionToken) return actionError("Session token not found")

	const res = await fetch(`${backendUrl}${routes.backend.GET_ORGANIZATION(organizationId)}`, {
		method: "POST",
		headers: {
			"Authorization": `Bearer ${sessionToken}`
		}
	})
	if (!res.ok) {
		const errData = await res.json()
		return actionError(errData.message)
	}

	const data = await res.json()
	return actionSuccess(data)
}
*/

// AFTER: Using action client with session middleware
export const getOrganization = createActionClient()
	.middleware(
		sessionMiddleware(async () => {
			// return await getCookie(Cookie.SESSION_TOKEN)
			return "mock-session-token" // placeholder
		})
	)
	.action(async (organizationId: string, context) => {
		if (!context.sessionToken) {
			throw new Error("Session token not found")
		}

		// const backendUrl = getBackendUrl()
		const backendUrl = "http://localhost:3001" // placeholder

		const response = await fetch(`${backendUrl}${routes.backend.GET_ORGANIZATION(organizationId)}`, {
			method: "POST",
			headers: createAuthHeaders(context.sessionToken)
		})

		// This automatically handles errors and returns the parsed JSON
		return await handleFetchResponse(response)
	})

// =============================================================================
// Example 3: Custom Middleware Chain
// =============================================================================

// Create a reusable auth client with session middleware
const createAuthClient = () =>
	createActionClient()
		.middleware(
			sessionMiddleware(async () => {
				// return await getCookie(Cookie.SESSION_TOKEN)
				return "mock-session-token" // placeholder
			})
		)
		.middleware(async (context) => {
			// Add backend URL to context
			context.backendUrl = "http://localhost:3001" // getBackendUrl()
			return context
		})

// Use the auth client for multiple actions
export const getAllOrganizations = createAuthClient().action(async (_, context) => {
	if (!context.sessionToken) {
		throw new Error("Authentication required")
	}

	const response = await fetch(`${context.backendUrl}${routes.backend.GET_ALL_ORGANIZATIONS}`, {
		method: "GET",
		headers: createAuthHeaders(context.sessionToken)
	})

	return await handleFetchResponse(response)
})

export const updateOrganization = createAuthClient().action(
	async ({ organizationId, data }: { organizationId: string; data: any }, context) => {
		if (!context.sessionToken) {
			throw new Error("Authentication required")
		}

		const response = await fetch(`${context.backendUrl}${routes.backend.UPDATE_ORGANIZATION(organizationId)}`, {
			method: "PUT",
			body: JSON.stringify(data),
			headers: createAuthHeaders(context.sessionToken)
		})

		return await handleFetchResponse(response)
	}
)

// =============================================================================
// Usage in Components/Hooks
// =============================================================================

/*
// In a React component or hook:

const handleSignIn = async (formData: SignInDto) => {
	try {
		await signIn(formData)
		// Success - no need to check response.success
		router.push('/dashboard')
	} catch (error) {
		// Error handling
		setError(error.message)
	}
}

const loadOrganization = async (id: string) => {
	try {
		const organization = await getOrganization(id)
		// organization is directly the data, no need to access .data property
		setOrganization(organization)
	} catch (error) {
		// Handle error
		console.error('Failed to load organization:', error.message)
	}
}
*/
