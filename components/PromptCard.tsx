import React, { useState } from 'react';
import { PromptData } from '../types';
import { ImageIcon, Share2, Check, Pencil } from './Icons';
import { encodeShareData } from '../services/shareService';

interface PromptCardProps {
  data: PromptData;
  onClick: () => void;
  onEdit: () => void;
}

export const PromptCard: React.FC<PromptCardProps> = ({ data, onClick, onEdit }) => {
  const [copied, setCopied] = useState(false);
  // Fallback for older data
  const category = data.category || 'NanoBanana';

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    const encoded = encodeShareData(data);
    const url = `${window.location.origin}${window.location.pathname}#/share/${encoded}`;
    
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Failed to copy link", err);
    });
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  }

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer relative flex flex-col gap-4 animate-in fade-in zoom-in duration-500"
    >
      {/* Image Container - 4:5 Ratio */}
      <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl bg-gray-900">
        {data.imageUrl ? (
          <img 
            src={data.imageUrl} 
            alt={data.title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-white/20 bg-white/5">
            <ImageIcon size={48} />
          </div>
        )}
        
        {/* Hover Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="px-2">
        <h3 className="text-xl font-bold font-display text-white mb-2 truncate tracking-tight">
          {data.title}
        </h3>
        
        <div className="flex flex-wrap items-center justify-between gap-y-3">
            {/* Category Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] ${
                    category === 'NanoBanana' ? 'bg-yellow-400 shadow-yellow-400/50' : 
                    category === 'Midjourney' ? 'bg-blue-400 shadow-blue-400/50' : 
                    category === 'Seedream' ? 'bg-green-400 shadow-green-400/50' : 'bg-white'
                }`}></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 font-display">{category}</span>
            </div>
            
            {/* Actions Row */}
            <div className="flex items-center gap-2">
                <button 
                    onClick={handleEdit}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-wider text-white"
                >
                    <Pencil size={12} />
                    <span>Edit</span>
                </button>

                <button 
                    onClick={handleShare}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-all duration-300 text-xs font-bold uppercase tracking-wider ${
                        copied 
                        ? 'bg-[#5C5CFF] border-[#5C5CFF] text-white shadow-[0_0_10px_#5C5CFF]' 
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                >
                    {copied ? <Check size={12} /> : <Share2 size={12} />}
                    <span>{copied ? 'Shared' : 'Share'}</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};