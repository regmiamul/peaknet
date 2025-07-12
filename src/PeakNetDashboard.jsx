import { useState } from 'react';
import { FaFileInvoice, FaMoneyBillWave, FaHistory, FaUser, FaCog } from 'react-icons/fa';
import { FaExclamationTriangle } from 'react-icons/fa'; // ✅ Missing in your code!
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa'; // ✅ Also required for footer

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const PeakNetDashboard = () => {
  const [currentPlan] = useState({
    name: "NBN 250 Ultra",
    speed: "250/50 Mbps",
    data: "Unlimited",
    price: "$99/month",
    renewalDate: "15 March 2024"
  });

  const [bills] = useState([
    { 
      id: 1, 
      date: "15 Feb 2024", 
      amount: "$99.00", 
      status: "Paid",
      download: "#"
    },
    { 
      id: 2, 
      date: "15 Jan 2024", 
      amount: "$99.00", 
      status: "Paid",
      download: "#"
    },
    { 
      id: 3, 
      date: "15 Dec 2023", 
      amount: "$99.00", 
      status: "Paid",
      download: "#"
    }
  ]);

  const [notifications] = useState([
    { id: 1, type: 'info', message: 'Your next bill will be generated on 10 March', date: '2 days ago' },
    { id: 2, type: 'warning', message: 'Scheduled maintenance tonight 2-4am', date: '1 week ago' }
  ]);

  return (
    <div className="font-sans bg-white text-gray-900 antialiased">
      {/* Header - Matching Homepage Style */}
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
            <a href="#" className="text-sm font-medium hover:text-[#FFD700] transition-colors duration-200">Dashboard</a>
            <a href="#" className="text-sm font-medium hover:text-[#FFD700] transition-colors duration-200">Billing</a>
            <a href="#" className="text-sm font-medium hover:text-[#FFD700] transition-colors duration-200">Support</a>
            <a href="#" className="text-sm font-medium hover:text-[#FFD700] transition-colors duration-200">Account</a>
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => {}}
              className="hidden sm:inline-block px-4 py-2 border border-[#0A2463] text-[#0A2463] rounded-full hover:bg-[#0A2463] hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Upgrade
            </button>
            <div className="w-10 h-10 bg-[#0A2463] rounded-full flex items-center justify-center text-white">
              <FaUser />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-[#0A2463] text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Current Plan</h2>
              <span className="bg-[#FFD700] text-[#0A2463] px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-[#0A2463]">{currentPlan.name}</h3>
                  <p className="text-gray-600">{currentPlan.speed} • {currentPlan.data}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-[#0A2463]">{currentPlan.price}</p>
                  <p className="text-sm text-gray-500">Renews {currentPlan.renewalDate}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#0A2463]/10 rounded-full">
                      <FaFileInvoice className="text-[#0A2463]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Next Bill</p>
                      <p className="font-medium">15 Mar 2024</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-[#0A2463]/10 rounded-full">
                      <FaMoneyBillWave className="text-[#0A2463]" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment Method</p>
                      <p className="font-medium">Credit Card ****4242</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-[#0A2463] font-bold py-3 rounded-lg transition hover:brightness-110">
                Manage Plan
              </button>
            </div>
          </div>

          {/* Billing History Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-[#0A2463] text-white px-6 py-4">
              <h2 className="text-xl font-bold">Billing History</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {bills.map(bill => (
                  <div key={bill.id} className="flex justify-between items-center border-b border-gray-100 pb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-gray-100 rounded-full">
                        <FaFileInvoice className="text-[#0A2463]" />
                      </div>
                      <div>
                        <p className="font-medium">{bill.date}</p>
                        <p className="text-sm text-gray-500">Invoice #{bill.id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{bill.amount}</p>
                      <p className={`text-xs ${
                        bill.status === 'Paid' ? 'text-green-500' : 'text-amber-500'
                      }`}>
                        {bill.status}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 border border-[#0A2463] text-[#0A2463] font-bold py-2 rounded-lg hover:bg-[#0A2463] hover:text-white transition">
                View All Invoices
              </button>
            </div>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-[#0A2463] text-white px-6 py-4">
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            <div className="p-6">
              {notifications.length > 0 ? (
                <ul className="space-y-4">
                  {notifications.map(notification => (
                    <li key={notification.id} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'warning' ? 'bg-amber-100 text-amber-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <FaExclamationTriangle />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-gray-500">{notification.date}</p>
                      </div>
                      <button className="text-[#0A2463] hover:text-[#FFD700]">
                        <FaCog />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">No new notifications</p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer - Matching Homepage Style */}
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
                {['Dashboard', 'Billing', 'Support', 'Account'].map((link) => (
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

export default PeakNetDashboard;