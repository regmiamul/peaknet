import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Homepage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

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
      features: ["Unlimited data", "Priority evening speed", "Premium support", "Free modem"]
    },
    {
      name: "Ultra",
      speed: "250/100 Mbps",
      price: "$99/month",
      features: ["Unlimited data", "Ultra-fast anytime speed", "24/7 priority support", "Free modem + installation"]
    }
  ];

  return (
    <div className="font-sans bg-white text-black">
      <header className="backdrop-blur-md bg-white/90 text-black p-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="PeakNet Logo" className="h-12" />
          <span className="font-bold text-xl text-gradient">PeakNet</span>
        </div>
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#plans" className="hover:text-[#FFD700] transition duration-300">Plans</a>
          <a href="#why" className="hover:text-[#FFD700] transition duration-300">Why Choose Us</a>
          <a href="#testimonials" className="hover:text-[#FFD700] transition duration-300">Testimonials</a>
          <a href="#contact" className="hover:text-[#FFD700] transition duration-300">Contact</a>
        </nav>
        <button className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:brightness-110 transition-all duration-300">
          Sign Up Now
        </button>
      </header>

      <section className="hero-section relative flex items-center justify-center text-center">
        <div className="overlay"></div>
        <div className="container px-6 relative z-10" data-aos="fade-up">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gradient">Blazing Fast NBN Internet</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">Australia’s most reliable broadband with 99.9% uptime and award-winning support.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-white font-bold py-3 px-6 rounded-full hover:brightness-110 transition duration-300 shadow-lg">
              Go to Dashboard
            </button>
            <button className="border border-black text-black hover:text-white hover:bg-black font-bold py-3 px-6 rounded-full transition duration-300 shadow-lg">
              Call Now
            </button>
          </div>
        </div>
      </section>

      <section id="why" className="py-20">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">Why Choose PeakNet?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            {["Ultra-Fast Speeds", "No Hidden Fees", "Aussie Support"].map((title, idx) => (
              <div key={idx} className="bg-white border border-gray-300 rounded-xl p-6 text-center hover:border-[#FFD700] transition-all duration-300 hover:scale-105" data-aos="fade-up" data-aos-delay={idx * 100}>
                <div className="feature-icon mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11 11-4.925 11-11S18.075 1 12 1zm0 19c-4.97 0-9-3.93-9-9s3.93-9 9-9 9 3.93 9 9-3.93 9-9 9z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">{title}</h3>
                <p className="opacity-80">
                  {idx === 0 ? "Speeds that never slow down even during peak hours." :
                    idx === 1 ? "No contracts, no surprises—just value." :
                      "Friendly 24/7 local support you can trust."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="py-20 bg-white">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-center mb-6 text-gradient">Our NBN Plans</h2>
          <p className="text-center text-gray-700 mb-16 max-w-2xl mx-auto">Choose the perfect plan for your household or business needs.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, i) => (
              <div key={i} className={`rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ${i === 1 ? "scale-105 border border-[#FFD700] bg-white" : "bg-gray-100 border border-gray-200"}`} data-aos="fade-up" data-aos-delay={i * 100}>
                <div className="p-6 border-b border-gray-300">
                  <h3 className="text-2xl font-bold text-gradient">{plan.name}</h3>
                  <p className="text-lg opacity-80">{plan.speed}</p>
                </div>
                <div className="p-6">
                  <p className="text-3xl font-bold mb-4">{plan.price}</p>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-[#FFD700] mr-2">✓</span><span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-white font-bold transition hover:brightness-110">Sign Up Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20">
        <div className="container mx-auto px-6 max-w-4xl" data-aos="fade-up">
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6 text-gradient">Ready to Join PeakNet?</h2>
            <form className="grid md:grid-cols-2 gap-6">
              {["Full Name", "Email", "Phone Number", "Address"].map((label, i) => (
                <div key={i}>
                  <label className="block mb-2 text-sm text-gray-700">{label}</label>
                  <input className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700]" required />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-gray-700">Select Plan</label>
                <select className="w-full p-3 bg-white text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700]">
                  <option value="">Choose a plan</option>
                  {plans.map((plan, idx) => (
                    <option key={idx}>{plan.name} - {plan.speed} ({plan.price})</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-white font-bold rounded-lg text-lg transition hover:brightness-110">
                  Complete Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6" data-aos="fade-up">
          <h2 className="text-4xl font-bold text-center mb-12 text-gradient">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {["Switched to PeakNet and finally get the speeds I'm paying for.", "The customer service is incredible.", "Great value for money."]
              .map((text, i) => (
                <div key={i} className="bg-gray-100 rounded-lg p-6 shadow hover:shadow-xl transition" data-aos="fade-up" data-aos-delay={i * 100}>
                  <div className="text-[#FFD700] mb-2">★★★★★</div>
                  <p className="mb-4 text-sm">"{text}"</p>
                  <p className="font-semibold text-sm">- {i === 0 ? "Sarah K., Sydney" : i === 1 ? "Michael T., Melbourne" : "Priya M., Brisbane"}</p>
                </div>
              ))}
          </div>
        </div>
      </section>

      <footer className="bg-white text-black py-12 border-t border-gray-300">
        <div className="container mx-auto grid md:grid-cols-3 gap-8 text-sm text-center md:text-left">
          <div>
            <img src="/logo.png" alt="PeakNet Logo" className="h-10 mb-2 mx-auto md:mx-0" />
            <p className="text-gray-600">© 2025 PeakNet. All rights reserved.</p>
          </div>
          <div className="space-y-2">
            <a href="#" className="hover:text-[#FFD700]">Privacy Policy</a><br />
            <a href="#" className="hover:text-[#FFD700]">Terms of Service</a><br />
            <a href="#" className="hover:text-[#FFD700]">Support</a>
          </div>
          <div className="flex justify-center md:justify-end space-x-4">
            <a href="#"><i className="fab fa-facebook-square text-2xl hover:text-[#FFD700]"></i></a>
            <a href="#"><i className="fab fa-twitter-square text-2xl hover:text-[#FFD700]"></i></a>
            <a href="#"><i className="fab fa-instagram-square text-2xl hover:text-[#FFD700]"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;