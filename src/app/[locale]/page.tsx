import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { CinematicIntro } from '@/components/sections/CinematicIntro';
import { WorkCarousel } from '@/components/sections/WorkCarousel';
import { Contact } from '@/components/sections/Contact';
import { DroneCursorLoader } from '@/components/ui/DroneCursorLoader';

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "seo" });
  const nav = await getTranslations({ locale, namespace: "nav" });

  const title = `${t("title")} | ${nav("brand")}`;
  const description = t("description");
  const url = `/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/en",
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url,
      // TODO: Add public/images/og-image.jpg (1200×630 px) before deploying
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: t("ogImageAlt"),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // TODO: Add public/images/og-image.jpg (1200×630 px) before deploying
      images: ["/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function Home() {
    return (
        <>
            <DroneCursorLoader />
            <Navbar />
            <main>
                <Hero />
                <CinematicIntro />
                <WorkCarousel />
                <Contact />
            </main>
        </>
    );
}
