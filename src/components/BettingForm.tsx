'use client'

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Constants (could be moved to a shared constants file later)
const PAIRINGS = [
  "Al T/Cuts",
  "Mitzi/Bondy",
  "Woody/Foulsh",
  "Pitovich/Berts",
  "Xav/Tubs",
  "Macca/Tarch",
  "Bennet/Shark",
  "Iddles/Niz"
];

const BettingForm = () => {
  const [formData, setFormData] = useState({
    person_submitting: '',
    pairing: '',
    amount: '',
    bet_type: 'win'
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: 'success', message: 'Bet submitted successfully!' });
    setFormData({
      person_submitting: '',
      pairing: '',
      amount: '',
      bet_type: 'win'
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Place Your Bet</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Person submitting */}
            <div>
              <label className="block text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                name="person_submitting"
                value={formData.person_submitting}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
                placeholder="Enter your name"
              />
            </div>

            {/* Pairing dropdown */}
            <div>
              <label className="block text-sm font-medium mb-1">Pairing to Bet On</label>
              <select
                name="pairing"
                value={formData.pairing}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="">Select pairing</option>
                {PAIRINGS.map(pair => (
                  <option key={pair} value={pair}>
                    {pair}
                  </option>
                ))}
              </select>
            </div>

            {/* Amount field */}
            <div>
              <label className="block text-sm font-medium mb-1">Amount ($)</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full p-2 border rounded-md"
                placeholder="Enter bet amount"
              />
            </div>

            {/* Bet type selection */}
            <div>
              <label className="block text-sm font-medium mb-1">Bet Type</label>
              <select
                name="bet_type"
                value={formData.bet_type}
                onChange={handleChange}
                className="w-full p-2 border rounded-md bg-white"
              >
                <option value="win">Win</option>
                <option value="spoon">Spoon</option>
              </select>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit Bet
            </button>
          </form>

          {/* Status message */}
          {status.message && (
            <Alert className={`mt-4 ${status.type === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
              <AlertDescription>
                {status.message}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BettingForm;