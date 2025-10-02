/**
 * Cloudflare R2 helper using AWS S3 SDK v3
 * R2 exposes an S3-compatible API. We configure a custom endpoint & region.
 */

import {S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, HeadObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";
import {getR2Config} from "../configs/r2";

let r2Config: ReturnType<typeof getR2Config>;
let r2Client: S3Client;

function initializeR2() {
	if (!r2Config) {
		r2Config = getR2Config();
		r2Client = new S3Client({
			region: "auto", // R2 uses 'auto'
			endpoint: r2Config.endpoint,
			credentials: {
				accessKeyId: r2Config.accessKeyId,
				secretAccessKey: r2Config.secretAccessKey,
			},
			forcePathStyle: true, // R2 prefers path-style for some operations
		});
	}
	return {r2Config, r2Client};
}

export function getR2Client() {
	const {r2Client} = initializeR2();
	return r2Client;
}

export interface PutObjectParams {
	key: string;
	contentType?: string;
	body: Buffer | Uint8Array | string;
	cacheControl?: string;
	metadata?: Record<string, string>;
}

export async function putObject(params: PutObjectParams) {
	const {r2Config, r2Client} = initializeR2();
	const cmd = new PutObjectCommand({
		Bucket: r2Config.bucketAssets,
		Key: params.key,
		Body: params.body,
		ContentType: params.contentType,
		CacheControl: params.cacheControl,
		Metadata: params.metadata,
	});
	return r2Client.send(cmd);
}

export async function headObject(key: string) {
	const {r2Config, r2Client} = initializeR2();
	return r2Client.send(new HeadObjectCommand({Bucket: r2Config.bucketAssets, Key: key}));
}

export async function getObject(key: string) {
	const {r2Config, r2Client} = initializeR2();
	return r2Client.send(new GetObjectCommand({Bucket: r2Config.bucketAssets, Key: key}));
}

export async function deleteObject(key: string) {
	const {r2Config, r2Client} = initializeR2();
	return r2Client.send(new DeleteObjectCommand({Bucket: r2Config.bucketAssets, Key: key}));
}

export async function createPresignedUploadUrl(key: string, expiresSeconds = 900, contentType?: string) {
	const {r2Config, r2Client} = initializeR2();
	const cmd = new PutObjectCommand({Bucket: r2Config.bucketAssets, Key: key, ContentType: contentType});
	return getSignedUrl(r2Client, cmd, {expiresIn: expiresSeconds});
}

export async function createPresignedDownloadUrl(key: string, expiresSeconds = 900) {
	const {r2Config, r2Client} = initializeR2();
	const cmd = new GetObjectCommand({Bucket: r2Config.bucketAssets, Key: key});
	return getSignedUrl(r2Client, cmd, {expiresIn: expiresSeconds});
}

export function publicUrl(key: string): string | null {
	const {r2Config} = initializeR2();
	if (r2Config.publicBaseUrl) {
		return `${r2Config.publicBaseUrl.replace(/\/$/, "")}/${encodeURIComponent(key)}`;
	}
	return null; // Could also fall back to signed URL usage
}
