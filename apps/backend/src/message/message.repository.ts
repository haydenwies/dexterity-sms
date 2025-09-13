import { Inject, Injectable } from "@nestjs/common"

import { DATABASE_PROVIDER, type DatabaseProvider } from "~/database/database.module"
import { Message } from "~/message/message.entity"

@Injectable()
class MessageRepository {
	constructor(@Inject(DATABASE_PROVIDER) private readonly db: DatabaseProvider) {}

	async find(organizationId: string, messageId: string): Promise<Message | undefined> {
		return undefined
	}

	async create(message: Message): Promise<Message> {
		return message
	}

	async update(message: Message): Promise<Message> {
		return message
	}
}

export { MessageRepository }
