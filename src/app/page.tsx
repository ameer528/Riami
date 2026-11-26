import React from 'react';
import { Activity, Users, Target, DollarSign, Zap, ArrowRight } from 'lucide-react';

export default function RiamiDashboard() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-sans selection:bg-blue-500/30">
      <div className="fixed inset-y-0 left-0 w-64 border-r border-[#222] bg-[#0A0A0A] p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded-full border-2 border-blue-500 flex items-center justify-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
          </div>
          <span className="text-xl font-bold tracking-tight">Riami</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: Activity, label: 'Overview', active: true },
            { icon: Users, label: 'AI Workforce', active: false },
            { icon: Target, label: 'Leads', active: false },
            { icon: Zap, label: 'Automations', active: false },
          ].map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                item.active ? 'bg-blue-500/10 text-blue-500' : 'text-gray-400 hover:bg-[#1A1A1A] hover:text-white'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pl-64">
        <header className="h-16 border-b border-[#222] flex items-center justify-between px-8 bg-[#0A0A0A]/80 backdrop-blur-sm sticky top-0">
          <h1 className="text-lg font-semibold">Command Center</h1>
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono text-gray-500">ORG_ID: 7f8a-9b2c</span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500" />
          </div>
        </header>

        <main className="p-8 max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { label: 'Active Prospects', value: '1,248', icon: Target, trend: '+12%' },
              { label: 'Conversations', value: '186', icon: Users, trend: '+4%' },
              { label: 'Meetings Booked', value: '32', icon: Activity, trend: '+18%' },
              { label: 'Pipeline Value', value: '$124,500', icon: DollarSign, trend: '+22%' },
            ].map((stat) => (
              <div key={stat.label} className="p-6 border border-[#222] rounded-xl bg-[#111111]">
                <div className="flex justify-between items-start mb-4">
                  <stat.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-xs font-medium text-green-400 bg-green-400/10 px-2 py-1 rounded-md">
                    {stat.trend}
                  </span>
                </div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="p-6 border border-[#222] rounded-xl bg-[#111111]">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Deploy Workforce</h2>
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder="e.g., Find 100 marketing agencies in New York and initiate outreach..."
                className="flex-1 bg-[#0A0A0A] border border-[#333] rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                Execute <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="border border-[#222] rounded-xl bg-[#111111] overflow-hidden">
            <div className="p-4 border-b border-[#222] flex justify-between items-center">
              <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Live Agent Executions</h2>
              <span className="flex items-center gap-2 text-xs text-blue-400">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                System Online
              </span>
            </div>
            <div className="divide-y divide-[#222]">
              {[
                { agent: 'SDR_Agent_01', action: 'Discovered 45 new leads via Apollo integration', time: 'Just now' },
                { agent: 'AE_Agent_02', action: 'Generated proposal for Acme Corp ($12,000)', time: '2 mins ago' },
                { agent: 'Researcher_01', action: 'Enriched decision-maker data for Globex', time: '5 mins ago' },
                { agent: 'SDR_Agent_01', action: 'Sent personalized sequence to 12 prospects', time: '12 mins ago' },
              ].map((log, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-[#1A1A1A] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <div className="text-sm font-medium text-white">{log.agent}</div>
                      <div className="text-sm text-gray-400">{log.action}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{log.time}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
                    }
