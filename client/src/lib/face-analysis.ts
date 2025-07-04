import { apiRequest } from "./queryClient";
import type { AnalysisResult } from "../types/breeds";

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("image", file);

  const response = await apiRequest("POST", "/api/analyze", formData);
  return response.json();
}

export async function getAnalysisResult(sessionId: string): Promise<AnalysisResult> {
  const response = await apiRequest("GET", `/api/analysis/${sessionId}`);
  return response.json();
}

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const validTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 10 * 1024 * 1024; // 10MB

  if (!validTypes.includes(file.type)) {
    return {
      isValid: false,
      error: "INVALID_FORMAT"
    };
  }

  if (file.size > maxSize) {
    return {
      isValid: false,
      error: "FILE_TOO_LARGE"
    };
  }

  return { isValid: true };
}
