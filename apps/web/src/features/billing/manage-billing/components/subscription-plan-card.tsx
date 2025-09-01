"use client"

import { type SubscriptionModel } from "@repo/types/billing"
import { Button } from "@repo/ui/components/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Icon, IconName } from "@repo/ui/components/icon"

type SubscriptionPlanCardProps = {
	subscription: SubscriptionModel
	activeSubscriptionId?: string
	className?: string
}

const SubscriptionPlanCard = ({ activeSubscriptionId, subscription, className }: SubscriptionPlanCardProps) => {
	const getButtonIcon = (): React.ReactNode => {
		if (!activeSubscriptionId) return null
		if (activeSubscriptionId === subscription.id) return <Icon name={IconName.CHECK} />
		else return <Icon name={IconName.ARROW_LEFT_RIGHT} />
	}

	const getButtonText = (): string => {
		if (!activeSubscriptionId) return "Select"
		else if (activeSubscriptionId === subscription.id) return "Active"
		else return "Swap"
	}

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>{subscription.name}</CardTitle>
				<CardDescription>{subscription.description}</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button
					className="w-full"
					disabled={activeSubscriptionId === subscription.id}
					variant={activeSubscriptionId === subscription.id ? "outline" : "default"}
				>
					{getButtonIcon()}
					{getButtonText()}
				</Button>
			</CardFooter>
		</Card>
	)
}

export { SubscriptionPlanCard }
