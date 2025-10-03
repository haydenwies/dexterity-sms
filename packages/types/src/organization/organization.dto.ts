import z from "zod"

// #region CreateOrganizationDto

type CreateOrganizationDto = {
	name: string
	email: string
}

const createOrganizationDtoSchema = z.object({
	name: z.string().min(1),
	email: z.email()
})

// #endregion

// #region UpdateOrganizationDto

type UpdateOrganizationDto = {
	name: string
	email: string
}

const updateOrganizationDtoSchema = z.object({
	name: z.string().min(1),
	email: z.email()
})

// #endregion

export {
	createOrganizationDtoSchema,
	updateOrganizationDtoSchema,
	type CreateOrganizationDto,
	type UpdateOrganizationDto
}
