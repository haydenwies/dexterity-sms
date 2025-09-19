# Campaign Feature Specification

## Overview

The Campaign module provides mass SMS messaging functionality, allowing organizations to create, schedule, and send SMS campaigns to their contact lists. It includes lifecycle management, message delivery tracking, and automated status updates based on individual message delivery results.

## Core Requirements

### 1. Campaign Lifecycle Management

- **R1.1**: Create campaigns in DRAFT status with name and message body
- **R1.2**: Update campaign details (name, body) while in DRAFT status
- **R1.3**: Schedule campaigns for immediate or future delivery
- **R1.4**: Cancel scheduled campaigns before they are sent
- **R1.5**: Automatic progression through campaign statuses based on processing state

### 2. Message Broadcasting

- **R2.1**: Send campaigns to all active contacts in the organization
- **R2.2**: Automatic deduplication of contacts by phone number
- **R2.3**: Filter out unsubscribed contacts during campaign sending
- **R2.4**: Create individual message records for each recipient
- **R2.5**: Queue-based asynchronous message processing

### 3. Status Tracking & Polling

- **R3.1**: Track campaign status based on individual message delivery results
- **R3.2**: Automatic polling of message statuses to update campaign status
- **R3.3**: Mark campaigns as FAILED when all messages fail to deliver
- **R3.4**: Maintain SENT status for campaigns with partial or full success
- **R3.5**: Configurable polling intervals for status updates

### 4. Test Message Functionality

- **R4.1**: Send test messages to specific phone numbers from DRAFT campaigns
- **R4.2**: Test messages do not affect campaign status
- **R4.3**: Validate campaign body exists before allowing test sends

### 5. Organization Scoping

- **R5.1**: All campaigns scoped to specific organizations
- **R5.2**: Campaign operations respect organization boundaries
- **R5.3**: Use organization's configured sender phone number

## Architecture Overview

### Data Flow

1. **Campaign Creation & Management**:

    ```
    User Input → CampaignController → CampaignService
             → Campaign.create() → CampaignRepository
             → Database Storage
    ```

2. **Campaign Sending Process**:

    ```
    CampaignService.send() → Campaign.schedule() → CampaignRepository.update()
                         → CampaignQueue.add(SEND)

    CampaignQueue → CampaignQueueConsumer.processSend()
                 → ContactService.getAll() → Filter Unsubscribed
                 → MessageService.send() for each contact
                 → Schedule POLL_STATUS jobs
    ```

3. **Status Polling & Updates**:

    ```
    CampaignQueue → CampaignQueueConsumer.processPollStatus()
                 → MessageService.getMany(campaignId)
                 → Count message statuses
                 → Campaign.updateStatusFromMessages()
                 → CampaignRepository.update() if changed
    ```

4. **Message Status Updates**:
    ```
    SMS Provider Webhook → MessageWebhookService.handleStatusUpdate()
                        → Message.updateStatus() → MessageRepository.update()
                        → (Triggers campaign status polling on next cycle)
    ```

## Technical Requirements

### 6. Architecture & Integration

- **T6.1**: Follow existing NestJS module patterns (controller, service, repository, entity)
- **T6.2**: Use BullMQ for asynchronous campaign processing
- **T6.3**: Integrate with existing message and contact systems
- **T6.4**: Use existing database patterns (Drizzle ORM, migrations)
- **T6.5**: Leverage existing value objects (Phone class)
- **T6.6**: Respect unsubscribe preferences during campaign sending

### 7. Performance & Reliability

- **T7.1**: Asynchronous processing for large contact lists
- **T7.2**: Batch message creation for efficient database operations
- **T7.3**: Configurable polling schedules to balance responsiveness and resource usage
- **T7.4**: Proper error handling and logging throughout the lifecycle
- **T7.5**: Idempotent operations where possible

### 8. Queue Management

- **T8.1**: Separate queue jobs for campaign sending and status polling
- **T8.2**: Delayed job scheduling for status polling intervals
- **T8.3**: Proper job data validation and error handling
- **T8.4**: Queue-based scheduling for future campaign delivery

## User Flows

### Flow 1: Create and Send Immediate Campaign

