# Contact Form Service

## Overview

The `ContactFormService` handles submission of contact form data from the frontend to your Vendasta CRM via a Google Cloud Function. It provides validation, error handling, and clean integration with your Angular form components.

## Features

- **Form Validation**: Validates required fields (name, email) and phone number format
- **CRM Integration**: Submits data to Vendasta via `submitContact` Cloud Function
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Environment-Aware**: Automatically switches between dev and prod Cloud Function endpoints
- **Request Timeout**: 30-second timeout with appropriate error messages
- **CORS-Safe**: Works with Firebase CORS configuration in the Cloud Function

## Service Methods

### `submit(formData: ContactFormData): Observable<ContactSubmissionResponse>`

Submits the contact form data to the CRM.

**Parameters:**
- `formData`: Contact form object with contact information

**Returns:** Observable with submission response

**Example:**
```typescript
this.contactFormService.submit(formData).subscribe({
  next: (response) => {
    if (response.ok) {
      console.log('Contact created:', response.id);
    }
  },
  error: (error) => {
    console.error('Submission failed:', error.message);
  }
});
```

### `validateForm(formData: ContactFormData): string[]`

Validates contact form data before submission.

**Parameters:**
- `formData`: Contact form object to validate

**Returns:** Array of error messages (empty if valid)

**Example:**
```typescript
const errors = this.contactFormService.validateForm(this.form.value);
if (errors.length > 0) {
  console.error('Validation errors:', errors);
}
```

## Data Structure

### ContactFormData Interface
```typescript
interface ContactFormData {
  name: string;              // Required
  email: string;             // Required, must be valid email
  phone?: string;            // Optional, should be valid phone
  company?: string;          // Optional
  projectType?: string[];    // Optional
  budget?: string;           // Optional
  timeline?: string;         // Optional
  description?: string;      // Optional
  prefersEmail?: boolean;    // Optional
  prefersPhone?: boolean;    // Optional
  prefersSms?: boolean;      // Optional
}
```

### ContactSubmissionResponse Interface
```typescript
interface ContactSubmissionResponse {
  ok: boolean;               // true if successful
  id?: string;               // Vendasta contact ID if successful
  error?: string;            // Error message if failed
}
```

## Integration in Contact Page

The service is injected and used in `ContactPage` component:

```typescript
export class ContactPage {
  private contactFormService = inject(ContactFormService);
  isSubmitting = false;
  submissionMessage: {
    type: 'success' | 'error' | null;
    text: string;
  } = { type: null, text: '' };

  onSubmit() {
    // Validate
    const errors = this.contactFormService.validateForm(this.form.value);
    if (errors.length > 0) {
      this.submissionMessage = {
        type: 'error',
        text: errors.join('; ')
      };
      return;
    }

    // Submit
    this.isSubmitting = true;
    this.contactFormService.submit(formData).subscribe({
      next: (response) => {
        // Handle success
      },
      error: (error) => {
        // Handle error
      }
    });
  }
}
```

## Cloud Function Configuration

The service calls the `submitContact` Cloud Function which:
- Is deployed in `us-central1` region
- Uses different endpoints for dev/prod environments
- Handles Vendasta OAuth token management
- Creates contact in Vendasta CRM
- Logs submission to Firestore

### Environment URLs

**Development:** `https://us-central1-flaux-site-dev.cloudfunctions.net/submitContact`

**Production:** `https://us-central1-flaux-site-prod.cloudfunctions.net/submitContact`

## Error Handling

The service handles several error scenarios:

1. **Validation Errors**: Messages for missing/invalid fields
2. **Network Errors**: Connection failures and timeouts
3. **Server Errors**: HTTP error responses from Cloud Function
4. **Vendasta Errors**: Issues with CRM creation

All errors are logged to console and returned as user-friendly messages.

## Usage Tips

1. **Always validate** before submission using `validateForm()`
2. **Show loading state** while `isSubmitting` is true
3. **Handle errors gracefully** with user-friendly messages
4. **Optionally reset form** after successful submission
5. **Scroll to message** for visual feedback on submission result

## Testing

To test the service locally:

1. Ensure `localhost:4200` is added to CORS allowlist in `contact-submit.ts` (currently commented out)
2. Have Vendasta credentials properly configured in Cloud Function secrets
3. Monitor Firestore `contactSubmissions` collection for test submissions

## Future Enhancements

- [ ] Add retry logic with exponential backoff
- [ ] Implement local storage fallback for offline submissions
- [ ] Add rate limiting/throttling
- [ ] Support additional CRM platforms beyond Vendasta
- [ ] Add analytics tracking for form submissions
