"use client"

import { useEffect } from "react"

const TestComp = () => {
	useEffect(() => {
		console.log("I loaded")
	}, [])

	return (
		<div>
			<h1>Test Comp</h1>
		</div>
	)
}

export { TestComp }
