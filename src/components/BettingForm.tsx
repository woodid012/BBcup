'use client'

import { useState, ChangeEvent, FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Type definitions
interface FormData {
  person_submitting: string;
  pairing: string;
  amount: string;
  bet_type: 'win' | 'spoon';
}

interface StatusState {
  type: 'success' | 'error' | '';
  message: string;
}

// Constants
const PAIRINGS: string[] = [
  "Al T/Cuts",
  "Mitzi/Bondy",
  "Woody/Foulsh",
  "Pitovich/Berts",
  "Xav/Tubs",
  "Macca/Tarch",
  "Bennet/Shark",
  "Iddles/Niz"
];

const BettingForm = (): JSX.Element => {
  const [formData, setFormData] = useState<FormData>({
    person_submitting: '',
    pairing: '',
    amount: '',
    bet_type: 'win'
  });
  
  const [status, setStatus] = useState<StatusState>({ type: '', message: '' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setStatus({ type: 'success', message: 'Bet submitted successfully!' });
    setFormData({
      person_submitting: '',
      pairing: '',
      amount: '',
      bet_type: 'win'
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">Place Your Bet</h3>
        </div>
        <div className="p-6 pt-0">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Person submitting */}
            <div>
              <label htmlFor="person_submitting" className="block text-sm font-medium mb-1">Your Name</label>
              <input
                id="person_submitting"
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
              <label htmlFor="pairing" className="block text-sm font-medium mb-1">Pairing to Bet On</label>
              <select
                id="pairing"
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
              <label htmlFor="amount" className="block text-sm font-medium mb-1">Amount ($)</label>
              <input
                id="amount"
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
              <label htmlFor="bet_type" className="block text-sm font-medium mb-1">Bet Type</label>
              <select
                id="bet_type"
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
            <div className={`mt-4 rounded-lg border p-4 ${
              status.type === 'error' ? 'bg-red-100 border-red-200' : 'bg-green-100 border-green-200'
            }`}>
              <p className="text-sm">
                {status.message}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BettingForm;