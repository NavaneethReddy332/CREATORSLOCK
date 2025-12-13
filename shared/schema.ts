import { pgTable, text, serial, timestamp, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),
  displayName: varchar("display_name", { length: 255 }),
  profileImage: text("profile_image"),
  bannerColor: varchar("banner_color", { length: 7 }).default("#6366f1"),
  accentColor: varchar("accent_color", { length: 7 }).default("#8b5cf6"),
  audienceMessage: text("audience_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

export const connections = pgTable("connections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  platform: varchar("platform", { length: 100 }).notNull(),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

export const lockedLinks = pgTable("locked_links", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  targetUrl: text("target_url").notNull(),
  unlockCode: varchar("unlock_code", { length: 255 }).notNull().unique(),
  requiredActions: text("required_actions").notNull(),
  expiresAt: timestamp("expires_at"),
  customUnlockMessage: text("custom_unlock_message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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

export const unlockAttempts = pgTable("unlock_attempts", {
  id: serial("id").primaryKey(),
  linkId: integer("link_id").notNull().references(() => lockedLinks.id, { onDelete: "cascade" }),
  completedActions: text("completed_actions").notNull().default("[]"),
  unlocked: boolean("unlocked").default(false).notNull(),
  unlockedAt: timestamp("unlocked_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
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
