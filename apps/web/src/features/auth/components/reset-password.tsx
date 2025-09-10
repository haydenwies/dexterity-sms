"use client"

import { Alert, AlertTitle } from "@repo/ui/components/alert"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { useResetPassword } from "~/features/auth/hooks/use-reset-password"
import { placeholders } from "~/lib/placeholders"

type ResetPasswordFormProps = {
	token: string
	className?: string
}

const ResetPasswordForm = ({ token, className }: ResetPasswordFormProps) => {
	const { error, resetPasswordForm, handleResetPassword } = useResetPassword(token)

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={(e) => {
				e.preventDefault()
				handleResetPassword()
			}}
		>
			{error && (
				<Alert variant="destructive">
					<Icon name={IconName.ALERT_CIRCLE} />
					<AlertTitle>{error}</AlertTitle>
				</Alert>
			)}
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

export { ResetPasswordForm }
