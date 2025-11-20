"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "https://datavinci-assignment.onrender.com"
        const response = await axios.get(`${apiUrl}/campaigns`);
        setCampaigns(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filterStatus === "All") return true;
    return campaign.status === filterStatus;
  });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 animate-pulse font-medium">
      Loading analytics...
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-8">
      <div className="max-w-6xl mx-auto">
        
        
        <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Campaigns</h1>
                <p className="text-slate-500 mt-1 text-sm">Real-time performance tracking</p>
            </div>
            
            
            <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="appearance-none bg-white border border-slate-200 hover:border-slate-300 text-slate-700 py-2.5 pl-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent cursor-pointer transition-all font-medium text-sm"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active Only</option>
                  <option value="Paused">Paused Only</option>
                </select>
                
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
        </header>

        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100">
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Campaign Name</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider">Status</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Clicks</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Cost</th>
                  <th className="p-5 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Impressions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.id} className="hover:bg-slate-50 transition-colors duration-150 group">
                    <td className="p-5 font-semibold text-slate-900">{campaign.name}</td>
                    <td className="p-5">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                        campaign.status === "Active"
                          ? "bg-slate-900 text-white border-transparent shadow-sm"
                          : "bg-white text-slate-500 border-slate-200"
                      }`}>
                        {campaign.status === "Active" && <span className="w-1.5 h-1.5 bg-white rounded-full mr-2 animate-pulse"></span>}
                        {campaign.status}
                      </span>
                    </td>
                    <td className="p-5 text-slate-600 text-right font-mono text-sm tabular-nums">{campaign.clicks.toLocaleString()}</td>
                    <td className="p-5 text-slate-600 text-right font-mono text-sm tabular-nums">${Number(campaign.cost).toFixed(2)}</td>
                    <td className="p-5 text-slate-600 text-right font-mono text-sm tabular-nums">{campaign.impressions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {filteredCampaigns.length === 0 && (
            <div className="p-12 text-center">
                <p className="text-slate-400">No campaigns found matching your filter.</p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-slate-400">
            <p>Campaign data provided by Grippi Analytics API</p>
        </div>
      </div>
    </div>
  );
}