import { SenderModel } from "@repo/types/sender"

import { SenderRemovedEvent, type SenderAddedEvent } from "~/event/event.types"
import { Sender } from "~/sender/sender.entity"

const toSenderDto = (sender: Sender): SenderModel => {
	return {
		id: sender.phone.value,
		organizationId: sender.organizationId,
		value: sender.phone.value,
		createdAt: sender.createdAt
	}
}

const toSenderAddedEvent = (sender: Sender): SenderAddedEvent => {
	return {
		organizationId: sender.organizationId,
		externalId: sender.externalId,
		phone: sender.phone.value,
		createdAt: sender.createdAt
	}
}

const toSenderRemovedEvent = (sender: Sender): SenderRemovedEvent => {
	return {
		organizationId: sender.organizationId,
		externalId: sender.externalId,
		phone: sender.phone.value,
		removedAt: sender.createdAt
	}
}

export { toSenderAddedEvent, toSenderDto, toSenderRemovedEvent }
