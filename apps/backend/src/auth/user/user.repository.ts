import { Injectable } from "@nestjs/common"

import { User } from "~/auth/user/user.entity"

@Injectable()
class UserRepository {
	async find(id: string): Promise<User | undefined> {
		return undefined
	}

	async findByEmail(email: string): Promise<User | undefined> {
		return undefined
	}

	async create(user: User): Promise<User> {
		return user
	}

	async update(user: User): Promise<User> {
		return user
	}
}

export { UserRepository }
