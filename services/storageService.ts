import { PromptData } from '../types';

const STORAGE_KEY = 'promptvault_items';

export const getPrompts = (): PromptData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to load prompts", e);
    return [];
  }
};

export const savePrompt = (prompt: PromptData): void => {
  const current = getPrompts();
  const index = current.findIndex(p => p.id === prompt.id);
  
  if (index >= 0) {
    // Update existing
    current[index] = prompt;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } else {
    // Add new
    const updated = [prompt, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  }
};

export const deletePrompt = (id: string): void => {
  const current = getPrompts();
  const updated = current.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};