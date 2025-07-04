import { Trophy, Share, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import { formatMessage } from "@/lib/i18n";
import type { AnalysisResult } from "../types/breeds";

interface ResultsSectionProps {
  result: AnalysisResult;
  onRetry: () => void;
}

export default function ResultsSection({ result, onRetry }: ResultsSectionProps) {
  const { matches, topMatch } = result;
  const { t } = useLanguage();

  const handleShare = async () => {
    const shareText = formatMessage(t.shareMessage, {
      confidence: topMatch.confidence.toString(),
      breed: topMatch.breed.nameKo
    });

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${t.appName} - ${t.analysisResults}`,
          text: shareText,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share cancelled");
      }
    } else {
      // Fallback for browsers without Web Share API
      if (navigator.clipboard) {
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`);
      }
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < rating ? "bg-primary-custom" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-accent-custom/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="text-accent-custom text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-dark-custom mb-2">{t.analysisResults}</h2>
          <p className="text-gray-600">{t.resultsSubtitle}</p>
        </div>

        {/* Top Match */}
        <div className="bg-gradient-to-r from-primary-custom/10 to-secondary-custom/10 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-dark-custom">{t.topMatch}</h3>
            <Badge className="bg-primary-custom text-white">
              {topMatch.confidence}% {t.similarity}
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <img
              src={topMatch.breed.imageUrl}
              alt={topMatch.breed.nameKo}
              className="w-20 h-20 object-cover rounded-xl shadow-md"
            />
            <div className="flex-1">
              <h4 className="text-xl font-bold text-dark-custom mb-1">
                {topMatch.breed.nameKo}
              </h4>
              <p className="text-gray-600 text-sm">
                {topMatch.breed.characteristics[0]}
              </p>
              <div className="flex items-center mt-2">
                {renderStars(topMatch.breed.personality.friendliness)}
                <span className="text-sm text-gray-500 ml-2">
                  {t.friendliness} {topMatch.breed.personality.friendliness}/5
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Other Matches */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-dark-custom">{t.otherCandidates}</h3>
          
          {matches.slice(1, 3).map((match) => (
            <div key={match.breedId} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <img
                src={match.breed.imageUrl}
                alt={match.breed.nameKo}
                className="w-16 h-16 object-cover rounded-lg shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-dark-custom">{match.breed.nameKo}</h4>
                  <span className="text-secondary-custom font-medium">
                    {match.confidence}%
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {match.breed.characteristics[0]}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 mt-6">
          <Button
            onClick={handleShare}
            className="flex-1 bg-primary-custom text-white hover:bg-primary-custom/90"
          >
            <Share className="mr-2 h-4 w-4" />
            {t.shareResults}
          </Button>
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            {t.retryAnalysis}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
