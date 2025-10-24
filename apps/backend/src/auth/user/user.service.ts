import { Injectable, NotFoundException } from "@nestjs/common"

import { type UserDto } from "@dexterity-sms/core/auth"

import { User, type UserCreateParams } from "~/auth/user/user.entity"
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
