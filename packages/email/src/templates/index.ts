import { render, toPlainText } from "@react-email/render"

import ForgotPassword, { ForgotPasswordProps } from "./forgot-password"

const forgotPassword = async (params: ForgotPasswordProps): Promise<{ html: string; text: string }> => {
	const Comp = ForgotPassword(params)

	const html = await render(Comp)
	const text = toPlainText(html)

	return { html, text }
}

export { forgotPassword, type ForgotPasswordProps }
