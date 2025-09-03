"use client"

import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert"
import { Button } from "@repo/ui/components/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Input } from "@repo/ui/components/input"
import { cn } from "@repo/ui/lib/utils"

import { useForgotPassword } from "~/features/auth/forgot-password/hooks/use-forgot-password"
import { placeholders } from "~/lib/placeholders"

const ForgotPasswordForm = ({ className }: { className?: string }) => {
	const { error, submitted, forgotPasswordForm, handleForgotPassword } = useForgotPassword()

	if (submitted)
		return (
			<Alert>
				<Icon name={IconName.CHECK_CIRCLE} />
				<AlertTitle>Email sent</AlertTitle>
				<AlertDescription>Check your inbox for a link to reset your password</AlertDescription>
			</Alert>
		)

	return (
		<form
			className={cn("flex flex-col gap-6", className)}
			onSubmit={async (e) => {
				e.preventDefault()
				handleForgotPassword()
			}}
		>
			{error && (
				<Alert variant="destructive">
					<Icon name={IconName.ALERT_CIRCLE} />
					<AlertTitle>{error}</AlertTitle>
				</Alert>
			)}
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
