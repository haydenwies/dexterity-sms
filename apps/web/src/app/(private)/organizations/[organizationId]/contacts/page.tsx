import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { ContactTable } from "~/features/contact/components/contact-table"
import { CreateContactButton } from "~/features/contact/components/create-contact"
import { UploadContactCsvButton } from "~/features/contact/components/upload-contact-csv"

type AllContactsPageProps = Readonly<{
	params: Promise<{ organizationId: string }>
}>
const AllContactsPage = async ({ params }: AllContactsPageProps) => {
	const { organizationId } = await params

	const contactsPromise = getAllContacts(organizationId)

	return (
		<Page>
			<PageHeader className="border-border border-b">
				<PageHeaderRow>
					<PageHeaderGroup>
						<Icon name={IconName.USERS} />
						<p className="font-bold">Contacts</p>
					</PageHeaderGroup>
					<PageHeaderGroup>
						<UploadContactCsvButton />
						<CreateContactButton />
					</PageHeaderGroup>
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<ContactTable contactsPromise={contactsPromise} />
			</PageContent>
		</Page>
	)
}

export default AllContactsPage