1. User creates campaign in DRAFT status with name and message body
2. User initiates immediate send via CampaignService.send()
3. Campaign status changes to SCHEDULED, then SENT
4. System queues campaign for processing
5. CampaignQueueConsumer processes campaign:
    - Retrieves all organization contacts
    - Deduplicates by phone number
    - Filters out unsubscribed contacts
    - Creates message for each valid contact
    - Schedules status polling jobs
6. Messages are queued and sent via MessageQueue
7. Status polling jobs periodically check message delivery status
8. Campaign status updated based on message results

### Flow 2: Schedule Future Campaign

1. User creates campaign and schedules for future delivery
2. Campaign status changes to SCHEDULED
3. Campaign queued with appropriate delay
4. At scheduled time, follows same process as immediate send

### Flow 3: Test Message

1. User sends test message from DRAFT campaign
2. System validates campaign has message body
3. Single message sent to specified phone number
4. Campaign status remains unchanged
5. Test message bypasses contact list and unsubscribe filtering

### Flow 4: Campaign Cancellation

1. User cancels SCHEDULED campaign
2. Campaign status changes to CANCELLED
3. Queued jobs may still process but will detect cancelled status
4. No messages sent for cancelled campaigns

### Flow 5: Status Polling and Updates

1. After campaign messages are sent, polling jobs run at intervals:
    - 30 seconds (initial check)
    - 5, 10, 15, 20, 25, 30 minutes (follow-up checks)
2. Each polling job:
    - Retrieves all messages for campaign
    - Counts messages by status (SENT, DELIVERED, FAILED, PENDING)
    - Determines if campaign status should change
    - Updates campaign if all messages failed (FAILED status)
3. Campaign remains SENT unless all messages fail

## Data Model

### Campaign Entity

```sql
campaign:
- id: uuid (primary key)
- organization_id: uuid (foreign key to organization, not null)
- status: enum (draft, scheduled, sent, cancelled, failed)
- name: text (not null)
- body: text (nullable, required for sending)
- scheduled_at: timestamp (nullable, for future scheduling)
- created_at: timestamp (not null)
- updated_at: timestamp (not null)

-- Constraints
INDEX(organization_id) -- List campaigns by organization
INDEX(organization_id, status) -- Filter campaigns by status
```

### Status Definitions

- **DRAFT**: Campaign created but not yet scheduled
- **SCHEDULED**: Campaign scheduled for sending (immediate or future)
- **SENT**: Campaign has been processed and messages created
- **CANCELLED**: Campaign was cancelled before sending
- **FAILED**: All campaign messages failed to deliver

### Business Rules

- **BR1**: Only DRAFT campaigns can be updated or deleted
- **BR2**: Only DRAFT campaigns can be scheduled
- **BR3**: Only SCHEDULED campaigns can be cancelled
- **BR4**: Only SCHEDULED campaigns can be sent
- **BR5**: Campaign body is required for sending and test messages
- **BR6**: Future scheduling limited to 14 days maximum
- **BR7**: Status can only progress: DRAFT → SCHEDULED → SENT/CANCELLED
- **BR8**: SENT campaigns can become FAILED based on message results

## Internal Service API

### CampaignService Methods

- `get(organizationId: string, campaignId: string): Promise<Campaign>`
- `getMany(organizationId: string): Promise<Campaign[]>`
- `create(organizationId: string, dto: CreateCampaignDto): Promise<Campaign>`
- `update(organizationId: string, campaignId: string, dto: UpdateCampaignDto): Promise<Campaign>`
- `delete(organizationId: string, campaignId: string): Promise<void>`
- `deleteMany(organizationId: string, dto: DeleteManyCampaignsDto): Promise<void>`
- `send(organizationId: string, campaignId: string, dto: SendCampaignDto): Promise<void>`
- `sendTest(organizationId: string, campaignId: string, dto: SendTestCampaignDto): Promise<void>`
- `cancel(organizationId: string, campaignId: string): Promise<void>`

### Campaign Entity Methods

