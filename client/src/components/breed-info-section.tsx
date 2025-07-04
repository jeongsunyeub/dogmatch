import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/use-language";
import type { DogBreed } from "../types/breeds";

interface BreedInfoSectionProps {
  breed: DogBreed;
}

export default function BreedInfoSection({ breed }: BreedInfoSectionProps) {
  const { t } = useLanguage();

  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-dark-custom mb-4">
          <Info className="inline text-primary-custom mr-2" />
          {t.breedInfo}
        </h3>
        
        <div className="space-y-4">
          <div className="border-l-4 border-primary-custom pl-4">
            <h4 className="font-bold text-dark-custom mb-1">{breed.nameKo}</h4>
            <p className="text-sm text-gray-600">
              {t.origin}: {breed.origin} | {t.size}: {breed.size} | {t.lifespan}: {breed.lifespan}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <h5 className="font-medium text-dark-custom mb-2">{t.characteristics}</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {breed.characteristics.map((characteristic, index) => (
                <li key={index}>• {characteristic}</li>
              ))}
            </ul>
          </div>
          
          <div className="bg-accent-custom/10 rounded-xl p-4">
            <h5 className="font-medium text-dark-custom mb-2">{t.careTips}</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              {breed.care.map((careItem, index) => (
                <li key={index}>• {careItem}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
