import {defineSecret, defineString} from "firebase-functions/params";

/**
 * Cloudflare R2 storage configuration
 */
export const R2_ACCESS_KEY_ID = defineSecret("R2_ACCESS_KEY_ID");
export const R2_SECRET_ACCESS_KEY = defineSecret("R2_SECRET_ACCESS_KEY");
export const R2_ACCOUNT_ID = defineString("R2_ACCOUNT_ID");
export const R2_BUCKET_ASSETS = defineString("R2_BUCKET_ASSETS", {
	default: "flaux-dev-assets",
});
export const R2_PUBLIC_BASE_URL = defineString("R2_PUBLIC_BASE_URL", {
	default: "",
});

export function getR2Config() {
	return {
		accountId: R2_ACCOUNT_ID.value(),
		accessKeyId: R2_ACCESS_KEY_ID.value(),
		secretAccessKey: R2_SECRET_ACCESS_KEY.value(),
		bucketAssets: R2_BUCKET_ASSETS.value(),
		publicBaseUrl: R2_PUBLIC_BASE_URL.value(),
		endpoint: `https://${R2_ACCOUNT_ID.value()}.r2.cloudflarestorage.com`,
	};
}
