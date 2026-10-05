'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function SpineLegend() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#EAE5DC] pb-3 mb-6 text-xs text-[#6E6961]">
      <div className="flex flex-wrap items-center justify-between gap-y-2 gap-x-4">
        
        {/* Discrete classification dots */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#8A847C]">
            Classification:
          </span>

          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4A7255]" />
            <span className="text-[11px] text-[#44403C]">Foresight & Anticipation</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4B637D]" />
            <span className="text-[11px] text-[#44403C]">Consequences Only</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#9E6E2E]" />
            <span className="text-[11px] text-[#44403C]">Bridge / Both</span>
          </div>

          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7E3B53]" />
            <span className="text-[11px] text-[#44403C]">Theory</span>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-[#8A847C] hover:text-[#1C1917] text-[10px] uppercase tracking-[0.16em] flex items-center space-x-1"
          aria-expanded={isOpen}
        >
          <span>{isOpen ? 'Close Guide' : 'Spine Guide'}</span>
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {isOpen && (
        <div className="mt-3 pt-3 border-t border-[#F0EBE1] grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-[#78716C] animate-in fade-in duration-150">
          <div>
            <strong className="text-[#1C1917] block mb-0.5">Spine Dimensions:</strong>
            Anchor papers and 5-star texts are slightly taller (248px) with subtle foil marks. Standard volumes stand between 214px–236px.
          </div>
          <div>
            <strong className="text-[#1C1917] block mb-0.5">Shelf Location:</strong>
            Each paper sits on its primary theme shelf. Secondary themes remain accessible in the editorial reading panel.
          </div>
          <div>
            <strong className="text-[#1C1917] block mb-0.5">Unpopulated Shelves:</strong>
            Empty shelf spaces reflect authentic gaps in the literature where empirical foresight research is still needed.
          </div>
        </div>
      )}
    </div>
  );
}
