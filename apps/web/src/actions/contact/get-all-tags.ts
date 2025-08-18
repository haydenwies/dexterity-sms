"use server"

import { TagModel } from "@repo/types/contact"

const getAllTags = async (): Promise<TagModel[]> => {
	return [
		{
			id: "1",
			organizationId: "1",
			name: "VIP",
			color: "#FFD700",
			createdAt: new Date("2023-01-01T10:00:00Z"),
			updatedAt: new Date("2023-01-01T10:00:00Z")
		},
		{
			id: "2",
			organizationId: "1",
			name: "Prospect",
			color: "#00BFFF",
			createdAt: new Date("2023-01-02T11:00:00Z"),
			updatedAt: new Date("2023-01-02T11:00:00Z")
		},
		{
			id: "3",
			organizationId: "1",
			name: "Newsletter",
			color: "#32CD32",
			createdAt: new Date("2023-01-03T12:00:00Z"),
			updatedAt: new Date("2023-01-03T12:00:00Z")
		},
		{
			id: "4",
			organizationId: "1",
			name: "Partner",
			color: "#FF69B4",
			createdAt: new Date("2023-01-04T13:00:00Z"),
			updatedAt: new Date("2023-01-04T13:00:00Z")
		},
		{
			id: "5",
			organizationId: "1",
			name: "Inactive",
			color: "#A9A9A9",
			createdAt: new Date("2023-01-05T14:00:00Z"),
			updatedAt: new Date("2023-01-05T14:00:00Z")
		}
	]
}

export { getAllTags }
