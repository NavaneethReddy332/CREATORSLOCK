import { pgTable, text, serial, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
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

// Social connections
export const connections = pgTable("connections", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull().references(() => users.id),
  platform: text("platform").notNull(), // "YouTube", "Instagram", "TikTok"
  handle: text("handle").notNull(),
  active: boolean("active").default(true).notNull(),
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

// Locked links
export const lockedLinks = pgTable("locked_links", {
  id: serial("id").primaryKey(),
  userId: serial("user_id").notNull().references(() => users.id),
  targetUrl: text("target_url").notNull(),
  unlockCode: text("unlock_code").notNull().unique(),
  requiredActions: jsonb("required_actions").notNull().$type<Array<{
    platform: string;
    action: string;
    connectionId: number;
  }>>(),
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

// Unlock attempts tracking
export const unlockAttempts = pgTable("unlock_attempts", {
  id: serial("id").primaryKey(),
  linkId: serial("link_id").notNull().references(() => lockedLinks.id),
  completedActions: jsonb("completed_actions").$type<string[]>().notNull().default(sql`'[]'::jsonb`),
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
