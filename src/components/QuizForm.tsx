import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../translations';

interface QuizFormProps {
  onAdd: (question: string, options: string[], correctOptionIndex: number) => void;
  lang: Language;
}

export const QuizForm: React.FC<QuizFormProps> = ({ onAdd, lang }) => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);
  const [correctOptionIndex, setCorrectOptionIndex] = useState(0);
  const t = translations[lang];

  const handleAddOption = () => {
    if (options.length < 6) {
      setOptions([...options, '']);
    }
  };

  const handleRemoveOption = (index: number) => {
    if (options.length > 2) {
      const newOptions = options.filter((_, i) => i !== index);
      setOptions(newOptions);
      if (correctOptionIndex >= newOptions.length) {
        setCorrectOptionIndex(newOptions.length - 1);
      } else if (correctOptionIndex === index) {
        setCorrectOptionIndex(0);
      }
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && options.every(opt => opt.trim())) {
      onAdd(question.trim(), options.map(opt => opt.trim()), correctOptionIndex);
      setQuestion('');
      setOptions(['', '']);
      setCorrectOptionIndex(0);
    }
  };

  return (
    <motion.form 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-zinc-900 p-6 md:p-8 rounded-[2rem] shadow-3xl border-2 border-accent/10 mb-12 relative overflow-hidden group"
    >
      <div className="absolute top-0 left-0 w-full h-1.5 bg-accent opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-black text-accent uppercase tracking-widest mb-2">{t.question}</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t.placeholderQuestion}
            className="w-full px-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border-2 border-zinc-100 dark:border-zinc-800 text-black dark:text-white focus:border-accent outline-none transition-all resize-none h-24 font-medium"
          />
        </div>
        
        <div>
          <label className="block text-xs font-black text-accent uppercase tracking-widest mb-2">{t.options}</label>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={index} className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setCorrectOptionIndex(index)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all ${correctOptionIndex === index ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700'}`}
                  title={t.correctOption}
                >
                  <CheckCircle2 size={16} />
                </button>
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`${t.options} ${index + 1}`}
                  className={`flex-1 px-4 py-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border-2 outline-none transition-all font-medium ${correctOptionIndex === index ? 'border-emerald-500/50 text-emerald-700 dark:text-emerald-400' : 'border-zinc-100 dark:border-zinc-800 text-black dark:text-white focus:border-accent'}`}
                />
                {options.length > 2 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveOption(index)}
                    className="flex-shrink-0 p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>
            ))}
          </div>
          {options.length < 6 && (
            <button
              type="button"
              onClick={handleAddOption}
              className="mt-4 flex items-center gap-2 text-sm font-bold text-accent hover:text-blue-600 transition-colors"
            >
              <Plus size={16} />
              <span>{t.addQuestion}</span>
            </button>
          )}
        </div>

        <button
          type="submit"
          disabled={!question.trim() || !options.every(opt => opt.trim())}
          className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg hover:bg-primary-dark transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-primary/20 hover:shadow-primary/40 active:scale-[0.98]"
        >
          {t.save}
        </button>
      </div>
    </motion.form>
  );
};
