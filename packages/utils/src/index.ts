const isEnumValue = <T extends Record<string, string>>(e: T, val: string): val is T[keyof T] => {
	return Object.values(e).includes(val as T[keyof T])
}

/**
 * Extract the effective top-level domain (eTLD) from a domain.
 *
 * Examples:
 *   - "app.example.com" → "example.com"
 *   - "example.com" → "example.com"
 *   - "localhost" → "localhost"
 */
const eTLD = (domain: string): string => {
	// Handle localhost
	if (domain === "localhost" || domain === "127.0.0.1") return domain

	// Split by dots and get last 2 parts (works for most TLDs like .com, .io, .net)
	const parts = domain.split(".")

	// If only 1 part (e.g., "localhost"), return as-is
	if (parts.length === 1) return domain

	// If 2+ parts, return last 2 (e.g., "bytte.io" from "app.bytte.io")
	return parts.slice(-2).join(".")
}

export { eTLD, isEnumValue }
