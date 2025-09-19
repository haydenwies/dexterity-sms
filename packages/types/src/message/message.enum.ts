enum MessageStatus {
	PENDING = "pending", // TODO: Change to processing
	SENT = "sent",
	DELIVERED = "delivered",
	FAILED = "failed",
	RECEIVED = "received",
	READ = "read"
}

enum MessageDirection {
	INBOUND = "inbound",
	OUTBOUND = "outbound"
}

export { MessageDirection, MessageStatus }
