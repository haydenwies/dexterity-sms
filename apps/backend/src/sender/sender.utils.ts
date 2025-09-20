import { SenderModel } from "@repo/types/sender"

import { Sender } from "~/sender/sender.entity"

const toSenderDto = (sender: Sender): SenderModel => {
	return {
		id: sender.phone.value,
		organizationId: sender.organizationId,
		value: sender.phone.value,
		createdAt: sender.createdAt
	}
}

export { toSenderDto }
