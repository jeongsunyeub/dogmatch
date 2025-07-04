export type Language = 'ko' | 'en' | 'ja' | 'zh';

export const translations = {
  ko: {
    // Header
    appName: '반려견 상',
    appSubtitle: '얼굴로 찾는 나와 닮은 견종',
    
    // Upload Section
    uploadTitle: '사진을 올려보세요',
    uploadSubtitle: '당신의 얼굴을 분석해서 닮은 견종을 찾아드려요!',
    dragOrClick: '사진을 드래그하거나 클릭하세요',
    fileFormat: 'JPG, PNG 파일만 업로드 가능',
    selectPhoto: '사진 선택하기',
    startAnalysis: '분석 시작하기',
    analyzing: '분석 중...',
    
    // Results Section
    analysisResults: '분석 결과',
    resultsSubtitle: '당신과 가장 닮은 견종을 찾았어요!',
    topMatch: '최고 매칭',
    similarity: '일치',
    otherCandidates: '다른 후보들',
    shareResults: '결과 공유하기',
    retryAnalysis: '다시 분석하기',
    
    // Breed Info
    breedInfo: '견종 정보',
    origin: '원산지',
    size: '크기',
    lifespan: '수명',
    characteristics: '주요 특징',
    careTips: '관리 요령',
    
    // Gallery
    breedGallery: '다양한 견종 갤러리',
    
    // Footer
    footerDescription: 'AI 기술로 당신과 닮은 견종을 찾아보세요',
    terms: '이용약관',
    privacy: '개인정보처리방침',
    contact: '문의하기',
    
    // Privacy Notice
    privacyTitle: '개인정보 보호',
    privacyDescription: '업로드된 사진은 분석 후 즉시 삭제되며, 어떠한 용도로도 저장되지 않습니다.',
    
    // Loading
    loadingTitle: 'AI가 분석 중이에요',
    loadingSubtitle: '얼굴을 인식하고 견종을 매칭하고 있어요...',
    
    // Toast Messages
    analysisComplete: '분석 완료!',
    analysisCompleteDesc: '와 {confidence}% 일치합니다.',
    analysisFailed: '분석 실패',
    analysisFailedDesc: '이미지 분석 중 오류가 발생했습니다. 다시 시도해주세요.',
    fileError: '파일 오류',
    invalidFormat: 'JPG, PNG, WebP 파일만 업로드 가능합니다.',
    fileTooLarge: '파일 크기는 10MB 이하여야 합니다.',
    
    // Personality traits
    friendliness: '친화성',
    energy: '활발성',
    intelligence: '지능',
    trainability: '훈련성',
    
    // Share message
    shareMessage: '나와 {confidence}% 닮은 견종은 {breed}입니다!'
  },
  
  en: {
    // Header
    appName: 'Dog Twin',
    appSubtitle: 'Find Your Dog Breed Match',
    
    // Upload Section
    uploadTitle: 'Upload Your Photo',
    uploadSubtitle: 'Analyze your face to find similar dog breeds!',
    dragOrClick: 'Drag or click to upload photo',
    fileFormat: 'Only JPG, PNG files supported',
    selectPhoto: 'Select Photo',
    startAnalysis: 'Start Analysis',
    analyzing: 'Analyzing...',
    
    // Results Section
    analysisResults: 'Analysis Results',
    resultsSubtitle: 'Found your most similar dog breed!',
    topMatch: 'Top Match',
    similarity: 'match',
    otherCandidates: 'Other Candidates',
    shareResults: 'Share Results',
    retryAnalysis: 'Try Again',
    
    // Breed Info
    breedInfo: 'Breed Information',
    origin: 'Origin',
    size: 'Size',
    lifespan: 'Lifespan',
    characteristics: 'Key Traits',
    careTips: 'Care Tips',
    
    // Gallery
    breedGallery: 'Dog Breed Gallery',
    
    // Footer
    footerDescription: 'Find your dog breed match with AI technology',
    terms: 'Terms of Service',
    privacy: 'Privacy Policy',
    contact: 'Contact',
    
    // Privacy Notice
    privacyTitle: 'Privacy Protection',
    privacyDescription: 'Uploaded photos are deleted immediately after analysis and are not stored for any purpose.',
    
    // Loading
    loadingTitle: 'AI is analyzing',
    loadingSubtitle: 'Recognizing face and matching breeds...',
    
    // Toast Messages
    analysisComplete: 'Analysis Complete!',
    analysisCompleteDesc: '{confidence}% match with {breed}.',
    analysisFailed: 'Analysis Failed',
    analysisFailedDesc: 'An error occurred during image analysis. Please try again.',
    fileError: 'File Error',
    invalidFormat: 'Only JPG, PNG, WebP files are supported.',
    fileTooLarge: 'File size must be under 10MB.',
    
    // Personality traits
    friendliness: 'Friendliness',
    energy: 'Energy',
    intelligence: 'Intelligence',
    trainability: 'Trainability',
    
    // Share message
    shareMessage: 'I\'m {confidence}% similar to {breed}!'
  },
  
  ja: {
    // Header
    appName: 'ドッグツイン',
    appSubtitle: '顔で探す似ている犬種',
    
    // Upload Section
    uploadTitle: '写真をアップロード',
    uploadSubtitle: '顔を分析して似ている犬種を見つけます！',
    dragOrClick: 'ドラッグまたはクリックして写真をアップロード',
    fileFormat: 'JPG、PNGファイルのみ対応',
    selectPhoto: '写真を選択',
    startAnalysis: '分析開始',
    analyzing: '分析中...',
    
    // Results Section
    analysisResults: '分析結果',
    resultsSubtitle: '最も似ている犬種を見つけました！',
    topMatch: 'トップマッチ',
    similarity: '一致',
    otherCandidates: '他の候補',
    shareResults: '結果をシェア',
    retryAnalysis: '再分析',
    
    // Breed Info
    breedInfo: '犬種情報',
    origin: '原産国',
    size: 'サイズ',
    lifespan: '寿命',
    characteristics: '主な特徴',
    careTips: 'ケアのコツ',
    
    // Gallery
    breedGallery: '犬種ギャラリー',
    
    // Footer
    footerDescription: 'AI技術であなたに似た犬種を見つけます',
    terms: '利用規約',
    privacy: 'プライバシーポリシー',
    contact: 'お問い合わせ',
    
    // Privacy Notice
    privacyTitle: 'プライバシー保護',
    privacyDescription: 'アップロードされた写真は分析後すぐに削除され、いかなる用途でも保存されません。',
    
    // Loading
    loadingTitle: 'AIが分析中',
    loadingSubtitle: '顔を認識して犬種をマッチングしています...',
    
    // Toast Messages
    analysisComplete: '分析完了！',
    analysisCompleteDesc: '{breed}と{confidence}%一致しました。',
    analysisFailed: '分析失敗',
    analysisFailedDesc: '画像分析中にエラーが発生しました。もう一度お試しください。',
    fileError: 'ファイルエラー',
    invalidFormat: 'JPG、PNG、WebPファイルのみ対応しています。',
    fileTooLarge: 'ファイルサイズは10MB以下である必要があります。',
    
    // Personality traits
    friendliness: '友好性',
    energy: '活発性',
    intelligence: '知能',
    trainability: '訓練性',
    
    // Share message
    shareMessage: '私は{breed}と{confidence}%似ています！'
  },
  
  zh: {
    // Header
    appName: '狗狗双胞胎',
    appSubtitle: '用脸找相似的狗品种',
    
    // Upload Section
    uploadTitle: '上传您的照片',
    uploadSubtitle: '分析您的脸部特征，找到相似的狗品种！',
    dragOrClick: '拖拽或点击上传照片',
    fileFormat: '仅支持JPG、PNG文件',
    selectPhoto: '选择照片',
    startAnalysis: '开始分析',
    analyzing: '分析中...',
    
    // Results Section
    analysisResults: '分析结果',
    resultsSubtitle: '找到了与您最相似的狗品种！',
    topMatch: '最佳匹配',
    similarity: '匹配',
    otherCandidates: '其他候选',
    shareResults: '分享结果',
    retryAnalysis: '重新分析',
    
    // Breed Info
    breedInfo: '品种信息',
    origin: '原产地',
    size: '体型',
    lifespan: '寿命',
    characteristics: '主要特征',
    careTips: '护理要点',
    
    // Gallery
    breedGallery: '狗品种画廊',
    
    // Footer
    footerDescription: '使用AI技术找到与您相似的狗品种',
    terms: '服务条款',
    privacy: '隐私政策',
    contact: '联系我们',
    
    // Privacy Notice
    privacyTitle: '隐私保护',
    privacyDescription: '上传的照片在分析后立即删除，不会用于任何其他目的。',
    
    // Loading
    loadingTitle: 'AI正在分析',
    loadingSubtitle: '正在识别面部特征并匹配品种...',
    
    // Toast Messages
    analysisComplete: '分析完成！',
    analysisCompleteDesc: '与{breed}有{confidence}%的相似度。',
    analysisFailed: '分析失败',
    analysisFailedDesc: '图像分析时发生错误。请重试。',
    fileError: '文件错误',
    invalidFormat: '仅支持JPG、PNG、WebP文件。',
    fileTooLarge: '文件大小必须小于10MB。',
    
    // Personality traits
    friendliness: '友好性',
    energy: '活跃度',
    intelligence: '智力',
    trainability: '可训练性',
    
    // Share message
    shareMessage: '我与{breed}有{confidence}%的相似度！'
  }
};

export function getTranslation(language: Language) {
  return translations[language];
}

export function formatMessage(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return params[key]?.toString() || match;
  });
}