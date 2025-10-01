/**
 * Cloudflare R2 helper using AWS S3 SDK v3
 * R2 exposes an S3-compatible API. We configure a custom endpoint & region.
 */

import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

// Environment variables expected (set in Firebase Functions config or .env.local for emulation):
// R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_ASSETS, R2_PUBLIC_BASE_URL (optional CDN/public URL)

const requiredEnv = [
	"R2_ACCOUNT_ID",
	"R2_ACCESS_KEY_ID",
	"R2_SECRET_ACCESS_KEY",
	"R2_BUCKET_ASSETS",
];

for (const key of requiredEnv) {
	if (!process.env[key]) {
		console.warn(`[r2] Missing env var ${key}. R2 operations may fail.`);
	}
}

const accountId = readEnv("R2_ACCOUNT_ID");
if (!accountId) throw new Error("R2_ACCOUNT_ID required");

const assetsBucket = readEnv("R2_BUCKET_ASSETS") ?? "default-bucket"; // fallback if desired

// R2 S3-compatible endpoint pattern
const endpoint = `https://${accountId}.r2.cloudflarestorage.com`;

export const r2Client = new S3Client({
	region: "auto", // R2 uses 'auto'
	endpoint,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
	},
	forcePathStyle: true, // R2 prefers path-style for some operations
});

export interface PutObjectParams {
	key: string;
	contentType?: string;
	body: Buffer | Uint8Array | string;
	cacheControl?: string;
	metadata?: Record<string, string>;
}

export async function putObject(params: PutObjectParams) {
	const cmd = new PutObjectCommand({
		Bucket: assetsBucket,
		Key: params.key,
		Body: params.body,
		ContentType: params.contentType,
		CacheControl: params.cacheControl,
		Metadata: params.metadata,
	});
	return r2Client.send(cmd);
}

export async function headObject(key: string) {
	return r2Client.send(new HeadObjectCommand({Bucket: assetsBucket, Key: key}));
}

export async function getObject(key: string) {
	return r2Client.send(new GetObjectCommand({Bucket: assetsBucket, Key: key}));
}

export async function deleteObject(key: string) {
	return r2Client.send(new DeleteObjectCommand({Bucket: assetsBucket, Key: key}));
}

export async function createPresignedUploadUrl(key: string, expiresSeconds = 900, contentType?: string) {
	const cmd = new PutObjectCommand({Bucket: assetsBucket, Key: key, ContentType: contentType});
	return getSignedUrl(r2Client, cmd, {expiresIn: expiresSeconds});
}

export async function createPresignedDownloadUrl(key: string, expiresSeconds = 900) {
	const cmd = new GetObjectCommand({Bucket: assetsBucket, Key: key});
	return getSignedUrl(r2Client, cmd, {expiresIn: expiresSeconds});
}

export function publicUrl(key: string): string | null {
	if (process.env.R2_PUBLIC_BASE_URL) {
		return `${process.env.R2_PUBLIC_BASE_URL.replace(/\/$/, "")}/${encodeURIComponent(key)}`;
	}
	return null; // Could also fall back to signed URL usage
}

function readEnv(name: string, warn = true): string | undefined {
	const v = process.env[name];
	if (!v && warn) console.warn(`[r2] Missing env var ${name}. R2 operations may fail.`);
	return v;
}
