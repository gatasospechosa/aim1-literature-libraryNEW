'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLibrary } from '@/context/LibraryContext';
import { PaperTable } from '@/components/PaperTable';
import { LibraryShelves, ArrangementMode } from '@/components/LibraryShelves';
import { ForesightGapBookcase } from '@/components/ForesightGapBookcase';
import { FilterBar, FilterState, LibraryViewMode, CURATED_PILLS } from '@/components/FilterBar';
import { PaperDetailDrawer } from '@/components/PaperDetailDrawer';
import { PaperFormModal } from '@/components/PaperFormModal';
import { Paper } from '@/types/paper';

function LibraryContent() {
  const searchParams = useSearchParams();
  const { papers, updatePaper, addPaper } = useLibrary();

  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  // Default view is the continuous exhibition SHELF experience
  const [viewMode, setViewMode] = useState<LibraryViewMode>('shelves');
  const [arrangeBy, setArrangeBy] = useState<ArrangementMode>('collection');
  const [showSpineGuide, setShowSpineGuide] = useState(false);

  const [filters, setFilters] = useState<FilterState>({
    search: searchParams.get('q') || '',
    theme: searchParams.get('theme') || 'ALL',
    aimRelevance: searchParams.get('relevance') || 'all',
    evidenceType: searchParams.get('evidenceType') || 'all',
    readingStatus: searchParams.get('status') || 'all',
    role: searchParams.get('role') || 'all',
    methodology: searchParams.get('method') || 'all',
    coreOnly: searchParams.get('coreOnly') === 'true',
    sortBy: 'relevance'
  });

  // Sync with URL params if they change
  useEffect(() => {
    const q = searchParams.get('q');
    const theme = searchParams.get('theme');
    const coreOnly = searchParams.get('coreOnly') === 'true';
    const view = searchParams.get('view');
    if (q !== null) setFilters(f => ({ ...f, search: q }));
    if (theme !== null) setFilters(f => ({ ...f, theme: theme }));
    if (coreOnly) setFilters(f => ({ ...f, coreOnly: true }));
    if (view === 'table' || view === 'shelves' || view === 'foresight-gap') {
      setViewMode(view);
    }
  }, [searchParams]);

  // Filter & Sort logic
  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      // Search term
      if (filters.search.trim()) {
        const q = filters.search.toLowerCase();
        const matchesTitle = paper.title.toLowerCase().includes(q);
        const matchesAuthors = paper.authors.some(a => a.toLowerCase().includes(q));
        const matchesJournal = paper.journal.toLowerCase().includes(q);
        const matchesDataset = paper.dataset.toLowerCase().includes(q);
        const matchesMethod = paper.methodology.toLowerCase().includes(q);
        const matchesWhyMatters = paper.whyThisMattersForAim1.toLowerCase().includes(q);
        const matchesFinding = paper.mainFinding.toLowerCase().includes(q);
        const matchesAbstract = paper.abstract.toLowerCase().includes(q);
        const matchesThemes = paper.themes.some(t => t.toLowerCase().includes(q));

        if (!matchesTitle && !matchesAuthors && !matchesJournal && !matchesDataset && !matchesMethod && !matchesWhyMatters && !matchesFinding && !matchesAbstract && !matchesThemes) {
          return false;
        }
      }

      // Theme / Curated Pill Matcher
      if (filters.theme !== 'ALL' && filters.theme !== 'all') {
        const curatedPill = CURATED_PILLS.find(p => p.id === filters.theme);
        if (curatedPill && curatedPill.themes.length > 0) {
          const hasMatchingTheme = curatedPill.themes.some(t => paper.themes.includes(t));
          if (!hasMatchingTheme) return false;
        } else if (!paper.themes.includes(filters.theme)) {
          return false;
        }
      }

      // Aim Relevance
      if (filters.aimRelevance !== 'all' && paper.aimRelevance !== filters.aimRelevance) {
        return false;
      }

      // Evidence Type
      if (filters.evidenceType !== 'all' && paper.evidenceType !== filters.evidenceType) {
        return false;
      }

      // Reading Status
      if (filters.readingStatus !== 'all' && paper.readingStatus !== filters.readingStatus) {
        return false;
      }

      // Role
      if (filters.role !== 'all' && !paper.roleInAim1.includes(filters.role as any)) {
        return false;
      }

      // Methodology
      if (filters.methodology !== 'all') {
        const methodQuery = filters.methodology.toLowerCase();
        if (!paper.methodology.toLowerCase().includes(methodQuery)) {
          return false;
        }
      }

      // Core Only
      if (filters.coreOnly && !paper.isCoreAim1) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'year-desc') return b.year - a.year;
      if (filters.sortBy === 'year-asc') return a.year - b.year;
      if (filters.sortBy === 'importance') return b.importanceRating - a.importanceRating;
      if (filters.sortBy === 'title') return a.title.localeCompare(b.title);
      // default: relevance
      if (b.relevanceScore !== a.relevanceScore) {
        return b.relevanceScore - a.relevanceScore;
      }
      return b.year - a.year;
    });
  }, [papers, filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* 1. EDITORIAL HERO: Vast, calm, open ivory space */}
      <div className="pt-20 sm:pt-28 pb-8 text-center select-none">
        
        {/* Small uppercase tracked subtitle */}
        <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.35em] uppercase text-[#888277] block mb-3">
          A Personal Archive
        </span>

        {/* Enormous high-contrast serif italic heading with blinking cursor */}
        <h1 className="font-serif italic font-normal text-6xl sm:text-7xl md:text-8xl lg:text-[5.5rem] text-[#24211D] tracking-tight leading-none inline-flex items-baseline justify-center">
          <span>Welcome to my library</span>
          <span className="inline-block w-[2px] h-[0.8em] bg-[#24211D] ml-1.5 animate-pulse opacity-70" />
        </h1>

        {/* Dynamic volume count */}
        <p className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-[#888277] mt-3.5">
          {filteredPapers.length} {filteredPapers.length === 1 ? 'Volume' : 'Volumes'}
        </p>

        {/* Pill Button: Recommend a Paper / Add to Archive */}
        <div className="mt-4">
          <button
            onClick={() => {
              setEditingPaper(null);
              setIsEditModalOpen(true);
            }}
            className="inline-flex items-center px-5 py-1.5 rounded-full border border-[#CCC5B8] text-[9.5px] font-mono uppercase tracking-[0.25em] text-[#736C61] hover:border-[#24211D] hover:text-[#24211D] hover:bg-black/[0.02] transition-all bg-transparent"
          >
            Recommend a Paper
          </button>
        </div>
      </div>

      {/* 2. RESTRAINED SEARCH & DELICATE OUTLINE PILL FILTERS */}
      <div className="pb-12 sm:pb-16">
        <FilterBar
          filters={filters}
          setFilters={setFilters}
          viewMode={viewMode}
          setViewMode={setViewMode}
          resultCount={filteredPapers.length}
          totalCount={papers.length}
          arrangeBy={arrangeBy}
          setArrangeBy={setArrangeBy}
          showSpineGuide={showSpineGuide}
          setShowSpineGuide={setShowSpineGuide}
        />
      </div>

      {/* 3. SUBSTANTIAL OPEN SPACE BETWEEN INTERFACE AND THE SHELVES */}
      <div className="pt-8 sm:pt-14 pb-20">
        {filteredPapers.length > 0 ? (
          viewMode === 'shelves' ? (
            <LibraryShelves
              papers={filteredPapers}
              onSelectPaper={(p) => setSelectedPaper(p)}
              searchQuery={filters.search}
              arrangeBy={arrangeBy}
              showSpineGuide={showSpineGuide}
            />
          ) : viewMode === 'foresight-gap' ? (
            <ForesightGapBookcase
              papers={filteredPapers}
              onSelectPaper={(p) => setSelectedPaper(p)}
              searchQuery={filters.search}
            />
          ) : (
            <PaperTable
              papers={filteredPapers}
              onSelect={(p) => setSelectedPaper(p)}
            />
          )
        ) : (
          <div className="border-t border-b border-[#DDD6C9]/80 py-20 text-center space-y-3">
            <p className="font-serif text-xl text-[#1C1917]">
              No volumes found
            </p>
            <p className="text-xs text-[#8A847C] max-w-md mx-auto leading-relaxed">
              No catalogued papers matched your active search query or filter selection.
            </p>
            <button
              onClick={() => setFilters({
                search: '',
                theme: 'ALL',
                aimRelevance: 'all',
                evidenceType: 'all',
                readingStatus: 'all',
                role: 'all',
                methodology: 'all',
                coreOnly: false,
                sortBy: 'relevance'
              })}
              className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-serif border border-[#DDD6C9] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF8F5] transition-all mt-2"
            >
              Reset Archive Filters
            </button>
          </div>
        )}
      </div>

      {/* Editorial Reading Drawer */}
      <PaperDetailDrawer
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
        onSelectPaper={(p) => setSelectedPaper(p)}
        onOpenEditModal={(p) => {
          setEditingPaper(p);
          setIsEditModalOpen(true);
        }}
      />

      {/* Add / Edit Paper Modal */}
      <PaperFormModal
        isOpen={isEditModalOpen}
        paper={editingPaper}
        onClose={() => setIsEditModalOpen(false)}
        onSave={(data) => {
          if (editingPaper) {
            updatePaper(editingPaper.id, data);
            if (selectedPaper && selectedPaper.id === editingPaper.id) {
              setSelectedPaper({ ...selectedPaper, ...data });
            }
          } else {
            addPaper(data);
          }
        }}
      />
    </div>
  );
}

export default function LibraryPage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-24 text-center text-[10px] tracking-[0.25em] uppercase text-[#8A847C]">Opening Archive…</div>}>
      <LibraryContent />
    </Suspense>
  );
}
