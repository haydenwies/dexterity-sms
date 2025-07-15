"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Button } from "@repo/ui/components/button"
import { cn } from "@repo/ui/lib/utils"

import { useResetPassword } from "~/features/auth/hooks/use-reset-password"
import { placeholders } from "~/constants/placeholders"

const ResetPasswordForm = ({ className }: { className?: string }) => {
	const { resetPasswordForm, handleSubmit } = useResetPassword()

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleSubmit()
			}}
		>
			<Form {...resetPasswordForm}>
				<FormField
					control={resetPasswordForm.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>New password</FormLabel>
							<FormControl>
								<Input
									placeholder={placeholders.PASSWORD}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={resetPasswordForm.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm new password</FormLabel>
							<FormControl>
								<Input
									placeholder={placeholders.PASSWORD}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</Form>
			<Button>Reset password</Button>
		</form>
	)
}

export default ResetPasswordForm
