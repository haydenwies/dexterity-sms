import type { ActionContext, MiddlewareFunction } from "../types"

/**
 * Executes a chain of middleware functions in sequence
 */
export const executeMiddlewareChain = async <TContext extends ActionContext>(
	middlewares: MiddlewareFunction<any>[],
	initialContext: TContext
): Promise<TContext> => {
	let context = initialContext

	for (const middleware of middlewares) {
		try {
			context = await middleware(context)
		} catch (error) {
			// Re-throw middleware errors with context
			throw new Error(`Middleware execution failed: ${error instanceof Error ? error.message : String(error)}`)
		}
	}

	return context
}

/**
 * Creates a middleware function that adds session token to context from cookies
 * This is a common pattern in your app, so we provide it as a utility
 */
export const sessionMiddleware = <TContext extends ActionContext>(
	getSessionToken: () => Promise<string | null>
): MiddlewareFunction<TContext & { sessionToken?: string }> => {
	return async (context) => {
		const sessionToken = await getSessionToken()
		return {
			...context,
			...(sessionToken && { sessionToken })
		}
	}
}
