/**
 * Firebase Functions exports
 * Flaux business platform API
 */

import { setGlobalOptions } from "firebase-functions";

// For cost control, set maximum concurrent containers
setGlobalOptions({ maxInstances: 10 });

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

// Export user API endpoints
export {
	getUserEndpoint as getUser,
	updateUserPreferencesEndpoint as updateUserPreferences,
	getUserBusinessesEndpoint as getUserBusinesses,
} from "./api/user";

// Export Flaux product API endpoints
// export {
// 	getFlauxProductsEndpoint as getFlauxProducts,
// 	getFlauxProductEndpoint as getFlauxProduct,
// } from "./api/flaux-product";

// Export Flaux order API endpoints
// export {
// 	createFlauxOrderEndpoint as createFlauxOrder,
// 	getFlauxOrderEndpoint as getFlauxOrder,
// 	getUserFlauxOrdersEndpoint as getUserFlauxOrders,
// 	updateFlauxOrderStatusEndpoint as updateFlauxOrderStatus,
// } from "./api/flaux-order";

// Export Flaux subscription API endpoints
// export {
// 	createFlauxSubscriptionEndpoint as createFlauxSubscription,
// 	getFlauxSubscriptionEndpoint as getFlauxSubscription,
// 	getUserFlauxSubscriptionsEndpoint as getUserFlauxSubscriptions,
// 	cancelFlauxSubscriptionEndpoint as cancelFlauxSubscription,
// 	updateFlauxSubscriptionStatusEndpoint as updateFlauxSubscriptionStatus,
// } from "./api/flaux-subscription";

// R2 example functions
export { generateR2UploadUrl, generateR2DownloadUrl } from "./storage/r2-example";

// Contact form -> Vendasta CRM
export { submitContact } from "./api/contact-submit";
export { vendastaSaConfigHealth } from "./auth/vendasta-service-account";
