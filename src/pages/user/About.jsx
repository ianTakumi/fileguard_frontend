import React, { useState, useEffect } from "react";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ security: 0, efficiency: 0, guarantee: 0 });

  useEffect(() => {
    setIsVisible(true);
    
    // Animate counters
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    
    const targets = { security: 95, efficiency: 90, guarantee: 85 };
    let current = { security: 0, efficiency: 0, guarantee: 0 };
    
    const timer = setInterval(() => {
      current.security = Math.min(current.security + (targets.security / steps), targets.security);
      current.efficiency = Math.min(current.efficiency + (targets.efficiency / steps), targets.efficiency);
      current.guarantee = Math.min(current.guarantee + (targets.guarantee / steps), targets.guarantee);
      
      setCounters({
        security: Math.round(current.security),
        efficiency: Math.round(current.efficiency),
        guarantee: Math.round(current.guarantee)
      });
      
      if (current.security >= targets.security) {
        clearInterval(timer);
      }
    }, increment);
    
    return () => clearInterval(timer);
  }, []);

  const features = [
    {
      icon: "🛡️",
      title: "Enterprise Security",
      description: "Military-grade encryption protecting your sensitive data with zero-knowledge architecture"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Optimized infrastructure ensures rapid file transfers without compromising security"
    },
    {
      icon: "🏆",
      title: "Industry Leading",
      description: "Trusted by Fortune 500 companies and millions of users worldwide"
    }
  ];

  const stats = [
    { value: "10M+", label: "Active Users" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "256-bit", label: "Encryption" },
    { value: "24/7", label: "Support" }
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Banner with Gradient Overlay */}
      <div className="relative w-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>
        
        <div className="relative z-10 text-center px-6">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">About FileGuard</h1>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Pioneering the future of secure file sharing
            </p>
            <div className="flex items-center justify-center space-x-3 text-sm text-blue-200">
              <a href="/" className="hover:text-white transition-colors duration-200">
                Home
              </a>
              <span>/</span>
              <span className="text-white font-medium">About Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="w-full bg-white shadow-lg -mt-16 relative z-20 max-w-6xl mx-auto rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8 py-10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
              <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Section */}
      <div className="flex flex-col lg:flex-row w-full max-w-7xl my-24 px-6 md:px-10 gap-16">
        {/* Left: Image with Overlay */}
        <div className="flex-1 relative group">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-transparent opacity-20 rounded-2xl group-hover:opacity-30 transition-opacity duration-300"></div>
          <img
            src="/images/about-us.jpg"
            alt="About Us"
            className="w-full h-full object-cover rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition-transform duration-500"
          />
          <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl px-6 py-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white text-xl">🔒</div>
              <div>
                <div className="font-bold text-gray-900">Trusted Platform</div>
                <div className="text-sm text-gray-600">Since 2020</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="flex-1 flex flex-col justify-center space-y-8">
          <div>
            <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
              Who We Are
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Redefining Secure File Sharing
            </h2>
          </div>

          <p className="text-lg text-gray-600 leading-relaxed">
            FileGuard is a secure file-sharing tool that enables users to share documents and files easily while ensuring their privacy and data security. Our platform offers a user-friendly interface designed for efficiency and convenience, making it simple to send and receive files.
          </p>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            With advanced encryption technologies and stringent access controls, FileGuard guarantees that your sensitive information remains protected at all times. Whether for personal use or business purposes, our service is tailored to meet the needs of every user.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500 text-xl">✓</span>
              <span className="font-medium">ISO 27001 Certified</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500 text-xl">✓</span>
              <span className="font-medium">GDPR Compliant</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="text-green-500 text-xl">✓</span>
              <span className="font-medium">SOC 2 Type II</span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose FileGuard?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of security, speed, and simplicity
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white mb-6 shadow-lg text-3xl">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="w-full max-w-7xl px-6 md:px-10 my-24">
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-12 md:p-16 shadow-2xl text-white">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left: Text */}
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl font-bold">Our Performance Standards</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                FileGuard provides a robust file-sharing service that emphasizes security and user experience. Our platform is designed to ensure that your data remains protected while being easily accessible.
              </p>
              <p className="text-blue-100 text-lg leading-relaxed">
                With our state-of-the-art encryption and user-friendly interface, sharing files has never been more secure and straightforward.
              </p>
            </div>

            {/* Right: Metrics */}
            <div className="flex-1 space-y-8 w-full">
              {[
                { label: "Security", percent: counters.security, icon: "🛡️" },
                { label: "Efficiency", percent: counters.efficiency, icon: "⚡" },
                { label: "Guarantee", percent: counters.guarantee, icon: "🏆" },
              ].map((item) => (
                <div key={item.label} className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="font-semibold text-lg">{item.label}</span>
                    </div>
                    <span className="text-2xl font-bold">{item.percent}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-300 to-white h-3 rounded-full transition-all duration-1000 ease-out shadow-lg"
                      style={{ width: `${item.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-gray-900 text-white py-20 mt-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join millions of users who trust FileGuard with their most important files
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-xl text-lg transform hover:scale-105 transition-all duration-300 shadow-xl">
            Start Free Trial
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;