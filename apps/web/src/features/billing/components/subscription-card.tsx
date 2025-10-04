"use client"

import { use } from "react"

import { SubscriptionModel } from "@repo/types/billing"
import { Button } from "@repo/ui/components/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@repo/ui/components/card"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Spinner } from "@repo/ui/components/spinner"

import { useCreateCheckoutSession } from "~/features/billing/hooks/use-create-checkout-session"

type SubscriptionCardProps = {
	subscriptionPromise: Promise<SubscriptionModel | undefined>
	className?: string
}
const SubscriptionCard = ({ subscriptionPromise, className }: SubscriptionCardProps) => {
	const subscription = use(subscriptionPromise)

	const { loading, redirectToCheckoutSession } = useCreateCheckoutSession()

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
					onClick={redirectToCheckoutSession}
				>
					{loading ? (
						<Spinner />
					) : subscription ? (
						<Icon name={IconName.CHECK} />
					) : (
						<Icon name={IconName.ARROW_UP} />
					)}
					{subscription ? "Selected" : "Upgrade"}
				</Button>
			</CardFooter>
		</Card>
	)
}

type SubscriptionCardSkeletonProps = {
	className?: string
}
const SubscriptionCardSkeleton = ({ className }: SubscriptionCardSkeletonProps) => {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Pay-as-you-go</CardTitle>
				<CardDescription>Access to all features</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button
					className="w-full"
					disabled
				>
					<Spinner />
				</Button>
			</CardFooter>
		</Card>
	)
}

export { SubscriptionCard, SubscriptionCardSkeleton }
