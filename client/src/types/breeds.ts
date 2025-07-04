export interface DogBreed {
  id: string;
  name: string;
  nameKo: string;
  origin: string;
  size: string;
  lifespan: string;
  characteristics: string[];
  care: string[];
  imageUrl: string;
  personality: {
    friendliness: number;
    energy: number;
    intelligence: number;
    trainability: number;
  };
}

export interface BreedMatch {
  breedId: string;
  confidence: number;
  breed: DogBreed;
}

export interface AnalysisResult {
  sessionId: string;
  matches: BreedMatch[];
  topMatch: BreedMatch;
  analysisId: number;
}

export interface FaceFeatures {
  faceShape: string;
  eyeSize: string;
  noseShape: string;
  jawLine: string;
  facialHair: string;
  expression: string;
}
