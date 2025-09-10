import z from "zod"

// #region CreateOrganizationDto

type CreateOrganizationDto = {
	name: string
}

const createOrganizationDtoSchema = z.object({
	name: z.string().min(1)
})

// #endregion

// #region UpdateOrganizationDto

type UpdateOrganizationDto = {
	name: string
}

const updateOrganizationDtoSchema = z.object({
	name: z.string().min(1)
})

// #endregion

export {
	createOrganizationDtoSchema,
	updateOrganizationDtoSchema,
	type CreateOrganizationDto,
	type UpdateOrganizationDto
}
