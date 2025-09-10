// Core context type that gets passed through middleware chain
export type ActionContext = Record<string, any>

// Middleware function type - takes context and returns modified context
export type MiddlewareFunction<TContext extends ActionContext = ActionContext> = (
	context: TContext
) => Promise<TContext> | TContext

// Action function type - takes input and context, returns result
export type ActionFunction<TInput = any, TOutput = any, TContext extends ActionContext = ActionContext> = (
	input: TInput,
	context: TContext
) => Promise<TOutput> | TOutput

// Action client interface
export interface ActionClient<TContext extends ActionContext = ActionContext> {
	middleware<TNewContext extends ActionContext>(
		middlewareFn: MiddlewareFunction<TContext & TNewContext>
	): ActionClient<TContext & TNewContext>

	action<TInput, TOutput>(actionFn: ActionFunction<TInput, TOutput, TContext>): (input: TInput) => Promise<TOutput>
}

// Builder interface for creating action clients
export interface ActionClientBuilder<TContext extends ActionContext = ActionContext> {
	middleware<TNewContext extends ActionContext>(
		middlewareFn: MiddlewareFunction<TContext & TNewContext>
	): ActionClientBuilder<TContext & TNewContext>

	action<TInput, TOutput>(actionFn: ActionFunction<TInput, TOutput, TContext>): (input: TInput) => Promise<TOutput>
}
