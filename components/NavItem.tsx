
import React, { useState } from 'react';
import { NavItemData } from '../types';

interface NavItemProps {
  item: NavItemData;
  variant?: 'compact' | 'featured';
}

const NavItem: React.FC<NavItemProps> = ({ item, variant = 'compact' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isFeatured = variant === 'featured';

  const getIconUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://logo.clearbit.com/${domain}?size=128`;
    } catch (e) {
      return `https://www.google.com/s2/favicons?domain=${url}&sz=64`;
    }
  };

  const hasRelatedLinks = item.relatedLinks && item.relatedLinks.length > 0;
  const showDropdown = !!(item.about || hasRelatedLinks);

  // Dynamic sizes based on variant
  const logoSize = isFeatured ? 'w-8 h-8' : 'w-5 h-5';
  const cardPadding = isFeatured ? 'px-3 py-3' : 'px-2 py-2';
  const fontSize = isFeatured ? 'text-[14px]' : 'text-[13px]';

  return (
    <div 
      className={`relative transition-apple ${isHovered ? 'z-[9999]' : 'z-10'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-2 ${cardPadding} bg-white border transition-apple h-full w-full ${
          isHovered && showDropdown 
            ? 'rounded-t-xl border-blue-500 shadow-xl border-b-transparent ring-1 ring-blue-500 ring-b-0 translate-y-[-1px]' 
            : 'rounded-xl border-slate-100 hover:border-blue-400 hover:shadow-lg'
        }`}
      >
        <div className={`${logoSize} rounded-md flex items-center justify-center shrink-0 overflow-hidden bg-slate-50 border border-slate-100/30`}>
          <img 
            src={getIconUrl(item.url)} 
            alt={item.name} 
            className="w-full h-full object-contain p-0.5"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              const domain = new URL(item.url).hostname;
              if (!target.src.includes('google')) {
                target.src = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
              } else if (!target.src.includes('dicebear')) {
                target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${item.name}&backgroundColor=0071e3`;
              }
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`${fontSize} font-bold text-slate-800 leading-tight tracking-tight line-clamp-2`}>
            {item.name}
          </h3>
        </div>
        {showDropdown && (
          <i className={`fa-solid fa-chevron-down text-[8px] transition-transform duration-300 ${isHovered ? 'rotate-180 text-blue-500' : 'text-slate-300'}`}></i>
        )}
      </a>

      {/* Seamless Dropdown */}
      {isHovered && showDropdown && (
        <div className="absolute top-[calc(100%-1px)] left-0 w-full bg-white rounded-b-xl shadow-2xl border-x border-b border-blue-500 overflow-hidden animate-in fade-in slide-in-from-top-1 duration-150">
          {item.about && (
            <div className="px-3 py-2 bg-slate-50/50 border-b border-slate-50">
              <p className="text-[11px] text-slate-500 leading-normal break-words whitespace-normal font-medium">
                {item.about}
              </p>
            </div>
          )}

          {hasRelatedLinks && (
            <div className="p-1 max-h-[160px] overflow-y-auto custom-scrollbar bg-white">
              {item.relatedLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-3 py-2 text-[12px] text-slate-600 hover:bg-blue-600 hover:text-white rounded-lg transition-all group/link font-semibold"
                >
                  <span className="truncate pr-2">{link.name}</span>
                  <i className="fa-solid fa-link text-[8px] opacity-20 group-hover/link:opacity-100"></i>
                </a>
              ))}
            </div>
          )}
          
          <div className="p-2 bg-white text-center">
             <a href={item.url} target="_blank" className="text-[10px] font-black text-blue-500 hover:text-blue-700 uppercase tracking-widest inline-flex items-center gap-1.5 py-1">
               Go Site <i className="fa-solid fa-chevron-right text-[7px]"></i>
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
