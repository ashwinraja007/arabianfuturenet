import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Seo } from '@/components/common/Seo';

const TermsOfUsePage: React.FC = () => {
  const data = {
    title: 'Terms of Use Agreement for the Website',
    content: 'Terms of Use content is currently being updated. Please check back later.',
    seo: null
  };

  return (
    <>
      <Seo data={data?.seo} defaultTitle="Terms of Use" />
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <h1 className="text-3xl font-bold mb-6 text-center">{data?.title || 'Terms of Use Agreement for the Website'}</h1>

        <p className="mb-4">{data.content}</p>
      </main>
      <Footer />
    </>
  );
};

export default TermsOfUsePage;
