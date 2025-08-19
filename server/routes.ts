import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertSignupSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/signup", async (req, res) => {
    try {
      const validatedData = insertSignupSchema.parse(req.body);
      
      // Check if email already exists
      const existingSignup = await storage.getSignupByEmail(validatedData.email);
      if (existingSignup) {
        return res.status(400).json({ 
          message: "This email is already registered for early access." 
        });
      }

      const signup = await storage.createSignup(validatedData);
      
      res.status(201).json({ 
        message: "Successfully signed up for early access!",
        id: signup.id 
      });
    } catch (error: any) {
      if (error.name === "ZodError") {
        return res.status(400).json({ 
          message: "Validation failed",
          errors: error.errors 
        });
      }
      
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
