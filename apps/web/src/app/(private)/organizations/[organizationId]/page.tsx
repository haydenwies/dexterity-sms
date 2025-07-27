import { Icon, IconName } from "@repo/ui/components/icon"

const OrganizationPage = () => {
	return (
		<div className="flex h-svh w-full items-center justify-center">
			<div className="text-muted-foreground flex items-center justify-center gap-2">
				<Icon
					name={IconName.SQUIRREL}
					className="size-4"
				/>
				<p className="font-medium">Coming soon</p>
			</div>
		</div>
	)
}

export default OrganizationPage
