import { 
  users, 
  connections,
  lockedLinks,
  unlockAttempts,
  type User, 
  type InsertUser,
  type Connection,
  type InsertConnection,
  type LockedLink,
  type UnlockAttempt,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

interface RequiredAction {
  platform: string;
  action: string;
  connectionId: number;
}

interface LockedLinkInput {
  userId: number;
  targetUrl: string;
  unlockCode: string;
  requiredActions: RequiredAction[];
}

interface UnlockAttemptInput {
  linkId: number;
  completedActions?: string[];
  unlocked?: boolean;
  unlockedAt?: string | null;
}

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<Pick<User, "username" | "password" | "displayName" | "profileImage" | "bannerColor" | "accentColor" | "audienceMessage">>): Promise<User | undefined>;
  deleteUser(id: number): Promise<void>;

  getUserConnections(userId: number): Promise<Connection[]>;
  getConnection(id: number): Promise<Connection | undefined>;
  createConnection(connection: { userId: number; platform: string; url: string }): Promise<Connection>;
  updateConnection(id: number, data: Partial<Pick<Connection, "platform" | "url">>): Promise<Connection | undefined>;
  deleteConnection(id: number): Promise<void>;

  getUserLockedLinks(userId: number): Promise<(LockedLink & { parsedRequiredActions: RequiredAction[] })[]>;
  getLockedLinkByCode(unlockCode: string): Promise<(LockedLink & { parsedRequiredActions: RequiredAction[] }) | undefined>;
  createLockedLink(link: LockedLinkInput): Promise<LockedLink>;

  createUnlockAttempt(attempt: UnlockAttemptInput): Promise<UnlockAttempt>;
  getUnlockAttempt(linkId: number): Promise<(UnlockAttempt & { parsedCompletedActions: string[] }) | undefined>;
  updateUnlockAttempt(id: number, data: Partial<UnlockAttemptInput>): Promise<UnlockAttempt | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async updateUser(id: number, data: Partial<Pick<User, "username" | "password" | "displayName" | "profileImage" | "bannerColor" | "accentColor" | "audienceMessage">>): Promise<User | undefined> {
    const [user] = await db.update(users).set(data).where(eq(users.id, id)).returning();
    return user || undefined;
  }

  async deleteUser(id: number): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async getUserConnections(userId: number): Promise<Connection[]> {
    return await db.select().from(connections).where(eq(connections.userId, userId));
  }

  async getConnection(id: number): Promise<Connection | undefined> {
    const [connection] = await db.select().from(connections).where(eq(connections.id, id));
    return connection || undefined;
  }

  async createConnection(connection: { userId: number; platform: string; url: string }): Promise<Connection> {
    const [newConnection] = await db.insert(connections).values(connection).returning();
    return newConnection;
  }

  async updateConnection(id: number, data: Partial<Pick<Connection, "platform" | "url">>): Promise<Connection | undefined> {
    const [connection] = await db.update(connections).set(data).where(eq(connections.id, id)).returning();
    return connection || undefined;
  }

  async deleteConnection(id: number): Promise<void> {
    await db.delete(connections).where(eq(connections.id, id));
  }

  async getUserLockedLinks(userId: number): Promise<(LockedLink & { parsedRequiredActions: RequiredAction[] })[]> {
    const links = await db.select().from(lockedLinks).where(eq(lockedLinks.userId, userId));
    return links.map(link => ({
      ...link,
      parsedRequiredActions: JSON.parse(link.requiredActions) as RequiredAction[]
    }));
  }

  async getLockedLinkByCode(unlockCode: string): Promise<(LockedLink & { parsedRequiredActions: RequiredAction[] }) | undefined> {
    const [link] = await db.select().from(lockedLinks).where(eq(lockedLinks.unlockCode, unlockCode));
    if (!link) return undefined;
    return {
      ...link,
      parsedRequiredActions: JSON.parse(link.requiredActions) as RequiredAction[]
    };
  }

  async createLockedLink(link: LockedLinkInput): Promise<LockedLink> {
    const [newLink] = await db.insert(lockedLinks).values({
      userId: link.userId,
      targetUrl: link.targetUrl,
      unlockCode: link.unlockCode,
      requiredActions: JSON.stringify(link.requiredActions),
    }).returning();
    return newLink;
  }

  async createUnlockAttempt(attempt: UnlockAttemptInput): Promise<UnlockAttempt> {
    const [newAttempt] = await db.insert(unlockAttempts).values({
      linkId: attempt.linkId,
      completedActions: JSON.stringify(attempt.completedActions || []),
      unlocked: attempt.unlocked,
      unlockedAt: attempt.unlockedAt,
    }).returning();
    return newAttempt;
  }

  async getUnlockAttempt(linkId: number): Promise<(UnlockAttempt & { parsedCompletedActions: string[] }) | undefined> {
    const [attempt] = await db
      .select()
      .from(unlockAttempts)
      .where(eq(unlockAttempts.linkId, linkId))
      .orderBy(desc(unlockAttempts.createdAt))
      .limit(1);
    if (!attempt) return undefined;
    return {
      ...attempt,
      parsedCompletedActions: JSON.parse(attempt.completedActions) as string[]
    };
  }

  async updateUnlockAttempt(id: number, data: Partial<UnlockAttemptInput>): Promise<UnlockAttempt | undefined> {
    const updateData: Record<string, unknown> = {};
    if (data.completedActions !== undefined) {
      updateData.completedActions = JSON.stringify(data.completedActions);
    }
    if (data.unlocked !== undefined) {
      updateData.unlocked = data.unlocked;
    }
    if (data.unlockedAt !== undefined) {
      updateData.unlockedAt = data.unlockedAt;
    }
    const [updated] = await db
      .update(unlockAttempts)
      .set(updateData)
      .where(eq(unlockAttempts.id, id))
      .returning();
    return updated || undefined;
  }
}

export const storage = new DatabaseStorage();
