
import React, { useState, useEffect } from 'react';
import { TopicData, TopicKey } from '../types';
import { fetchData } from '../services/dataService';

const topics = [
  { id: 'comfy' as TopicKey, name: 'SD 专题', sheet: 'ComfyUI' },
  { id: 'voice' as TopicKey, name: 'AI 变声专题', sheet: 'Voice' },
  { id: 'face' as TopicKey, name: 'AI 换脸专题', sheet: 'Face' },
];

const TabSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TopicKey>('comfy');
  const [topicData, setTopicData] = useState<Record<TopicKey, TopicData[]>>({
    comfy: [],
    voice: [],
    face: []
  });

  useEffect(() => {
    const loadAllTopics = async () => {
      const results = await Promise.all(topics.map(t => fetchData<TopicData>(t.sheet)));
      setTopicData({
        comfy: results[0],
        voice: results[1],
        face: results[2],
      });
    };
    loadAllTopics();
  }, []);

  const currentRows = topicData[activeTab];

  return (
    <div className="overflow-hidden mb-12">
      {/* Connected Tab Header */}
      <div className="flex gap-1 relative z-10 -mb-[2px] ml-4">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => setActiveTab(topic.id)}
            className={`px-8 py-3 text-sm font-bold rounded-t-2xl transition-all border-t-2 border-x-2 ${
              activeTab === topic.id 
                ? 'bg-white text-blue-600 border-slate-200/60 border-b-white z-20' 
                : 'bg-slate-50 text-slate-400 border-transparent hover:text-slate-600 hover:bg-slate-100'
            }`}
          >
            {topic.name}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[24px] rounded-tl-none p-8 border-2 border-slate-200/60 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-0">
        {/* Experts Section */}
        <div>
          <h3 className="flex items-center gap-2 text-slate-900 font-bold mb-4">
            <i className="fa-solid fa-user-graduate text-blue-500"></i>
            专家学者
          </h3>
          <div className="flex flex-wrap gap-4">
            {currentRows.filter(r => r.name).map((r, i) => (
              <a 
                key={i} 
                href={r['name URL'] || '#'} 
                target="_blank"
                className="flex items-center gap-3 p-2 pr-4 bg-slate-50 rounded-full border border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md transition-all group"
              >
                <img 
                  src={`head/${r['head name'] || 'default'}.avif`}
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/40/40?random=' + i; }}
                  className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">{r.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Links Section */}
        <div>
          <h3 className="flex items-center gap-2 text-slate-900 font-bold mb-4">
            <i className="fa-solid fa-link text-blue-500"></i>
            相关链接
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {currentRows.filter(r => r['about URL title']).map((r, i) => (
              <a 
                key={i} 
                href={r['about URL']} 
                target="_blank"
                className="px-4 py-2 text-sm text-blue-600 bg-blue-50/50 rounded-lg hover:bg-blue-600 hover:text-white transition-all text-center truncate"
              >
                {r['about URL title']}
              </a>
            ))}
          </div>
        </div>

        {/* Reading Section */}
        <div>
          <h3 className="flex items-center gap-2 text-slate-900 font-bold mb-4">
            <i className="fa-solid fa-book-open text-blue-500"></i>
            相关阅读
          </h3>
          <ul className="space-y-3">
            {currentRows.filter(r => r['about read title']).map((r, i) => (
              <li key={i}>
                <a 
                  href={r['about read URL']} 
                  target="_blank"
                  className="flex items-start gap-3 group"
                >
                  <i className="fa-solid fa-angle-right text-slate-300 mt-1 group-hover:text-blue-500"></i>
                  <span className="text-slate-700 hover:text-blue-600 hover:underline transition-colors leading-relaxed">
                    {r['about read title']}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TabSection;
