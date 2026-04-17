'use client';

import { useTransition } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';
import { Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const switchLocale = (newLocale: 'bn' | 'en') => {
        startTransition(() => {
            router.replace(pathname, { locale: newLocale });
        });
    };

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => switchLocale(locale === 'bn' ? 'en' : 'bn')}
            disabled={isPending}
            className="border-white/30 bg-white/10 text-white hover:bg-accent hover:border-accent hover:text-white transition-all duration-300 min-w-[90px]"
        >
            {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
                <>
                    <Globe className="w-4 h-4 mr-2" />
                    <span className="font-medium">
                        {locale === 'bn' ? 'বাংলা' : 'English'}
                    </span>
                </>
            )}
        </Button>
    );
}
