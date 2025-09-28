module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:import/errors",
		"plugin:import/warnings",
		"plugin:import/typescript",
		"google",
		"plugin:@typescript-eslint/recommended",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: ["tsconfig.json", "tsconfig.dev.json"],
		tsconfigRootDir: __dirname,
		sourceType: "module",
	},
	ignorePatterns: [
		"/lib/**/*", // Ignore built files.
		"/generated/**/*", // Ignore generated files.
	],
	plugins: [
		"@typescript-eslint",
		"import",
	],
	rules: {
		"quotes": ["error", "double"],
		"require-jsdoc": "off", // Disable JSDoc requirement
		"valid-jsdoc": "off", // Disable JSDoc validation
		"no-explicit-any": "off", // Allow usage of 'any' type
		"@typescript-eslint/no-explicit-any": "off", // Allow usage of 'any' type
		"import/no-unresolved": 0,
		"indent": ["error", "tab"],
		"no-tabs": "off", // Allow tabs in this config file
		"linebreak-style": "off", // Allow Windows CRLF line endings
		"max-len": ["warn", {"code": 120}], // Increase line length to 120
	},
};
