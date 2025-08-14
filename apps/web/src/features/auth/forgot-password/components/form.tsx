"use client"

import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { useForgotPassword } from "~/features/auth/forgot-password/hooks/use-forgot-password"
import { placeholders } from "~/lib/placeholders"

const ForgotPasswordForm = ({ className }: { className?: string }) => {
	const { forgotPasswordForm, handleSubmit } = useForgotPassword()

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<Form {...forgotPasswordForm}>
				<FormField
					control={forgotPasswordForm.control}
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
				<Button>Send reset email</Button>
			</Form>
		</form>
	)
}

export { ForgotPasswordForm }
