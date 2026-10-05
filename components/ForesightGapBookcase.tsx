'use client';

import React from 'react';
import { Paper } from '@/types/paper';
import { PaperSpine } from '@/components/PaperSpine';

interface ForesightGapBookcaseProps {
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  searchQuery?: string;
}

export function ForesightGapBookcase({
  papers,
  onSelectPaper,
  searchQuery = ''
}: ForesightGapBookcaseProps) {
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

  // Group papers strictly based on what they primarily study:
  // 1. BEFORE (Expectations, Anticipation, Preparedness, Planning)
  // 2. DECISION (Labour-market choices, hours, leaving work, retirement, care allocation)
  // 3. CONSEQUENCES (Earnings, income, savings, pensions, later-life security)

  const beforePapers = papers.filter(p => {
    if (p.evidenceType === 'Foresight & Anticipation') return true;
    if (p.themes.includes('Foresight & expectations') || p.themes.includes('Preparedness & planning')) {
      return p.evidenceType !== 'Consequences Only';
    }
    return false;
  });

  const decisionPapers = papers.filter(p => {
    if (beforePapers.some(bp => bp.id === p.id)) return false;
    const isDecisionTheme = 
      p.themes.includes('Labour-market decisions') ||
      p.themes.includes('Constrained choice & agency') ||
      p.themes.includes('Care transitions') ||
      p.themes.includes('Gender & household decision-making') ||
      p.themes.includes('Workplace & policy context');
    
    if (p.evidenceType === 'Consequences Only' && (p.themes.includes('Financial consequences') || p.themes.includes('Retirement & pensions'))) {
      return false;
    }
    return isDecisionTheme;
  });

  const consequencePapers = papers.filter(p => {
    return !beforePapers.some(bp => bp.id === p.id) && !decisionPapers.some(dp => dp.id === p.id);
  });

  const bookcases = [
    {
      id: 'before',
      number: '01',
      title: 'BEFORE',
      subtitle: 'Expectations & Anticipation',
      subthemes: ['Expectations', 'Anticipation', 'Preparedness', 'Planning'],
      papers: beforePapers,
      notes: 'Literature investigating what prospective carers understood, calculated, or anticipated prior to reducing employment.'
    },
    {
      id: 'decision',
      number: '02',
      title: 'DECISION',
      subtitle: 'Labour-Market Decisions',
      subthemes: ['Reduce hours', 'Leave employment', 'Change job', 'Retire', 'Care allocation'],
      papers: decisionPapers,
      notes: 'Studies analysing the negotiation of employment adjustment, tipping points, and constrained family choices.'
    },
    {
      id: 'consequences',
      number: '03',
      title: 'CONSEQUENCES',
      subtitle: 'Financial & Lifetime Scarring',
      subthemes: ['Earnings', 'Income', 'Savings', 'Pensions', 'Later-life security'],
      papers: consequencePapers,
      notes: 'Extensive empirical literature tracking ex-post wage penalties, hours loss, and deferred private pension deficits.'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-200">
      
      {/* Editorial Header */}
      <div className="border-b border-[#E8E2D6] pb-4">
        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#8A847C] block mb-1">
          Conceptual Mapping
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] tracking-tight">
          The Foresight Gap
        </h2>
        <p className="text-xs sm:text-sm text-[#6E6961] font-serif italic mt-1 max-w-3xl leading-relaxed">
          The archive organised across three chronological and conceptual domains: What was anticipated, How the choice was made, and What consequences followed.
        </p>
      </div>

      {/* The Three Conceptual Bookcase Bays */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {bookcases.map((bc) => (
          <div
            key={bc.id}
            className="flex flex-col justify-between bg-[#FCFBF9] border border-[#E8E2D6] rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-6"
          >
            {/* Bay Title & Sub-themes */}
            <div>
              <div className="flex items-baseline justify-between border-b border-[#EFEAE0] pb-2 mb-3">
                <span className="text-[10px] font-mono tracking-[0.2em] text-[#8A847C]">
                  AREA {bc.number}
                </span>
                <span className="text-[10px] uppercase tracking-[0.16em] text-[#8A847C] font-sans">
                  {bc.papers.length} {bc.papers.length === 1 ? 'Volume' : 'Volumes'}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-normal text-[#1C1917] tracking-tight">
                {bc.title}
              </h3>
              <p className="text-xs font-serif italic text-[#8A847C] mt-0.5 mb-3">
                {bc.subtitle}
              </p>

              {/* Minimal subthemes pills */}
              <div className="flex flex-wrap gap-1">
                {bc.subthemes.map((st, i) => (
                  <span key={i} className="text-[10px] bg-[#F2EDE4] text-[#57534E] px-2 py-0.5 rounded-full">
                    {st}
                  </span>
                ))}
              </div>
            </div>

            {/* Sculptural Shelf Area */}
            <div className="pt-2">
              <div className="relative z-10 w-full min-h-[490px] flex items-end space-x-2 overflow-x-auto no-scrollbar pb-1 px-1">
                {bc.papers.length > 0 ? (
                  bc.papers.map((paper) => (
                    <PaperSpine
                      key={paper.id}
                      paper={paper}
                      onSelect={onSelectPaper}
                      isSearchMatch={isMatch(paper)}
                      hasActiveSearch={hasActiveSearch}
                      isMultiStage={paper.evidenceType === 'Bridge / Both'}
                    />
                  ))
                ) : (
                  <div className="w-full flex items-center justify-center py-14 text-center">
                    <span className="text-xs text-[#8A847C] italic">
                      Empty shelf space — empirical void.
                    </span>
                  </div>
                )}
              </div>

              {/* Shelf Line */}
              <div className="relative z-20">
                <div className="h-[2px] bg-[#DDD6C9] rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.03)]" />
                <div className="h-3 bg-gradient-to-b from-[#1C1917]/[0.02] to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Bay Footnote */}
            <p className="text-[11px] text-[#78716C] leading-relaxed font-sans pt-2 border-t border-[#EFEAE0]">
              {bc.notes}
            </p>

          </div>
        ))}
      </div>

      {/* Editorial Synthesis Callout */}
      <div className="border-l border-[#1C1917] pl-4 py-1 text-xs text-[#3D3A35] font-serif leading-relaxed max-w-4xl">
        <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#1C1917] block mb-1">
          Observed Distribution in the Literature:
        </span>
        <p>
          The shelves reveal the intellectual shape of current scholarship: <strong>Area 03 (Consequences)</strong> is crowded with robust econometric and panel evaluations measuring employment and pension penalties. In contrast, <strong>Area 01 (Before)</strong> contains relatively few volumes examining what carers anticipated when choices were made. The literature base documents the consequence extensively while leaving the anticipatory decision threshold largely unmodelled.
        </p>
      </div>

    </div>
  );
}
