import React, { useState, useEffect } from 'react';
import { Users, UserCircle, SearchCode, Ship, Calendar } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const sliderImages = [
    '/containership.jpg',
    '/liquid.png',
    '/warehousing.png',
    '/customclearance.png',
    '/projectcargo1.png',
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  const portalLinks = [
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Consolmate',
      url: 'https://consolmate.com/auth/login/8',
      external: true,
    },
    {
      icon: <UserCircle className="w-5 h-5" />,
      title: 'Partner Portal',
      url: 'https://pp.onlinetracking.co/auth/login/8',
      external: true,
    },
    {
      icon: <SearchCode className="w-5 h-5" />,
      title: 'Tracking',
      url: 'http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:102:::::P0_GROUP_RID:231',
      external: true,
    },
    {
      icon: <Ship className="w-5 h-5" />,
      title: 'Sailing Schedule',
      url: 'http://ec2-13-229-38-56.ap-southeast-1.compute.amazonaws.com:8081/ords/f?p=107:104:::::P0_GROUP_RID:231',
      external: true,
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Online Quote',
      url: '/contact',
      external: false,
    },
  ];

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0">
        {sliderImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        ))}
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45 z-[1]" />

      {/* Portal Buttons Only */}
      <div className="absolute bottom-6 md:bottom-10 left-0 right-0 z-[10] px-4">
        <div
          className={`max-w-7xl mx-auto transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {portalLinks.map((link, index) => (
              <div key={index}>
                {link.external ? (
                  <a href={link.url} target="_blank" rel="noopener noreferrer">
                    <button className="w-full h-14 md:h-16 flex flex-col items-center justify-center gap-1 bg-white/90 hover:bg-white text-gray-900 transition-all rounded-lg shadow-sm hover:shadow-md hover:scale-105">
                      {link.icon}
                      <span className="font-bold text-xs sm:text-sm">
                        {link.title}
                      </span>
                    </button>
                  </a>
                ) : (
                  <a href={link.url}>
                    <button className="w-full h-14 md:h-16 flex flex-col items-center justify-center gap-1 bg-white/90 hover:bg-white text-gray-900 transition-all rounded-lg shadow-sm hover:shadow-md hover:scale-105">
                      {link.icon}
                      <span className="font-bold text-xs sm:text-sm">
                        {link.title}
                      </span>
                    </button>
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
