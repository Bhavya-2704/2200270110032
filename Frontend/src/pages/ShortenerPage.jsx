// pages/ShortenerPage.jsx
import React, { useState } from 'react';
import UrlInputForm from '../components/UrlInputForm';
import ResultList from '../components/ResultList';
import axios from 'axios';

const ShortenerPage = () => {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, e) => {
    const updated = [...urls];
    updated[index][e.target.name] = e.target.value;
    setUrls(updated);
  };

  const addField = () => {
    if (urls.length < 5)
      setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
  };

  const handleSubmit = async () => {
    const newResults = [];
    for (const entry of urls) {
      try {
        const res = await axios.post('http://localhost:8080/shorturls', {
          url: entry.url,
          validity: entry.validity ? parseInt(entry.validity) : undefined,
          shortcode: entry.shortcode || undefined,
        });
        newResults.push(res.data);
      } catch (err) {
        newResults.push({ error: err.response?.data?.error || 'Something went wrong' });
      }
    }
    setResults(newResults);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-10">
          🔗 URL Shortener
        </h1>

        {urls.map((entry, idx) => (
          <UrlInputForm key={idx} idx={idx} entry={entry} handleChange={handleChange} />
        ))}

        <div className="flex space-x-4 justify-center mt-6">
          <button
            onClick={addField}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-full shadow-md transition disabled:opacity-40"
            disabled={urls.length >= 5}
          >
            ➕ Add Another
          </button>
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
          >
            🚀 Shorten URLs
          </button>
        </div>

        <ResultList results={results} />
      </div>
    </div>
  );
};

export default ShortenerPage;
