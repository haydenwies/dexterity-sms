import { ForgotPasswordForm } from "~/features/auth/forgot-password/components/forgot-password-form"

const ForgotPasswordPage = () => {
	return (
		<div className="flex items-center justify-center p-6">
			<div className="flex w-full max-w-xs flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1>Forgot your password?</h1>
					<p className="text-muted-foreground text-balance text-sm">
						Enter your email below to reset your password
					</p>
				</div>
				<ForgotPasswordForm />
			</div>
		</div>
	)
}

export default ForgotPasswordPage
