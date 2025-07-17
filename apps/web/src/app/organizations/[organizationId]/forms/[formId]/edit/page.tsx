import { Button } from "@repo/ui/components/button"
import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"

import { getForm } from "~/data/form/get-form"
import { FormSettingsForm } from "~/features/form/update-form/components/form-settings-form"
import { FormFieldList } from "~/features/form/update-form/components/form-field-list"
import { UpdateFormProvider } from "~/features/form/update-form/context/update-form-provider"

const EditFormPage = async ({ params }: { params: Promise<{ organizationId: string; formId: string }> }) => {
	const { formId } = await params

	const form = await getForm(formId)

	return (
		<UpdateFormProvider form={form}>
			<Page>
				<PageHeader>
					<PageHeaderRow>
						<h1>Edit Form</h1>
						<Button>Save Changes</Button>
					</PageHeaderRow>
				</PageHeader>
				<PageContent className="grid grid-cols-[1fr_2fr] gap-4 p-0">
					<div className="border-border m-4 mr-0 rounded-md border p-4">
						<FormSettingsForm />
					</div>
					<div className="bg-muted m-4 ml-0 flex flex-col items-center rounded-md p-4">
						<FormFieldList className="w-full" />
					</div>
				</PageContent>
			</Page>
		</UpdateFormProvider>
	)
}

export default EditFormPage
