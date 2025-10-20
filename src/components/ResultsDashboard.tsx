'use client';

import { AGENT_COLORS, AGENT_ICONS } from '@/constants/agents';
import { AgentResults } from '@/types';
import React from 'react';
import { AgentCard } from './AgentCard';

interface ResultsDashboardProps {
  teamSummary: string;
  agentResults: AgentResults;
  onReset: () => void;
}

export const ResultsDashboard: React.FC<ResultsDashboardProps> = ({
  teamSummary,
  agentResults,
  onReset,
}) => {
  return (
    <div className="w-full max-w-6xl space-y-8 animate-fadeIn">
      {/* Team Leader Summary */}
      <div className={`bg-gradient-to-br ${AGENT_COLORS.teamLeader} backdrop-blur-sm rounded-2xl border shadow-2xl p-8`}>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{AGENT_ICONS.teamLeader}</span>
          <div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-400">
              Team Leader Summary
            </h2>
            <p className="text-gray-400 mt-1">Synthesized guidance from all specialists</p>
          </div>
        </div>
        <div className="bg-black/30 rounded-xl p-6 border border-yellow-500/20">
          <div className="prose prose-invert max-w-none">
            <div className="text-gray-200 whitespace-pre-wrap leading-relaxed text-lg">
              {teamSummary}
            </div>
          </div>
        </div>
      </div>

      {/* Agent Reports */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
          <span className="text-3xl">👥</span>
          Specialist Reports
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agentResults.therapist && (
            <AgentCard
              agent={agentResults.therapist}
              icon={AGENT_ICONS.therapist}
              colorClass={AGENT_COLORS.therapist}
            />
          )}
          {agentResults.closure && (
            <AgentCard
              agent={agentResults.closure}
              icon={AGENT_ICONS.closure}
              colorClass={AGENT_COLORS.closure}
            />
          )}
          {agentResults.routine && (
            <AgentCard
              agent={agentResults.routine}
              icon={AGENT_ICONS.routine}
              colorClass={AGENT_COLORS.routine}
            />
          )}
          {agentResults.honesty && (
            <AgentCard
              agent={agentResults.honesty}
              icon={AGENT_ICONS.honesty}
              colorClass={AGENT_COLORS.honesty}
            />
          )}
        </div>
      </div>

      {/* Reset Button */}
      <div className="text-center pt-8">
        <button
          onClick={onReset}
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all"
        >
          🔄 Start New Session
        </button>
      </div>
    </div>
  );
};
