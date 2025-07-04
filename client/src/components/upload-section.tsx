import { useState, useRef } from "react";
import { Camera, CloudUpload, Plus, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { validateImageFile } from "../lib/face-analysis";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/use-language";

interface UploadSectionProps {
  onImageUpload: (file: File) => void;
  isLoading: boolean;
}

export default function UploadSection({ onImageUpload, isLoading }: UploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFileSelect = (file: File) => {
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      const errorMessage = validation.error === "INVALID_FORMAT" ? t.invalidFormat : t.fileTooLarge;
      toast({
        title: t.fileError,
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onImageUpload(selectedFile);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="bg-white rounded-2xl shadow-lg">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary-custom/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="text-primary-custom text-2xl" />
          </div>
          <h2 className="text-2xl font-bold text-dark-custom mb-2">{t.uploadTitle}</h2>
          <p className="text-gray-600">{t.uploadSubtitle}</p>
        </div>

        {!selectedFile ? (
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center hover:border-primary-custom transition-colors cursor-pointer bg-gray-50/50 ${
              isDragOver ? "border-primary-custom bg-primary-custom/5" : "border-gray-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="space-y-4">
              <div className="w-12 h-12 bg-primary-custom/10 rounded-full flex items-center justify-center mx-auto">
                <CloudUpload className="text-primary-custom text-xl" />
              </div>
              <div>
                <p className="text-lg font-medium text-dark-custom">{t.dragOrClick}</p>
                <p className="text-sm text-gray-500 mt-1">{t.fileFormat}</p>
              </div>
              <Button className="bg-primary-custom text-white hover:bg-primary-custom/90">
                <Plus className="mr-2 h-4 w-4" />
                {t.selectPhoto}
              </Button>
            </div>
          </div>
        ) : (
          <div className="mt-6">
            <div className="relative">
              <img
                src={previewUrl!}
                alt={t.uploadTitle}
                className="w-full h-64 object-cover rounded-xl shadow-md"
              />
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full shadow-md hover:shadow-lg"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4 text-gray-600" />
              </Button>
            </div>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading}
              className="w-full bg-secondary-custom text-white py-4 rounded-xl font-medium text-lg mt-4 hover:bg-secondary-custom/90"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  {t.analyzing}
                </>
              ) : (
                <>
                  <Camera className="mr-2 h-5 w-5" />
                  {t.startAnalysis}
                </>
              )}
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-start space-x-3">
            <Shield className="text-blue-600 mt-1 h-5 w-5" />
            <div>
              <h3 className="font-medium text-blue-900">{t.privacyTitle}</h3>
              <p className="text-sm text-blue-700 mt-1">{t.privacyDescription}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
