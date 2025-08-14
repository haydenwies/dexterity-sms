import { SignUpForm } from "~/features/auth/sign-up"

const SignUpPage = () => {
	return (
		<div className="flex items-center justify-center p-6">
			<div className="flex w-full max-w-xs flex-col gap-6">
				<div className="flex flex-col gap-2 text-center">
					<h1>Create an account</h1>
					<p className="text-muted-foreground text-balance text-sm">
						Enter your email below to create your account
					</p>
				</div>
				<SignUpForm />
			</div>
		</div>
	)
}

export default SignUpPage
