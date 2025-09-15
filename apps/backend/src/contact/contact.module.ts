import { Module } from "@nestjs/common"

import { AuthModule } from "~/auth/auth.module"
import { ContactController } from "~/contact/contact.controller"
import { ContactRepository } from "~/contact/contact.repository"
import { ContactService } from "~/contact/contact.service"
import { DatabaseModule } from "~/database/database.module"
import { OrganizationModule } from "~/organization/organization.module"

@Module({
	imports: [AuthModule, OrganizationModule, DatabaseModule],
	controllers: [ContactController],
	providers: [ContactService, ContactRepository],
	exports: [ContactService]
})
class ContactModule {}

export { ContactModule }
