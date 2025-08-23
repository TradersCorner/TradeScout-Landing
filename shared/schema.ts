import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, boolean, integer, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const signups = pgTable("signups", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  name: text("name"),
  state: text("state"),
  roles: text("roles").array(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contractors = pgTable("contractors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  specialties: text("specialties").array(),
  state: text("state").notNull(),
  city: text("city"),
  licenseNumber: text("license_number"),
  insuranceVerified: boolean("insurance_verified").default(false),
  backgroundCheckPassed: boolean("background_check_passed").default(false),
  yearsExperience: integer("years_experience"),
  completedProjects: integer("completed_projects").default(0),
  averageRating: decimal("average_rating", { precision: 3, scale: 2 }),
  trustScore: integer("trust_score").default(0),
  verificationStatus: text("verification_status").default("pending"),
  profileImage: text("profile_image"),
  bio: text("bio"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertSignupSchema = createInsertSchema(signups).omit({
  id: true,
  createdAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  state: z.string().optional(),
  name: z.string().optional(),
  roles: z.array(z.enum(["Homeowner", "Contractor", "Service Provider"])).min(1, "Please select at least one role"),
  message: z.string().optional(),
});

export const insertContractorSchema = createInsertSchema(contractors).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  email: z.string().email("Please enter a valid email address"),
  name: z.string().min(1, "Name is required"),
  state: z.string().min(1, "State is required"),
  specialties: z.array(z.string()).min(1, "At least one specialty is required"),
  yearsExperience: z.number().min(0).optional(),
  phone: z.string().optional(),
  city: z.string().optional(),
  licenseNumber: z.string().optional(),
  bio: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertSignup = z.infer<typeof insertSignupSchema>;
export type Signup = typeof signups.$inferSelect;
export type InsertContractor = z.infer<typeof insertContractorSchema>;
export type Contractor = typeof contractors.$inferSelect;
