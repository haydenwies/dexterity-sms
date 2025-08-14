"use server"

import { ContactTagModel } from "@repo/types/contact"

const getAllContactTags = async (): Promise<ContactTagModel[]> => {
	return [
		{
			id: "1",
			organizationId: "1",
			name: "Tag 1",
			color: "#000000",
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]
}

export { getAllContactTags }
