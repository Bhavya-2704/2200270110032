// src/components/UrlInputForm.jsx
import React from 'react';

const UrlInputForm = ({ entry, idx, handleChange }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Original URL */}
          <div className="flex flex-col">
            <label htmlFor={`url-${idx}`} className="text-sm text-gray-700 font-medium mb-2">
              Original URL <span className="text-red-500">*</span>
            </label>
            <input
              id={`url-${idx}`}
              type="url"
              name="url"
              value={entry.url}
              onChange={(e) => handleChange(idx, e)}
              required
              placeholder="https://example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          {/* Validity */}
          <div className="flex flex-col">
            <label htmlFor={`validity-${idx}`} className="text-sm text-gray-700 font-medium mb-2">
              Validity (minutes)
            </label>
            <input
              id={`validity-${idx}`}
              type="number"
              name="validity"
              value={entry.validity}
              onChange={(e) => handleChange(idx, e)}
              placeholder="e.g. 60"
              min="1"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none transition"
            />
          </div>

          {/* Custom Shortcode */}
          <div className="flex flex-col">
            <label htmlFor={`shortcode-${idx}`} className="text-sm text-gray-700 font-medium mb-2">
              Custom Shortcode
            </label>
            <input
              id={`shortcode-${idx}`}
              type="text"
              name="shortcode"
              value={entry.shortcode}
              onChange={(e) => handleChange(idx, e)}
              placeholder="e.g. bhai123"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none transition"
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-2">
          💡 Leave shortcode empty to auto-generate one. Expiry is in minutes from creation time.
        </p>
      </form>
    </div>
  );
};

export default UrlInputForm;
