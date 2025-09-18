# Unsubscribe Feature Specification

## Overview

The Unsubscribe module provides automated opt-out functionality for SMS communications, allowing recipients to unsubscribe by replying with keywords like "STOP" or "QUIT". It integrates with the existing message flow and campaign system to prevent further communications to unsubscribed numbers.

## Core Requirements

### 1. Automatic Unsubscribe Detection

- **R1.1**: Process inbound SMS messages for unsubscribe keywords
- **R1.2**: Support configurable unsubscribe keywords (initially: "STOP", "QUIT")
- **R1.3**: Case-insensitive keyword matching
- **R1.4**: Automatic confirmation reply when unsubscribe is processed

### 2. Re-subscription Support

- **R2.1**: Process inbound SMS messages for re-subscribe keywords (initially: "START")
- **R2.2**: Automatic confirmation reply when re-subscription is processed
- **R2.3**: Re-activate messaging for previously unsubscribed numbers

### 3. Message Blocking

- **R3.1**: Prevent campaign messages to unsubscribed phone numbers
- **R3.2**: Block direct message sends to unsubscribed phone numbers
- **R3.3**: Return appropriate error when attempting to message unsubscribed numbers

### 4. Organization Scoping

- **R4.1**: Unsubscribe status is scoped per organization
- **R4.2**: Same phone number can have different statuses across organizations
- **R4.3**: All operations respect organization boundaries

### 5. Internal Management

- **R5.1**: All unsubscribe/resubscribe operations handled automatically via SMS
- **R5.2**: No external API for manual management
- **R5.3**: Simple record creation/deletion model

## Architecture Overview

### Module Dependencies (Unidirectional)

```
MessageModule → UnsubscribeModule ← CampaignModule
     ↓                   ↑
DatabaseModule      DatabaseModule
```

**Key Design Principles:**

- **Single Direction**: Only MessageModule and CampaignModule depend on UnsubscribeModule
- **No Circular Dependencies**: UnsubscribeModule has no dependencies on other business modules
- **Clean Separation**: Unsubscribe logic stays within webhook processing, not events

### Data Flow

1. **Inbound SMS Processing**:

    ```
    Twilio Webhook → MessageWebhookService
                  → Creates Message Entity
                  → Checks for keywords using UnsubscribeService
                  → Updates unsubscribe records if needed
                  → Sends auto-reply via MessageService
    ```

2. **Outbound Message Validation**:

    ```
    MessageService.send() → UnsubscribeService.isUnsubscribed()
                         → Block if unsubscribed, allow if subscribed
    ```

3. **Campaign Processing**:
    ```
    CampaignQueue → Filter contacts using UnsubscribeService
                 → Send only to subscribed numbers
    ```

## Technical Requirements

### 6. Architecture & Integration

- **T6.1**: Follow existing NestJS module patterns (service, repository, entity)
- **T6.2**: Integrate directly with MessageWebhookService for inbound processing
- **T6.3**: Use existing database patterns (Drizzle ORM, migrations)
- **T6.4**: Leverage existing value objects (Phone class)
- **T6.5**: Eliminate bi-directional dependencies between modules

### 7. Performance & Reliability

- **T7.1**: Fast lookup for unsubscribe status during message sending
- **T7.2**: Idempotent operations (duplicate unsubscribe/resubscribe requests)
- **T7.3**: Database constraints prevent duplicate records
- **T7.4**: Proper error handling and logging

### 8. Configuration

- **T8.1**: Keywords and messages stored as constants in UnsubscribeService
- **T8.2**: Simple hardcoded configuration for initial implementation
- **T8.3**: Constants can be easily changed in code as needed

## User Flows

### Flow 1: SMS Unsubscribe

1. User replies "STOP" to any SMS from organization
2. System processes inbound message via existing webhook
3. MessageWebhookService detects keyword and calls UnsubscribeService
4. System sends confirmation: "You have been unsubscribed. Reply START to resubscribe."
5. Future campaign/direct messages to this number are blocked

### Flow 2: SMS Re-subscribe

1. Previously unsubscribed user replies "START"
2. MessageWebhookService detects keyword and calls UnsubscribeService
3. System deletes the unsubscribe record and sends confirmation
4. Future messages to this number are allowed

### Flow 4: Campaign Filtering

1. Campaign is scheduled with list of contacts
2. System filters out unsubscribed phone numbers before sending
3. Campaign statistics reflect filtered numbers
4. Only subscribed numbers receive messages

### Flow 3: Automatic Processing

1. All unsubscribe/resubscribe operations are automatic
2. MessageWebhookService processes keywords from any inbound SMS
3. Records are created (unsubscribe) or deleted (resubscribe) as needed
4. Confirmation messages sent automatically via MessageService

## Data Model

### Unsubscribe Entity

```sql
unsubscribe:
- id: uuid (primary key)
- organization_id: uuid (foreign key to organization, not null)
- phone: text (E.164 format, not null)
- unsubscribed_at: timestamp (not null)
- created_at: timestamp (not null)
- updated_at: timestamp (not null)

-- Constraints
UNIQUE(organization_id, phone)
INDEX(organization_id, phone) -- Fast lookups
```

