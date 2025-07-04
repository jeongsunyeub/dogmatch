import { useQuery } from "@tanstack/react-query";
import { Images } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useLanguage } from "@/hooks/use-language";
import type { DogBreed } from "../types/breeds";

export default function GallerySection() {
  const { t } = useLanguage();
  const { data: breeds, isLoading } = useQuery<DogBreed[]>({
    queryKey: ["/api/breeds"],
  });

  if (isLoading) {
    return (
      <Card className="bg-white rounded-2xl shadow-lg">
        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-dark-custom mb-4">
            <Images className="inline text-primary-custom mr-2" />
            {t.breedGallery}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Show first 4 breeds for gallery
  const galleryBreeds = breeds?.slice(0, 4) || [];

  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-dark-custom mb-4">
          <Images className="inline text-primary-custom mr-2" />
          {t.breedGallery}
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {galleryBreeds.map((breed) => (
            <div key={breed.id} className="relative rounded-xl overflow-hidden shadow-md">
              <img
                src={breed.imageUrl}
                alt={breed.nameKo}
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <p className="text-white text-sm font-medium">{breed.nameKo}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
