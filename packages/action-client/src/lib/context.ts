import type { ActionContext } from "../types"

/**
 * Creates a new empty context object
 */
export const createContext = (): ActionContext => ({})

/**
 * Merges multiple context objects together
 */
export const mergeContexts = <T extends ActionContext>(...contexts: Partial<T>[]): T => {
	return Object.assign({}, ...contexts) as T
}

/**
 * Type guard to check if a value is a valid context
 */
export const isValidContext = (value: unknown): value is ActionContext => {
	return typeof value === "object" && value !== null && !Array.isArray(value)
}
