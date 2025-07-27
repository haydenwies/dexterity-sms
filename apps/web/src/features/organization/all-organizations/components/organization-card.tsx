import { Button } from "@repo/ui/components/button"
import { Card, CardHeader, CardTitle, CardAction } from "@repo/ui/components/card"
import { OrganizationModel } from "~/types/organization/organization.types"

type Props = {
	className?: string
	organization: OrganizationModel
}

export const OrganizationCard = ({ organization }: Props) => {
	return (
		<Card
			key={organization.id}
			className="transition-shadow hover:cursor-pointer hover:shadow-md"
		>
			<CardHeader>
				<CardTitle>{organization.name}</CardTitle>
				<CardAction>
					<Button
						variant="outline"
						size="sm"
					>
						View
					</Button>
				</CardAction>
			</CardHeader>
		</Card>
	)
}
