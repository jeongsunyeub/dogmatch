import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Header from "@/components/header";
import Footer from "@/components/footer";
import UploadSection from "@/components/upload-section";
import LoadingSection from "@/components/loading-section";
import ResultsSection from "@/components/results-section";
import BreedInfoSection from "@/components/breed-info-section";
import GallerySection from "@/components/gallery-section";
import { analyzeImage } from "@/lib/face-analysis";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";
import { formatMessage } from "@/lib/i18n";
import type { AnalysisResult } from "@/types/breeds";

type AppState = "upload" | "analyzing" | "results";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const analyzeMutation = useMutation({
    mutationFn: analyzeImage,
    onSuccess: (result) => {
      setAnalysisResult(result);
      setAppState("results");
      toast({
        title: t.analysisComplete,
        description: formatMessage(t.analysisCompleteDesc, {
          breed: result.topMatch.breed.nameKo,
          confidence: result.topMatch.confidence.toString()
        }),
      });
    },
    onError: (error) => {
      console.error("Analysis failed:", error);
      toast({
        title: t.analysisFailed,
        description: t.analysisFailedDesc,
        variant: "destructive",
      });
      setAppState("upload");
    },
  });

  const handleImageUpload = (file: File) => {
    setAppState("analyzing");
    analyzeMutation.mutate(file);
  };

  const handleRetry = () => {
    setAppState("upload");
    setAnalysisResult(null);
  };

  return (
    <div className="font-korean min-h-screen" style={{ backgroundColor: 'hsl(210, 20%, 98%)' }}>
      <Header />
      
      <main className="max-w-md mx-auto px-4 py-6 space-y-6">
        {appState === "upload" && (
          <UploadSection 
            onImageUpload={handleImageUpload}
            isLoading={analyzeMutation.isPending}
          />
        )}

        {appState === "analyzing" && <LoadingSection />}

        {appState === "results" && analysisResult && (
          <>
            <ResultsSection 
              result={analysisResult}
              onRetry={handleRetry}
            />
            <BreedInfoSection breed={analysisResult.topMatch.breed} />
          </>
        )}

        <GallerySection />
      </main>

      <Footer />
    </div>
  );
}
