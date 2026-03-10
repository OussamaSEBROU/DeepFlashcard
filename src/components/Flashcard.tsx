import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flashcard, Language } from '../types';
import { RotateCcw, Trash2, Edit3 } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { translations } from '../translations';

interface FlashcardProps {
  card: Flashcard;
  onDelete: (id: string) => void;
  onEdit: (card: Flashcard) => void;
  lang: Language;
}

export const FlashcardComponent: React.FC<FlashcardProps> = ({ card, onDelete, onEdit, lang }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { playSound } = useSound();
  const t = translations[lang];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    playSound('REVEAL');
  };

  return (
    <div className="relative h-72 w-full perspective-2000 group">
      <motion.div
        className="w-full h-full relative preserve-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 150, damping: 20 }}
        onClick={handleFlip}
      >
        {/* Front Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-zinc-900 border-2 border-accent/10 dark:border-accent/5 rounded-[2rem] shadow-3d dark:shadow-3d-dark flex flex-col items-center justify-center p-10 text-center shining-border overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
          <span className="absolute top-6 right-8 text-[10px] font-black uppercase tracking-[0.3em] text-accent">{t.question}</span>
          <h3 className="text-2xl font-bold text-black dark:text-zinc-100 leading-snug">
            {card.question}
          </h3>
          <motion.div 
            animate={{ y: [0, 5, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-8 text-accent opacity-40 group-hover:opacity-100 transition-opacity"
          >
            <RotateCcw size={24} />
          </motion.div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-zinc-950 dark:bg-white border-2 border-accent/20 dark:border-accent/10 rounded-[2rem] shadow-3d dark:shadow-3d-dark flex flex-col items-center justify-center p-10 text-center rotate-y-180 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-primary" />
          <span className="absolute top-6 right-8 text-[10px] font-black uppercase tracking-[0.3em] text-accent">{t.answer}</span>
          <p className="text-2xl font-bold text-white dark:text-black leading-snug">
            {card.answer}
          </p>
        </div>
      </motion.div>
      
      <div className="absolute -top-3 -left-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all z-10">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(card.id);
          }}
          className="p-3 bg-red-500 text-white rounded-2xl shadow-xl hover:bg-red-600"
        >
          <Trash2 size={18} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => {
            e.stopPropagation();
            onEdit(card);
          }}
          className="p-3 bg-accent text-white rounded-2xl shadow-xl hover:bg-blue-600"
        >
          <Edit3 size={18} />
        </motion.button>
      </div>
    </div>
  );
};
