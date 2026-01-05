import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const Footer = () => {
  const offices = [
    {
      city: "Dammam (Headquarter)",
      cr: "CR No: 2050159935",
      address: [
        "Building No.2817, Secondary No9403,",
        "King Faisal Road, Al Tubebayshi Dist.",
        "Dammam, KSA 32233."
      ],
      phone: "+966 13 343 0003",
      direct: "+966 13 849 8630 / 8631"
    },
    {
      city: "Riyadh",
      cr: "CR No: 1010867642",
      address: [
        "Room No. T18, Rail Business Centre,",
        "Bldg No. 3823, Omar Aimukhtar St,",
        "Thulaim, Riyadh 11332."
      ],
      phone: "+966 11 295 0020",
      direct: "+966 13 849 8639"
    },
    {
      city: "Jeddah",
      cr: "CR No: 4030498909",
      address: [
        "Room No: 408, Saudi Business Centre 7859,",
        "Al-Madinah Al-Munawarah Road, Al Sharafeyah,",
        "Jeddah 22234, Kingdom of Saudi Arabia."
      ],
      phone: "+966 12 578 0874",
      direct: "+966 13 849 8632 / 8633"
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % offices.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [offices.length]);

  const next = () => setIndex((index + 1) % offices.length);
  const prev = () =>
    setIndex((index - 1 + offices.length) % offices.length);

  return (
    <footer className="pt-16 pb-8 bg-gradient-to-b from-white to-gray-100">
      <div className="container mx-auto px-4">
        <div className="h-1 bg-gradient-to-r from-brand-green via-emerald-400 to-brand-green rounded-full mb-8" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* ABOUT */}
          <div>
            <img
              src="/futurenet-logo.png"
              alt="Arabian Future Net Logo"
              className="h-12 mb-4"
            />
            <p className="text-sm text-gray-600 max-w-xs">
              Arabian Future Net Shipping Company is an international freight
              forwarder headquartered in Dammam with branches in Riyadh and
              Jeddah.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="font-bold text-lg text-brand-navy mb-4">
              Quick Links
            </h3>
            <div className="flex flex-col gap-2">
              {[
                { name: "Home", path: "/" },
                { name: "About", path: "/about" },
                { name: "Services", path: "/services" },
                { name: "Contact Us", path: "/contact" }
              ].map((link, i) => (
                <Link
                  key={i}
                  to={link.path}
                  className="text-gray-600 hover:text-brand-green transition"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* AUTO-SCROLL OFFICES */}
          <div className="relative">
            <h3 className="font-bold text-lg text-brand-navy mb-4">
              Our Offices
            </h3>

            <div className="relative bg-white rounded-xl shadow-md p-4 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-semibold text-brand-navy mb-1">
                    {offices[index].city}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    {offices[index].cr}
                  </p>

                  <div className="flex items-start gap-2 mb-2">
                    <MapPin size={16} className="text-brand-green mt-1" />
                    <div className="text-sm text-gray-600">
                      {offices[index].address.map((line, i) => (
                        <p key={i}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm mb-1">
                    <Phone size={16} className="text-brand-green" />
                    {offices[index].phone}
                  </div>

                  <div className="text-sm text-gray-600">
                    Direct: {offices[index].direct}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* ARROWS */}
              <div className="absolute top-1/2 -translate-y-1/2 right-2 flex gap-1">
                <button
                  onClick={prev}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <ArrowLeft size={14} />
                </button>
                <button
                  onClick={next}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 text-sm text-gray-600">
              <Mail size={16} className="text-brand-green" />
              info.sa@futurenetlogistics.com
            </div>
          </div>
        </div>

        <div className="text-center text-gray-600 mt-10 text-sm border-t pt-6">
          © {new Date().getFullYear()} Arabian Future Net Shipping Company. All
          Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
