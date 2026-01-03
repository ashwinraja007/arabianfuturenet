import React, { useState, useEffect } from 'react';
import { Users, UserCircle, SearchCode, Ship, Calendar } from 'lucide-react';

const services = [
  'Ocean Freight',
  'Liquid Logistics',
  'Warehousing',
  'Customs Clearance',
  'Project Cargo',
];

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const sliderImages = [
    '/containership.jpg',
    '/liquid.png',
    '/warehousing.png',
    '/customclearance.png',
    '/projectcargo1.png',
  ];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const portalLinks = [
    { icon: <Users className="w-5 h-5" />, title: 'Consolmate', url: 'https://consolmate.com/auth/login/8', external: true },
    { icon: <UserCircle className="w-5 h-5" />, title: 'Partner Portal', url: 'https://pp.onlinetracking.co/auth/login/8', external: true },
    { icon: <SearchCode className="w-5 h-5" />, title: 'Tracking', url: 'http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:231', external: true },
    { icon: <Ship className="w-5 h-5" />, title: 'Schedule', url: 'http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:231', external: true },
    { icon: <Calendar className="w-5 h-5" />, title: 'Quote', url: '/contact', external: false },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background */}
      {sliderImages.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            activeSlide === i ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={img} className="w-full h-full object-cover" />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      {/* SERVICE TEXT */}
      <div className="absolute bottom-36 md:bottom-40 left-0 right-0 z-[5] px-6">
        <div
          className={`max-w-7xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide">
            {services[activeSlide]}
          </h2>
        </div>
      </div>

      {/* BUTTONS – CENTERED & SAFE */}
      <div className="absolute bottom-8 left-0 right-0 z-[10] px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {portalLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target={link.external ? '_blank' : undefined}
                rel="noopener noreferrer"
              >
                <button className="w-full h-14 flex flex-col items-center justify-center gap-1 bg-white/90 hover:bg-white rounded-lg shadow-sm hover:shadow-md transition">
                  {link.icon}
                  <span className="font-bold text-xs sm:text-sm">{link.title}</span>
                </button>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
