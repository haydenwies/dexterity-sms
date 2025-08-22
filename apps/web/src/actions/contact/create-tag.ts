"use server"

import { type TagModel } from "@repo/types/contact"
import { type CreateTagDto } from "@repo/types/contact/dto/create-tag"

import { type ActionResponse, actionSuccess } from "~/lib/actions"

const createTag = async (dto: CreateTagDto): Promise<ActionResponse<TagModel>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess({
		id: "1",
		name: dto.name,
		color: dto.color,
		organizationId: "1",
		createdAt: new Date(),
		updatedAt: new Date()
	})
}

export { createTag }
