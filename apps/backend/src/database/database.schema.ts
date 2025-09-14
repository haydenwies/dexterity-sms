import { pgTable, primaryKey, text, timestamp, unique, uuid } from "drizzle-orm/pg-core"

// #region user

const userTable = pgTable("user", {
	id: uuid("id").primaryKey(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text("email").unique().notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #endregion

// #region account

const accountTable = pgTable("account", {
	id: uuid("id").primaryKey(),
	userId: uuid("user_id")
		.references(() => userTable.id, { onUpdate: "cascade", onDelete: "cascade" })
		.notNull(),
	provider: text("provider").notNull(),
	providerAccountId: text("provider_account_id").notNull(),
	password: text("password"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #endregion

// #region session

const sessionTable = pgTable("session", {
	id: uuid("id").primaryKey(),
	userId: uuid("user_id")
		.references(() => userTable.id, { onUpdate: "cascade", onDelete: "cascade" })
		.notNull(),
	expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #endregion

// #region verification_token

const verificationTokenTable = pgTable("verification_token", {
	id: uuid("id").primaryKey(),
	type: text("type").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #endregion

// #region organization

const organizationTable = pgTable("organization", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #endregion

// #region member

const memberTable = pgTable(
	"member",
	{
		userId: uuid("user_id")
			.references(() => userTable.id, { onUpdate: "cascade", onDelete: "cascade" })
			.notNull(),
		organizationId: uuid("organization_id")
			.references(() => organizationTable.id, { onUpdate: "cascade", onDelete: "cascade" })
			.notNull(),
		createdAt: timestamp("created_at", { mode: "date" }).notNull(),
		updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
	},
	(table) => [
		primaryKey({
			columns: [table.userId, table.organizationId]
		})
	]
)

// #endregion

// #region contact

const contactTable = pgTable("contact", {
	id: uuid("id").primaryKey(),
	organizationId: uuid("organization_id")
		.references(() => organizationTable.id, { onUpdate: "cascade", onDelete: "cascade" })
		.notNull(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text("email"),
	phone: text("phone"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #endregion

// #region campaign

const campaignTable = pgTable("campaign", {
	id: uuid("id").primaryKey(),
	organizationId: uuid("organization_id")
		.references(() => organizationTable.id, { onUpdate: "cascade", onDelete: "cascade" })
		.notNull(),
	status: text("status").notNull(),
	name: text("name").notNull(),
	body: text("body"),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #endregion

// #region sender

const senderTable = pgTable("sender", {
	organizationId: uuid("organization_id")
		.references(() => organizationTable.id, { onUpdate: "cascade", onDelete: "cascade" })
		.primaryKey(),
	phone: text("phone").unique().notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull()
})

// #endregion

// #region message

const messageTable = pgTable("message", {
	id: uuid("id").primaryKey(),
	externalId: text("external_id"),
	organizationId: uuid("organization_id")
		.references(() => organizationTable.id, {
			onUpdate: "cascade",
			onDelete: "cascade"
		})
		.notNull(),
	conversationId: uuid("conversation_id").references(() => conversationTable.id, {
		onUpdate: "cascade",
		onDelete: "cascade"
	}),
	campaignId: uuid("campaign_id").references(() => campaignTable.id, {
		onUpdate: "cascade",
		onDelete: "cascade"
	}),
	direction: text("direction").notNull(),
	status: text("status").notNull(),
	from: text("from").notNull(),
	to: text("to").notNull(),
	body: text("body").notNull(),
	sentAt: timestamp("sent_at", { mode: "date" }),
	deliveredAt: timestamp("delivered_at", { mode: "date" }),
	readAt: timestamp("read_at", { mode: "date" }),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #endregion

// #region conversation

const conversationTable = pgTable(
	"conversation",
	{
		id: uuid("id").primaryKey(),
		organizationId: uuid("organization_id")
			.references(() => organizationTable.id, { onUpdate: "cascade", onDelete: "cascade" })
			.notNull(),
		recipient: text("recipient").notNull(), // phone number
		createdAt: timestamp("created_at", { mode: "date" }).notNull(),
		updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
	},
	(table) => ({
		// Unique constraint: one conversation per organization-recipient pair
		uniqueOrgRecipient: unique().on(table.organizationId, table.recipient)
	})
)

// #endregion

export {
	accountTable,
	campaignTable,
	contactTable,
	conversationTable,
	memberTable,
	messageTable,
	organizationTable,
	senderTable,
	sessionTable,
	userTable,
	verificationTokenTable
}
