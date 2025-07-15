"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"
import Link from "next/link"

import { useSignIn } from "~/features/auth/hooks/use-sign-in"
import { routes } from "~/lib/routes"
import { placeholders } from "~/constants/placeholders"

export const SignInForm = ({ className }: { className?: string }) => {
	const { signInForm, handleSubmit } = useSignIn()

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<Form {...signInForm}>
				<FormField
					control={signInForm.control}
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
					control={signInForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center justify-between">
								<FormLabel>Password</FormLabel>
								<Link href={routes.FORGOT_PASSWORD}>Forgot your password?</Link>
							</div>

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
			<Button>Sign in</Button>
			<p className="text-muted-foreground text-center">
				Don&apos;t have an account?{" "}
				<Link
					className="underline"
					href={routes.SIGN_UP}
				>
					Sign up
				</Link>
			</p>
		</form>
	)
}
