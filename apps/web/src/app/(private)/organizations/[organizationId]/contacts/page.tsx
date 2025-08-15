import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"

import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { AllContactsTable } from "~/features/contact/all-contacts-table"
import { CreateContactButton } from "~/features/contact/create-contact"

const AllContactsPage = async () => {
	const contactsPromise = getAllContacts()

	return (
		<Page>
			<PageHeader>
				<PageHeaderRow>
					<h1>All Contacts</h1>
					<CreateContactButton />
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<AllContactsTable contactsPromise={contactsPromise} />
			</PageContent>
		</Page>
	)
}

export default AllContactsPage
