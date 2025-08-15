const tagColorPresets = ["#f87171", "#fbbf24", "#34d399", "#60a5fa", "#a78bfa", "#f472b6", "#f59e42", "#38bdf8"]

const getRandomTagColor = (): string => {
	const randomIndex = Math.floor(Math.random() * tagColorPresets.length)
	const color = tagColorPresets[randomIndex]
	if (!color) throw new Error("Error generating tag color")

	return color
}

export { getRandomTagColor, tagColorPresets }
