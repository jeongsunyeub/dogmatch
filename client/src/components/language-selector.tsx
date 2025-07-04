import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/hooks/use-language";
import type { Language } from "@/lib/i18n";

export default function LanguageSelector() {
  const { language, changeLanguage } = useLanguage();

  const languages = [
    { code: 'ko' as Language, name: '한국어', flag: '🇰🇷' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'ja' as Language, name: '日本語', flag: '🇯🇵' },
    { code: 'zh' as Language, name: '中文', flag: '🇨🇳' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <Select value={language} onValueChange={changeLanguage}>
      <SelectTrigger className="w-auto min-w-[100px] bg-white border-gray-200 focus:border-primary-custom">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-600" />
          <SelectValue>
            <span className="text-sm">
              {currentLanguage?.flag} {currentLanguage?.name}
            </span>
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            <div className="flex items-center space-x-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}