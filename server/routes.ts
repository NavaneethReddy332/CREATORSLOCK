import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertConnectionSchema, insertLockedLinkSchema } from "@shared/schema";
import { ZodError } from "zod";
import bcrypt from "bcryptjs";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = insertUserSchema.parse(req.body);
      
      const existingUser = await storage.getUserByUsername(data.username);
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await storage.createUser({
        username: data.username,
        password: hashedPassword,
      });

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Connections routes
  app.get("/api/connections", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      if (!userId) {
        return res.status(400).json({ error: "userId required" });
      }

      const connections = await storage.getUserConnections(userId);
      res.json({ connections });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/connections", async (req, res) => {
    try {
      const data = insertConnectionSchema.parse(req.body);
      const connection = await storage.createConnection(data);
      res.json({ connection });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/connections/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteConnection(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Locked links routes
  app.get("/api/links", async (req, res) => {
    try {
      const userId = parseInt(req.query.userId as string);
      if (!userId) {
        return res.status(400).json({ error: "userId required" });
      }

      const links = await storage.getUserLockedLinks(userId);
      res.json({ links });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/links/:code", async (req, res) => {
    try {
      const code = req.params.code;
      const link = await storage.getLockedLinkByCode(code);
      
      if (!link) {
        return res.status(404).json({ error: "Link not found" });
      }

      res.json({ link });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/links", async (req, res) => {
    try {
      const data = insertLockedLinkSchema.parse(req.body);
      const link = await storage.createLockedLink(data);
      res.json({ link });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // Unlock attempts routes
  app.post("/api/unlock", async (req, res) => {
    try {
      const { linkId } = req.body;
      
      let attempt = await storage.getUnlockAttempt(linkId);
      
      if (!attempt) {
        attempt = await storage.createUnlockAttempt({
          linkId,
          completedActions: [],
          unlocked: false,
        });
      }

      res.json({ attempt });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.patch("/api/unlock/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { completedActions, unlocked, unlockedAt } = req.body;
      
      const attempt = await storage.updateUnlockAttempt(id, {
        completedActions,
        unlocked,
        unlockedAt: unlockedAt ? new Date(unlockedAt) : undefined,
      });

      res.json({ attempt });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
