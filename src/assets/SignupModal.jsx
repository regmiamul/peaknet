import React, { useState } from 'react';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

const SignupModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    plan: 'Basic - 50/20 Mbps ($59/month)',
    password: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!acceptedTerms) {
      setError("Please accept the terms to continue.");
      return;
    }
  
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Firebase signup
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
const user = userCredential.user;
const uid = user.uid;

// 🔥 Get and log the Firebase ID Token
const idToken = await user.getIdToken(true);
console.log("🔥 Firebase ID Token (copy this for testing):", idToken);
  
      // Call backend
      const res = await fetch('https://peaknet-backend.onrender.com/api/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          plan: formData.plan,
        }),
      });
  
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to save customer info');
      }
  
      setSuccessMsg('Signup successful! You can now log in.');
      setStep(3);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-4 text-[#0A2463]">Sign Up to PeakNet</h2>
            {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}
            <form onSubmit={handleSubmit}>
              {[
                { label: 'Full Name', name: 'name', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Phone Number', name: 'phone', type: 'tel' },
                { label: 'Address', name: 'address', type: 'text' },
                { label: 'Password', name: 'password', type: 'password' },
              ].map((field) => (
                <div key={field.name} className="mb-4">
                  <label className="block text-sm font-medium mb-1 text-gray-700">{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    disabled={loading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD700]"
                    autoComplete={field.name === 'password' ? 'new-password' : 'off'}
                  />
                </div>
              ))}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1 text-gray-700">Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  disabled={loading}
                >
                  <option>Basic - 50/20 Mbps ($59/month)</option>
                  <option>Premium - 100/40 Mbps ($79/month)</option>
                  <option>Ultra - 250/100 Mbps ($99/month)</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mr-2"
                    disabled={loading}
                  />
                  I agree to the terms
                </label>
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-gradient-to-r from-[#FFD700] to-[#FFB700] text-white font-bold py-3 rounded-lg hover:brightness-110 ${
                  loading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </form>
          </>
        );

      case 3:
        return (
          <div className="text-center">
            <FaArrowLeft
              className="inline mr-2 text-[#0A2463] cursor-pointer"
              onClick={() => setStep(1)}
            />
            <h2 className="text-xl font-bold text-green-600 mb-4">Success!</h2>
            <p>{successMsg}</p>
            <button
              onClick={onClose}
              className="mt-6 w-full bg-[#0A2463] text-white py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-red-500">
          <FaTimes size={20} />
        </button>
        {renderStep()}
      </div>
    </div>
  );
};

export default SignupModal;
