import React from 'react';
import { newsItems } from '../data/news';

const NewsTicker = () => {
  return (
    <div className="news-ticker-section">
      <div className="news-label">Latest News</div>
      <div className="news-ticker">
        {[...newsItems, ...newsItems].map((item, index) => (
          <span key={index} className="news-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
