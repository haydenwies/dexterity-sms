ALTER TABLE "sender" ADD COLUMN "external_id" text;--> statement-breakpoint
ALTER TABLE "sender" ADD CONSTRAINT "sender_external_id_unique" UNIQUE("external_id");