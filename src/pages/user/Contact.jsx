import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    consent: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (!formData.consent) newErrors.consent = 'You must agree to data collection';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '', consent: false });
      setIsSubmitting(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: "📞",
      title: "Phone",
      text: "09123456789",
      subtitle: "Mon-Sun, 24/7",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: "✉️",
      title: "Email",
      text: "fileguard@info.com",
      subtitle: "Quick response guaranteed",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: "📍",
      title: "Address",
      text: "Western Bicutan, Taguig",
      subtitle: "Metro Manila, Philippines",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: "🕐",
      title: "Hours",
      text: "24/7 Available",
      subtitle: "Always here for you",
      gradient: "from-green-500 to-teal-500"
    },
  ];

  return (
    <div className="flex flex-col items-center bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Hero Banner */}
      <div className="relative w-full bg-gradient-to-br from-blue-900 via-blue-700 to-blue-600 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
        }}></div>
        
        <div className="relative z-10 text-center px-6">
          <div className="transition-all duration-1000">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Get In Touch</h1>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              We're here to help and answer any questions you might have
            </p>
            <div className="flex items-center justify-center space-x-3 text-sm text-blue-200">
              <a href="/" className="hover:text-white transition-colors duration-200">
                Home
              </a>
              <span>/</span>
              <span className="text-white font-medium">Contact Us</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="w-full max-w-7xl px-6 -mt-16 mb-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:-translate-y-2"
            >
              <div className={`h-2 bg-gradient-to-r ${item.gradient}`}></div>
              <div className="p-8 text-center">
                <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-700 font-medium mb-1">{item.text}</p>
                <p className="text-sm text-gray-500">{item.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="w-full max-w-7xl px-6 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Why Contact Us */}
          <div className="space-y-8">
            <div>
              <div className="inline-block px-4 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                We're Here To Help
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Let's Start a Conversation
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                Have any questions, feedback, or need assistance? Our team is here to support you. Feel free to reach out to us, and we'll do our best to make your experience as smooth as possible.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: "⚡", title: "Quick Response", desc: "We aim to respond within 24 hours" },
                { icon: "🔒", title: "Secure Communication", desc: "Your data is encrypted and protected" },
                { icon: "💬", title: "Expert Support", desc: "Our team is ready to assist you" },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="text-3xl">{feature.icon}</div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <h3 className="font-bold text-gray-900 mb-4">Trusted By Thousands</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">10K+</div>
                  <div className="text-sm text-gray-600">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-purple-600">4.9★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-pink-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">Send us a Message</h3>
              <p className="text-gray-600">Fill out the form below and we'll get back to you soon</p>
            </div>

            <div className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.email}
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  rows="5"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none resize-none transition-all"
                ></textarea>
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <span>⚠️</span> {errors.message}
                  </p>
                )}
              </div>

              {/* Consent Checkbox */}
              <div className="bg-gray-50 rounded-xl p-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    I agree that my submitted data is being collected and stored for communication purposes. Your privacy is important to us.
                  </span>
                </label>
                {errors.consent && (
                  <p className="text-red-500 text-sm mt-2 ml-8 flex items-center gap-1">
                    <span>⚠️</span> {errors.consent}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="animate-spin">⏳</span> Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Send Message <span>✉️</span>
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Visit Our Office</h2>
            <p className="text-gray-600">Find us at our location in Metro Manila</p>
          </div>
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30899.361259474914!2d121.01864680179158!3d14.517943197024417!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cf2ca2a215d5%3A0x38380d2c1d509c80!2sWestern%20Bicutan%2C%20Taguig%2C%201630%20Metro%20Manila!5e0!3m2!1sen!2sph!4v1730702443363!5m2!1sen!2sph"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
          <p className="text-blue-100 mb-6">
            Our support team is available 24/7 to help you with any urgent matters
          </p>
          <a
            href="tel:09123456789"
            className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 shadow-xl"
          >
            📞 Call Us Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;