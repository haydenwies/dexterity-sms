const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="grid h-svh w-screen grid-cols-2">
			{children}
			<div className="bg-radial-[120%_180%_at_100%_70%] from-[#F472B6] to-[#A855F7]" />
		</div>
	)
}

export default AuthLayout
