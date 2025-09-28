# Flaux Technical Design & Requirements Brainstorm

## Business Overview
Flaux is an AI-first digital agency operating through multiple channels and business models:

- **Primary**: White-label partner with Vendasta (reselling their products under Flaux branding)
- **Secondary**: Custom digital products (Chrome extensions, CRM integrations, AI workflows, agents)
- **Tertiary**: Traditional web development and branding services

## Key Technical Challenges to Solve

### 1. Identity & Authentication Architecture

**Updated Understanding Based on Vendasta SSO:**
Vendasta provides OAuth2 3-legged flow with OpenID Connect (OIDC) for SSO integration.

**Simplified Identity Model:**
- **Vendasta products (direct)**: Vendasta auth only
- **Flaux-branded Vendasta products**: Vendasta SSO → Flaux app (no separate Flaux account needed)
- **Custom Flaux products**: Require dedicated Flaux authentication
- **Hybrid customers**: May use Vendasta SSO for some products, Flaux auth for others

**Key Vendasta SSO Capabilities:**
- 3-legged OAuth flow provides access to user data and business data
- Users enter Flaux apps from Vendasta platform with existing session
- Can call Vendasta APIs on behalf of authenticated users
- Session transfer workflow allows seamless user experience

**Revised Questions:**
- Should we use Vendasta as primary identity provider where possible?
- How do we handle session management between Vendasta SSO and Flaux-native auth?
- Can we create "shadow accounts" in Flaux for Vendasta SSO users when they need custom products?

### 2. Dashboard & Customer Portal Strategy

**Revised Approach with Vendasta SSO:**
- **Vendasta-only customers**: No Flaux dashboard needed
- **Flaux-branded Vendasta products**: Use Vendasta SSO → direct app access (no Flaux account)
- **Custom Flaux products**: Require Flaux dashboard with dedicated auth
- **Hybrid customers**: Vendasta SSO for branded products + Flaux auth for custom products

**Technical Implementation Considerations:**
- Entry points from Vendasta platform need proper OAuth2 handling
- Session transfer workflow for seamless UX from Vendasta to Flaux apps
- Need to handle user context (business data, permissions) from Vendasta
- Billing likely handled through Vendasta marketplace for SSO users

**Updated Questions:**
- How do we sync user/business data from Vendasta during SSO flow?
- Should we create a "bridge" dashboard that can handle both SSO and native auth?
- How do we manage different permission levels based on entry method?

### 3. Product Integration Complexity

#### Vendasta Integration Needs:
- [ ] OAuth2 3-legged flow implementation (OIDC)
- [ ] Entry URL & Logout endpoints for Vendasta platform
- [ ] Session transfer workflow for seamless user experience  
- [ ] User data synchronization during SSO authentication
- [ ] Business data access via Vendasta APIs
- [ ] White-label branding injection
- [ ] Billing/subscription handled through Vendasta marketplace

#### Custom Product Architecture:
- [ ] Chrome extension distribution and updates
- [ ] CRM integrations (OrgChartHub-like tools)
- [ ] n8n workflow hosting and management
- [ ] AI agent deployment and scaling
- [ ] Customer-specific configurations and data isolation

## Technical Architecture Considerations

### Option 1: Unified Flaux Platform
```
┌─────────────────────────────────────────┐
│           Flaux Master Platform         │
├─────────────────────────────────────────┤
│  • Single auth system                   │
│  • Unified dashboard                    │
│  • Vendasta API integrations           │
│  • Custom product hosting              │
│  • Centralized billing                 │
└─────────────────────────────────────────┘
```

**Pros:** Single source of truth, unified UX, easier customer management
**Cons:** Complex Vendasta integration, potential vendor lock-in issues

### Option 2: SSO-Aware Federated Architecture
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│  Vendasta       │    │  Flaux Bridge   │    │  Custom Products│
│  Platform       │    │  Platform       │    │  Platform       │
│                 │◄──►│                 │◄──►│                 │
│  • OAuth2 SSO   │    │  • SSO Handler  │    │  • Extensions   │
│  • User Context │    │  • Session Mgmt │    │  • AI Workflows │
│  • Billing      │    │  • Native Auth  │    │  • Integrations │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

**Pros:** Leverages Vendasta SSO, cleaner auth boundaries, less account management
**Cons:** Still need to handle dual auth scenarios, session complexity

## Immediate Technical Decisions Needed

### 1. Authentication Strategy
- [x] **Vendasta SSO Research**: OAuth2 3-legged flow with OIDC available
- [ ] Implement Vendasta OAuth2 client configuration
- [ ] Build Entry URL & Logout endpoints for Vendasta integration
- [ ] Choose OAuth library/service for implementation
- [ ] Design session transfer workflow
- [ ] Decide fallback auth for Flaux-native products (Firebase Auth vs. custom)
- [ ] Plan user data sync strategy during SSO flow

### 2. Data Architecture
- [ ] Customer data residence (where does the source of truth live?)
- [ ] Real-time vs. eventual consistency between systems
- [ ] Webhook architecture for cross-system updates

### 3. Deployment & Infrastructure
- [ ] Multi-tenant architecture for custom products
- [ ] Scaling strategy for AI workflows and agents
- [ ] CDN and global distribution for Chrome extensions
- [ ] Database strategy (per-customer, shared, hybrid)

## Phase 1 MVP Recommendations

**Start Simple:**
1. Implement Vendasta OAuth2 SSO for branded products
2. Build basic Flaux dashboard with Firebase Auth for custom products only
3. Create simple session bridge between SSO and native auth
4. Manual customer onboarding process initially
5. Test SSO flow from Vendasta Business App environment

**Defer Complex Decisions:**
- Full SSO integration
- Unified billing
- Advanced customer analytics
- Auto-provisioning workflows

## Questions for Further Research

### Vendasta Integration:
- [x] **SSO Capability**: OAuth2 3-legged flow with OIDC confirmed
- [ ] What user/business data is available through SSO claims?
- [ ] What APIs can be called on behalf of SSO-authenticated users?
- [ ] How does billing work for apps accessed via SSO?
- [ ] What are the session timeout/refresh requirements?
- [ ] Can we embed Flaux branding in Vendasta-hosted environments?
- [ ] What webhook events are available for user lifecycle changes?

### Technical Implementation:
- Should we use Firebase for the Flaux platform or a more complex solution?
- How do we handle customer data privacy across different systems?
- What's our backup/disaster recovery strategy for customer data?
- How do we handle different SLA requirements for different product tiers?

## Next Steps
1. **Vendasta Technical Discovery** - Deep dive into their partner APIs and capabilities
2. **Architecture Decision Records** - Document key technical decisions as we make them
3. **Customer Journey Mapping** - Map out all possible customer interaction flows
4. **MVP Scope Definition** - Define the minimum viable dashboard and integration features
