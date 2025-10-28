"use client";
import Link from 'next/link';
import {useLocale} from 'next-intl';
import {usePathname} from 'next/navigation';

export default function LangSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === 'ar' ? 'en' : 'ar';

  return (
    <Link href={pathname} className="text-sm underline hover:text-red-600 transition-colors">
      {target.toUpperCase()}
    </Link>
  );
}


