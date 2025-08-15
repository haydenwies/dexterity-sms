import { Page, PageContent, PageHeader, PageHeaderRow } from "@repo/ui/components/page"
import { getAllContactTags } from "~/actions/contact/get-all-contact-tags"

import { getAllContacts } from "~/actions/contact/get-all-contacts"
import { AllContactsTable } from "~/features/contact/all-contacts-table"
import { CreateContactButton } from "~/features/contact/create-contact"

const AllContactsPage = async () => {
	const contactsPromise = getAllContacts()
	const contactTagsPromise = getAllContactTags()

	return (
		<Page>
			<PageHeader>
				<PageHeaderRow>
					<h1>All Contacts</h1>
					<CreateContactButton />
				</PageHeaderRow>
			</PageHeader>
			<PageContent>
				<AllContactsTable
					contactsPromise={contactsPromise}
					contactTagsPromise={contactTagsPromise}
				/>
			</PageContent>
		</Page>
	)
}

export default AllContactsPage
