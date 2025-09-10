# @repo/action-client

A simplified, type-safe action client library for Next.js server actions, inspired by next-safe-action but with a cleaner API.

## Features

- 🔗 **Fluent API**: Chain middleware and actions with `.middleware().action()`
- 🛡️ **Type Safety**: Full TypeScript support with proper type inference
- 🔧 **Middleware System**: Composable middleware for cross-cutting concerns
- 🍪 **Session Management**: Built-in utilities for cookie-based authentication
- 🚨 **Error Handling**: Clean error throwing with proper stack traces
- 📦 **Lightweight**: No external dependencies, focused on core functionality

## Installation

This package is already set up in your workspace. Just build it:

```bash
pnpm build --filter=@repo/action-client
```

## Quick Start

### Basic Action (No Auth)

```typescript
"use server"

import { createActionClient, handleFetchResponse, createAuthHeaders } from "@repo/action-client"

export const signIn = createActionClient().action(async (credentials: SignInDto) => {
	const response = await fetch("/api/auth/signin", {
		method: "POST",
		body: JSON.stringify(credentials),
		headers: createAuthHeaders()
	})

	return await handleFetchResponse(response)
})
```

### Action with Authentication

```typescript
"use server"

import { createActionClient, sessionMiddleware, handleFetchResponse, createAuthHeaders } from "@repo/action-client"
import { getCookie, Cookie } from "~/lib/cookies"

export const getProfile = createActionClient()
	.middleware(
		sessionMiddleware(async () => {
			return await getCookie(Cookie.SESSION_TOKEN)
		})
	)
	.action(async (_, context) => {
		if (!context.sessionToken) {
			throw new Error("Authentication required")
		}

		const response = await fetch("/api/user/profile", {
			headers: createAuthHeaders(context.sessionToken)
		})

		return await handleFetchResponse(response)
	})
```

### Reusable Auth Client

```typescript
// Create a base auth client
const createAuthClient = () =>
	createActionClient()
		.middleware(
			sessionMiddleware(async () => {
				return await getCookie(Cookie.SESSION_TOKEN)
			})
		)
		.middleware(async (context) => {
			context.backendUrl = getBackendUrl()
			return context
		})

// Use it for multiple actions
export const getOrganizations = createAuthClient().action(async (_, context) => {
	const response = await fetch(`${context.backendUrl}/organizations`, {
		headers: createAuthHeaders(context.sessionToken)
	})
	return await handleFetchResponse(response)
})

export const createOrganization = createAuthClient().action(async (data: CreateOrgDto, context) => {
	const response = await fetch(`${context.backendUrl}/organizations`, {
		method: "POST",
		body: JSON.stringify(data),
		headers: createAuthHeaders(context.sessionToken)
	})
	return await handleFetchResponse(response)
})
```

## API Reference

### `createActionClient()`

Creates a new action client with an empty context.

```typescript
const client = createActionClient()
```

### `.middleware(middlewareFn)`

Adds middleware to the chain. Middleware functions receive the context and can modify it.

```typescript
const client = createActionClient().middleware(async (context) => {
	context.userId = await getUserId()
	return context
})
```

### `.action(actionFn)`

Defines the final action function. Receives input and context, returns the result.

```typescript
const action = client.action(async (input: MyInput, context) => {
	// Your action logic here
	return result
})
```

### Utilities

#### `sessionMiddleware(getToken)`

Pre-built middleware for session token handling.

```typescript
.middleware(sessionMiddleware(async () => {
  return await getCookie(Cookie.SESSION_TOKEN)
}))
```

#### `handleFetchResponse(response)`

Handles fetch responses with proper error throwing.

```typescript
const data = await handleFetchResponse(response)
```

#### `createAuthHeaders(token?, additionalHeaders?)`

Creates headers with optional authorization.

```typescript
const headers = createAuthHeaders(sessionToken, {
	"Custom-Header": "value"
})
```

#### `ActionError`

Custom error class for action errors.

```typescript
throw new ActionError("Something went wrong", "ERROR_CODE", 400)
```

## Migration from Existing Actions

See `examples/migration-examples.ts` for detailed migration examples.

### Before (Traditional)

```typescript
"use server"

const myAction = async (input: MyInput): Promise<ActionResponse<MyOutput>> => {
	try {
		const sessionToken = await getCookie(Cookie.SESSION_TOKEN)
		if (!sessionToken) return actionError("Not authenticated")

		const response = await fetch(url, {
			/* ... */
		})
		if (!response.ok) {
			const error = await response.json()
			return actionError(error.message)
		}

		const data = await response.json()
		return actionSuccess(data)
	} catch (error) {
		return actionError(error.message)
	}
}
```

### After (Action Client)

```typescript
"use server"

export const myAction = createActionClient()
	.middleware(sessionMiddleware(async () => getCookie(Cookie.SESSION_TOKEN)))
	.action(async (input: MyInput, context) => {
		if (!context.sessionToken) {
			throw new Error("Not authenticated")
		}

		const response = await fetch(url, {
			headers: createAuthHeaders(context.sessionToken)
		})

		return await handleFetchResponse(response)
	})
```

### Usage in Components

```typescript
// Before
const handleSubmit = async (data) => {
	const result = await myAction(data)
	if (result.success) {
		// Handle success
		console.log(result.data)
	} else {
		// Handle error
		console.error(result.message)
	}
}

// After
const handleSubmit = async (data) => {
	try {
		const result = await myAction(data)
		// Handle success - result is directly the data
		console.log(result)
	} catch (error) {
		// Handle error
		console.error(error.message)
	}
}
```

## Type Safety

The action client provides full TypeScript support with proper type inference:

```typescript
// Context types are properly inferred through the middleware chain
const action = createActionClient()
	.middleware(async (context) => {
		context.userId = "123" // context is now { userId: string }
		return context
	})
	.middleware(async (context) => {
		context.role = "admin" // context is now { userId: string, role: string }
		return context
	})
	.action(async (input: string, context) => {
		// context is properly typed as { userId: string, role: string }
		console.log(context.userId, context.role) // ✅ Type safe
		return { message: "success" }
	})

// Return type is inferred
const result = await action("input") // result: { message: string }
```
