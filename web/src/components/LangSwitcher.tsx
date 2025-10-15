"use client";
import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';
import {Link} from '@/i18n/routing';

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === 'ar' ? 'en' : 'ar';

  return (
    <Link href={pathname} locale={target} className="text-sm underline">
      {target.toUpperCase()}
    </Link>
  );
}


