import { Injectable } from "@nestjs/common"

import { VerificationToken } from "~/auth/verification-token/verification-token.entity"

@Injectable()
class VerificationTokenRepository {
	async find(id: string): Promise<VerificationToken | undefined> {
		return undefined
	}

	async create(verificationToken: VerificationToken): Promise<VerificationToken> {
		return verificationToken
	}

	async delete(verificationToken: VerificationToken): Promise<VerificationToken> {
		return verificationToken
	}
}

export { VerificationTokenRepository }
