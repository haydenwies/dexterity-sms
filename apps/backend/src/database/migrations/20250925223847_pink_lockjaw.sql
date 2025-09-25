ALTER TABLE "subscription" DROP CONSTRAINT "subscription_external_id_unique";--> statement-breakpoint
ALTER TABLE "organization" ADD COLUMN "email" text NOT NULL;