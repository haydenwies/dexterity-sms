import { Module } from "@nestjs/common"

import { DatabaseModule } from "~/database/database.module"
import { UnsubscribeRepository } from "~/unsubscribe/unsubscribe.repository"
import { UnsubscribeService } from "~/unsubscribe/unsubscribe.service"

@Module({
	imports: [DatabaseModule],
	providers: [UnsubscribeService, UnsubscribeRepository],
	exports: [UnsubscribeService]
})
class UnsubscribeModule {}

export { UnsubscribeModule }
