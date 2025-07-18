import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import Link from "next/link"

import { routes } from "~/lib/routes"

type Props = {
	organizationId: string
	formId: string
}

const PreviewFormButton = ({ organizationId, formId }: Props) => {
	return (
		<Button variant="outline">
			<Icon
				name={IconName.EYE}
				className="size-4"
			/>
			<Link href={routes.FORM_PREVIEW(organizationId, formId)}>Preview Form</Link>
		</Button>
	)
}

export { PreviewFormButton }
