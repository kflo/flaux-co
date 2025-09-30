import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import {defineConfig} from "eslint/config";

/*
 * NOTE: We disable the newline object rules for this config file itself so ESLint-as-formatter
 * doesn't produce the staggered / jagged formatting you were seeing (it was inserting newlines
 * without handling indentation). Your project code still follows the style rules.
 */
/* eslint object-property-newline: off, object-curly-newline: off */

export default defineConfig([
	js.configs.recommended,
	...tseslint.configs.recommended,
	{
		files: ["**/*.{js,mjs,cjs}"],
		languageOptions: { globals: globals.browser },
		rules: {
			"no-unused-vars": "warn",
			// Ensure indentation is enforced (so multiline object properties aren't flush-left)
			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
					VariableDeclarator: 1,
					outerIIFEBody: 1,
					MemberExpression: 1,
					ObjectExpression: 1,
					ArrayExpression: 1,
					ImportDeclaration: 1,
					flatTernaryExpressions: false,
					offsetTernaryExpressions: true,
				},
			],
		},
	},
	{
		files: ["**/*.{ts,mts,cts}"],
		languageOptions: { globals: globals.browser },
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unused-vars": "warn",
			// "no-unused-vars": "off", // Turn off base rule for TypeScript files only
			// Style rules for project code (excluded from this file via the file-level disable comment above)
			"object-property-newline": ["error", { allowAllPropertiesOnSameLine: false }],
			"object-curly-newline": [
				"error",
				{
					ObjectExpression: { multiline: true, minProperties: 1 },
					ObjectPattern: { multiline: true, minProperties: 4 },
					ImportDeclaration: { multiline: true, minProperties: 5 },
					ExportDeclaration: { multiline: true, minProperties: 5 },
				},
			],
			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
					VariableDeclarator: 1,
					outerIIFEBody: 1,
					MemberExpression: 1,
					ObjectExpression: 1,
					ArrayExpression: 1,
					ImportDeclaration: 1,
					flatTernaryExpressions: false,
					offsetTernaryExpressions: true,
				},
			],
		},
	},
]);
