import { PromptData, SharedData } from '../types';

export const encodeShareData = (data: PromptData): string => {
  // We strip the ID and createdAt for the shared link to keep it purely content-based
  const payload: SharedData = {
    title: data.title,
    prompt: data.prompt,
    imageUrl: data.imageUrl,
    category: data.category || 'NanoBanana'
  };
  // Base64 encode JSON
  return btoa(JSON.stringify(payload));
};

export const decodeShareData = (encoded: string): SharedData | null => {
  try {
    const json = atob(encoded);
    return JSON.parse(json);
  } catch (e) {
    console.error("Failed to decode shared data", e);
    return null;
  }
};