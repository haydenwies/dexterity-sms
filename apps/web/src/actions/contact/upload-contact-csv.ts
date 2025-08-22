"use server"

import { type UploadContactCsvDto } from "@repo/types/contact/dto/upload-contact-csv"

import { type ActionResponse, actionSuccess } from "~/lib/actions"

const uploadContactCsv = async (file: File, dto: UploadContactCsvDto): Promise<ActionResponse<undefined>> => {
	await new Promise((resolve) => setTimeout(resolve, 1000))

	console.log(dto)

	return actionSuccess(undefined)
}

export { uploadContactCsv }
