// src/pages/ShortenerPage.jsx
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
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🔗 URL Shortener</h1>

      {urls.map((entry, idx) => (
        <UrlInputForm key={idx} idx={idx} entry={entry} handleChange={handleChange} />
      ))}

      <div className="flex space-x-2">
        <button onClick={addField} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50" disabled={urls.length >= 5}>
          + Add Another
        </button>
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Shorten
        </button> 
      </div>

      <ResultList results={results} />
    </div>
  );
};

export default ShortenerPage;
