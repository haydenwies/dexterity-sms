"use client"

import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Input } from "@repo/ui/components/input"
import { Spinner } from "@repo/ui/components/spinner"
import { cn } from "@repo/ui/lib/utils"

import { useResetPassword } from "~/features/auth/hooks/use-reset-password"
import { PLACEHOLDERS } from "~/lib/placeholders"

type ResetPasswordFormProps = {
	token: string
	className?: string
}

const ResetPasswordForm = ({ token, className }: ResetPasswordFormProps) => {
	const { loading, resetPasswordForm, handleResetPassword } = useResetPassword(token)

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleResetPassword()
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
					control={resetPasswordForm.control}
					name="confirmPassword"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Confirm new password</FormLabel>
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
				Reset password
			</Button>
		</form>
	)
}

export { ResetPasswordForm }
