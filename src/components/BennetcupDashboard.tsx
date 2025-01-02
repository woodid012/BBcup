'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type HTMLAttributes, ReactNode } from 'react';

// Type definitions
interface Bet {
  timestamp: string;
  person_submitting: string;
  pairing: string;
  bet_type: 'win' | 'spoon';
  amount: number;
}

interface PairingData {
  pairing: string;
  winAmount: number;
  spoonAmount: number;
}

interface BettingData {
  totalWinPool: number;
  totalSpoonPool: number;
  totalPool: number;
  pairings: PairingData[];
}

// Component Props interfaces
interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
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

// Moving BETS to a state to avoid hydration issues
const initialBets: Bet[] = [
  {
    timestamp: "2024-01-02T12:00:00",
    person_submitting: "John Doe",
    pairing: "Al T/Cuts",
    bet_type: "win",
    amount: 50
  },
  {
    timestamp: "2024-01-02T11:00:00",
    person_submitting: "Jane Smith",
    pairing: "Mitzi/Bondy",
    bet_type: "spoon",
    amount: 30
  }
];

// Calculate betting data function
const calculateBettingData = (bets: Bet[]): BettingData => {
  const pairingsData = PAIRINGS.map(pairing => {
    const winBets = bets.filter(bet => bet.pairing === pairing && bet.bet_type === 'win');
    const spoonBets = bets.filter(bet => bet.pairing === pairing && bet.bet_type === 'spoon');
    
    return {
      pairing,
      winAmount: winBets.reduce((sum, bet) => sum + bet.amount, 0),
      spoonAmount: spoonBets.reduce((sum, bet) => sum + bet.amount, 0)
    };
  });

  const totalWinPool = bets
    .filter(bet => bet.bet_type === 'win')
    .reduce((sum, bet) => sum + bet.amount, 0);
    
  const totalSpoonPool = bets
    .filter(bet => bet.bet_type === 'spoon')
    .reduce((sum, bet) => sum + bet.amount, 0);

  return {
    totalWinPool,
    totalSpoonPool,
    totalPool: totalWinPool + totalSpoonPool,
    pairings: pairingsData
  };
};

// Submitted Bets Component
interface SubmittedBetsProps {
  bets: Bet[];
}

const SubmittedBets = ({ bets }: SubmittedBetsProps): JSX.Element => {
    return (
        <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Recent Bets</h3>
            </div>
            <div className="p-6 pt-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Time</th>
                                <th className="text-left p-2">Name</th>
                                <th className="text-left p-2">Pairing</th>
                                <th className="text-center p-2">Type</th>
                                <th className="text-right p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bets.map((bet, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50">
                                    <td className="p-2">
                                        {new Date(bet.timestamp).toLocaleString()}
                                    </td>
                                    <td className="p-2">{bet.person_submitting}</td>
                                    <td className="p-2">{bet.pairing}</td>
                                    <td className="p-2 text-center">
                                        <span className={`px-2 py-1 rounded-full text-sm ${
                                            bet.bet_type === 'win' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-red-100 text-red-800'
                                        }`}>
                                            {bet.bet_type}
                                        </span>
                                    </td>
                                    <td className="p-2 text-right">
                                        ${bet.amount.toFixed(2)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Main Dashboard Component
const BennetcupDashboard = (): JSX.Element => {
  const [bets, setBets] = useState<Bet[]>(initialBets);
  const [bettingData, setBettingData] = useState<BettingData>(() => calculateBettingData(initialBets));
  const [lastUpdate, setLastUpdate] = useState<string>("");

  useEffect(() => {
    setLastUpdate(new Date().toLocaleTimeString());
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      <div className="space-y-6">
        {/* Total Pool Summary */}
        <div className="w-full rounded-lg border bg-blue-50 text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Current Betting Pool</h3>
            </div>
            <div className="p-6 pt-0">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-gray-600">Total Pool</p>
                        <p className="text-2xl font-bold">
                            ${bettingData.totalPool.toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">Win Pool</p>
                        <p className="text-2xl font-bold">
                            ${bettingData.totalWinPool.toFixed(2)}
                        </p>
                    </div>
                    <div>
                        <p className="text-gray-600">Spoon Pool</p>
                        <p className="text-2xl font-bold">
                            ${bettingData.totalSpoonPool.toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Odds Table */}
        <div className="w-full rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight">Live Betting Odds</h3>
            </div>
            <div className="p-6 pt-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="text-left p-2">Pairing</th>
                                <th className="text-center p-2">Win Amount</th>
                                <th className="text-center p-2">Win Odds</th>
                                <th className="text-center p-2">Spoon Amount</th>
                                <th className="text-center p-2">Spoon Odds</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bettingData.pairings.map((pair) => (
                                <tr key={pair.pairing} className="border-b hover:bg-gray-50">
                                    <td className="p-2 font-medium">{pair.pairing}</td>
                                    <td className="text-center p-2">${pair.winAmount.toFixed(2)}</td>
                                    <td className="text-center p-2 font-bold text-green-600">
                                        {pair.winAmount > 0 
                                            ? (bettingData.totalWinPool / pair.winAmount).toFixed(2)
                                            : '∞'}x
                                    </td>
                                    <td className="text-center p-2">${pair.spoonAmount.toFixed(2)}</td>
                                    <td className="text-center p-2 font-bold text-red-600">
                                        {pair.spoonAmount > 0
                                            ? (bettingData.totalSpoonPool / pair.spoonAmount).toFixed(2)
                                            : '∞'}x
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className="mt-4 text-sm text-gray-500">
                    <p>* Odds are calculated as: (Total Pool / Amount Bet on Pairing)</p>
                    <p>* Higher odds indicate fewer bets on that outcome</p>
                    <p>* Last updated: {lastUpdate}</p>
                </div>
            </div>
        </div>

        {/* Submitted Bets Table */}
        <SubmittedBets bets={bets} />
      </div>
    </div>
  );
};

export default BennetcupDashboard;