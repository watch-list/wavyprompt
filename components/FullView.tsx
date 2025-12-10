import React, { useEffect, useState } from 'react';
import { PromptData, SharedData } from '../types';
import { Button } from './Button';
import { ChevronLeft, Sparkles } from './Icons';
import { encodeShareData } from '../services/shareService';

interface FullViewProps {
  data: PromptData | SharedData;
  isOwner: boolean;
  onBack: () => void;
  onEdit?: () => void;
}

export const FullView: React.FC<FullViewProps> = ({ data, isOwner, onBack }) => {
  const [copied, setCopied] = useState(false);
  
  // Fallback for older data
  const category = data.category || 'NanoBanana';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-black overflow-y-auto min-h-screen">
      
      {/* Container - Centered nicely */}
      <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative">
        
        {/* Back Button (Only for Owner) - Top Left */}
        {isOwner && (
            <div className="absolute top-6 left-6 z-50">
                <button 
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                >
                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/10 backdrop-blur-md border border-white/10">
                        <ChevronLeft size={20} />
                    </div>
                    <span className="font-display text-sm tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">Back</span>
                </button>
            </div>
        )}

        {/* The Card */}
        <div className="w-full max-w-[450px] animate-in fade-in slide-in-from-bottom-8 duration-500">
            
            {/* Header: Title */}
            <h1 className="text-3xl font-bold font-display text-white mb-6 tracking-tight text-left truncate">
                {data.title}
            </h1>

            {/* Main Image */}
            <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 mb-6 bg-[#111]">
                <img 
                    src={data.imageUrl} 
                    alt={data.title} 
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Metadata Bar */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                        <div className={`w-2 h-2 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)] ${
                            category === 'NanoBanana' ? 'bg-yellow-400 shadow-yellow-400/50' : 
                            category === 'Midjourney' ? 'bg-blue-400 shadow-blue-400/50' : 
                            category === 'Seedream' ? 'bg-green-400 shadow-green-400/50' : 'bg-white'
                        }`}></div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-white font-display">{category}</span>
                    </div>
                </div>
            </div>

            {/* Prompt Content Box - Pop-up look */}
            <div className="relative glass-panel rounded-3xl p-6 mb-8 border border-white/10 bg-[#161616]/80">
                 {/* Scroll indicator mimic */}
                 <div className="absolute right-3 top-3 bottom-3 w-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-full h-1/3 bg-white/20 rounded-full mt-2"></div>
                 </div>

                 <div className="pr-4 max-h-[200px] overflow-y-auto no-scrollbar text-sm leading-relaxed text-gray-300 font-medium">
                    {data.prompt}
                 </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
                <Button 
                    onClick={handleCopy}
                    fullWidth 
                    className="h-14 text-base font-bold tracking-wide shadow-lg shadow-[#5C5CFF]/20"
                >
                    {copied ? 'Copied!' : 'Copy Prompt'}
                </Button>
            </div>

        </div>
      </div>
    </div>
  );
};