import { Injectable, NotFoundException } from "@nestjs/common"

import {
	VerificationToken,
	type VerificationTokenCreateParams
} from "~/auth/verification-token/verification-token.entity"
import { VerificationTokenRepository } from "~/auth/verification-token/verification-token.repository"

@Injectable()
class VerificationTokenService {
	constructor(private readonly verificationTokenRepository: VerificationTokenRepository) {}

	async get(id: string): Promise<VerificationToken> {
		const verificationToken = await this.verificationTokenRepository.find(id)
		if (!verificationToken) throw new NotFoundException("Verification token not found")

		if (verificationToken.isExpired()) {
			await this.delete(verificationToken)
			throw new NotFoundException("Verification token not found")
		}

		return verificationToken
	}

	async create(params: VerificationTokenCreateParams): Promise<VerificationToken> {
		const verificationToken = VerificationToken.create(params)
		const createdVerificationToken = await this.verificationTokenRepository.create(verificationToken)

		return createdVerificationToken
	}

	async delete(verificationToken: VerificationToken): Promise<VerificationToken> {
		const deletedVerificationToken = await this.verificationTokenRepository.delete(verificationToken)

		return deletedVerificationToken
	}
}

export { VerificationTokenService }
