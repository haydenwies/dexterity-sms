import { Inject, Injectable } from "@nestjs/common"

import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { Sender } from "~/sender/sender.entity"

@Injectable()
class SenderRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string): Promise<Sender | undefined> {
		return undefined
	}
}

export { SenderRepository }
