import { ForgotPasswordForm } from "~/features/auth/components/forgot-passsword"

const ForgotPasswordPage = () => {
	return (
		<div className="flex items-center justify-center p-6">
			<div className="flex w-full max-w-xs flex-col gap-6">
				<div className="text-center">
					<h1>Forgot your password?</h1>
					<p className="text-muted-foreground text-balance">Enter your email below to reset your password</p>
				</div>
				<ForgotPasswordForm />
			</div>
		</div>
	)
}

export default ForgotPasswordPage
