import type { ActionClientBuilder, ActionContext, ActionFunction, MiddlewareFunction } from "../types"
import { createContext } from "./context"
import { executeMiddlewareChain } from "./middleware"

/**
 * Internal implementation of the ActionClient
 */
class ActionClientImpl<TContext extends ActionContext> implements ActionClientBuilder<TContext> {
	private middlewares: MiddlewareFunction<any>[] = []
	private initialContext: TContext

	constructor(initialContext: TContext) {
		this.initialContext = initialContext
	}

	/**
	 * Adds middleware to the chain
	 */
	middleware<TNewContext extends ActionContext>(
		middlewareFn: MiddlewareFunction<TContext & TNewContext>
	): ActionClientBuilder<TContext & TNewContext> {
		const newClient = new ActionClientImpl<TContext & TNewContext>(this.initialContext as TContext & TNewContext)
		newClient.middlewares = [...this.middlewares, middlewareFn]
		return newClient
	}

	/**
	 * Creates the final action function
	 */
	action<TInput, TOutput>(actionFn: ActionFunction<TInput, TOutput, TContext>): (input: TInput) => Promise<TOutput> {
		return async (input: TInput): Promise<TOutput> => {
			try {
				// Execute middleware chain
				const context = await executeMiddlewareChain(this.middlewares, this.initialContext)

				// Execute the action with the context
				const result = await actionFn(input, context)
				return result
			} catch (error) {
				// Re-throw errors to maintain stack trace
				throw error
			}
		}
	}
}

/**
 * Creates a new action client with empty initial context
 */
export const createActionClient = (): ActionClientBuilder<ActionContext> => {
	return new ActionClientImpl(createContext())
}

/**
 * Creates a new action client with custom initial context
 */
export const createActionClientWithContext = <TContext extends ActionContext>(
	initialContext: TContext
): ActionClientBuilder<TContext> => {
	return new ActionClientImpl(initialContext)
}
