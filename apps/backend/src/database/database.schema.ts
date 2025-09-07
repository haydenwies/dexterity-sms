import { foreignKey, pgTable, primaryKey, text, timestamp, uuid } from "drizzle-orm/pg-core"

// #region user

const userTable = pgTable("user", {
	id: uuid("id").primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	email: text("email").notNull(),
	password: text("password").notNull(),
	createdAt: timestamp("created_at", { mode: "date" }).notNull(),
	updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
})

// #region account

const accountTable = pgTable(
	"account",
	{
		id: uuid("id").primaryKey(),
		userId: uuid("user_id").notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("provider_account_id").notNull(),
		password: text("password"),
		createdAt: timestamp("created_at", { mode: "date" }).notNull(),
		updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userTable.id]
		})
	]
)

// #region session

const sessionTable = pgTable(
	"session",
	{
		id: uuid("id").primaryKey(),
		userId: uuid("user_id").notNull(),
		createdAt: timestamp("created_at", { mode: "date" }).notNull(),
		updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
	},
	(table) => [
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userTable.id]
		})
	]
)

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

// #region organization_user

const organizationUserTable = pgTable(
	"organization_user",
	{
		userId: uuid("user_id").notNull(),
		organizationId: uuid("organization_id").notNull(),
		createdAt: timestamp("created_at", { mode: "date" }).notNull(),
		updatedAt: timestamp("updated_at", { mode: "date" }).notNull()
	},
	(table) => [
		primaryKey({
			columns: [table.userId, table.organizationId]
		}),
		foreignKey({
			columns: [table.userId],
			foreignColumns: [userTable.id]
		}),
		foreignKey({
			columns: [table.organizationId],
			foreignColumns: [organizationTable.id]
		})
	]
)

export { accountTable, organizationTable, organizationUserTable, sessionTable, userTable, verificationTokenTable }
