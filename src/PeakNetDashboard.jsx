import { useState } from 'react';
import { FaWifi, FaClock, FaExclamationTriangle, FaUser, FaCog } from 'react-icons/fa';

const PeakNetDashboard = () => {
  const [currentPlan] = useState({
    name: "NBN 250 Ultra",
    speed: "250/50 Mbps",
    data: "Unlimited",
    price: "$99/month",
    renewalDate: "15 March 2024"
  });

  const [usage] = useState({
    used: 423,
    total: "Unlimited",
    percentage: 42
  });

  const [notifications] = useState([
    { id: 1, type: 'info', message: 'Your bill is ready for payment', date: '2 days ago' },
    { id: 2, type: 'warning', message: 'Scheduled maintenance tonight 2-4am', date: '1 week ago' }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-yellow-500">PN</span>
            </div>
            <h1 className="text-2xl font-bold">
              <span className="text-white">Peak</span>
              <span className="text-yellow-500">Net</span>
            </h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-yellow-500 transition">Dashboard</a>
            <a href="#" className="text-white hover:text-yellow-500 transition">Plans</a>
            <a href="#" className="text-white hover:text-yellow-500 transition">Usage</a>
            <a href="#" className="text-white hover:text-yellow-500 transition">Support</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition">
              Upgrade Plan
            </button>
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <FaUser className="text-black" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Plan Card */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-black text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Current Plan</h2>
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-black">{currentPlan.name}</h3>
                  <p className="text-gray-600">{currentPlan.speed} • {currentPlan.data}</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-600">{currentPlan.price}</p>
                  <p className="text-sm text-gray-500">Renews {currentPlan.renewalDate}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <FaWifi className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Connection</p>
                      <p className="font-medium">Excellent</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-100 rounded-full">
                      <FaClock className="text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Uptime</p>
                      <p className="font-medium">99.98% this month</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-medium py-3 rounded-md transition">
                Manage Plan
              </button>
            </div>
          </div>

          {/* Usage Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-black text-white px-6 py-4">
              <h2 className="text-xl font-bold">Data Usage</h2>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">This Month</h3>
                <span className="text-sm text-gray-500">{usage.used} GB used</span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-red-600 h-4 rounded-full" 
                  style={{ width: `${usage.percentage}%` }}
                ></div>
              </div>
              
              <p className="text-sm text-gray-600 mb-6">{usage.total} data allowance</p>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Peak hours</span>
                  <span className="font-medium">143 GB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Off-peak</span>
                  <span className="font-medium">280 GB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="bg-black text-white px-6 py-4">
              <h2 className="text-xl font-bold">Notifications</h2>
            </div>
            <div className="p-6">
              {notifications.length > 0 ? (
                <ul className="space-y-4">
                  {notifications.map(notification => (
                    <li key={notification.id} className="flex items-start space-x-4">
                      <div className={`p-2 rounded-full ${
                        notification.type === 'warning' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                      }`}>
                        <FaExclamationTriangle />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{notification.message}</p>
                        <p className="text-sm text-gray-500">{notification.date}</p>
                      </div>
                      <button className="text-yellow-500 hover:text-yellow-600">
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

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">PeakNet</h3>
              <p className="text-gray-400">Australia's premium NBN provider</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">NBN Plans</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">Business Solutions</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">Speed Test</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">Outage Map</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-yellow-500 transition">ACCC Speed Disclosure</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
            <p>© {new Date().getFullYear()} PeakNet. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PeakNetDashboard;

