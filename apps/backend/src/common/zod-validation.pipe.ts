import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common"
import { ZodType } from "zod"

class ZodValidationPipe implements PipeTransform {
	constructor(private readonly schema: ZodType) {}

	transform(value: unknown, _metadata: ArgumentMetadata) {
		const parseRes = this.schema.safeParse(value)
		if (!parseRes.success) throw new BadRequestException("Invalid request body")

		return parseRes.data
	}
}

export { ZodValidationPipe }
