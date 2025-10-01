/**
 * Firebase Functions exports
 * Flaux business platform API
 */

import {setGlobalOptions} from "firebase-functions";

// For cost control, set maximum concurrent containers
setGlobalOptions({maxInstances: 10});

// Export all Vendasta auth functions
export {
	vendastaLogin,
	vendastaCallback,
	vendastaLogout,
} from "./auth/vendasta";

// Export business API endpoints
export {
	createBusinessEndpoint as createBusiness,
	getBusinessEndpoint as getBusiness,
} from "./api/business";

// R2 example functions
export {generateR2UploadUrl, generateR2DownloadUrl} from "./storage/r2-example";
