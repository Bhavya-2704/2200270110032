// src/components/ResultList.jsx
import React from 'react';

const ResultList = ({ results }) => (
  <div className="mt-6 space-y-4">
    {results.map((res, i) => (
      <div key={i} className="text-sm">
        {res.shortLink ? (
          <div className="text-green-600">
            ✅ <a href={res.shortLink} target="_blank" rel="noreferrer" className="underline">{res.shortLink}</a> (Expires: {res.expiry})
          </div>
        ) : (
          <div className="text-red-600">❌ {res.error}</div>
        )}
      </div>
    ))}
  </div>
);

export default ResultList;
