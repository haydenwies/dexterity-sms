"use server"

import { ContactModel } from "@repo/types/contact"

const getAllContacts = async (): Promise<ContactModel[]> => {
	return [
		{
			id: "1",
			organizationId: "1",
			tagIds: ["1", "2"],
			firstName: "John",
			lastName: "Doe",
			email: "john.doe@example.com",
			phone: "+12345678906",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "2",
			organizationId: "1",
			tagIds: ["2", "3"],
			firstName: "Jane",
			lastName: "Smith",
			email: "jane.smith@example.com",
			phone: "+19876543216",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "3",
			organizationId: "1",
			tagIds: ["4"],
			firstName: "Alice",
			lastName: "Johnson",
			email: "alice.johnson@example.com",
			phone: "+11223344556",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "4",
			organizationId: "1",
			tagIds: ["5"],
			firstName: "Bob",
			lastName: "Williams",
			email: "bob.williams@example.com",
			phone: "+12223334446",
			createdAt: new Date(),
			updatedAt: new Date()
		},
		{
			id: "5",
			organizationId: "1",
			tagIds: [],
			firstName: "Charlie",
			lastName: "Brown",
			email: "charlie.brown@example.com",
			phone: "+15556667778",
			createdAt: new Date(),
			updatedAt: new Date()
		}
	]
}

export { getAllContacts }
