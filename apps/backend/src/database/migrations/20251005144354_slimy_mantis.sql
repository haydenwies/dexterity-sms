ALTER TABLE "campaign" ADD COLUMN "scheduled_at" timestamp;--> statement-breakpoint
ALTER TABLE "campaign" ADD COLUMN "sent_at" timestamp;--> statement-breakpoint
ALTER TABLE "campaign" ADD COLUMN "failed_at" timestamp;--> statement-breakpoint
ALTER TABLE "campaign" ADD COLUMN "cancelled_at" timestamp;