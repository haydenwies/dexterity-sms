import z from "zod"

class Email {
	public readonly value: string

	private constructor(value: string) {
		this.value = value
	}

	static create(value: string): Email {
		return new Email(Email.parseValue(value))
	}

	private static parseValue(value: string): string {
		const parseRes = z
			.email()
			.trim()
			.toLowerCase()
			.max(40, "Email must be less than 40 characters")
			.safeParse(value)
		if (!parseRes.success) throw new Error("Invalid email")

		return parseRes.data
	}
}

export { Email }
