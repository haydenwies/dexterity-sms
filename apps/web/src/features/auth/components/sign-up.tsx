"use client"

import Link from "next/link"

import { routes } from "@repo/routes"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Spinner } from "@repo/ui/components/spinner"
import { cn } from "@repo/ui/lib/utils"

import { useSignUp } from "~/features/auth/hooks/use-sign-up"
import { PLACEHOLDERS } from "~/lib/placeholders"

type SignUpFormProps = Readonly<{
	className?: string
}>

const SignUpForm = ({ className }: SignUpFormProps) => {
	const { loading, signUpForm, handleSignUp } = useSignUp()

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSignUp()
			}}
		>
			<Form {...signUpForm}>
				<div className="flex gap-4">
					<FormField
						control={signUpForm.control}
						name="firstName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>First name</FormLabel>
								<FormControl>
									<Input
										disabled={loading}
										placeholder={PLACEHOLDERS.firstName}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={signUpForm.control}
						name="lastName"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Last name</FormLabel>
								<FormControl>
									<Input
										disabled={loading}
										placeholder={PLACEHOLDERS.lastName}
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={signUpForm.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									disabled={loading}
									placeholder={PLACEHOLDERS.email}
									type="email"
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
									disabled={loading}
									placeholder={PLACEHOLDERS.password}
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
									disabled={loading}
									placeholder={PLACEHOLDERS.password}
									type="password"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
			<Button disabled={loading}>
				{loading && <Spinner />}
				Sign up
			</Button>
			<p className="text-muted-foreground text-center">
				Already have an account?{" "}
				<Link
					className="underline"
					href={routes.web.SIGN_IN}
				>
					Sign in
				</Link>
			</p>
		</form>
	)
}

export { SignUpForm }
