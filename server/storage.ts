import { users, analysisResults, dogBreeds, type User, type InsertUser, type AnalysisResult, type InsertAnalysisResult, type DogBreed, type InsertDogBreed } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult>;
  getAnalysisResult(sessionId: string): Promise<AnalysisResult | undefined>;
  getDogBreed(id: string): Promise<DogBreed | undefined>;
  getAllDogBreeds(): Promise<DogBreed[]>;
  createDogBreed(breed: InsertDogBreed): Promise<DogBreed>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private analysisResults: Map<string, AnalysisResult>;
  private dogBreeds: Map<string, DogBreed>;
  private currentUserId: number;
  private currentAnalysisId: number;

  constructor() {
    this.users = new Map();
    this.analysisResults = new Map();
    this.dogBreeds = new Map();
    this.currentUserId = 1;
    this.currentAnalysisId = 1;
    
    // Initialize with dog breed data
    this.initializeDogBreeds();
  }

  private initializeDogBreeds() {
    const breeds: DogBreed[] = [
      {
        id: "golden-retriever",
        name: "Golden Retriever",
        nameKo: "골든 리트리버",
        origin: "스코틀랜드",
        size: "대형견",
        lifespan: "10-12년",
        characteristics: ["친근하고 온화한 성격", "아이들과 잘 어울리는 가족견", "높은 지능과 훈련 용이성", "활동량이 많아 충분한 운동 필요"],
        care: ["주 2-3회 정기적인 브러싱", "하루 1-2시간 충분한 운동", "정기적인 건강 검진 필요", "털 빠짐이 심한 편"],
        imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        personality: { friendliness: 5, energy: 4, intelligence: 5, trainability: 5 }
      },
      {
        id: "labrador-retriever",
        name: "Labrador Retriever",
        nameKo: "래브라도 리트리버",
        origin: "캐나다",
        size: "대형견",
        lifespan: "10-14년",
        characteristics: ["활동적이고 충성심 강한 견종", "수영을 좋아함", "뛰어난 회수 능력", "가족과의 유대감이 강함"],
        care: ["정기적인 운동 필수", "균형잡힌 식단 관리", "주 2회 브러싱", "귀 청결 유지"],
        imageUrl: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        personality: { friendliness: 5, energy: 5, intelligence: 4, trainability: 5 }
      },
      {
        id: "beagle",
        name: "Beagle",
        nameKo: "비글",
        origin: "영국",
        size: "중형견",
        lifespan: "12-15년",
        characteristics: ["호기심 많고 사교적인 중형견", "뛰어난 후각 능력", "활발하고 장난기 많음", "무리 생활을 좋아함"],
        care: ["충분한 운동과 정신적 자극", "체중 관리 중요", "정기적인 귀 청소", "탈출 방지 주의"],
        imageUrl: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        personality: { friendliness: 4, energy: 4, intelligence: 3, trainability: 3 }
      },
      {
        id: "german-shepherd",
        name: "German Shepherd",
        nameKo: "저먼 셰퍼드",
        origin: "독일",
        size: "대형견",
        lifespan: "9-13년",
        characteristics: ["충성심이 강하고 용감함", "뛰어난 작업견", "보호 본능이 강함", "높은 지능과 학습 능력"],
        care: ["충분한 운동과 정신적 자극", "정기적인 브러싱", "관절 건강 관리", "사회화 교육 중요"],
        imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        personality: { friendliness: 3, energy: 4, intelligence: 5, trainability: 5 }
      },
      {
        id: "poodle",
        name: "Poodle",
        nameKo: "푸들",
        origin: "독일/프랑스",
        size: "소형견~대형견",
        lifespan: "12-15년",
        characteristics: ["높은 지능과 학습 능력", "활발하고 장난기 많음", "알레르기 유발 적음", "다양한 크기"],
        care: ["정기적인 그루밍 필수", "충분한 정신적 자극", "운동량 적당히", "털 관리 중요"],
        imageUrl: "https://images.unsplash.com/photo-1616190909855-7dec4cc65f46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        personality: { friendliness: 4, energy: 4, intelligence: 5, trainability: 5 }
      },
      {
        id: "siberian-husky",
        name: "Siberian Husky",
        nameKo: "시베리안 허스키",
        origin: "시베리아",
        size: "대형견",
        lifespan: "12-15년",
        characteristics: ["매우 활동적이고 지구력 강함", "독립적인 성격", "추위에 강함", "탈출 전문가"],
        care: ["매우 많은 운동량 필요", "정기적인 브러싱", "탈출 방지 중요", "더위 주의"],
        imageUrl: "https://images.unsplash.com/photo-1605568427561-40dd23c2acea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        personality: { friendliness: 3, energy: 5, intelligence: 4, trainability: 2 }
      },
      {
        id: "bulldog",
        name: "Bulldog",
        nameKo: "불독",
        origin: "영국",
        size: "중형견",
        lifespan: "8-10년",
        characteristics: ["온순하고 차분한 성격", "낮은 운동 요구량", "더위에 약함", "가족과의 유대감 강함"],
        care: ["적당한 운동", "호흡기 건강 관리", "체중 관리 중요", "더위 피하기"],
        imageUrl: "https://images.unsplash.com/photo-1583512603806-077998240c7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        personality: { friendliness: 4, energy: 2, intelligence: 3, trainability: 2 }
      },
      {
        id: "border-collie",
        name: "Border Collie",
        nameKo: "보더 콜리",
        origin: "영국",
        size: "중형견",
        lifespan: "12-15년",
        characteristics: ["매우 높은 지능", "목양견 본능", "무한한 에너지", "작업 욕구 강함"],
        care: ["매우 많은 운동과 정신적 자극", "정기적인 브러싱", "목적 있는 활동 필요", "충분한 공간"],
        imageUrl: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=300",
        personality: { friendliness: 3, energy: 5, intelligence: 5, trainability: 5 }
      }
    ];

    breeds.forEach(breed => {
      this.dogBreeds.set(breed.id, breed);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createAnalysisResult(result: InsertAnalysisResult): Promise<AnalysisResult> {
    const id = this.currentAnalysisId++;
    const analysisResult: AnalysisResult = { ...result, id };
    this.analysisResults.set(result.sessionId, analysisResult);
    return analysisResult;
  }

  async getAnalysisResult(sessionId: string): Promise<AnalysisResult | undefined> {
    return this.analysisResults.get(sessionId);
  }

  async getDogBreed(id: string): Promise<DogBreed | undefined> {
    return this.dogBreeds.get(id);
  }

  async getAllDogBreeds(): Promise<DogBreed[]> {
    return Array.from(this.dogBreeds.values());
  }

  async createDogBreed(breed: InsertDogBreed): Promise<DogBreed> {
    this.dogBreeds.set(breed.id, breed);
    return breed;
  }
}

export const storage = new MemStorage();
