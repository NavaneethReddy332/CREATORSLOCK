import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  profileImage: text("profile_image"),
  bannerColor: text("banner_color").default("#6366f1"),
  accentColor: text("accent_color").default("#8b5cf6"),
  audienceMessage: text("audience_message"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  connections: many(connections),
  lockedLinks: many(lockedLinks),
}));

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const connections = sqliteTable("connections", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  platform: text("platform").notNull(),
  url: text("url").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const connectionsRelations = relations(connections, ({ one }) => ({
  user: one(users, {
    fields: [connections.userId],
    references: [users.id],
  }),
}));

export const insertConnectionSchema = createInsertSchema(connections).omit({
  id: true,
  createdAt: true,
});
export type InsertConnection = z.infer<typeof insertConnectionSchema>;
export type Connection = typeof connections.$inferSelect;

export const lockedLinks = sqliteTable("locked_links", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetUrl: text("target_url").notNull(),
  unlockCode: text("unlock_code").notNull().unique(),
  requiredActions: text("required_actions").notNull(),
  expiresAt: text("expires_at"),
  customUnlockMessage: text("custom_unlock_message"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const lockedLinksRelations = relations(lockedLinks, ({ one, many }) => ({
  user: one(users, {
    fields: [lockedLinks.userId],
    references: [users.id],
  }),
  unlockAttempts: many(unlockAttempts),
}));

export const insertLockedLinkSchema = createInsertSchema(lockedLinks).omit({
  id: true,
  createdAt: true,
});
export type InsertLockedLink = z.infer<typeof insertLockedLinkSchema>;
export type LockedLink = typeof lockedLinks.$inferSelect;

export const unlockAttempts = sqliteTable("unlock_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  linkId: integer("link_id").notNull().references(() => lockedLinks.id, { onDelete: "cascade" }),
  completedActions: text("completed_actions").notNull().default("[]"),
  unlocked: integer("unlocked", { mode: "boolean" }).default(false).notNull(),
  unlockedAt: text("unlocked_at"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`).notNull(),
});

export const unlockAttemptsRelations = relations(unlockAttempts, ({ one }) => ({
  lockedLink: one(lockedLinks, {
    fields: [unlockAttempts.linkId],
    references: [lockedLinks.id],
  }),
}));

export const insertUnlockAttemptSchema = createInsertSchema(unlockAttempts).omit({
  id: true,
  createdAt: true,
});
export type InsertUnlockAttempt = z.infer<typeof insertUnlockAttemptSchema>;
export type UnlockAttempt = typeof unlockAttempts.$inferSelect;
