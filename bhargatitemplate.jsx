import React, { useEffect, useRef } from 'react';
import { ArrowDownIcon, CameraIcon, ActivityIcon, BarChart3Icon } from 'lucide-react';

const useIntersectionObserver = (ref, options = {}, className) => {
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current.classList.add(className);
      } else {
        ref.current.classList.remove(className);
      }
    }, { threshold: 0.1, ...options });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, className, options]);
};

const Website = () => {
  const navRef = useRef(null);
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const technologyRef = useRef(null);
  const contactRef = useRef(null);

  useIntersectionObserver(navRef, {}, 'animate-active');
  useIntersectionObserver(heroRef, {}, 'animate-active');
  useIntersectionObserver(featuresRef, {}, 'animate-active');
  useIntersectionObserver(technologyRef, {}, 'animate-active');
  useIntersectionObserver(contactRef, {}, 'animate-active');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Navbar */}
      <nav ref={navRef} className="fixed w-full bg-black/30 backdrop-blur-md border-b border-white/10 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white opacity-0 transform -translate-x-10 transition-all duration-1000">
              Bhargati
            </h1>
            <div className="flex gap-8">
              {['Home', 'Features', 'Technology', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-white hover:text-blue-400 transition opacity-0 transform translate-x-10 duration-1000"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-6" ref={heroRef}>
        <div className="container mx-auto text-center pt-20">
          <h1 className="text-5xl font-bold text-white mb-6 opacity-0 transform -translate-y-10 transition-all duration-1000">
            Advanced Computer Vision for Athletes
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0 transform translate-y-10 transition-all duration-1000 delay-300">
            Enhance your performance with real-time motion analysis and AI-powered insights
          </p>
          <ArrowDownIcon className="w-8 h-8 text-blue-400 mx-auto opacity-0 transition-opacity duration-1000 delay-500 animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/20" ref={featuresRef}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center opacity-0 transform -translate-y-10 transition-all duration-1000">
            Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <CameraIcon className="w-8 h-8 text-blue-400" />,
                title: "Real-time Analysis",
                description: "Get instant feedback on your form and technique using our advanced computer vision algorithms"
              },
              {
                icon: <ActivityIcon className="w-8 h-8 text-blue-400" />,
                title: "Motion Tracking",
                description: "Track joint movements and body positions with millimeter precision"
              },
              {
                icon: <BarChart3Icon className="w-8 h-8 text-blue-400" />,
                title: "Performance Metrics",
                description: "Comprehensive analytics and performance tracking over time"
              }
            ].map((feature, index) => (
              <div 
                key={feature.title}
                className="feature-card bg-white/5 p-6 rounded-lg text-center hover:bg-white/10 transition-all hover:scale-105"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20" ref={technologyRef}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center opacity-0 transform scale-50 transition-all duration-1000">
            Our Technology
          </h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                title: "Computer Vision Core",
                items: [
                  "Advanced pose estimation",
                  "Real-time movement analysis",
                  "Multi-angle video processing",
                  "AI-powered form correction"
                ]
              },
              {
                title: "Athletic Performance",
                items: [
                  "Personalized training insights",
                  "Injury prevention analysis",
                  "Performance trending",
                  "Comparative analytics"
                ]
              }
            ].map((tech, index) => (
              <div 
                key={tech.title}
                className="tech-card bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors"
              >
                <h3 className="text-xl font-bold text-white mb-4 hover:text-blue-400 transition-colors">
                  {tech.title}
                </h3>
                <ul className="text-gray-300 space-y-2">
                  {tech.items.map((item, itemIndex) => (
                    <li 
                      key={item}
                      className="hover:translate-x-2 transition-transform"
                      style={{ transitionDelay: `${itemIndex * 100}ms` }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-black/20" ref={contactRef}>
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8 opacity-0 transform scale-150 transition-all duration-1000">
            Get Started
          </h2>
          <p className="text-gray-300 mb-8 opacity-0 transform translate-y-10 transition-all duration-1000 delay-300">
            Ready to transform your athletic performance?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 hover:shadow-lg opacity-0 transform translate-y-10 duration-1000 delay-500">
            Contact Us
          </button>
        </div>
      </section>

      <style jsx global>{`
        .animate-active h1,
        .animate-active h2,
        .animate-active p,
        .animate-active a,
        .animate-active button,
        .animate-active svg {
          opacity: 1;
          transform: translate(0, 0) scale(1) rotate(0);
        }

        .feature-card {
          opacity: 0;
          transform: translateY(50px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .tech-card {
          opacity: 0;
          transform: translateX(-50px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .tech-card:nth-child(even) {
          transform: translateX(50px);
        }

        .animate-active .feature-card {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-active .feature-card:nth-child(1) { transition-delay: 200ms; }
        .animate-active .feature-card:nth-child(2) { transition-delay: 400ms; }
        .animate-active .feature-card:nth-child(3) { transition-delay: 600ms; }

        .animate-active .tech-card {
          opacity: 1;
          transform: translateX(0);
        }

        .animate-active .tech-card:nth-child(1) { transition-delay: 200ms; }
        .animate-active .tech-card:nth-child(2) { transition-delay: 400ms; }

        /* Custom Animations */
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .animate-bounce {
          animation: bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Website;
