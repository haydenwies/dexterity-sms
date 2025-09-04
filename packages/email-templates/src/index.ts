import { render, toPlainText } from "@react-email/render"

import ForgotPassword, { type ForgotPasswordProps } from "./emails/forgot-password"
import { type EmailTemplateReturn } from "./types"

type ForgotPasswordParams = ForgotPasswordProps
const forgotPassword = async (params: ForgotPasswordProps): Promise<EmailTemplateReturn> => {
	const Comp = ForgotPassword(params)

	const html = await render(Comp)
	const text = toPlainText(html)

	return { html, text }
}

export { forgotPassword, type ForgotPasswordParams }
