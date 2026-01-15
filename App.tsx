
import React, { useEffect, useState } from 'react';
import SearchSection from './components/SearchSection';
import MultiAIQuerySection from './components/MultiAIQuerySection';
import NavItem from './components/NavItem';
import { NavItemData } from './types';
import { fetchData, parseSheet1 } from './services/dataService';

const CategorySection: React.FC<{ title: string; items: NavItemData[] }> = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Row contains 8 slots for links. "More" is separate at the end.
  const displayCount = isExpanded ? items.length : 8;
  const displayItems = items.slice(0, displayCount);
  const canExpand = items.length > 8;

  return (
    <div className="category-row py-3 group/row border-b border-slate-100 last:border-0">
      <div className="flex flex-col lg:flex-row items-center gap-3">
        {/* Category Label - Fixed width, aligned same line */}
        <div className="lg:w-20 shrink-0">
          <h2 className="text-[12px] font-black text-slate-400 group-hover/row:text-blue-600 transition-colors tracking-tight whitespace-nowrap uppercase text-right pr-2">
            {title}
          </h2>
        </div>
        
        {/* Items Grid - 8 columns as requested */}
        <div className="flex-1 w-full grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {displayItems.map((item, idx) => (
            <NavItem key={idx} item={item} variant="compact" />
          ))}
        </div>

        {/* More Button - Placed at row end */}
        <div className="shrink-0 lg:w-24">
          {canExpand && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-[12px] font-bold text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white border border-slate-100 rounded-xl shadow-sm w-full"
            >
              <span>{isExpanded ? '收起' : `更多(${items.length - 8})`}</span>
              <i className={`fa-solid fa-chevron-${isExpanded ? 'up' : 'down'} text-[9px]`}></i>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [allData, setAllData] = useState<NavItemData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      try {
        const rawSheet1 = await fetchData<any>('Sheet1');
        setAllData(parseSheet1(rawSheet1));
      } finally {
        setLoading(false);
      }
    };
    initData();
  }, []);

  const commonItems = allData.filter(item => item.isCommon);

  const groups: Record<string, NavItemData[]> = {};
  allData.forEach(item => {
    const cls = item.class || '其他';
    if (!groups[cls]) groups[cls] = [];
    groups[cls].push(item);
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBFBFD]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-slate-200 border-t-blue-500 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold tracking-widest text-[11px] uppercase">Portal Awakening...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFD]">
      {/* Header */}
      <header className="bg-white px-8 py-3 border-b border-slate-100">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
               <i className="fa-solid fa-robot text-sm"></i>
             </div>
             <h1 className="text-[19px] font-[900] text-slate-900 tracking-tighter leading-none">
               Eden <span className="text-blue-600">HUB</span>
             </h1>
           </div>
           <div className="flex items-center gap-6">
           </div>
        </div>
      </header>

      {/* Sticky General Search */}
      <div className="sticky top-0 z-[5000]">
        <SearchSection />
      </div>

      {/* AI Query Section (Scrolls with page) */}
      <MultiAIQuerySection />

      <main className="flex-grow">
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex flex-col gap-6">
          
          {/* Featured Section */}
          {commonItems.length > 0 && (
            <section className="bg-white rounded-[20px] p-6 shadow-sm border-2 border-slate-200/60">
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
                {commonItems.map((item, idx) => (
                  <NavItem key={`fav-${idx}`} item={item} variant="featured" />
                ))}
              </div>
            </section>
          )}

          {/* Categorized Content */}
          <section className="bg-white rounded-[20px] p-6 shadow-sm border-2 border-slate-200/60">
              <div className="flex flex-col">
                {Object.entries(groups).map(([className, items]) => (
                  <CategorySection key={className} title={className} items={items} />
                ))}
              </div>
          </section>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-100 py-10 mt-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.25em]">
            © 2025 Eden's AI HUB • Professional AI Navigation portal
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
