"use server"

import { AvailableSenderModel } from "@repo/types/sender"

const searchAvailableSenders = async (): Promise<AvailableSenderModel[]> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	return [
		{
			id: "1",
			value: "+1234567890",
			countryCode: "CA"
		},
		{
			id: "2",
			value: "+1234567890",
			countryCode: "CA"
		}
	]
}

export { searchAvailableSenders }
