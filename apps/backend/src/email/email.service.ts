import { Injectable } from "@nestjs/common"

@Injectable()
class EmailService {
	async sendForgotPassword(to: string): Promise<void> {
		return
	}
}

export { EmailService }
