import { Button, Html } from "@react-email/components"
import * as React from "react"

type ForgotPasswordParams = {}

const ForgotPassword = ({}: ForgotPasswordParams) => {
	return (
		<Html>
			<Button
				href="https://example.com"
				style={{ background: "#000", color: "#fff", padding: "12px 20px" }}
			>
				Click me
			</Button>
		</Html>
	)
}

export type { ForgotPasswordParams }
export default ForgotPassword
