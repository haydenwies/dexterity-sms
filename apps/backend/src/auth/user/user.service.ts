import { Injectable } from "@nestjs/common"

import { User } from "~/auth/user/user.entity"
import { UserRepository } from "~/auth/user/user.repository"

@Injectable()
class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async find(id: string): Promise<User | undefined> {
		return this.userRepository.find(id)
	}
}

export { UserService }
