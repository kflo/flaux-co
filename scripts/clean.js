/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */
// clean.js
const fs = require('fs');
['dist', '.angular'].forEach(p => {
	if (fs.existsSync(p)) {
		fs.rmSync(p, {recursive: true, force: true});
		console.log(`Removed ${p}`);
	}
});
