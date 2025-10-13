enum MessageStatus {
	PENDING = "processing", // TODO: Change to processing
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

export { MessageDirection, MessageStatus }
