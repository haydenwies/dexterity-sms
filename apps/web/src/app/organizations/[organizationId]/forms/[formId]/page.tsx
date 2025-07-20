import { Button } from "@repo/ui/components/button"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"
import Link from "next/link"

import { getForm } from "~/data/form/get-form"
import { routes } from "~/lib/routes"

const FormPage = async ({ params }: { params: Promise<{ organizationId: string; formId: string }> }) => {
	const { organizationId, formId } = await params
	const formPromise = getForm(formId)

	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow>
					<PageHeaderGroup type="column">
						<h1>&quot;Form title&quot;</h1>
						<p className="text-muted-foreground">&quot;Form description&quot;</p>
					</PageHeaderGroup>
					<Button asChild>
						<Link href={routes.FORM_EDIT(organizationId, formId)}>Edit Form</Link>
					</Button>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>content</PageContent>
		</Page>
	)
}

export default FormPage
