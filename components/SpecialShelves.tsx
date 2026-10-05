'use client';

import React, { useState } from 'react';
import { Paper } from '@/types/paper';
import { PaperSpine } from '@/components/PaperSpine';
import { Star, BookOpen, Clock, Sparkles } from 'lucide-react';

interface SpecialShelvesProps {
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  searchQuery?: string;
}

export function SpecialShelves({
  papers,
  onSelectPaper,
  searchQuery = ''
}: SpecialShelvesProps) {
  const [activeTab, setActiveTab] = useState<'anchor' | 'reading' | 'readNext' | 'recent'>('anchor');

  const anchorPapers = papers.filter(p => p.isCoreAim1 || p.importanceRating === 5);
  const currentlyReading = papers.filter(p => p.readingStatus === 'Reading');
  const readNext = papers.filter(p => p.readingQueueCategory === 'Read next' || (p.readingStatus === 'To read' && p.importanceRating >= 4));
  const recentlyAdded = [...papers].sort((a, b) => new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()).slice(0, 8);

  const tabs = [
    { id: 'anchor' as const, label: 'Anchor Papers', count: anchorPapers.length, desc: 'Central theoretical and empirical anchors for Aim 1.' },
    { id: 'reading' as const, label: 'Currently Reading', count: currentlyReading.length, desc: 'Papers currently under active examination.' },
    { id: 'readNext' as const, label: 'Read Next', count: readNext.length, desc: 'High-priority literature queued for reading.' },
    { id: 'recent' as const, label: 'Recently Added', count: recentlyAdded.length, desc: 'Newest arrivals in the personal archive.' }
  ];

  const currentCollection = 
    activeTab === 'anchor' ? anchorPapers :
    activeTab === 'reading' ? currentlyReading :
    activeTab === 'readNext' ? readNext : recentlyAdded;

  const currentMeta = tabs.find(t => t.id === activeTab)!;

  const hasActiveSearch = Boolean(searchQuery && searchQuery.trim().length > 0);
  const isMatch = (paper: Paper) => {
    if (!hasActiveSearch) return true;
    const q = searchQuery.toLowerCase();
    return (
      paper.title.toLowerCase().includes(q) ||
      paper.authors.some(a => a.toLowerCase().includes(q)) ||
      paper.whyThisMattersForAim1.toLowerCase().includes(q)
    );
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#E8E2D6] rounded-xl p-6 mb-12 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
      
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 border-b border-[#E8E2D6] pb-3">
        <div>
          <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-[#8A847C] block mb-1">
            Curated Reserve
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-normal text-[#1C1917] tracking-tight">
            Special Collections
          </h2>
        </div>

        {/* Minimal Delicate Pill Switcher */}
        <div className="flex flex-wrap items-center gap-1.5">
          {tabs.map(tab => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs transition-all ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#F2EDE4] text-[#635F58] hover:text-[#1C1917] hover:bg-[#EAE4D8]'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] opacity-75`}>
                  ({tab.count})
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-[#78716C] font-serif italic">
        {currentMeta.desc}
      </p>

      {/* Clean Curated Shelf */}
      <div className="relative pt-2">
        <div className="relative z-10 w-full min-h-[490px] flex items-end space-x-2 sm:space-x-2.5 overflow-x-auto no-scrollbar pb-1 px-1">
          {currentCollection.length > 0 ? (
            currentCollection.map((paper) => (
              <PaperSpine
                key={paper.id}
                paper={paper}
                onSelect={onSelectPaper}
                isSearchMatch={isMatch(paper)}
                hasActiveSearch={hasActiveSearch}
              />
            ))
          ) : (
            <div className="w-full flex items-center justify-center py-12 text-center">
              <span className="text-xs text-[#8A847C] italic">
                No papers currently assigned to this curated collection.
              </span>
            </div>
          )}
        </div>

        {/* Minimal Shelf Line */}
        <div className="relative z-20">
          <div className="h-[2px] bg-[#DDD6C9] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)]" />
          <div className="h-3 bg-gradient-to-b from-[#1C1917]/[0.02] to-transparent pointer-events-none" />
        </div>
      </div>

    </div>
  );
}
