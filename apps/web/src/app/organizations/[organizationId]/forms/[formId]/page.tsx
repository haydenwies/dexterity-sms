import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"
import Link from "next/link"

import { getForm } from "~/data/form/get-form"
import { PreviewFormButton } from "~/features/form/preview-form/components/preview-form-button"
import { routes } from "~/lib/routes"

const FormPage = async ({ params }: { params: Promise<{ organizationId: string; formId: string }> }) => {
	const { organizationId, formId } = await params

	const formPromise = getForm(formId)

	return (
		<Page className="container">
			<PageHeader>
				<PageHeaderRow>
					<PageHeaderGroup className="grid grid-cols-[auto_auto] items-center">
						<Button variant="link">
							<Icon name={IconName.CHEVRON_LEFT} />
						</Button>
						<h1>&quot;Form title&quot;</h1>
						<p className="text-muted-foreground col-start-2">&quot;Form description&quot;</p>
					</PageHeaderGroup>
					<PageHeaderGroup>
						<PreviewFormButton
							formId={formId}
							organizationId={organizationId}
						/>
						<Button asChild>
							<Link href={routes.FORM_EDIT(organizationId, formId)}>Edit</Link>
						</Button>
					</PageHeaderGroup>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>content</PageContent>
		</Page>
	)
}

export default FormPage
