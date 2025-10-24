enum MessageStatus {
	PROCESSING = "processing",
	SENT = "sent",
	DELIVERED = "delivered",
	FAILED = "failed",
	RECEIVED = "received"
}

enum MessageDirection {
	INBOUND = "inbound",
	OUTBOUND = "outbound"
}

enum MessageErrorCode {
	UNSUBSCRIBED = "unsubscribed",
	TEMPORARY_UNREACHABLE_DESTINATION = "temporary-unreachable-destination",
	PERMANENT_UNREACHABLE_DESTINATION = "permanent-unreachable-destination",
	MESSAGE_FILTERED = "message-filtered",
	UNKNOWN = "unknown"
}

export { MessageDirection, MessageErrorCode, MessageStatus }
