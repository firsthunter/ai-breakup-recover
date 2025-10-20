'use client';

import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Spinner */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 border-8 border-purple-500/30 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-transparent border-t-purple-500 border-r-pink-500 rounded-full animate-spin"></div>
          <div className="absolute inset-4 border-8 border-transparent border-t-cyan-500 border-r-purple-400 rounded-full animate-spin-reverse"></div>
          <div className="absolute inset-0 flex items-center justify-center text-4xl">
            💫
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
            AI Agents Coordinating Support...
          </h2>
          <div className="flex items-center justify-center gap-2 text-gray-300">
            <div className="flex gap-1">
              <span className="animate-bounce delay-0">🧠</span>
              <span className="animate-bounce delay-100">💌</span>
              <span className="animate-bounce delay-200">📅</span>
              <span className="animate-bounce delay-300">🔥</span>
            </div>
          </div>
          <p className="text-gray-400 text-lg animate-pulse">
            Our expert team is analyzing your situation...
          </p>
        </div>

        {/* Progress Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-pink-500 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};
