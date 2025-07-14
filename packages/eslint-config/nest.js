import globals from "globals"

import { baseConfig } from "./base.js"

/**
 * A custom ESLint configuration for libraries that use Next.js.
 * @type {import("eslint").Linter.Config[]}
 */
export const nestJsConfig = [
	...baseConfig,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest
			},
			ecmaVersion: 5,
			sourceType: "module",
			parserOptions: { projectService: true }
		}
	},
	{
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-floating-promises": "warn",
			"@typescript-eslint/no-unsafe-argument": "warn"
		}
	}
]
