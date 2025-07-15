// pages/StatsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StatsPage = () => {
  const { code } = useParams();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/stats/${code}`)
      .then(res => setStats(res.data))
      .catch(() => setStats({ error: 'Shortcode not found or expired.' }));
  }, [code]);

  if (!stats) return <p className="text-center mt-10 text-gray-600">⏳ Loading...</p>;

  if (stats.error) return (
    <div className="text-center text-red-600 mt-10 text-lg font-semibold">
      ❌ {stats.error}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-4xl font-bold text-center mb-8 text-blue-800">
          📊 Stats for <span className="text-purple-600">{code}</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gray-50 p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500 mb-1">🔗 Original URL</p>
            <a href={stats.originalUrl} target="_blank" rel="noreferrer" className="text-blue-600 underline break-words">
              {stats.originalUrl}
            </a>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl shadow border">
            <p className="text-sm text-gray-500 mb-1">📅 Created At</p>
            <p className="font-medium">{stats.createdAt}</p>
            <p className="text-sm mt-2 text-gray-500">⏳ Expires: <span className="font-medium">{stats.expiry}</span></p>
          </div>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg shadow-inner mb-6">
          <p className="text-blue-900 font-semibold">
            👀 Total Clicks: {stats.totalClicks}
          </p>
        </div>

        <h3 className="text-2xl font-bold mb-4">🖱️ Click Logs</h3>
        {stats.clickDetails?.length > 0 ? (
          <div className="space-y-4">
            {stats.clickDetails.map((click, i) => (
              <div key={i} className="bg-white p-4 rounded-xl shadow border border-gray-200">
                <p><strong>🕒 Time:</strong> {click.timestamp}</p>
                <p><strong>🌍 IP:</strong> {click.ip}</p>
                <p><strong>🔗 Referrer:</strong> {click.referrer || 'N/A'}</p>
                <p><strong>💻 User-Agent:</strong> {click.userAgent}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No click data available yet.</p>
        )}
      </div>
    </div>
  );
};

export default StatsPage;
