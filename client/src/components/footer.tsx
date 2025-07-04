import { Dog } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-primary-custom rounded-full flex items-center justify-center">
              <Dog className="text-white" />
            </div>
            <span className="text-lg font-bold text-dark-custom">{t.appName}</span>
          </div>
          <p className="text-sm text-gray-600 mb-4">{t.footerDescription}</p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary-custom transition-colors">{t.terms}</a>
            <a href="#" className="hover:text-primary-custom transition-colors">{t.privacy}</a>
            <a href="#" className="hover:text-primary-custom transition-colors">{t.contact}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
