Obtaining an Access Token for a service account
These directions assume you have already created a service account

Command Line
It is generally best to use a library (below) within the same code that you will be writing the rest of your application in. For debugging and using the try it now features of this site you may use our command line tool.

Using a library
We recommend using one of the OAuth2 libraries listed at jwt.io to generate your access tokens. Look for one in your preferred programming language that has a green checkmark next to Sign and RS256.

Parameters
Most of the parameters that you need to pass into the library can be found in the json file that was downloaded when you created keys for your service account. As a reminder here is what that file looks like:

```
{
  "type": "service_account",
  "private_key_id": "c0273fce-79b7-4104-8a8c-ea489abb3979",
  "private_key": "-----BEGIN RSA PRIVATE KEY-----<private-key>-----END RSA PRIVATE KEY-----\n",
  "client_email": "automated-account-creation@partner-service-account.apigateway.co",
  "token_uri": "https://sso-api-prod.apigateway.co/oauth2/token",
  "assertionHeaderData": {
    "alg": "RS256",
    "kid": "c0273fce-79b7-4104-8a8c-ea489abb3979"
  },
  "assertionPayloadData": {
    "aud": "https://iam-prod.apigateway.co",
    "iss": "automated-account-creation@partner-service-account.apigateway.co",
    "sub": "automated-account-creation@partner-service-account.apigateway.co"
  }
}
```

The exact format for providing the parameters will change for each library. Generally, they are broken into assertion header and assertion payload categories.

Assertion Headers Parameters
alg (AKA Algorithm): Use the value found at the alg key in your downloaded JSON file's assertionHeaderData.
kid (AKA Key ID): Use the value found at the kid key in your downloaded JSON file's assertionHeaderData.
Assertion Payload Parameters
aud (AKA audience): Use the value found at the aud key in your downloaded JSON file's assertionPayloadData.
iat (AKA issued at): The current time as the number of seconds since the Unix Epoch. Most languages include helpers for calculating this.
exp (AKA expiry): We recommend a value of 10 minutes (or less) from the current time. The exp parameter defines the point at which the request to create an access token is no longer valid. This protects against replay attacks. If your library does not have a helper it should be specified as the number of seconds since the Unix Epoch.
iss (AKA issuer): Use the value found at the iss key in your downloaded JSON file's assertionPayloadData.
sub (AKA subject): Use the value found at the sub key in your downloaded JSON file's assertionPayloadData.
scope: This parameter should contain a space-separated list of the categories of things you would like the access token to be able to use. Each of the API operations provides a list of scopes. At least one of them must be included here to call that endpoint.
Examples
Configuring your OAuth2 library will vary, however here are some example implementations which obtains an access token and uses it to call Vendasta's UserInfo endpoint.

Note: these examples assumes you've included your client credential key pair in the current working directory at the path: ./client-credentials.json.

``` Golang
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
	"time"

	"golang.org/x/oauth2/jwt"
)

type credentials struct {
	Type         string `json:"type"`
	PrivateKeyID string `json:"private_key_id"`
	PrivateKey   string `json:"private_key"`
	ClientEmail  string `json:"client_email"`
	TokenURI     string `json:"token_uri"`
	AssertionPayloadData struct {
		Aud string `json:"aud"`
		Iss string `json:"iss"`
		Sub string `json:"sub"`
	} `json:"assertionPayloadData"`
}

func main() {
	// Read in the downloaded Credential JSON
	bytes, err := ioutil.ReadFile("./client-credentials.json")
	if err != nil {
		log.Fatal(err)
		return
	}

	// Parse the JSON credential to access its fields
	var creds credentials
	err = json.Unmarshal(bytes, &creds)
	if err != nil {
		log.Fatal(err)
		return
	}

	// Construct the configuration required by the "golang.org/x/oauth2/jwt" library
	oauthConfig := jwt.Config{
		// The email address of our service account
		Email: creds.ClientEmail,
		// The private key we created
		PrivateKey: []byte(creds.PrivateKey),
		// The ID of the private key we created
		PrivateKeyID: creds.PrivateKeyID,
		// The JWT's subject is the service account's email
		Subject: creds.ClientEmail,
		// A list of scopes which the Access Token will have access to.
		// We'll request the 'profile' and 'email' scopes
		Scopes: []string{"profile", "email"},
		// The provided token URL
		TokenURL: creds.TokenURI,
		// Expire the Assertion Token in 10 minutes
    // This defines how long your request to create an access token is valid for. 
    // It is not possible to specify how long the returned access token is valid for.
		Expires: 10 * time.Minute,
		// The audience of the JWT
		Audience: creds.AssertionPayloadData.Aud,
		// We don't need to provide any private claims
		PrivateClaims: nil,
		// We need an Access Token, not an ID Token
		UseIDToken: false,
	}

	// Fetch a token from Vendasta using a client assertion
	ctx := context.Background()
	tokenInfo, err := oauthConfig.TokenSource(ctx).Token()
	if err != nil {
		log.Fatal(err)
		return
	}

	// Create a Test Request to Vendasta's UserInfo endpoint
	body := strings.NewReader("")
	req, err := http.NewRequest("GET", "https://sso-api-prod.apigateway.co/oauth2/user-info", body)
	if err != nil {
		log.Fatal(err)
		return
	}

	// Attach our access token using the Authorization header.
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", tokenInfo.AccessToken))

	// Perform the request
	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		log.Fatal(err)
		return
	}

	// Receive and print out the response
	respBytes, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
		return
	}

	fmt.Println(string(respBytes))
}
```

