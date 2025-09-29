# Flaux MVP API & Firestore Methods Mapping

## Overview
This document outlines all API endpoints and Firestore methods needed for the Flaux MVP, organized by functional domains based on the technical design requirements.

## Authentication & Identity Management

### Vendasta OAuth2 Integration
```typescript
// API Endpoints
POST /auth/vendasta/login          // Initiate OAuth2 flow
GET  /auth/vendasta/callback       // Handle OAuth2 callback
POST /auth/vendasta/logout         // Handle Vendasta logout
GET  /auth/vendasta/refresh        // Refresh OAuth2 tokens
GET  /auth/vendasta/user           // Get current SSO user info

// Firestore Methods
createVendastaUser(userData, businessData)
updateVendastaUser(userId, userData)
getVendastaUserByEmail(email)
getVendastaUserByBusinessId(businessId)
linkVendastaSession(userId, sessionData)
invalidateVendastaSession(userId)
```

### Firebase Native Authentication
```typescript
// API Endpoints
POST /auth/signup                  // Create Flaux native account
POST /auth/login                   // Flaux native login
POST /auth/logout                  // Flaux native logout
POST /auth/reset-password          // Password reset
POST /auth/verify-email            // Email verification

// Firestore Methods
createFlauxUser(userData)
updateFlauxUser(userId, userData)
getFlauxUser(userId)
getFlauxUserByEmail(email)
setUserPreferences(userId, preferences)
getUserPreferences(userId)
```

### Session Bridge Management
```typescript
// API Endpoints
POST /auth/bridge-session          // Bridge SSO to native auth
GET  /auth/session-status          // Check session validity
POST /auth/switch-context          // Switch between auth contexts

// Firestore Methods
createSessionBridge(vendastaUserId, flauxUserId)
getSessionBridge(sessionId)
invalidateSessionBridge(sessionId)
getUserAuthMethods(userId)
```

## Business & Customer Management

### Business Operations
```typescript
// API Endpoints
POST /businesses                   // Create new business
GET  /businesses/:id               // Get business details
PUT  /businesses/:id               // Update business
GET  /businesses                   // List businesses (admin/partner)
DELETE /businesses/:id             // Soft delete business

// Firestore Methods
createBusiness(businessData)
updateBusiness(businessId, updates)
getBusiness(businessId)
getBusinessByDomain(domain)
getBusinessByVendastaId(vendastaBusinessId)
listBusinesses(filters, pagination)
archiveBusiness(businessId)
getBusinessStats(businessId)
```

### Customer/User Management
```typescript
// API Endpoints
POST /businesses/:id/users         // Add user to business
GET  /businesses/:id/users         // List business users
PUT  /businesses/:id/users/:userId // Update user role/permissions
DELETE /businesses/:id/users/:userId // Remove user from business

// Firestore Methods
addUserToBusiness(businessId, userId, role)
removeUserFromBusiness(businessId, userId)
getUserBusinesses(userId)
getBusinessUsers(businessId)
updateUserRole(businessId, userId, role)
getUserPermissions(userId, businessId)
```

## Product & Subscription Management

### Product Catalog
```typescript
// API Endpoints
GET  /products                     // List available products
GET  /products/:id                 // Get product details
GET  /products/categories          // Get product categories

// Firestore Methods
getProducts(filters)
getProduct(productId)
getProductsByCategory(category)
getVendastaProducts()  // Sync from Vendasta API
getFlauxProducts()    // Custom products
```

### Subscription Management
```typescript
// API Endpoints
POST /businesses/:id/subscriptions    // Add product to business
GET  /businesses/:id/subscriptions    // List business subscriptions
PUT  /businesses/:id/subscriptions/:subId // Update subscription
DELETE /businesses/:id/subscriptions/:subId // Cancel subscription

// Firestore Methods
createSubscription(businessId, productId, subscriptionData)
getBusinessSubscriptions(businessId)
updateSubscription(subscriptionId, updates)
cancelSubscription(subscriptionId)
getSubscription(subscriptionId)
getActiveSubscriptions(businessId)
getSubscriptionByVendastaId(vendastaSubscriptionId)
```

### Product Access & Configuration
```typescript
// API Endpoints
GET  /businesses/:id/products      // Get accessible products
POST /businesses/:id/products/:pid/config // Update product config
GET  /businesses/:id/products/:pid/config // Get product config

// Firestore Methods
getBusinessProducts(businessId)
addBusinessProduct(businessId, productId, config)
updateProductConfig(businessId, productId, config)
getProductConfig(businessId, productId)
removeBusinessProduct(businessId, productId)
```

## Custom Product Integration

<!-- ### AI Workflows & Agents
```typescript
// API Endpoints
GET  /workflows                    // List available workflows
POST /businesses/:id/workflows     // Deploy workflow
GET  /businesses/:id/workflows     // Get business workflows
POST /businesses/:id/workflows/:wid/execute // Execute workflow
GET  /businesses/:id/workflows/:wid/logs    // Get workflow logs

// Firestore Methods
getWorkflows()
deployWorkflow(businessId, workflowId, config)
getBusinessWorkflows(businessId)
updateWorkflowConfig(businessId, workflowId, config)
pauseWorkflow(businessId, workflowId)
resumeWorkflow(businessId, workflowId)
getWorkflowRuns(businessId, workflowId)
logWorkflowExecution(businessId, workflowId, executionData)
```

