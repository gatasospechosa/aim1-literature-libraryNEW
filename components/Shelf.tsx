'use client';

import React from 'react';
import { Paper } from '@/types/paper';
import { PaperSpine } from '@/components/PaperSpine';

interface ShelfProps {
  title: string;
  subtitle?: string;
  description?: string;
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  searchQuery?: string;
  isSpecial?: boolean;
}

export function Shelf({
  title,
  subtitle,
  description,
  papers,
  onSelectPaper,
  searchQuery = '',
  isSpecial = false
}: ShelfProps) {
  const hasActiveSearch = Boolean(searchQuery && searchQuery.trim().length > 0);

  // Check if each paper matches search
  const isMatch = (paper: Paper) => {
    if (!hasActiveSearch) return true;
    const q = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(q) ||
      paper.authors.some(a => a.toLowerCase().includes(q)) ||
      paper.journal.toLowerCase().includes(q) ||
      paper.dataset.toLowerCase().includes(q) ||
      paper.whyThisMattersForAim1.toLowerCase().includes(q) ||
      paper.mainFinding.toLowerCase().includes(q)
    );
  };

  const matchingCount = hasActiveSearch 
    ? papers.filter(isMatch).length 
    : papers.length;

  return (
    <div className="mb-20 sm:mb-24 last:mb-12">
      
      {/* Restrained Editorial Shelf Label: Title & Count (if title provided) */}
      {title ? (
        <div className="flex items-baseline justify-between px-1 mb-4">
          <div className="flex items-baseline space-x-3">
            <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1C1917] tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <span className="text-xs text-[#8A847C] font-serif italic hidden sm:inline">
                — {subtitle}
              </span>
            )}
          </div>

          <div className="text-[10px] tracking-[0.2em] uppercase font-sans text-[#8A847C]">
            {hasActiveSearch ? (
              <span>
                <strong className="text-[#1C1917] font-medium">{matchingCount}</strong> of {papers.length} {papers.length === 1 ? 'volume' : 'volumes'}
              </span>
            ) : (
              <span>
                {papers.length} {papers.length === 1 ? 'paper' : 'papers'}
              </span>
            )}
            {papers.length === 0 && (
              <span className="text-[#A85338] ml-2 tracking-[0.15em]">
                [ Empirical Gap ]
              </span>
            )}
          </div>
        </div>
      ) : null}

      {description && (
        <p className="text-xs text-[#78716C] font-sans px-1 max-w-2xl leading-relaxed mb-6">
          {description}
        </p>
      )}

      {/* Pure Furniture: Books Row resting on architectural baseline */}
      <div className="relative pt-2">
        
        {/* Books Row */}
        <div className="relative z-10 w-full min-h-[490px] flex items-end space-x-2.5 sm:space-x-3 overflow-x-auto no-scrollbar pb-1 px-1">
          {papers.length > 0 ? (
            papers.map((paper) => (
              <PaperSpine
                key={paper.id}
                paper={paper}
                onSelect={onSelectPaper}
                isSearchMatch={isMatch(paper)}
                hasActiveSearch={hasActiveSearch}
              />
            ))
          ) : (
            /* Meaningful Empty Shelf Gap */
            <div className="w-full flex items-center justify-center py-14 text-center">
              <div className="max-w-md px-4">
                <span className="font-serif text-xs text-[#8A847C] italic block mb-1">
                  — Unpopulated Domain —
                </span>
                <p className="text-[11px] text-[#A69F93] leading-relaxed">
                  No empirical studies catalogued here yet. Preserved as a deliberate void to illustrate the literature gap on forward-looking expectations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Minimal Architectural Shelf Line & Ambient Depth */}
        <div className="relative z-20">
          <div className="h-[2px] bg-[#DDD6C9]" />
          <div className="h-6 bg-gradient-to-b from-[#1C1917]/[0.025] to-transparent pointer-events-none" />
        </div>

      </div>
    </div>
  );
}
