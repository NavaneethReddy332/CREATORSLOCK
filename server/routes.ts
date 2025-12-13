import type { Express, Request, Response, NextFunction } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertConnectionSchema, insertLockedLinkSchema } from "@shared/schema";
import { ZodError, z } from "zod";
import bcrypt from "bcryptjs";

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

function detectPlatform(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "YouTube";
  if (lower.includes("instagram.com")) return "Instagram";
  if (lower.includes("tiktok.com")) return "TikTok";
  if (lower.includes("twitter.com") || lower.includes("x.com")) return "Twitter";
  if (lower.includes("facebook.com") || lower.includes("fb.com")) return "Facebook";
  if (lower.includes("twitch.tv")) return "Twitch";
  if (lower.includes("linkedin.com")) return "LinkedIn";
  if (lower.includes("discord.gg") || lower.includes("discord.com")) return "Discord";
  if (lower.includes("github.com")) return "GitHub";
  if (lower.includes("pinterest.com")) return "Pinterest";
  if (lower.includes("snapchat.com")) return "Snapchat";
  if (lower.includes("reddit.com")) return "Reddit";
  if (lower.includes("telegram.org") || lower.includes("t.me")) return "Telegram";
  if (lower.includes("spotify.com")) return "Spotify";
  return "Website";
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  const registerSchema = z.object({
    username: z.string().min(3).max(30),
    email: z.string().email(),
    password: z.string().min(8),
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const data = registerSchema.parse(req.body);
      
      const existingUsername = await storage.getUserByUsername(data.username);
      if (existingUsername) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const existingEmail = await storage.getUserByEmail(data.email);
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const user = await storage.createUser({
        username: data.username,
        email: data.email,
        password: hashedPassword,
      });

      req.session.userId = user.id;
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors[0]?.message || "Validation error" });
      }
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      req.session.userId = user.id;
      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.json({ success: true });
    });
  });

  app.get("/api/auth/me", async (req, res) => {
    if (!req.session.userId) {
      return res.json({ user: null });
    }

    const user = await storage.getUser(req.session.userId);
    if (!user) {
      return res.json({ user: null });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  });

  app.get("/api/account/profile", requireAuth, async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
  });

  app.put("/api/account/profile", requireAuth, async (req, res) => {
    try {
      const { username, displayName, profileImage, bannerColor, accentColor, audienceMessage } = req.body;
      
      const updateData: Record<string, any> = {};
      
      if (username !== undefined) {
        if (!username || username.length < 3 || username.length > 30) {
          return res.status(400).json({ error: "Username must be 3-30 characters" });
        }
        const existing = await storage.getUserByUsername(username);
        if (existing && existing.id !== req.session.userId) {
          return res.status(400).json({ error: "Username already taken" });
        }
        updateData.username = username;
      }
      
      if (displayName !== undefined) updateData.displayName = displayName;
      if (profileImage !== undefined) updateData.profileImage = profileImage;
      if (bannerColor !== undefined) updateData.bannerColor = bannerColor;
      if (accentColor !== undefined) updateData.accentColor = accentColor;
      if (audienceMessage !== undefined) updateData.audienceMessage = audienceMessage;

      const user = await storage.updateUser(req.session.userId!, updateData);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password: _, ...userWithoutPassword } = user;
      res.json({ user: userWithoutPassword });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/account/security/password", requireAuth, async (req, res) => {
    try {
      const { currentPassword, newPassword } = req.body;

      if (!newPassword || newPassword.length < 8) {
        return res.status(400).json({ error: "New password must be at least 8 characters" });
      }

      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Current password is incorrect" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      await storage.updateUser(req.session.userId!, { password: hashedPassword });

      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/account", requireAuth, async (req, res) => {
    try {
      const { password } = req.body;

      const user = await storage.getUser(req.session.userId!);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(401).json({ error: "Password is incorrect" });
      }

      await storage.deleteUser(req.session.userId!);
      
      req.session.destroy((err) => {
        if (err) {
          console.error(err);
        }
        res.clearCookie("connect.sid");
        res.json({ success: true });
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/connections", requireAuth, async (req, res) => {
    try {
      const connections = await storage.getUserConnections(req.session.userId!);
      res.json({ connections });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/connections", requireAuth, async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const platform = detectPlatform(url);
      const connection = await storage.createConnection({
        userId: req.session.userId!,
        platform,
        url,
      });
      res.json({ connection });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.put("/api/connections/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { url } = req.body;

      const existing = await storage.getConnection(id);
      if (!existing || existing.userId !== req.session.userId) {
        return res.status(404).json({ error: "Connection not found" });
      }

      const platform = detectPlatform(url);
      const connection = await storage.updateConnection(id, { url, platform });
      res.json({ connection });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.delete("/api/connections/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      
      const existing = await storage.getConnection(id);
      if (!existing || existing.userId !== req.session.userId) {
        return res.status(404).json({ error: "Connection not found" });
      }

      await storage.deleteConnection(id);
      res.json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/links", requireAuth, async (req, res) => {
    try {
      const links = await storage.getUserLockedLinks(req.session.userId!);
      res.json({ links });
    } catch (error) {
      console.error(error);
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

      const actionsWithUrls = await Promise.all(
        link.parsedRequiredActions.map(async (action) => {
          const connection = await storage.getConnection(action.connectionId);
          return {
            ...action,
            url: connection?.url || null,
          };
        })
      );

      res.json({ 
        link: {
          ...link,
          parsedRequiredActions: actionsWithUrls,
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/links", requireAuth, async (req, res) => {
    try {
      const { targetUrl, unlockCode, requiredActions } = req.body;
      
      if (!targetUrl || !unlockCode || !requiredActions) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const link = await storage.createLockedLink({
        userId: req.session.userId!,
        targetUrl,
        unlockCode,
        requiredActions,
      });
      res.json({ link });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/unlock", async (req, res) => {
    try {
      const { linkId } = req.body;
      
      let attempt = await storage.getUnlockAttempt(linkId);
      
      if (!attempt) {
        const newAttempt = await storage.createUnlockAttempt({
          linkId,
          completedActions: [],
          unlocked: false,
        });
        res.json({ attempt: { ...newAttempt, parsedCompletedActions: [] } });
        return;
      }

      res.json({ attempt });
    } catch (error) {
      console.error(error);
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
        unlockedAt: unlockedAt || undefined,
      });

      res.json({ attempt });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
}