- `static create(params: CampaignCreateParams): Campaign`
- `update(params: CampaignUpdateParams): void`
- `canSendTest(): boolean`
- `canSend(): boolean`
- `canCancel(): boolean`
- `sendTest(): { body: string }`
- `schedule(scheduledAt?: Date): void`
- `send(): { body: string }`
- `cancel(): void`
- `updateStatusFromMessages(statusCounts: MessageStatusCounts): boolean`

### Queue Jobs

- `CAMPAIGN_QUEUE_JOB.SEND`: Process campaign sending
- `CAMPAIGN_QUEUE_JOB.POLL_STATUS`: Poll message statuses and update campaign

## Implementation Phases

### Phase 1: Core Campaign Management ✅

- Campaign entity with status management
- CampaignService with CRUD operations
- CampaignRepository with database operations
- Campaign controller with REST endpoints
- Basic queue setup for sending

### Phase 2: Message Integration ✅

- Integration with MessageService for sending
- Contact filtering and deduplication
- Unsubscribe filtering integration
- Test message functionality
- Queue-based campaign processing

### Phase 3: Status Polling & Updates (Current Phase)

- Message status polling mechanism
- Campaign status update logic based on message results
- Scheduled polling jobs with configurable intervals
- Status transition management
- Comprehensive logging and error handling

### Phase 4: Advanced Features (Future)

- Campaign analytics and reporting
- Message delivery statistics
- Campaign templates
- Bulk operations optimization
- Advanced scheduling options

## Queue Configuration

### Polling Schedule

```typescript
// Default polling intervals after campaign is sent
const POLLING_INTERVALS = [
	30 * 1000, // 30 seconds - initial check
	5 * 60 * 1000, // 5 minutes
	10 * 60 * 1000, // 10 minutes
	15 * 60 * 1000, // 15 minutes
	20 * 60 * 1000, // 20 minutes
	25 * 60 * 1000, // 25 minutes
	30 * 60 * 1000 // 30 minutes - final check
]
```

### Status Update Logic

```typescript
updateStatusFromMessages(messageStatusCounts: {
  sent: number;
  delivered: number;
  failed: number;
  total: number;
}): boolean {
  // Campaign becomes FAILED if ALL messages failed
  if (failed === total && total > 0) {
    this._status = CampaignStatus.FAILED;
    return true;
  }
  // Otherwise remains SENT (partial success is still success)
  return false;
}
```

## Success Criteria

- ✅ **Campaign Lifecycle**: Create, update, schedule, send, and cancel campaigns
- ✅ **Mass Messaging**: Send campaigns to all organization contacts
- ✅ **Contact Filtering**: Automatic deduplication and unsubscribe filtering
- ✅ **Test Messages**: Send test messages without affecting campaign status
- ✅ **Asynchronous Processing**: Queue-based campaign and message processing
- 🔄 **Status Polling**: Automatic polling of message delivery status
- 🔄 **Status Updates**: Campaign status updates based on message results
- 🔄 **Error Handling**: Proper campaign failure detection and status management
- ✅ **Organization Scoping**: All operations respect organization boundaries
- ✅ **Integration**: Seamless integration with existing message and contact systems

## Questions & Decisions

### Resolved

- **Campaign Statuses**: DRAFT, SCHEDULED, SENT, CANCELLED, FAILED
- **Polling Strategy**: Multiple polling intervals over 30 minutes
- **Failure Logic**: Campaign marked FAILED only if ALL messages fail
- **Queue Integration**: Use existing BullMQ infrastructure
- **Contact Filtering**: Integrate with existing unsubscribe system

### Current Implementation

**Key Features:**

- ✅ **Clean Architecture**: Entity-driven design with clear responsibilities
- ✅ **Queue-Based Processing**: Asynchronous handling of large contact lists
- ✅ **Status Management**: Comprehensive campaign lifecycle tracking
- 🔄 **Smart Polling**: Configurable intervals for status checking
- 🔄 **Failure Detection**: Automatic campaign failure based on message results
- ✅ **Integration**: Seamless connection with existing message infrastructure

### Future Considerations

- Advanced campaign analytics and metrics
- Message delivery rate reporting
- Campaign performance optimization
- A/B testing for campaign content
- Integration with external analytics platforms
- Webhook notifications for campaign status changes
- Campaign template system for reusability
- Scheduled campaign recurring patterns
