"use client"

import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@dexterity-sms/ui/components/empty"
import { Icon, IconName } from "@dexterity-sms/ui/components/icon"
import { Page, PageContent } from "@dexterity-sms/ui/components/page"
import { useIsMobile } from "@dexterity-sms/ui/hooks/use-mobile"

type MobileGuardProps = {
	children: React.ReactNode
}

const MobileGuard = ({ children }: MobileGuardProps) => {
	const isMobile = useIsMobile()

	if (isMobile)
		return (
			<Page>
				<PageContent disableScroll>
					<Empty className="h-full">
						<EmptyHeader>
							<EmptyMedia variant="icon">
								<Icon name={IconName.LAPTOP} />
							</EmptyMedia>
							<EmptyTitle>Your screen is too small!</EmptyTitle>
							<EmptyDescription>
								We don&apos;t support mobile because it looks and feels terrible. Please use a larger
								screen or desktop device.
							</EmptyDescription>
						</EmptyHeader>
					</Empty>
				</PageContent>
			</Page>
		)

	return children
}

export { MobileGuard }
