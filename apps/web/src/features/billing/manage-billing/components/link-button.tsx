"use client"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

import { useManageBillingAccount } from "~/features/billing/manage-billing/hooks/use-manage-billing-account"

type ManageBillingLinkButtonProps = {
	className?: string
}

const ManageBillingLinkButton = ({ className }: ManageBillingLinkButtonProps) => {
	const { loading, manageBillingAccountPortalSession } = useManageBillingAccount()

	if (loading)
		return (
			<Button
				className={className}
				disabled={true}
				variant="link"
			>
				<Icon
					className="animate-spin"
					name={IconName.SPINNER}
				/>
				Manage Biling Account
			</Button>
		)

	return (
		<Button
			asChild
			className={className}
			variant="link"
		>
			<a href={manageBillingAccountPortalSession || undefined}>
				<Icon name={IconName.LINK} />
				Manage Biling Account
			</a>
		</Button>
	)
}

export { ManageBillingLinkButton }
