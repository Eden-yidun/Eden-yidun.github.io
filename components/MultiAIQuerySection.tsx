
import React, { useState } from 'react';

const aiModels = [
  { name: '通义千问', color: 'bg-[#6066f2]', url: 'https://tongyi.aliyun.com/chat?q=', icon: 'fa-solid fa-brain' },
  { name: 'ChatGPT', color: 'bg-[#10a37f]', url: 'https://chatgpt.com/?q=', icon: 'fa-solid fa-bolt' },
  { name: 'Claude', color: 'bg-[#d97757]', url: 'https://claude.ai/new?q=', icon: 'fa-solid fa-leaf' },
  { name: 'Grok', color: 'bg-black', url: 'https://grok.com/?q=', icon: 'fa-solid fa-square-x-twitter' },
];

const MultiAIQuerySection: React.FC = () => {
  const [prompt, setPrompt] = useState('');

  const handleQuery = (baseUrl: string) => {
    if (prompt.trim()) {
      const encodedPrompt = encodeURIComponent(prompt);
      window.open(baseUrl + encodedPrompt, '_blank');
    }
  };

  return (
    <div className="w-full bg-slate-50/40 border-b border-slate-200/40 py-6 px-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto flex flex-col gap-4">
        
        {/* Row Container: Input and Buttons aligned */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          
          {/* AI Prompt Input - Height h-14 to match search */}
          <div className="relative flex-1 group h-14">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleQuery(aiModels[0].url)}
              placeholder="在此输入您的问题或指令，直接开始对话..."
              className="w-full h-full pl-14 pr-6 bg-white border-2 border-indigo-100/60 rounded-2xl focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-700 font-semibold text-[15px] shadow-sm placeholder:text-slate-400 hover:border-indigo-200"
            />
            {/* AI Text Icon - Sized for h-14 input */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md group-focus-within:scale-110 transition-transform">
              <span className="text-white text-[10px] font-[900] tracking-tighter">AI</span>
            </div>
          </div>

          {/* AI Selection Buttons - Height h-14 */}
          <div className="flex flex-wrap justify-center md:justify-start gap-1.5 min-h-[56px]">
            {aiModels.map((ai) => (
              <button
                key={ai.name}
                onClick={() => handleQuery(ai.url)}
                className={`flex items-center gap-2 px-5 h-14 rounded-2xl text-white font-bold text-[12px] transition-all active:scale-95 shadow-sm hover:brightness-110 hover:-translate-y-0.5 ${ai.color}`}
              >
                <i className={`${ai.icon} text-[11px]`}></i>
                <span className="tracking-tight">{ai.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Disclaimer below the row */}
        <div className="flex justify-center md:justify-start">
          <p className="text-[10px] font-bold text-slate-400 tracking-wider flex items-center gap-2 bg-white/50 border border-slate-100 px-3 py-1 rounded-full shadow-sm">
            <i className="fa-solid fa-circle-info text-[9px] text-indigo-400"></i>
            部分AI不支持外部提问，此处皆为支持外部提问功能的AI
          </p>
        </div>
      </div>
    </div>
  );
};

export default MultiAIQuerySection;
