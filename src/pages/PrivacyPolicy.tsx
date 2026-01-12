import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Seo } from '@/components/common/Seo';

const PrivacyPolicyPage: React.FC = () => {
  const [isLoaded] = useState(true);
  const data = {
    title: 'Privacy Policy',
    lastUpdated: new Date().toISOString(),
    content: 'Privacy Policy content is currently being updated. Please check back later.',
    seo: null
  };

  return <div className={`min-h-screen bg-gray-50 transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      <Seo data={data?.seo} defaultTitle="Privacy Policy" />
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{data?.title || 'Privacy Policy'}</h1>
            <p className="text-lg text-gray-600">
              We are committed to protecting your privacy and ensuring transparent data practices.
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6"></div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 leading-relaxed mb-6">{data.content}</p>
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Questions About This Privacy Policy?
            </h3>
            <p className="text-blue-800 mb-4">
              If you have any questions about this Privacy Policy or our data practices, 
              please don't hesitate to contact us.
            </p>
            <Link to="/contact" className="inline-block bg-brand-navy text-white px-6 py-3 rounded-lg font-medium  transition-colors">
                Get a Quote
              </Link>
          </div>

          <div className="mt-8 text-sm text-gray-500 text-center">
            Last updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'June 20, 2025'}
          </div>
        </div>
      </main>

      <Footer />
    </div>;
};
export default PrivacyPolicyPage;
