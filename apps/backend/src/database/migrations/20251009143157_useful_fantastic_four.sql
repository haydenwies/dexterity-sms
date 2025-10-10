ALTER TABLE "message" DROP CONSTRAINT "message_conversation_id_conversation_id_fk";
--> statement-breakpoint
ALTER TABLE "message" DROP CONSTRAINT "message_campaign_id_campaign_id_fk";
--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_conversation_id_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "public"."conversation"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_campaign_id_campaign_id_fk" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaign"("id") ON DELETE set null ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE "message" DROP COLUMN "read_at";