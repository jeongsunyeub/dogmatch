import { pgTable, text, serial, integer, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const analysisResults = pgTable("analysis_results", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(),
  faceFeatures: json("face_features").notNull(),
  breedMatches: json("breed_matches").notNull(),
  topMatchId: text("top_match_id").notNull(),
  confidence: integer("confidence").notNull(),
});

export const dogBreeds = pgTable("dog_breeds", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  nameKo: text("name_ko").notNull(),
  origin: text("origin").notNull(),
  size: text("size").notNull(),
  lifespan: text("lifespan").notNull(),
  characteristics: json("characteristics").notNull(),
  care: json("care").notNull(),
  imageUrl: text("image_url").notNull(),
  personality: json("personality").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertAnalysisResultSchema = createInsertSchema(analysisResults).omit({
  id: true,
});

export const insertDogBreedSchema = createInsertSchema(dogBreeds);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type AnalysisResult = typeof analysisResults.$inferSelect;
export type InsertAnalysisResult = z.infer<typeof insertAnalysisResultSchema>;
export type DogBreed = typeof dogBreeds.$inferSelect;
export type InsertDogBreed = z.infer<typeof insertDogBreedSchema>;
