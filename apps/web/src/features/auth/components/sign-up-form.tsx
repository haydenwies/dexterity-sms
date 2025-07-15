"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"
import Link from "next/link"

import useSignUp from "~/features/auth/hooks/use-sign-up"
import { routes } from "~/lib/routes"
import { placeholders } from "~/constants/placeholders"

export const SignUpForm = ({ className }: { className?: string }) => {
	const { signUpForm, handleSubmit } = useSignUp()

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<Form {...signUpForm}>
				<FormField
					control={signUpForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									placeholder={placeholders.EMAIL}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={signUpForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input
									placeholder={placeholders.PASSWORD}
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={signUpForm.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm password</FormLabel>
							<FormControl>
								<Input
									placeholder={placeholders.PASSWORD}
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
			<Button>Sign up</Button>
			<p className="text-muted-foreground text-center">
				Already have an account?{" "}
				<Link
					className="underline"
					href={routes.SIGN_IN}
				>
					Sign in
				</Link>
			</p>
		</form>
	)
}

export default SignUpForm
