'use client'

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { type HTMLAttributes } from 'react';

// Constants
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

const BETS = [
  {
    timestamp: new Date(),
    person_submitting: "John Doe",
    pairing: "Al T/Cuts",
    bet_type: "win",
    amount: 50
  },
  {
    timestamp: new Date(Date.now() - 3600000),
    person_submitting: "Jane Smith",
    pairing: "Mitzi/Bondy",
    bet_type: "spoon",
    amount: 30
  }
];

// Calculate betting data from BETS
const calculateBettingData = () => {
  const pairingsData = PAIRINGS.map(pairing => {
    const winBets = BETS.filter(bet => bet.pairing === pairing && bet.bet_type === 'win');
    const spoonBets = BETS.filter(bet => bet.pairing === pairing && bet.bet_type === 'spoon');
    
    return {
      pairing,
      winAmount: winBets.reduce((sum, bet) => sum + bet.amount, 0),
      spoonAmount: spoonBets.reduce((sum, bet) => sum + bet.amount, 0)
    };
  });

  const totalWinPool = BETS
    .filter(bet => bet.bet_type === 'win')
    .reduce((sum, bet) => sum + bet.amount, 0);
    
  const totalSpoonPool = BETS
    .filter(bet => bet.bet_type === 'spoon')
    .reduce((sum, bet) => sum + bet.amount, 0);

  return {
    totalWinPool,
    totalSpoonPool,
    totalPool: totalWinPool + totalSpoonPool,
    pairings: pairingsData
  };
};

const BETTING_DATA = calculateBettingData();

// Submitted Bets Component
const SubmittedBets = () => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Recent Bets</CardTitle>
            </CardHeader>
            <CardContent>
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
                            {BETS.map((bet, index) => (
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
            </CardContent>
        </Card>
    );
};

// Main Dashboard Component
const BennetcupDashboard = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 space-y-8">
      {/* Odds Summary Section */}
      <div className="space-y-6">
        {/* Total Pool Summary */}
        <Card className="w-full bg-blue-50">
          <CardHeader>
            <CardTitle>Current Betting Pool</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-gray-600">Total Pool</p>
                <p className="text-2xl font-bold">
                  ${BETTING_DATA.totalPool.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Win Pool</p>
                <p className="text-2xl font-bold">
                  ${BETTING_DATA.totalWinPool.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Spoon Pool</p>
                <p className="text-2xl font-bold">
                  ${BETTING_DATA.totalSpoonPool.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Odds Table */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Live Betting Odds</CardTitle>
          </CardHeader>
          <CardContent>
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
                  {BETTING_DATA.pairings.map((pair) => (
                    <tr key={pair.pairing} className="border-b hover:bg-gray-50">
                      <td className="p-2 font-medium">{pair.pairing}</td>
                      <td className="text-center p-2">${pair.winAmount.toFixed(2)}</td>
                      <td className="text-center p-2 font-bold text-green-600">
                        {pair.winAmount > 0 
                          ? (BETTING_DATA.totalWinPool / pair.winAmount).toFixed(2)
                          : '∞'}x
                      </td>
                      <td className="text-center p-2">${pair.spoonAmount.toFixed(2)}</td>
                      <td className="text-center p-2 font-bold text-red-600">
                        {pair.spoonAmount > 0
                          ? (BETTING_DATA.totalSpoonPool / pair.spoonAmount).toFixed(2)
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
              <p>* Last updated: {new Date().toLocaleTimeString()}</p>
            </div>
          </CardContent>
        </Card>

        {/* Submitted Bets Table */}
        <SubmittedBets />
      </div>
    </div>
  );
};

export default BennetcupDashboard;