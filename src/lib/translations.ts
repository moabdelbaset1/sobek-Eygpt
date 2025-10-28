export const translations = {
  en: {
    // Header & Navigation
    home: 'Home',
    products: 'Products',
    about: 'About',
    contact: 'Contact Us',
    careers: 'Careers',
    media: 'Media',
    manufacturing: 'Manufacturing',
    distributors: 'Distributors',
    legal: 'Legal',
    rd: 'R&D',
    
    // Sections
    news: 'News',
    events: 'Events',
    ourMission: 'Our Mission',
    whyChoose: 'Why Choose Sobek Pharma',
    stayConnected: 'Stay Connected & Grow',
    
    // Buttons
    readMore: 'Read More',
    viewDetails: 'View Details',
    learnMore: 'Learn More',
    exploreProducts: 'Explore Our Products',
    
    // Cards
    latestNews: 'Latest News',
    upcomingEvents: 'Upcoming Events',
    joinOurTeam: 'Join Our Team',
    
    // Home Page
    advancingHealth: 'Advancing Health with Trusted Pharmaceuticals',
    ourComprehensive: 'Our Comprehensive Range',
    humanHealth: 'Human Health',
    animalHealth: 'Animal Health',
    discoverProducts: 'Discover Our Products',
    whoWeAre: 'Who We Are',
    aboutSobek: 'We are a leading pharmaceutical company dedicated to advancing global health through innovative, high-quality medications for both human and veterinary use.',
    getInTouch: 'Get In Touch',
    email: 'Email',
    phone: 'Phone',
    
    // About Page
    ourStory: 'Our Story',
    ouJourney: 'Our Journey Through Innovation',
    foundation: 'Foundation',
    expansion: 'Expansion & Modernization',
    innovation: 'Innovation & R&D',
    regionalGrowth: 'Regional Growth',
    leadership: 'Leadership Team',
    executiveTeam: 'Meet Our Leadership',
    ceo: 'Chief Executive Officer',
    cso: 'Chief Scientific Officer',
    coo: 'Chief Operations Officer',
    yearsExperience: 'years of pharmaceutical industry experience',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
  },
  ar: {
    // Header & Navigation
    home: 'الرئيسية',
    products: 'المنتجات',
    about: 'عن الشركة',
    contact: 'اتصل بنا',
    careers: 'الوظائف',
    media: 'الوسائط',
    manufacturing: 'التصنيع',
    distributors: 'الموزعون',
    legal: 'القانونية',
    rd: 'البحث والتطوير',
    
    // Sections
    news: 'الأخبار',
    events: 'الأحداث',
    ourMission: 'مهمتنا',
    whyChoose: 'لماذا تختار سوبك فارما',
    stayConnected: 'ابق متصلاً وتطور',
    
    // Buttons
    readMore: 'اقرأ المزيد',
    viewDetails: 'عرض التفاصيل',
    learnMore: 'اعرف المزيد',
    exploreProducts: 'استكشف منتجاتنا',
    
    // Cards
    latestNews: 'أحدث الأخبار',
    upcomingEvents: 'الأحداث القادمة',
    joinOurTeam: 'انضم إلى فريقنا',
    
    // Home Page
    advancingHealth: 'تعزيز الصحة بالعقاقير الموثوقة',
    ourComprehensive: 'مجموعتنا الشاملة',
    humanHealth: 'صحة الإنسان',
    animalHealth: 'صحة الحيوان',
    discoverProducts: 'اكتشف منتجاتنا',
    whoWeAre: 'من نحن',
    aboutSobek: 'نحن شركة دوائية رائدة ملتزمة بتعزيز الصحة العالمية من خلال الأدوية المبتكرة والعالية الجودة للاستخدام البشري والبيطري.',
    getInTouch: 'تواصل معنا',
    email: 'البريد الإلكتروني',
    phone: 'الهاتف',
    
    // About Page
    ourStory: 'قصتنا',
    ouJourney: 'رحلتنا عبر الابتكار',
    foundation: 'التأسيس',
    expansion: 'التوسع والحداثة',
    innovation: 'الابتكار والبحث والتطوير',
    regionalGrowth: 'النمو الإقليمي',
    leadership: 'فريق القيادة',
    executiveTeam: 'تعرف على قيادتنا',
    ceo: 'الرئيس التنفيذي',
    cso: 'كبير مسؤولي العلوم',
    coo: 'كبير مسؤولي التشغيل',
    yearsExperience: 'سنة من الخبرة في صناعة الأدوية',
    
    // Common
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
  }
};

export function t(key: string, lang: 'en' | 'ar'): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}
