import { ResetPasswordForm } from "~/features/auth/reset-password/components/reset-password-form"

const ResetPasswordPage = () => {
	return (
		<div className="flex items-center justify-center p-6">
			<div className="flex w-full max-w-xs flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1>Reset your password</h1>
					<p className="text-muted-foreground text-balance text-sm">Enter your new password below</p>
				</div>
				<ResetPasswordForm />
			</div>
		</div>
	)
}

export default ResetPasswordPage
