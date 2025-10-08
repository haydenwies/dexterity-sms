import z from "zod"

// #region CreateContactDto

type CreateContactDto = {
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
}

const createContactDtoSchema = z
	.object({
		firstName: z.string().optional(),
		lastName: z.string().optional(),
		email: z
			.string()
			.trim()
			.pipe(z.union([z.email().trim().toLowerCase(), z.literal("")]))
			.optional(),
		phone: z
			.string()
			.trim()
			.pipe(z.union([z.e164().trim(), z.literal("")]))
			.optional()
	})
	.refine(
		(data) => {
			if (Object.values(data).every((value) => !value)) return false
			return true
		},
		{
			message: "At least one field must be provided",
			path: ["phone"]
		}
	)

// #endregion

// #region UploadContactDto

type UploadContactCsvDto = {
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
}

const uploadContactCsvDtoSchema = z
	.object({
		firstName: z.string().optional(),
		lastName: z.string().optional(),
		email: z.string().optional(),
		phone: z.string().optional()
	})
	.refine(
		(data) => {
			if (Object.values(data).every((value) => !value)) return false
			return true
		},
		{
			message: "At least one field must be provided",
			path: ["phone"]
		}
	)

// #endregion

// #region UpdateContactDto

type UpdateContactDto = {
	firstName?: string
	lastName?: string
	email?: string
	phone?: string
}

const updateContactDtoSchema = z
	.object({
		firstName: z.string().optional(),
		lastName: z.string().optional(),
		email: z
			.string()
			.trim()
			.pipe(z.union([z.email().trim().toLowerCase(), z.literal("")]))
			.optional(),
		phone: z
			.string()
			.trim()
			.pipe(z.union([z.e164().trim(), z.literal("")]))
			.optional()
	})
	.refine(
		(data) => {
			if (Object.values(data).every((value) => !value)) return false
			return true
		},
		{
			message: "At least one field must be provided",
			path: ["phone"]
		}
	)

// #endregion

// #region DeleteManyContactsDto

type DeleteManyContactsDto = {
	ids: string[]
}

const deleteManyContactsDtoSchema = z.object({
	ids: z.array(z.string())
})

// #endregion

export {
	createContactDtoSchema,
	deleteManyContactsDtoSchema,
	updateContactDtoSchema,
	uploadContactCsvDtoSchema,
	type CreateContactDto,
	type DeleteManyContactsDto,
	type UpdateContactDto,
	type UploadContactCsvDto
}
