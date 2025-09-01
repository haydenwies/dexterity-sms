import { use } from "react"

import { type BillingAccountModel, type SubscriptionModel } from "@repo/types/billing"
import { Alert, AlertTitle } from "@repo/ui/components/alert"
import { Icon, IconName } from "@repo/ui/components/icon"
import { cn } from "@repo/ui/lib/utils"

import { SubscriptionPlanCard } from "~/features/billing/manage-billing/components/subscription-plan-card"

type ManageSubscriptionInterfaceProps = {
	billingAccountPromise: Promise<BillingAccountModel>
	allSubscriptionsPromise: Promise<SubscriptionModel[]>
	className?: string
}

const ManageSubscriptionInterface = ({
	allSubscriptionsPromise,
	billingAccountPromise,
	className
}: ManageSubscriptionInterfaceProps) => {
	const allSubscriptions = use(allSubscriptionsPromise)
	const billingAccount = use(billingAccountPromise)

	return (
		<div className={cn("space-y-4", className)}>
			{!billingAccount.subscriptionId && (
				<Alert variant="destructive">
					<Icon name={IconName.ALERT_CIRCLE} />
					<AlertTitle>You don&apos;t have an active subscription</AlertTitle>
				</Alert>
			)}
			{allSubscriptions.map((subscription) => (
				<SubscriptionPlanCard
					key={subscription.id}
					activeSubscriptionId={billingAccount.subscriptionId}
					subscription={subscription}
				/>
			))}
		</div>
	)
}

export { ManageSubscriptionInterface }
