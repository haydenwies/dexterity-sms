import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"
import { Button } from "@repo/ui/components/button"
import { Icon, IconName } from "@repo/ui/components/icon"

import { getForm } from "~/data/form/get-form"
import { FormSettingsForm } from "~/features/form/update-form/components/form-settings-form"
import { UpdateFormProvider } from "~/features/form/update-form/context/update-form-provider"
import { PreviewFormButton } from "~/features/form/preview-form/components/preview-form-button"
import { FormFieldBlockList } from "~/features/form/update-form/components/form-field-block-list"
import Link from "next/link"
import { routes } from "~/lib/routes"

const EditFormPage = async ({ params }: { params: Promise<{ organizationId: string; formId: string }> }) => {
	const { organizationId, formId } = await params

	const form = await getForm(formId)

	return (
		<UpdateFormProvider form={form}>
			<Page>
				<PageHeader className="p-4 pb-0">
					<PageHeaderRow>
						<PageHeaderGroup>
							<Button
								size="icon"
								variant="link"
							>
								<Link href={routes.FORM(organizationId, formId)}>
									<Icon name={IconName.CHEVRON_LEFT} />
								</Link>
							</Button>
							<h1>Edit Form</h1>
						</PageHeaderGroup>
						<PreviewFormButton
							organizationId={"123"}
							formId={formId}
						/>
					</PageHeaderRow>
				</PageHeader>
				<PageContent
					className="grid grid-cols-[1fr_2fr] gap-4 p-0"
					disableScroll={true}
				>
					<div className="border-border m-4 mr-0 overflow-y-auto rounded-md border p-4">
						<FormSettingsForm />
					</div>
					<div className="bg-muted m-4 ml-0 flex flex-col items-center overflow-y-auto rounded-md p-4">
						<FormFieldBlockList className="w-full max-w-md" />
					</div>
				</PageContent>
			</Page>
		</UpdateFormProvider>
	)
}

export default EditFormPage
