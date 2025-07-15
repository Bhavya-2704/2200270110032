// src/pages/StatsPage.jsx
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

  if (!stats) return <p className="text-center mt-10 text-gray-600">Loading...</p>;

  if (stats.error) return (
    <div className="text-center text-red-600 mt-10 text-lg">
      ❌ {stats.error}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">📊 Stats for <span className="text-blue-600">{code}</span></h2>

      <div className="bg-white shadow-md p-4 rounded-md mb-6">
        <p><strong>🔗 Original URL:</strong> <a href={stats.originalUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">{stats.originalUrl}</a></p>
        <p><strong>📅 Created:</strong> {stats.createdAt}</p>
        <p><strong>⏳ Expires:</strong> {stats.expiry}</p>
        <p><strong>👀 Total Clicks:</strong> {stats.totalClicks}</p>
      </div>

      <h3 className="text-2xl font-semibold mb-3">Click Details</h3>
      {stats.clickDetails?.length > 0 ? (
        <div className="space-y-3">
          {stats.clickDetails.map((click, i) => (
            <div key={i} className="bg-gray-100 p-3 rounded-md border">
              <p><strong>Time:</strong> {click.timestamp}</p>
              <p><strong>IP:</strong> {click.ip}</p>
              <p><strong>Referrer:</strong> {click.referrer || 'N/A'}</p>
              <p><strong>User-Agent:</strong> {click.userAgent}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No clicks recorded yet.</p>
      )}
    </div>
  );
};

export default StatsPage;
