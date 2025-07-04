import { Brain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";

export default function LoadingSection() {
  const { t } = useLanguage();

  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-primary-custom/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse-slow">
            <Brain className="text-primary-custom text-3xl" />
          </div>
          <h2 className="text-2xl font-bold text-dark-custom mb-2">{t.loadingTitle}</h2>
          <p className="text-gray-600 mb-6">{t.loadingSubtitle}</p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div className="bg-primary-custom h-2 rounded-full animate-pulse w-3/4"></div>
          </div>
          
          <div className="flex justify-center items-center space-x-2">
            <div className="w-2 h-2 bg-primary-custom rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-primary-custom rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-primary-custom rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
