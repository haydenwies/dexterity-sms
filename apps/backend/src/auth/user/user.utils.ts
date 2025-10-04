import { type UserDto } from "@repo/types/auth"

import { type User } from "~/auth/user/user.entity"

const toUserDto = (user: User): UserDto => {
	return {
		id: user.id,
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		createdAt: user.createdAt,
		updatedAt: user.updatedAt
	}
}

export { toUserDto }
