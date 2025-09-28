=== Hosting Setup

Your public directory is the folder (relative to your project directory) that
will contain Hosting assets to be uploaded with firebase deploy. If you
have a build process for your assets, use your build's output directory.

✔ What do you want to use as your public directory? public
✔ Configure as a single-page app (rewrite all urls to /index.html)? Yes
✔ Set up automatic builds and deploys with GitHub? Yes
+  Wrote public/index.html

i  Detected a .git folder at C:\Source\kflo\flaux-co
i  Authorizing with GitHub to upload your service account to a GitHub repository's secrets store.



✔ For which GitHub repository would you like to set up a GitHub workflow? (format: user/repository) kflo/flaux-co

+  Created service account github-action-997720712 with Firebase Hosting admin permissions.
+  Uploaded service account JSON to GitHub as secret FIREBASE_SERVICE_ACCOUNT_FLAUX_SITE_DEV.
i  You can manage your secrets at https://github.com/kflo/flaux-co/settings/secrets.

✔ Set up the workflow to run a build script before every deploy? Yes
✔ What script should be run before every deploy? npm ci && npm run build

+  Created workflow file C:\Source\kflo\flaux-co\.github/workflows/firebase-hosting-pull-request.yml
✔ Set up automatic deployment to your site's live channel when a PR is merged? Yes
✔ What is the name of the GitHub branch associated with your site's live channel? main

+  Created workflow file C:\Source\kflo\flaux-co\.github/workflows/firebase-hosting-merge.yml

i  Action required: Visit this URL to revoke authorization for the Firebase CLI GitHub OAuth App:
https://github.com/settings/connections/applications/89cf50f02ac6aaed3484
i  Action required: Push any new workflow file(s) to your repo
