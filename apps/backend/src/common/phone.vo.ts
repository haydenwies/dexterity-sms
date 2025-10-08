import z from "zod"

class Phone {
	public readonly value: string

	private constructor(value: string) {
		this.value = value
	}

	static create(value: string): Phone {
		return new Phone(Phone.parseValue(value))
	}

	private static parseValue(value: string): string {
		const parseRes = z.e164().trim().safeParse(value)
		if (!parseRes.success) throw new Error("Invalid phone")

		return parseRes.data
	}
}

export { Phone }
