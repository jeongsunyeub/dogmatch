import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import sharp from "sharp";
import { z } from "zod";
import { nanoid } from "nanoid";

const upload = multer({ storage: multer.memoryStorage() });

// Face analysis simulation - in production, this would use actual AI services
function simulateFaceAnalysis(imageBuffer: Buffer) {
  // Simulate face feature extraction
  const features = {
    faceShape: Math.random() > 0.5 ? "round" : "angular",
    eyeSize: Math.random() > 0.5 ? "large" : "small",
    noseShape: Math.random() > 0.5 ? "broad" : "narrow",
    jawLine: Math.random() > 0.5 ? "strong" : "soft",
    facialHair: Math.random() > 0.3 ? "none" : "present",
    expression: Math.random() > 0.5 ? "happy" : "neutral"
  };

  return features;
}

function matchBreedFromFeatures(features: any, breeds: any[]) {
  // Simulate breed matching based on facial features
  const matches = breeds.map(breed => {
    let confidence = Math.random() * 40 + 40; // Base confidence 40-80%
    
    // Adjust confidence based on breed characteristics
    if (features.faceShape === "round") {
      if (["golden-retriever", "labrador-retriever", "beagle"].includes(breed.id)) {
        confidence += 15;
      }
    } else {
      if (["german-shepherd", "siberian-husky", "border-collie"].includes(breed.id)) {
        confidence += 15;
      }
    }

    if (features.expression === "happy") {
      if (["golden-retriever", "labrador-retriever", "beagle"].includes(breed.id)) {
        confidence += 10;
      }
    }

    // Ensure confidence doesn't exceed 95%
    confidence = Math.min(confidence, 95);
    
    return {
      breedId: breed.id,
      confidence: Math.round(confidence),
      breed: breed
    };
  });

  // Sort by confidence and return top matches
  return matches.sort((a, b) => b.confidence - a.confidence);
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all dog breeds
  app.get("/api/breeds", async (req, res) => {
    try {
      const breeds = await storage.getAllDogBreeds();
      res.json(breeds);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch breeds" });
    }
  });

  // Get specific breed
  app.get("/api/breeds/:id", async (req, res) => {
    try {
      const breed = await storage.getDogBreed(req.params.id);
      if (!breed) {
        return res.status(404).json({ error: "Breed not found" });
      }
      res.json(breed);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch breed" });
    }
  });

  // Upload and analyze face
  app.post("/api/analyze", upload.single("image"), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Validate image format
      const validMimeTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ error: "Invalid image format. Only JPG, PNG, and WebP are supported." });
      }

      // Process image with Sharp
      const processedImage = await sharp(req.file.buffer)
        .resize(512, 512, { fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 85 })
        .toBuffer();

      // Simulate face analysis
      const faceFeatures = simulateFaceAnalysis(processedImage);
      
      // Get all breeds for matching
      const breeds = await storage.getAllDogBreeds();
      
      // Match breeds based on features
      const breedMatches = matchBreedFromFeatures(faceFeatures, breeds);
      
      // Create session ID
      const sessionId = nanoid();
      
      // Store analysis result
      const analysisResult = await storage.createAnalysisResult({
        sessionId,
        faceFeatures,
        breedMatches,
        topMatchId: breedMatches[0].breedId,
        confidence: breedMatches[0].confidence
      });

      res.json({
        sessionId,
        matches: breedMatches.slice(0, 3), // Return top 3 matches
        topMatch: breedMatches[0],
        analysisId: analysisResult.id
      });

    } catch (error) {
      console.error("Analysis error:", error);
      res.status(500).json({ error: "Failed to analyze image" });
    }
  });

  // Get analysis result
  app.get("/api/analysis/:sessionId", async (req, res) => {
    try {
      const result = await storage.getAnalysisResult(req.params.sessionId);
      if (!result) {
        return res.status(404).json({ error: "Analysis result not found" });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analysis result" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
