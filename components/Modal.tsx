
import React, { useEffect } from 'react';
import { PortfolioItem } from '../types';

interface ModalProps {
  item: PortfolioItem | null;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    if (item) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [item]);

  if (!item) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white transition-opacity duration-500"
      onClick={onClose}
    >
      <button 
        className="fixed top-12 right-12 text-black text-2xl font-light hover:opacity-30 transition-opacity z-[110] p-4"
        onClick={onClose}
      >
        Close
      </button>
      
      <div className="max-w-6xl max-h-screen p-8 md:p-24 flex flex-col items-center justify-center animate-fadeIn" onClick={(e) => e.stopPropagation()}>
        {item.type === 'image' ? (
          <img 
            src={item.url} 
            alt={item.description} 
            className="max-w-full max-h-[70vh] object-contain shadow-sm bg-neutral-50"
          />
        ) : (
          <div className="w-full max-w-4xl aspect-video bg-neutral-50 border border-neutral-100" />
        )}
        
        <div className="mt-12 text-center text-black">
          <h3 className="text-xs font-light tracking-[0.5em] uppercase mb-4 opacity-40">{item.subcategory || item.category}</h3>
          <p className="text-base font-light italic text-black/60">{item.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
