enum MessageStatus {
	PENDING = "pending", // TODO: Change to processing
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
