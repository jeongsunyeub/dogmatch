import { Dog } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import LanguageSelector from "./language-selector";

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-md mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-custom rounded-full flex items-center justify-center">
              <Dog className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-dark-custom">{t.appName}</h1>
              <p className="text-sm text-gray-500">{t.appSubtitle}</p>
            </div>
          </div>
          <LanguageSelector />
        </div>
      </div>
    </header>
  );
}
