"use server"

import { SenderModel } from "@repo/types/sender"

const getSender = async (): Promise<SenderModel | undefined> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	return {
		id: "1",
		organizationId: "1",
		value: "+1234567890",
		createdAt: new Date()
	}
}

export { getSender }
