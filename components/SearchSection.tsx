
import React, { useState } from 'react';

const engines = [
  { name: '百度', color: 'bg-[#2152d1]', url: 'https://www.baidu.com/s?wd=', icon: 'fa-solid fa-paw' },
  { name: 'Google', color: 'bg-slate-900', url: 'https://www.google.com/search?q=', icon: 'fa-brands fa-google' },
  { name: 'Bilibili', color: 'bg-[#fb7299]', url: 'https://search.bilibili.com/all?keyword=', icon: 'fa-brands fa-bilibili' },
  { name: 'YouTube', color: 'bg-[#ff0000]', url: 'https://www.youtube.com/results?search_query=', icon: 'fa-brands fa-youtube' },
  { name: 'GitHub', color: 'bg-[#1b1f23]', url: 'https://github.com/search?q=', icon: 'fa-brands fa-github' },
  { name: 'HuggingFace', color: 'bg-[#ffcc00]', text: 'text-slate-900', url: 'https://huggingface.co/models?search=', icon: 'fa-solid fa-face-smile' },
];

const SearchSection: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (baseUrl: string) => {
    if (query.trim()) {
      window.open(baseUrl + encodeURIComponent(query), '_blank');
    }
  };

  return (
    <div className="w-full apple-blur border-b border-slate-200/80 py-5 px-6 shadow-md transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        {/* Search Input */}
        <div className="relative flex-1 group h-14">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(engines[0].url)}
            placeholder="Search AI Tools, News, Resources..."
            className="w-full h-full pl-12 pr-6 bg-white border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-slate-900 font-semibold text-[15px] shadow-sm hover:border-slate-300"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg transition-colors group-focus-within:text-blue-500"></i>
        </div>
        
        {/* Search Buttons - Matching height with h-14 */}
        <div className="flex flex-wrap justify-center md:justify-start gap-1.5 min-h-[56px]">
          {engines.map((engine) => (
            <button
              key={engine.name}
              onClick={() => handleSearch(engine.url)}
              className={`flex items-center gap-2 px-5 h-14 rounded-2xl text-white font-bold text-[12px] transition-all active:scale-95 shadow-sm hover:brightness-110 ${engine.color} ${engine.text || ''}`}
            >
              {engine.icon && <i className={`${engine.icon} text-sm`}></i>}
              <span className="hidden sm:inline tracking-wide">{engine.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
