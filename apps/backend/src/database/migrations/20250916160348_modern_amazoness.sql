ALTER TABLE "conversation" ADD COLUMN "unread_count" integer;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "last_message_preview" text;--> statement-breakpoint
ALTER TABLE "conversation" ADD COLUMN "last_message_at" timestamp;