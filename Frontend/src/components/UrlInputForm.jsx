// src/components/UrlInputForm.jsx
import React from 'react';

const UrlInputForm = ({ entry, idx, handleChange }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-4 transition-all hover:shadow-md">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">🔗 Original URL</label>
        <input
          type="url"
          name="url"
          value={entry.url}
          onChange={(e) => handleChange(idx, e)}
          placeholder="https://example.com"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">⏳ Validity (in mins)</label>
        <input
          type="number"
          name="validity"
          value={entry.validity}
          onChange={(e) => handleChange(idx, e)}
          placeholder="e.g. 30"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">✨ Custom Shortcode (optional)</label>
        <input
          type="text"
          name="shortcode"
          value={entry.shortcode}
          onChange={(e) => handleChange(idx, e)}
          placeholder="e.g. bhai123"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
    </div>
  </div>
);

export default UrlInputForm;
