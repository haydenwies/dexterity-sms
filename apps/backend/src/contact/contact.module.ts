import { Module } from "@nestjs/common"

import { ContactController } from "~/contact/contact.controller"
import { ContactRepository } from "~/contact/contact.repository"
import { ContactService } from "~/contact/contact.service"

@Module({
	controllers: [ContactController],
	providers: [ContactService, ContactRepository]
})
class ContactModule {}

export { ContactModule }
