import { Module } from "@nestjs/common"

import { VerificationTokenRepository } from "~/auth/verification-token/verification-token.repository"
import { VerificationTokenService } from "~/auth/verification-token/verification-token.service"

@Module({
	providers: [VerificationTokenService, VerificationTokenRepository],
	exports: [VerificationTokenService]
})
class VerificationTokenModule {}

export { VerificationTokenModule }