### CRM Integrations
```typescript
// API Endpoints
GET  /integrations                 // List available integrations
POST /businesses/:id/integrations  // Setup integration
GET  /businesses/:id/integrations  // Get business integrations
PUT  /businesses/:id/integrations/:intId // Update integration config
DELETE /businesses/:id/integrations/:intId // Remove integration

// Firestore Methods
getIntegrations()
createIntegration(businessId, integrationType, config)
getBusinessIntegrations(businessId)
updateIntegrationConfig(businessId, integrationId, config)
removeIntegration(businessId, integrationId)
getIntegrationData(businessId, integrationId)
syncIntegrationData(businessId, integrationId)
``` -->

## Usage Analytics & Monitoring

<!-- ### Usage Tracking
```typescript
// API Endpoints
POST /events                       // Log usage event
GET  /businesses/:id/analytics     // Get business analytics
GET  /products/:id/analytics       // Get product usage analytics
GET  /analytics/summary            // Get platform summary (admin)

// Firestore Methods
logUsageEvent(businessId, productId, eventType, metadata)
getBusinessAnalytics(businessId, dateRange, filters)
getProductAnalytics(productId, dateRange, filters)
getSystemAnalytics(dateRange, filters)
getBillingUsage(businessId, period)
```

### Error & Performance Monitoring
```typescript
// API Endpoints
POST /errors                       // Log error event
GET  /businesses/:id/health        // Get business system health
GET  /products/:id/health          // Get product health status

// Firestore Methods
logError(businessId, productId, errorData)
getErrorLogs(businessId, filters)
getSystemHealth(businessId)
getProductHealth(productId)
updateHealthMetrics(entityId, metrics)
```

## Configuration & Settings

### System Configuration
```typescript
// API Endpoints
GET  /config                       // Get system configuration
PUT  /config                       // Update system config (admin)
GET  /businesses/:id/config        // Get business configuration
PUT  /businesses/:id/config        // Update business config

// Firestore Methods
getSystemConfig()
updateSystemConfig(configData)
getBusinessConfig(businessId)
updateBusinessConfig(businessId, configData)
getFeatureFlags(businessId)
updateFeatureFlags(businessId, flags)
```

### Notification & Communication
```typescript
// API Endpoints
GET  /notifications                // Get user notifications
PUT  /notifications/:id/read       // Mark notification as read
POST /notifications/send           // Send notification (admin)

// Firestore Methods
createNotification(userId, notificationData)
getUserNotifications(userId, filters)
markNotificationRead(notificationId)
getUnreadNotifications(userId)
deleteNotification(notificationId)
sendBulkNotifications(userIds, notificationData)
``` -->

## Admin & Partner Management

<!-- ### Partner Portal
```typescript
// API Endpoints
GET  /admin/partners               // List partners
POST /admin/partners               // Create partner
GET  /admin/partners/:id           // Get partner details
PUT  /admin/partners/:id           // Update partner
GET  /admin/partners/:id/businesses // Get partner businesses

// Firestore Methods
createPartner(partnerData)
getPartners(filters)
getPartner(partnerId)
updatePartner(partnerId, updates)
getPartnerBusinesses(partnerId)
addBusinessToPartner(partnerId, businessId)
``` -->

### System Administration
```typescript
// API Endpoints
GET  /admin/stats                  // System statistics
GET  /admin/users                  // List all users (paginated)
PUT  /admin/users/:id              // Update user (admin)
GET  /admin/audit-logs             // Get audit logs

// Firestore Methods
getSystemStats()
getAllUsers(filters, pagination)
updateUserAdmin(userId, updates)
getAuditLogs(filters, pagination)
logAdminAction(adminId, action, targetId, metadata)
```

## Collection Structure Overview

### Core Collections
```typescript
// Primary Collections
/users                    // All user records (SSO + native)
/businesses              // Business/customer records  
/subscriptions           // Product subscriptions
/products               // Product catalog
/usageEvents            // Usage tracking
/sessions               // Session management
/notifications          // User notifications
/auditLogs             // System audit trail

// Configuration Collections
/systemConfig           // Platform configuration
/businessConfig         // Per-business settings
/featureFlags          // Feature toggles
/integrationConfigs    // Integration settings

// Analytics Collections  
/analytics             // Processed analytics data
/errorLogs            // Error tracking
/healthMetrics        // System health data
/syncStatus           // Data sync tracking
```

## Implementation Priority for MVP

### Phase 1 - Core Authentication
1. Vendasta OAuth2 endpoints
2. Basic business management
3. User session bridging
4. Essential Firestore user/business methods

### Phase 2 - Product Management  
1. Product catalog and subscriptions
2. Basic usage tracking
3. Configuration management
4. Core analytics

### Phase 3 - Custom Products
1. Extension management
2. Workflow deployment
3. Integration setup
4. Advanced analytics

### Phase 4 - Administration
1. Partner portal
2. System administration  
3. Advanced monitoring
4. Data synchronization

## Security Considerations

### Authentication & Authorization
- All API endpoints require proper authentication
- Role-based access control (RBAC) for business operations
- Admin-only endpoints for system management
- Rate limiting on all public endpoints

### Data Privacy
- Business data isolation
- PII encryption at rest
- Audit logging for sensitive operations
- GDPR compliance for user data

### API Security
- Request validation and sanitization
- SQL injection prevention (NoSQL injection)
- CORS configuration
- API key management for external integrations
