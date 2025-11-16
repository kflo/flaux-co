const fs = require("fs");
const path = require("path");

const varName = process.argv[2];
const values = process.argv.slice(3);

if (!varName || values.length === 0) {
	console.error("Usage: node scripts/update-env-vars.js VAR_NAME VALUE1 [VALUE2] [VALUE3]");
	console.error("  1 value:  sets same value to all env files");
	console.error("  2 values: sets VALUE1 to .default, VALUE2 to both .stg and .local");
	console.error("  3 values: sets VALUE1 to .default, VALUE2 to .stg, VALUE3 to .local");
	process.exit(1);
}

const envFiles = ["env.default", "env.stg", "env.local"];
const baseDir = path.join(__dirname, "..");

// Determine which value to use for each env file
let envValues;
if (values.length === 1) {
	// 1 value: use for all
	envValues = [values[0], values[0], values[0]];
} else if (values.length === 2) {
	// 2 values: first to default, second to stg and local
	envValues = [values[0], values[1], values[1]];
} else {
	// 3+ values: use first 3
	envValues = values.slice(0, 3);
}

envFiles.forEach((file, index) => {
	const filePath = path.join(baseDir, file);
	const value = envValues[index];

	if (!fs.existsSync(filePath)) {
		console.warn(`Warning: ${file} does not exist, creating it`);
	}

	let content = fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf-8") : "";

	const regex = new RegExp(`^${varName}=.*$`, "m");
	if (regex.test(content)) {
		content = content.replace(regex, `${varName}=${value}`);
	} else {
		if (content && !content.endsWith("\n")) {
			content += "\n";
		}
		content += `${varName}=${value}\n`;
	}

	fs.writeFileSync(filePath, content);
	console.log(`✓ Updated ${varName}=${value} in ${file}`);
});

console.log("\n✓ All env files updated successfully");
