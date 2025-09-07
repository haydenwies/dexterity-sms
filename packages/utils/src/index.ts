const isEnumValue = <T extends Record<string, string>>(e: T, val: string): val is T[keyof T] => {
	return Object.values(e).includes(val as T[keyof T])
}

export { isEnumValue }
