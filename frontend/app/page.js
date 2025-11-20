"use client"; 

import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  // State for storing campaigns, loading status, and error
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("All"); // Filter state

  // Fetch data from backend when component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Connect to your local FastAPI backend
        const response = await axios.get("http://127.0.0.1:8000/campaigns");
        setCampaigns(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter logic [cite: 12]
  const filteredCampaigns = campaigns.filter((campaign) => {
    if (filterStatus === "All") return true;
    return campaign.status === filterStatus;
  });

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-lg p-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Campaign Analytics</h1>
          
          {/* Filter Dropdown [cite: 12] */}
          <div>
            <label className="mr-2 font-medium text-gray-600">Filter by Status:</label>
            <select
              className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Active">Active</option>
              <option value="Paused">Paused</option>
            </select>
          </div>
        </div>

        {/* Data Table [cite: 6] */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b">Campaign Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b">Status</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b">Clicks</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b">Cost</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-600 border-b">Impressions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 border-b text-gray-800 font-medium">{campaign.name}</td>
                  <td className="p-4 border-b">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </td>
                  <td className="p-4 border-b text-gray-600">{campaign.clicks}</td>
                  <td className="p-4 border-b text-gray-600">${Number(campaign.cost).toFixed(2)}</td>
                  <td className="p-4 border-b text-gray-600">{campaign.impressions}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCampaigns.length === 0 && (
            <div className="text-center p-4 text-gray-500">No campaigns found.</div>
          )}
        </div>
      </div>
    </div>
  );
}