import { render, toPlainText } from "@react-email/render"

import ResetPassword, { ResetPasswordProps } from "./reset-password"

const resetPassword = async (params: ResetPasswordProps): Promise<{ html: string; text: string }> => {
	const Comp = ResetPassword(params)

	const html = await render(Comp)
	const text = toPlainText(html)

	return { html, text }
}

export { resetPassword, type ResetPasswordProps }
