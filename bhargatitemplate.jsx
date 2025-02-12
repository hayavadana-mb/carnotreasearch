import React from 'react';
import { ArrowDownIcon, CameraIcon, ActivityIcon, BarChart3Icon } from 'lucide-react';

const Website = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Translucent Navbar */}
      <nav className="fixed w-full bg-black/30 backdrop-blur-md border-b border-white/10 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white hover:scale-105 transition-transform cursor-pointer">Bhargati</h1>
            <div className="flex gap-8">
              {['Home', 'Features', 'Technology', 'Contact'].map((item, index) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="text-white hover:text-blue-400 transition hover:scale-110 animate-fade-in"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 px-6">
        <div className="container mx-auto text-center pt-20">
          <h1 className="text-5xl font-bold text-white mb-6 animate-slide-up">
            Advanced Computer Vision for Athletes
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in">
            Enhance your performance with real-time motion analysis and AI-powered insights
          </p>
          <ArrowDownIcon className="w-8 h-8 text-blue-400 mx-auto animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-black/20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center hover:scale-105 transition-transform">
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
              <FeatureCard 
                key={feature.title}
                {...feature}
                animationDelay={index * 200}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section id="technology" className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center hover:scale-105 transition-transform">
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
              <div key={tech.title} className="bg-white/5 p-6 rounded-lg hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-4 hover:text-blue-400 transition-colors">
                  {tech.title}
                </h3>
                <ul className="text-gray-300 space-y-2">
                  {tech.items.map((item, itemIndex) => (
                    <li 
                      key={item}
                      className="animate-fade-in hover:translate-x-2 transition-transform"
                      style={{ animationDelay: `${(index * 4 + itemIndex) * 100}ms` }}
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
      <section id="contact" className="py-20 bg-black/20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8 hover:scale-105 transition-transform">
            Get Started
          </h2>
          <p className="text-gray-300 mb-8 animate-fade-in">
            Ready to transform your athletic performance?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all hover:scale-105 hover:shadow-lg">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, animationDelay }) => {
  return (
    <div 
      className="bg-white/5 p-6 rounded-lg text-center hover:bg-white/10 transition-all hover:scale-105 animate-fade-in"
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-2 hover:text-blue-400 transition-colors">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
};

export default Website;
