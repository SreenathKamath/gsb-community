import React from 'react';

const NewsTicker = () => {
  const news = [
    "A joyful celebration of Holi on March 8th Sunday featuring traditional music, and community gathers.",
    "All India Pragathi GSB Football tournament on April 02-03",
    "Sree Narayana Devar Aarattu 2026, June 27th at KTD",
    "Mandala Masacharanam - November 17th to December 27th at SVB Devi Temple",
    "Sasthampattu - November 22nd at Shivalayam"
  ];

  return (
    <div className="news-ticker-section">
      <div className="news-label">Latest News</div>
      <div className="news-ticker">
        {[...news, ...news].map((item, index) => (
          <span key={index} className="news-item">{item}</span>
        ))}
      </div>
    </div>
  );
};

export default NewsTicker;
