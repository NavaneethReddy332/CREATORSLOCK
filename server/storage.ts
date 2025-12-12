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
  type InsertLockedLink,
  type UnlockAttempt,
  type InsertUnlockAttempt
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Connections
  getUserConnections(userId: number): Promise<Connection[]>;
  getConnection(id: number): Promise<Connection | undefined>;
  createConnection(connection: InsertConnection): Promise<Connection>;
  deleteConnection(id: number): Promise<void>;

  // Locked Links
  getUserLockedLinks(userId: number): Promise<LockedLink[]>;
  getLockedLinkByCode(unlockCode: string): Promise<LockedLink | undefined>;
  createLockedLink(link: InsertLockedLink): Promise<LockedLink>;

  // Unlock Attempts
  createUnlockAttempt(attempt: InsertUnlockAttempt): Promise<UnlockAttempt>;
  getUnlockAttempt(linkId: number): Promise<UnlockAttempt | undefined>;
  updateUnlockAttempt(id: number, data: Partial<UnlockAttempt>): Promise<UnlockAttempt | undefined>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  // Connections
  async getUserConnections(userId: number): Promise<Connection[]> {
    return await db.select().from(connections).where(eq(connections.userId, userId));
  }

  async getConnection(id: number): Promise<Connection | undefined> {
    const [connection] = await db.select().from(connections).where(eq(connections.id, id));
    return connection || undefined;
  }

  async createConnection(connection: InsertConnection): Promise<Connection> {
    const [newConnection] = await db
      .insert(connections)
      .values(connection)
      .returning();
    return newConnection;
  }

  async deleteConnection(id: number): Promise<void> {
    await db.delete(connections).where(eq(connections.id, id));
  }

  // Locked Links
  async getUserLockedLinks(userId: number): Promise<LockedLink[]> {
    return await db.select().from(lockedLinks).where(eq(lockedLinks.userId, userId));
  }

  async getLockedLinkByCode(unlockCode: string): Promise<LockedLink | undefined> {
    const [link] = await db.select().from(lockedLinks).where(eq(lockedLinks.unlockCode, unlockCode));
    return link || undefined;
  }

  async createLockedLink(link: InsertLockedLink): Promise<LockedLink> {
    const [newLink] = await db
      .insert(lockedLinks)
      .values(link)
      .returning();
    return newLink;
  }

  // Unlock Attempts
  async createUnlockAttempt(attempt: InsertUnlockAttempt): Promise<UnlockAttempt> {
    const [newAttempt] = await db
      .insert(unlockAttempts)
      .values(attempt)
      .returning();
    return newAttempt;
  }

  async getUnlockAttempt(linkId: number): Promise<UnlockAttempt | undefined> {
    const [attempt] = await db
      .select()
      .from(unlockAttempts)
      .where(eq(unlockAttempts.linkId, linkId))
      .orderBy(unlockAttempts.createdAt)
      .limit(1);
    return attempt || undefined;
  }

  async updateUnlockAttempt(id: number, data: Partial<UnlockAttempt>): Promise<UnlockAttempt | undefined> {
    const [updated] = await db
      .update(unlockAttempts)
      .set(data)
      .where(eq(unlockAttempts.id, id))
      .returning();
    return updated || undefined;
  }
}

export const storage = new DatabaseStorage();
