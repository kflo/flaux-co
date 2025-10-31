Vendasta Service Account Secret

This project uses Google Secret Manager (GSM) to store the Vendasta service‑account JSON used for JWT‑bearer token exchange. Functions access it via `defineSecret`.

What you store
- The exact JSON from Vendasta service‑account key generation. See `.secrets-example/vendasta-service-account.json.example` for the expected shape.

Create and rotate the secret (Firebase CLI)
1) From repo root (or any directory), create a local file with your JSON (do NOT commit it):
   - `vendasta-service-account.json`
2) Create or update the secret value:
   - `firebase functions:secrets:set VENDASTA_SERVICE_ACCOUNT_JSON --data-file .\vendasta-service-account.json --project <YOUR_PROJECT_ID>`
3) Deploy functions so the secret is attached at runtime:
   - `firebase deploy --only functions:submitContact,functions:vendastaSaConfigHealth --project <YOUR_PROJECT_ID>`

Verify the secret (gcloud CLI)
- List secrets: `gcloud secrets list --project <YOUR_PROJECT_ID>`
- Inspect versions: `gcloud secrets versions list VENDASTA_SERVICE_ACCOUNT_JSON --project <YOUR_PROJECT_ID>`

Environments
- Use separate projects for dev/prod and repeat the steps with `--project` for each.

Validation
- After deploy, open the `vendastaSaConfigHealth` function URL from Firebase Console > Functions to confirm the JSON parses (it returns `client_email` and `token_uri`).

Security notes
- The secret is accessed only by functions that declare `VENDASTA_SERVICE_ACCOUNT_JSON` in their `secrets` array.
- Local files like `vendasta-service-account.json` are git‑ignored; only the example template is committed.
