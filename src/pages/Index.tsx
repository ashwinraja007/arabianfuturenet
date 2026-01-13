
import { Suspense, lazy, useEffect } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Loader2 } from "lucide-react";
import Hero from "@/components/home/Hero";
import { useGeoRedirect } from "@/hooks/useGeoRedirect";
import { Seo } from '@/components/common/Seo';

// Lazy load other components
const AboutUs = lazy(() => import("@/components/home/AboutUs"));
const Services = lazy(() => import("@/components/home/Services"));
const GlobalPresence = lazy(() => import("@/components/home/GlobalPresence"));
const QuickEnquiry = lazy(() => import("@/components/home/QuickEnquiry"));

// Loading component
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-[100px]">
    <Loader2 className="h-6 w-6 animate-spin text-brand-gold" />
  </div>
);

const Index = () => {
  useGeoRedirect();

  useEffect(() => {
    let link = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = '/favicon.ico';
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative">
      <Seo defaultTitle="Arabian Future Net - Global Logistics Solutions" />
      <Header />
      <main id="main" className="flex-grow pt-16">
        <Hero />
        
        <Suspense fallback={<LoadingComponent />}>
          <AboutUs />
        </Suspense>

        <Suspense fallback={<LoadingComponent />}>
          <Services />
        </Suspense>
        
        <Suspense fallback={<LoadingComponent />}>
          <GlobalPresence />
        </Suspense>
        
        <Suspense fallback={<LoadingComponent />}>
          <QuickEnquiry />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
