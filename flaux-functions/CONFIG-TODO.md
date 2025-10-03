# Firebase Functions Configuration TODO

## Required Secrets (Google Secret Manager)

### Vendasta OAuth
```bash
firebase functions:secrets:set VENDASTA_CLIENT_SECRET
```

### R2 Storage  
```bash
firebase functions:secrets:set R2_ACCESS_KEY_ID
firebase functions:secrets:set R2_SECRET_ACCESS_KEY
```

## Required Parameters (Firebase Config)

### Vendasta OAuth
```bash
firebase functions:config:set vendasta.client_id="your-vendasta-client-id"
```

### R2 Storage
```bash
firebase functions:config:set r2.account_id="your-cloudflare-account-id"
```

## Optional Parameters (have defaults)

### Vendasta
- `VENDASTA_REDIRECT_URI` (defaults to dev URL)
- `APP_BASE_URL` (defaults to dev URL)

### R2 Storage
- `R2_BUCKET_ASSETS` (defaults to "flaux-dev-assets")
- `R2_PUBLIC_BASE_URL` (defaults to empty string)

## Multi-Environment Setup

Run these commands for each environment:

```bash
# Development
firebase use dev
firebase functions:secrets:set VENDASTA_CLIENT_SECRET
firebase functions:secrets:set R2_ACCESS_KEY_ID
firebase functions:secrets:set R2_SECRET_ACCESS_KEY
firebase functions:config:set vendasta.client_id="dev-client-id"
firebase functions:config:set r2.account_id="dev-account-id"

# Staging
firebase use staging
firebase functions:secrets:set VENDASTA_CLIENT_SECRET
firebase functions:secrets:set R2_ACCESS_KEY_ID
firebase functions:secrets:set R2_SECRET_ACCESS_KEY
firebase functions:config:set vendasta.client_id="staging-client-id"
firebase functions:config:set r2.account_id="staging-account-id"

# Production
firebase use prod
firebase functions:secrets:set VENDASTA_CLIENT_SECRET
firebase functions:secrets:set R2_ACCESS_KEY_ID
firebase functions:secrets:set R2_SECRET_ACCESS_KEY
firebase functions:config:set vendasta.client_id="prod-client-id"
firebase functions:config:set r2.account_id="prod-account-id"
```

## Cost Estimate

- **3 secrets × 3 environments = 9 secrets**
- **Cost: ~$0.54/month** (9 × $0.06)

## Verification

After setting up, verify with:
```bash
firebase functions:config:get
firebase functions:secrets:access VENDASTA_CLIENT_SECRET
```
