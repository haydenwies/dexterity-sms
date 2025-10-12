import { Suspense } from "react"

import { Icon, IconName } from "@repo/ui/components/icon"
import { Page, PageContent, PageHeader, PageHeaderGroup, PageHeaderRow } from "@repo/ui/components/page"

import { getManyContacts } from "~/data/contact/get-many-contacts"
import { ContactTable, ContactTableSkeleton } from "~/features/contact/components/contact-table"
import { CreateContactButton } from "~/features/contact/components/create-contact"
import { UploadContactCsvButton } from "~/features/contact/components/upload-contact-csv"
import { TestComp } from "./test-comp"

type AllContactsPageProps = Readonly<{
	params: Promise<{ organizationId: string }>
}>
const AllContactsPage = async ({ params }: AllContactsPageProps) => {
	const { organizationId } = await params

	const contactsPromise = getManyContacts(organizationId)

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
				<TestComp />
				<Suspense fallback={<ContactTableSkeleton />}>
					<ContactTable contactsPromise={contactsPromise} />
				</Suspense>
			</PageContent>
		</Page>
	)
}

export default AllContactsPage
