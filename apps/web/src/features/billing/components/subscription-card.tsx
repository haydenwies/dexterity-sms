"use client"

import { SubscriptionModel } from "@repo/types/billing"
import { Button } from "@repo/ui/components/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Icon, IconName } from "@repo/ui/components/icon"
import { use } from "react"
import { useCheckout } from "../hooks/use-checkout"

type SubscriptionCardProps = {
	subscriptionPromise: Promise<SubscriptionModel | undefined>
	className?: string
}
const SubscriptionCard = ({ subscriptionPromise, className }: SubscriptionCardProps) => {
	const subscription = use(subscriptionPromise)

	const { loading, redirectToCheckout } = useCheckout()

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Pay-as-you-go</CardTitle>
				<CardDescription>Access to all features</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button
					className="w-full"
					disabled={loading || !!subscription}
					onClick={redirectToCheckout}
				>
					{loading ? (
						<Icon
							name={IconName.SPINNER}
							className="animate-spin"
						/>
					) : (
						<Icon name={IconName.ARROW_UP} />
					)}
					Upgrade
				</Button>
			</CardFooter>
		</Card>
	)
}

export { SubscriptionCard }
