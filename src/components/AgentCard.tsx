'use client';

import { AgentResult } from '@/types';
import React, { useState } from 'react';

interface AgentCardProps {
  agent: AgentResult;
  icon: string;
  colorClass: string;
}

export const AgentCard: React.FC<AgentCardProps> = ({ agent, icon, colorClass }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`bg-gradient-to-br ${colorClass} backdrop-blur-sm rounded-xl border overflow-hidden shadow-lg transition-all hover:shadow-2xl`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
      >
        <div className="flex items-center gap-4">
          <span className="text-4xl">{icon}</span>
          <div>
            <h3 className="text-xl font-bold text-white">{agent.name}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {isExpanded ? 'Click to collapse' : 'Click to expand'}
            </p>
          </div>
        </div>
        <svg
          className={`w-6 h-6 text-white transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 border-t border-white/10">
          {agent.error ? (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 mt-4">
              <p className="text-red-300 font-semibold">Error:</p>
              <p className="text-red-200 mt-2">{agent.error}</p>
            </div>
          ) : (
            <div className="prose prose-invert max-w-none mt-4">
              <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                {agent.output}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
