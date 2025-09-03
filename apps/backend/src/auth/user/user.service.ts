import { Injectable, NotFoundException } from "@nestjs/common"
import { UserDto } from "@repo/types/auth"

import { User, UserCreateParams } from "~/auth/user/user.entity"
import { UserRepository } from "~/auth/user/user.repository"

@Injectable()
class UserService {
	constructor(private readonly userRepository: UserRepository) {}

	async find(id: string): Promise<User | undefined> {
		return this.userRepository.find(id)
	}

	async findByEmail(email: string): Promise<User | undefined> {
		return this.userRepository.findByEmail(email)
	}

	async get(id: string): Promise<User> {
		const user = await this.find(id)
		if (!user) throw new NotFoundException("User not found")

		return user
	}

	async getByEmail(email: string): Promise<User> {
		const user = await this.findByEmail(email)
		if (!user) throw new NotFoundException("User not found")

		return user
	}

	async create(params: UserCreateParams): Promise<User> {
		const user = await User.create(params)
		const createdUser = await this.userRepository.create(user)

		return createdUser
	}

	async updatePassword(id: string, password: string): Promise<User> {
		const user = await this.get(id)
		await user.updatePassword(password)
		const updatedUser = await this.userRepository.update(user)

		return updatedUser
	}

	toDto(user: User): UserDto {
		return {
			id: user.id,
			email: user.email,
			createdAt: user.createdAt,
			updatedAt: user.updatedAt
		}
	}
}

export { UserService }
