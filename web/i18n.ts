import {defineConfig} from 'next-intl';

export default defineConfig({
  locales: ['en', 'ar'],
  defaultLocale: 'en',
  messages: {
    en: () => import('./src/i18n/messages/en.json'),
    ar: () => import('./src/i18n/messages/ar.json')
  }
});


