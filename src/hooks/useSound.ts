import { useCallback } from 'react';

const SOUNDS = {
  SWIPE: 'https://www.soundjay.com/misc/sounds/page-flip-02.mp3',
  NEXT: 'https://www.soundjay.com/misc/sounds/page-flip-01a.mp3',
  REVEAL: 'https://assets.mixkit.co/active_storage/sfx/2014/2014-preview.mp3',
  CLICK: 'https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3',
  FLIP: 'https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3',
};

export const useSound = () => {
  const playSound = useCallback((soundKey: keyof typeof SOUNDS) => {
    const audio = new Audio(SOUNDS[soundKey]);
    audio.volume = 0.4;
    audio.play().catch(err => console.log('Audio playback failed:', err));
  }, []);

  return { playSound };
};
