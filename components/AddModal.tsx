import React, { useState, useEffect } from 'react';
import { X } from './Icons';
import { Button } from './Button';
import { PromptData, Category } from '../types';

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PromptData) => void;
  initialData?: PromptData | null;
}

export const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState<Category>('NanoBanana');

  // Load initial data when modal opens or initialData changes
  useEffect(() => {
    if (isOpen && initialData) {
      setTitle(initialData.title);
      setPrompt(initialData.prompt);
      setImageUrl(initialData.imageUrl);
      setCategory(initialData.category || 'NanoBanana');
    } else if (isOpen && !initialData) {
      // Reset for new entry
      setTitle('');
      setPrompt('');
      setImageUrl('');
      setCategory('NanoBanana');
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPrompt: PromptData = {
      id: initialData ? initialData.id : Date.now().toString(),
      title,
      prompt,
      imageUrl: imageUrl || 'https://picsum.photos/800/1000', // Default if empty
      category,
      createdAt: initialData ? initialData.createdAt : Date.now()
    };
    
    onSave(newPrompt);
    onClose();
  };

  const categories: Category[] = ['NanoBanana', 'Midjourney', 'Seedream'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="glass-panel w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl p-6 md:p-8 relative animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-white/50 hover:text-white transition-colors z-10"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl md:text-2xl font-bold font-display mb-6 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent sticky top-0">
          {initialData ? 'Edit Prompt' : 'Add to Vault'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div className="space-y-2">
            <label className="text-sm text-white/60 font-medium ml-1">Title</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Cyberpunk Cat"
              className="glass-input w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#5C5CFF]/50 transition-colors placeholder:text-white/20 appearance-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60 font-medium ml-1">Category</label>
            <div className="flex gap-2 flex-wrap">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        type="button"
                        onClick={() => setCategory(cat)}
                        className={`px-3 md:px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border touch-manipulation ${
                            category === cat 
                            ? 'bg-[#5C5CFF] border-[#5C5CFF] text-white shadow-[0_0_15px_-5px_#5C5CFF]' 
                            : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:border-white/20'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60 font-medium ml-1">Image URL (4:5 Aspect Ratio)</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://..."
              className="glass-input w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#5C5CFF]/50 transition-colors placeholder:text-white/20 appearance-none"
            />
            <p className="text-xs text-white/30 ml-1">Leave empty for a random placeholder.</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-white/60 font-medium ml-1">Prompt</label>
            <textarea
              required
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your image generation prompt..."
              rows={5}
              className="glass-input w-full rounded-xl px-4 py-3 focus:outline-none focus:border-[#5C5CFF]/50 transition-colors placeholder:text-white/20 resize-none appearance-none"
            />
          </div>

          <Button type="submit" fullWidth className="mt-4 shadow-lg shadow-[#5C5CFF]/20">
            {initialData ? 'Update Vault' : 'Save to Vault'}
          </Button>
        </form>
      </div>
    </div>
  );
};