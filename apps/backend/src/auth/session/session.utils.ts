import { SessionDto } from "@repo/types/auth"

import { Session } from "~/auth/session/session.entity"

const toSessionDto = (session: Session): SessionDto => {
	return {
		id: session.id,
		userId: session.userId,
		createdAt: session.createdAt,
		updatedAt: session.updatedAt
	}
}

export { toSessionDto }
