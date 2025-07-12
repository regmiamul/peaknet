import React, { useEffect, useState, lazy, Suspense } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBolt, FaDollarSign, FaHeadset, FaStar, FaFacebook, FaTwitter, FaInstagram, FaSearch, FaSpinner, FaCheck, FaTimes, FaInfoCircle } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';

// Lazy-loaded components
const SignupModal = lazy(() => import('./SignupModal'));

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [address, setAddress] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [coverageResult, setCoverageResult] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  // Real NBN API integration
  const checkNbnCoverage = async () => {
    if (!address.trim()) return;
    
    setIsChecking(true);
    setError(null);
    
    try {
      // Replace with your actual API endpoint and headers
      const response = await fetch('https://api.nbnco.net.au/address-verification/v1/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY' // Add your API key
        },
        body: JSON.stringify({
          address: address
        })
      });

      if (!response.ok) throw new Error('Failed to verify address');

      const data = await response.json();
      
      // Format response based on NBN API structure
      setCoverageResult({
        status: data.connectionStatus || 'unknown',
        technology: data.technologyType || 'Unknown',
        speedTier: data.maxTier || 'Not specified',
        eta: data.estimatedAvailability || null
      });
      
    } catch (err) {
      setError('Failed to check coverage. Please try again.');
      console.error('NBN API error:', err);
    } finally {
      setIsChecking(false);
    }
  };

  // Status messages mapping
  const statusConfig = {
    connected: { 
      color: 'bg-green-100 text-green-800',
      icon: <FaCheck className="text-green-500" />,
      message: 'NBN Connected'
    },
    available: { 
      color: 'bg-blue-100 text-blue-800',
      icon: <FaCheck className="text-blue-500" />,
      message: 'NBN Available'
    },
    planned: { 
      color: 'bg-amber-100 text-amber-800',
      icon: <FaInfoCircle className="text-amber-500" />,
      message: 'NBN Coming Soon'
    },
    not_available: { 
      color: 'bg-red-100 text-red-800',
      icon: <FaTimes className="text-red-500" />,
      message: 'NBN Not Available'
    },
    unknown: { 
      color: 'bg-gray-100 text-gray-800',
      icon: <FaInfoCircle className="text-gray-500" />,
      message: 'Coverage Unknown'
    }
  };

  const plans = [
    {
      name: "Basic",
      speed: "50/20 Mbps",
      price: "$59/month",
      features: ["Unlimited data", "Standard evening speed", "Basic support"]
    },
    {
      name: "Premium",
      speed: "100/40 Mbps",
      price: "$79/month",
      features: ["Unlimited data", "Priority evening speed", "Premium support", "Free modem"],
      popular: true
    },
    {
      name: "Ultra",
      speed: "250/100 Mbps",
      price: "$99/month",
      features: ["Unlimited data", "Ultra-fast anytime speed", "24/7 priority support", "Free modem + installation"]
    }
  ];

  const testimonials = [
    {
      text: "Switched to PeakNet and finally get the speeds I'm paying for.",
      author: "Sarah K.",
      location: "Sydney",
      rating: 5
    },
    {
      text: "The customer service is incredible - resolved my issue in 10 minutes!",
      author: "Michael T.",
      location: "Melbourne",
      rating: 5
    },
    {
      text: "Great value for money. No more buffering during Netflix nights.",
      author: "Priya M.",
      location: "Brisbane",
      rating: 4
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#0A2463]">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-16 w-16 bg-[#FFD700] rounded-full mb-4"></div>
          <p className="text-white font-bold">Loading PeakNet...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="font-sans bg-white text-gray-900 antialiased">
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <SignupModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </Suspense>

      {/* Header */}
      <header className="backdrop-blur-md bg-white/90 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <LazyLoadImage 
              src="/logo.png" 
              alt="PeakNet Logo" 
              effect="blur"
              className="h-10 w-auto"
            />
            <span className="font-bold text-xl text-[#0A2463]">PeakNet</span>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            {['Plans', 'Why Choose Us', 'Testimonials', 'Contact'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-sm font-medium hover:text-[#FFD700] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/login')}
              className="hidden sm:inline-block px-4 py-2 border border-[#0A2463] text-[#0A2463] rounded-full hover:bg-[#0A2463] hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Login
            </button>
            <button 
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-white px-5 py-2 rounded-full hover:brightness-110 transition-all duration-200 shadow-md text-sm font-bold"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section with NBN Checker */}
      <section className="relative bg-[url('/hero-bg.png')] bg-cover bg-center min-h-[600px] flex items-center">
        <div className="absolute inset-0 bg-black/40"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
              Blazing Fast <span className="text-[#FFD700]">NBN</span> Internet
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Australia's most reliable broadband with 99.9% uptime and award-winning support.
            </p>
          </div>

          {/* NBN Address Checker */}
          <div className="max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="200">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/20">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your Australian address (e.g. 1 Main St, Sydney NSW 2000)"
                    className="w-full px-5 py-4 rounded-lg bg-white/90 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#FFD700] pr-12"
                    onKeyPress={(e) => e.key === 'Enter' && checkNbnCoverage()}
                  />
                  <FaSearch className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                <button
                  onClick={checkNbnCoverage}
                  disabled={!address.trim() || isChecking}
                  className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-[#0A2463] px-6 py-4 rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed min-w-[180px] flex items-center justify-center"
                >
                  {isChecking ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Checking...
                    </>
                  ) : 'Check Coverage'}
                </button>
              </div>

              {/* Results Display */}
              {error && (
                <div className="mt-4 p-4 rounded-lg bg-red-100 text-red-800">
                  {error}
                </div>
              )}

              {coverageResult && !error && (
                <div className={`mt-4 p-4 rounded-lg ${statusConfig[coverageResult.status]?.color || 'bg-gray-100'}`}>
                  <div className="flex items-start">
                    <div className="mr-3 mt-1">
                      {statusConfig[coverageResult.status]?.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">
                        {statusConfig[coverageResult.status]?.message}
                      </h3>
                      <div className="mt-2 space-y-1">
                        <p>Technology: {coverageResult.technology}</p>
                        {coverageResult.speedTier && (
                          <p>Max Speed: {coverageResult.speedTier}</p>
                        )}
                        {coverageResult.eta && (
                          <p>Estimated Availability: {coverageResult.eta}</p>
                        )}
                      </div>
                      {(coverageResult.status === 'connected' || coverageResult.status === 'available') && (
                        <button 
                          onClick={() => setShowModal(true)}
                          className="mt-3 bg-[#0A2463] text-white px-4 py-2 rounded-lg hover:bg-[#0A2463]/90 transition"
                        >
                          View Available Plans
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <p className="text-white/80 text-sm mt-3 text-center">
                We check against the official NBN database
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Why Choose <span className="text-[#FFD700]">PeakNet</span>?
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
            We're not just another internet provider - we're your connectivity partner.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FaBolt className="text-3xl text-[#FFD700]" />,
                title: "Ultra-Fast Speeds",
                description: "Experience consistent speeds even during peak hours with our optimized network."
              },
              {
                icon: <FaDollarSign className="text-3xl text-[#FFD700]" />,
                title: "No Hidden Costs",
                description: "Transparent pricing with no lock-in contracts or surprise fees."
              },
              {
                icon: <FaHeadset className="text-3xl text-[#FFD700]" />,
                title: "24/7 Aussie Support",
                description: "Real humans based in Australia ready to help whenever you need."
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 hover:border-[#FFD700]/50"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex justify-center mb-6">
                  <div className="bg-[#0A2463]/10 p-4 rounded-full">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-center mb-3 text-[#0A2463]">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section id="plans" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#0A2463]">
              Simple, Affordable Plans
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your home or business needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${plan.popular ? 'border-2 border-[#FFD700] transform md:-translate-y-4' : 'border border-gray-200'}`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-[#FFD700] text-[#0A2463] px-4 py-1 text-xs font-bold rounded-bl-lg">
                    MOST POPULAR
                  </div>
                )}
                
                <div className="p-6 border-b border-gray-200">
                  <h3 className="text-2xl font-bold text-[#0A2463]">{plan.name}</h3>
                  <p className="text-gray-600">{plan.speed}</p>
                </div>
                
                <div className="p-6">
                  <p className="text-3xl font-bold mb-6">{plan.price}</p>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <FaStar className="text-[#FFD700] mr-2 mt-1 flex-shrink-0" size={14} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => setShowModal(true)}
                    className={`w-full py-3 rounded-lg font-bold ${plan.popular ? 'bg-gradient-to-r from-[#FFD700] to-[#FFA500]' : 'bg-[#0A2463]'} text-white hover:brightness-110 transition-all`}
                  >
                    {plan.popular ? 'Get Premium' : 'Sign Up'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by <span className="text-[#FFD700]">Thousands</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar 
                      key={i}
                      className={`${i < testimonial.rating ? 'text-[#FFD700]' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6">"{testimonial.text}"</p>
                <div className="flex items-center">
                  <div className="bg-[#0A2463]/10 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <span className="font-bold text-[#0A2463]">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-20 bg-[#0A2463] text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Experience <span className="text-[#FFD700]">Better Internet</span>?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied customers today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => setShowModal(true)}
                className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-[#0A2463] px-8 py-3 rounded-full font-bold hover:brightness-110 transition-all shadow-lg"
              >
                Sign Up Now
              </button>
              <button className="bg-white text-[#0A2463] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg">
                Call Our Team
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-10">
            <div>
              <div className="flex items-center mb-4">
                <LazyLoadImage 
                  src="/logo-white.png" 
                  alt="PeakNet Logo" 
                  effect="blur"
                  className="h-8 mr-2"
                />
                <span className="font-bold text-xl">PeakNet</span>
              </div>
              <p className="text-gray-400 text-sm">
                Australia's fastest growing internet provider, committed to reliable connectivity.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Quick Links</h4>
              <ul className="space-y-2">
                {['Plans', 'Coverage', 'Support', 'About Us'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2">
                {['Privacy Policy', 'Terms of Service', 'Acceptable Use Policy'].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors text-sm">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4 text-lg">Connect</h4>
              <div className="flex space-x-4 mb-4">
                <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  <FaFacebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  <FaTwitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors">
                  <FaInstagram size={20} />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                support@peaknet.com.au<br />
                1300 123 456
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
            <p>© {new Date().getFullYear()} PeakNet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;