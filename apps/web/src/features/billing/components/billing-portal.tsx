"use client"

import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { use } from "react"

type BillingPortalButtonProps = {
	billingPortalSessionPromise: Promise<{ url: string }>
	className?: string
}
const BillingPortalButton = ({ billingPortalSessionPromise, className }: BillingPortalButtonProps) => {
	const { url } = use(billingPortalSessionPromise)

	return (
		<Button
			asChild
			className={className}
			variant="link"
		>
			<a href={url}>
				<Icon name={IconName.LINK} />
				Manage billing account
			</a>
		</Button>
	)
}

export { BillingPortalButton }