Manually
If you like working in obscure languages or doing things the hard way here is a quick overview of the process. For full details you will need to read the OAuth2 specs yourself.

Building a client assertion
The assertion we'll use to prove our identity to Vendasta's token endpoint is a JWT.

A JWT consists of a header section, a payload section and a signature section.

Building the assertion header
The header of your assertion must contain both the algorithm (alg) with which the JWT is signed, and the id of the private key used to sign it (kid).

Both of these values may be found within the service account credential JSON file you downloaded in a previous step. Here's an example JWT header prior to encoding:

```
{
  "alg": "RS256",
  "kid": "c0273fce-79b7-4104-8a8c-ea489abb3979"
}
```

Here's where to find each piece:

alg: Use the value found at the alg key in your downloaded JSON file's assertionHeaderData.
kid: Use the value found at the kid key in your downloaded JSON file's assertionHeaderData.
Building the assertion payload
Now we must build the assertion's payload. Here's an example payload prior to encoding.

```
{
  "aud": "https://iam-prod.apigateway.co",
  "iat": 1591287394,
  "exp": 1591287994,
  "iss": "automated-account-creation@partner-service-account.apigateway.co",
  "sub": "automated-account-creation@partner-service-account.apigateway.co",
  "scope": "profile email"
}
```

Here's where to find each piece:

aud (AKA audience): Use the value found at the aud key in your downloaded JSON file's assertionPayloadData.
iat (AKA issued at): The time the jwt was issued as the number of seconds since the Unix Epoch. Most languages include helpers for calculating this.
exp (AKA expiry): The time when the assertion token should expire as the number of seconds since the Unix Epoch. We recommend a value of 10 minutes (or less) from when the token was issued. This defines how long your request to create an access token is valid for. (It is not possible to specify how long the returned access token is valid for.)
iss (AKA issuer): Use the value found at the iss key in your downloaded JSON file's assertionPayloadData.
sub (AKA subject): Use the value found at the sub key in your downloaded JSON file's assertionPayloadData.
scope: Space-separated scopes which should be included on the access token which will be issued. Each of the endpoints will provide a list of scopes. At least one of them must be included here in order to call that endpoint.
Note: The jti claim, which is a client-provided unique identifier for the JWT (typically a UUID) is not yet supported by Vendasta. It will be ignored if provided.

After constructing a JSON object representing your claims, you'll need to sign it with your private key.

Signing the client assertion
The steps required to sign your JWT will vary substantially depending on which language you are working with. Please consult a trusted JWT library in the language of your choice.

Ensure you provide the appropriate headers, use the correct signing algorithm (as specified in your downloaded JSON file) and provide your payload as the JWT's claims.

The encoded and signed JWT you receive as a result of this process will then be used as your client assertion in the next step.

Exchanging your client assertion for an access token
Now that we have a signed client assertion we can provide it to Vendasta's token URL to receive an access token.

We need to provide this assertion as a parameter to the token URL.

Use your language's provided library to encode the following key-value pairs as form data and set your Content-Type header to application/x-www-form-urlencoded.

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer
assertion=<client-assertion> (use the client assertion you built in the previous step)
Construct a POST request to URI provided in the token_uri field of your downloaded JSON file with the encoded form-data as the body.

Here's an example curl command:

```
curl --location --request POST 'https://sso-api-prod.apigateway.co/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer' \
--data-urlencode 'assertion=<your-signed-assertion>'
```

Note that the <your-signed-assertion> should be replaced with the encrypted set of characters created by signing the json assertion.

