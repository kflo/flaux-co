import { defineSecret } from "firebase-functions/params";

/**
 * Secret containing the raw Vendasta service account JSON as provided
 * when generating a key for the service account. The JSON must include:
 *  - private_key_id
 *  - private_key (PEM, RSA)
 *  - client_email
 *  - token_uri
 *  - assertionHeaderData { alg, kid }
 *  - assertionPayloadData { aud, iss, sub }
 */
export const VENDASTA_SERVICE_ACCOUNT_JSON = defineSecret(
	"VENDASTA_SERVICE_ACCOUNT_JSON",
);

export type VendastaServiceAccount = {
  type: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  token_uri: string;
  assertionHeaderData: { alg: string; kid: string };
  assertionPayloadData: { aud: string; iss: string; sub: string };
};

