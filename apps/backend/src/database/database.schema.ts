import { pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core"

// #region user

const userTable = pgTable("user", {
	id: uuid("id").primaryKey(),
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text("email").unique().notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

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

// #region verification_token

const verificationTokenTable = pgTable("verification_token", {
	id: uuid("id").primaryKey(),
	type: text("type").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #region organization

const organizationTable = pgTable("organization", {
	id: uuid("id").primaryKey(),
	name: text("name").notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

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

export { accountTable, memberTable, organizationTable, sessionTable, userTable, verificationTokenTable }
