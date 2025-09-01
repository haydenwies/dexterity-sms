import { Injectable } from "@nestjs/common"

import { User } from "~/auth/user/user.entity"

@Injectable()
class UserRepository {
	async find(id: string): Promise<User | undefined> {
		return undefined
	}
}

export { UserRepository }