### Business Rules

- **BR1**: Only one unsubscribe record per (organization_id, phone) combination
- **BR2**: Re-subscription deletes the existing unsubscribe record
- **BR3**: New unsubscribe after resubscription creates new record
- **BR4**: Phone numbers stored in E.164 format using existing Phone value object

## Internal Service API

### UnsubscribeService Methods

- `isUnsubscribed(organizationId: string, phone: Phone): Promise<boolean>`
- `unsubscribe(organizationId: string, phone: Phone): Promise<void>`
- `resubscribe(organizationId: string, phone: Phone): Promise<void>`
- `getUnsubscribes(organizationId: string): Promise<Unsubscribe[]>`
- `isUnsubscribeMessage(body: string): boolean`
- `isResubscribeMessage(body: string): boolean`
- `getUnsubscribeReplyMessage(): string`
- `getResubscribeReplyMessage(): string`

## Implementation Phases

### Phase 1: Core Infrastructure

- Database migration for unsubscribe table
- UnsubscribeModule with service, repository, entity (no listener)
- Basic unsubscribe/resubscribe operations with keyword detection helpers
- Unit tests

### Phase 2: Webhook Integration

- Update MessageWebhookService to handle keyword detection directly
- Integrate UnsubscribeService into MessageWebhookService.handleInboundMessage()
- Auto-reply functionality in webhook handler (not separate listener)
- Integration tests

### Phase 3: Message Blocking

- Update CampaignQueueConsumer to filter unsubscribed numbers
- Update MessageService to block sends to unsubscribed numbers
- Import UnsubscribeModule into MessageModule and CampaignModule
- End-to-end tests

### Phase 4: Testing & Documentation

- Comprehensive test coverage
- Integration with existing test suites
- Documentation updates
- Performance testing

## Configuration Constants

```typescript
// UnsubscribeService constants
class UnsubscribeService {
	private readonly UNSUBSCRIBE_KEYWORDS = ["STOP", "QUIT"]
	private readonly RESUBSCRIBE_KEYWORDS = ["START"]
	private readonly UNSUBSCRIBE_REPLY = "You have been unsubscribed. Reply START to resubscribe."
	private readonly RESUBSCRIBE_REPLY = "You have been resubscribed to messages."

	// Core methods
	isUnsubscribed(organizationId: string, phone: Phone): Promise<boolean>
	unsubscribe(organizationId: string, phone: Phone): Promise<void>
	resubscribe(organizationId: string, phone: Phone): Promise<void>

	// Helper methods for MessageWebhookService
	isUnsubscribeMessage(body: string): boolean
	isResubscribeMessage(body: string): boolean
	getUnsubscribeReplyMessage(): string
	getResubscribeReplyMessage(): string
}
```

## Success Criteria

- ✅ Inbound "STOP" messages automatically unsubscribe with confirmation
- ✅ Inbound "START" messages automatically resubscribe with confirmation
- ✅ Campaign sends skip unsubscribed numbers
- ✅ Direct message sends fail for unsubscribed numbers with clear error
- ✅ Automatic SMS-based unsubscribe/resubscribe works correctly
- ✅ All operations respect organization boundaries
- ✅ Fast unsubscribe status lookups during message processing
- ✅ Keywords and messages work as expected with hardcoded constants
- ✅ Comprehensive test coverage (unit, integration, e2e)
- ✅ Proper error handling and logging throughout

## Questions & Decisions

### Resolved

- **Keywords**: Start with "STOP", "QUIT" for unsubscribe and "START" for resubscribe
- **Auto-replies**: Yes, send confirmation messages for both actions
- **Scope**: Organization-level unsubscribes
- **Re-subscription**: Supported via "START" keyword
- **Architecture**: Unidirectional dependencies eliminate circular imports

### Implementation Notes

**Key Changes from Event-Based Approach:**

- ❌ **Removed**: UnsubscribeListener (no longer needed)
- ❌ **Removed**: forwardRef() circular dependency handling
- ❌ **Removed**: MESSAGE_CREATED event processing for keywords
- ✅ **Added**: Direct keyword processing in MessageWebhookService
- ✅ **Added**: Helper methods in UnsubscribeService for keyword detection
- ✅ **Improved**: Cleaner, more direct data flow
- ✅ **Improved**: Single responsibility - webhook handles inbound, service handles data

**Benefits:**

- **Simpler Architecture**: No circular dependencies to manage
- **Better Performance**: Direct processing without event emission overhead
- **Easier Testing**: Clear, predictable flow without async event handling
- **More Maintainable**: Logic grouped with related webhook processing

### Future Considerations

- Global unsubscribe list (regulatory compliance)
- Webhook notifications for unsubscribe events
- Bulk import/export of unsubscribe lists
- Analytics and reporting on unsubscribe rates
- Integration with email unsubscribes
