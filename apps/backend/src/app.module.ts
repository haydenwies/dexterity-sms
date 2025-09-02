import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { EmailModule } from "~/email/email.module"

@Module({
	imports: [AuthModule, EmailModule],
	controllers: [],
	providers: []
})
class AppModule {}

export { AppModule }
