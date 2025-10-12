<!-- 623ef9fb-49a9-449a-af34-da7c54efef1c 6d76f01b-0e61-46a5-8d13-3714c56e15e4 -->

# Add Unread Count Badge to Conversations Sidebar

## Overview

Implement a real-time unread conversation count badge on the sidebar's "Conversations" link. This will use a dedicated backend endpoint to fetch the total unread count (sum of all conversation unread counts) and SSE to stream real-time updates.

## Backend Implementation

### 1. Database Layer - ConversationRepository

**File:** `apps/backend/src/conversation/repositories/conversation.repository.ts`

Add a new method to aggregate total unread count:

```typescript
async getTotalUnreadCount(organizationId: string): Promise<number>
```

- Use Drizzle's `sum()` aggregation on `unreadCount` field
- Filter by `organizationId`

### 2. Service Layer - ConversationService

**File:** `apps/backend/src/conversation/conversation.service.ts`

Add two new methods following the existing SSE pattern:

**a) Fetch total unread count:**

```typescript
async getTotalUnreadCount(organizationId: string): Promise<number>
```

**b) Stream total unread count:**

```typescript
streamTotalUnreadCount(organizationId: string): Observable<number>
```

- Listen to `CONVERSATION_CREATED` and `CONVERSATION_UPDATED` events
- Filter by `organizationId`
- On each event, fetch fresh total from repository
- Return Observable that emits the new count

### 3. Controller Layer

**File:** `apps/backend/src/conversation/conversation.controller.ts`

Add two new endpoints following existing patterns:

**a) GET endpoint:**

```typescript
@Get("unread-count")
async getTotalUnreadCount(@Param("organizationId") organizationId: string)
```

- Returns `{ count: number }`

**b) SSE endpoint:**

```typescript
@Sse("unread-count/stream")
streamTotalUnreadCount(@Param("organizationId") organizationId: string)
```

- Returns `Observable<MessageEvent & { data: { count: number } }>`

### 4. Routes Package

**File:** `packages/routes/src/index.ts`

Add route definitions:

- `GET_TOTAL_UNREAD_COUNT(organizationId)`
- `STREAM_TOTAL_UNREAD_COUNT(organizationId)`

## Frontend Implementation

### 1. Update Type Definitions

**File:** `apps/web/src/components/sidebar/items.ts`

Add optional `badge` field to `SidebarItemLink`:

```typescript
type SidebarItemLink = {
	type: SidebarItemType.LINK
	title: string
	href: string
	icon?: IconName
	badge?: number // NEW
}
```

### 2. Data Layer - Fetcher

**File:** `apps/web/src/data/conversation/get-total-unread-count.ts` (new file)

Create server-side data fetcher:

```typescript
const getTotalUnreadCount = async (organizationId: string): Promise<number>
```

- Follows pattern from `get-many-conversations.ts`
- Fetches from backend using session token
- Returns the count number

### 3. Data Layer - SSE Hook

**File:** `apps/web/src/data/conversation/use-stream-total-unread-count.ts` (new file)

Create React hook for SSE streaming:

```typescript
const useStreamTotalUnreadCount = (initialCount: number): number
```

- Follows pattern from `use-stream-many-conversations.ts`
- Establishes EventSource connection
- Updates count state on message events
- Cleans up connection on unmount

### 4. Update Sidebar Content Component

**File:** `apps/web/src/components/sidebar/content.tsx`

Make component async and fetch unread count:

- Fetch initial count in server component
- Pass to client component wrapper
- Use SSE hook to stream updates
- Update the Conversations item with badge count

### 5. Update Sidebar Item Link Component

**File:** `apps/web/src/components/sidebar/content.tsx`

Update `SidebarItemLink` component to display badge:

- Check if `item.badge` exists and is > 0
- Render a Badge component next to the title
- Use `@repo/ui/components/badge` with appropriate styling

## Key Design Decisions

1. **Separate endpoint:** More efficient than fetching all conversations just for the count
2. **SSE for real-time updates:** Provides immediate feedback when new messages arrive
3. **Server component + client hook:** Initial count from server (fast), updates from SSE (real-time)
4. **Reuse existing patterns:** Follows established SSE, repository, and service patterns in the codebase

### To-dos

- [x] Add getTotalUnreadCount method to ConversationRepository
- [x] Add getTotalUnreadCount and streamTotalUnreadCount methods to ConversationService
- [x] Add GET and SSE endpoints to ConversationController
- [x] Add route definitions to routes package
- [x] Update SidebarItemLink type to include optional badge field
- [x] Create get-total-unread-count.ts data fetcher
- [x] Create use-stream-total-unread-count.ts SSE hook
- [x] Update sidebar components to fetch, stream, and display unread count badge
