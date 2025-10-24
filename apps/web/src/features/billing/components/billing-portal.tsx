"use client"

import { Button } from "@dexterity-sms/ui/components/button"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"
import { Spinner } from "@dexterity-sms/ui/components/spinner"

import { useCreateBillingPortalSession } from "~/features/billing/hooks/use-create-billing-portal-session"

type BillingPortalButtonProps = {
	className?: string
}
const BillingPortalButton = ({ className }: BillingPortalButtonProps) => {
	const { loading, redirectToBillingPortalSession } = useCreateBillingPortalSession()

	return (
		<Button
			className={className}
			disabled={loading}
			onClick={redirectToBillingPortalSession}
			variant="link"
		>
			{loading ? <Spinner /> : <Icon name={IconName.LINK} />}
			Manage billing account
		</Button>
	)
}

export { BillingPortalButton }
