'use client';

import React, { useState } from 'react';
import { Search, X, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';
import { ArrangementMode } from '@/components/LibraryShelves';

export type LibraryViewMode = 'shelves' | 'foresight-gap' | 'table';

export interface FilterState {
  search: string;
  theme: string;
  aimRelevance: string;
  evidenceType: string;
  readingStatus: string;
  role: string;
  methodology: string;
  coreOnly: boolean;
  sortBy: 'year-desc' | 'year-asc' | 'relevance' | 'importance' | 'title';
}

interface FilterBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  viewMode: LibraryViewMode;
  setViewMode: (mode: LibraryViewMode) => void;
  resultCount: number;
  totalCount: number;
  arrangeBy?: ArrangementMode;
  setArrangeBy?: (mode: ArrangementMode) => void;
  showSpineGuide?: boolean;
  setShowSpineGuide?: (val: boolean) => void;
}

// Curated pill categories matching the requested design
export const CURATED_PILLS = [
  { id: 'ALL', label: 'All', themes: [] },
  { id: 'FORESIGHT', label: 'Foresight', themes: ['Foresight & Expectations', 'Preparedness & Planning'] },
  { id: 'DECISIONS', label: 'Decisions', themes: ['Labour-market Decisions', 'Care Transitions'] },
  { id: 'FINANCIAL CONSEQUENCES', label: 'Financial Consequences', themes: ['Financial Consequences', 'Retirement & Pensions', 'Life-course Consequences'] },
  { id: 'CONSTRAINTS', label: 'Constraints', themes: ['Constrained Choice & Agency', 'Uncertainty'] },
  { id: 'POLICY', label: 'Policy', themes: ['Workplace & Policy Context', 'Mid-life Caring'] },
  { id: 'THEORY', label: 'Theory', themes: ['Theory & Conceptual', 'Gender & Household Decision-making'] },
  { id: 'METHODS', label: 'Methods', themes: ['Methods'] },
];

export function FilterBar({
  filters,
  setFilters,
  viewMode,
  setViewMode,
  resultCount,
  totalCount,
  arrangeBy = 'theme',
  setArrangeBy,
  showSpineGuide = false,
  setShowSpineGuide
}: FilterBarProps) {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [arrangeDropdownOpen, setArrangeDropdownOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handlePillClick = (pillId: string) => {
    setFilters(prev => ({
      ...prev,
      theme: prev.theme === pillId ? 'ALL' : pillId
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      theme: 'ALL',
      aimRelevance: 'all',
      evidenceType: 'all',
      readingStatus: 'all',
      role: 'all',
      methodology: 'all',
      coreOnly: false,
      sortBy: 'relevance'
    });
  };

  const hasAdvancedFilters = 
    filters.aimRelevance !== 'all' ||
    filters.evidenceType !== 'all' ||
    filters.readingStatus !== 'all' ||
    filters.role !== 'all' ||
    filters.methodology !== 'all' ||
    filters.coreOnly;

  const arrangeLabels: Record<ArrangementMode, string> = {
    collection: 'Continuous Shelf',
    theme: 'Theme Shelves',
    evidenceType: 'Evidence Type',
    readingStatus: 'Reading Status',
    importance: 'Scholarly Importance',
    year: 'Chronology',
    author: 'Author A–Z',
    role: 'Aim 1 Role'
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-7">
      
      {/* 1. Understated Search Prompt mirroring the reference */}
      <div className="relative max-w-md mx-auto text-center">
        <div className="relative flex items-center justify-center">
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="What are you looking for?"
            className="w-full bg-transparent py-1.5 text-center font-serif italic text-base sm:text-lg placeholder:font-serif placeholder:italic placeholder:text-[#888176] text-[#24211D] focus:outline-none border-b border-transparent focus:border-[#CCC5B8] transition-all"
          />
          {filters.search && (
            <button
              onClick={() => setFilters(prev => ({ ...prev, search: '' }))}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#888176] hover:text-[#24211D] transition-colors p-1"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Delicate Outline Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
        {CURATED_PILLS.map((pill) => {
          const isSelected = (pill.id === 'ALL' && (filters.theme === 'ALL' || filters.theme === 'all')) || filters.theme === pill.id;

          return (
            <button
              key={pill.id}
              onClick={() => handlePillClick(pill.id)}
              className={`px-3.5 py-1 rounded-full text-[9px] sm:text-[9.5px] font-mono tracking-[0.2em] uppercase transition-all duration-150 border ${
                isSelected
                  ? 'border-[#24211D] text-[#24211D] bg-[#24211D]/[0.06] font-medium shadow-2xs'
                  : 'border-[#CCC5B8] text-[#736C61] hover:border-[#24211D] hover:text-[#24211D]'
              }`}
            >
              {pill.label}
            </button>
          );
        })}
      </div>

      {/* 3. Restrained Secondary Controls: Arrange by, View Mode, Filters + */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-[#EFEAE1]/70 text-xs text-[#78716C]">
        
        {/* Left: Subtle Arrange by control */}
        <div className="relative">
          {setArrangeBy && viewMode === 'shelves' ? (
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] uppercase font-sans tracking-[0.16em] text-[#8A847C]">
                Arrange by:
              </span>
              <button
                onClick={() => setArrangeDropdownOpen(!arrangeDropdownOpen)}
                className="inline-flex items-center space-x-1 font-serif text-[#1C1917] hover:text-[#A85338] transition-colors"
              >
                <span>{arrangeLabels[arrangeBy]}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {arrangeDropdownOpen && (
                <div className="absolute left-0 top-full mt-1.5 w-48 rounded-md bg-[#FAF8F5] border border-[#DDD6C9] shadow-lg py-1.5 z-40 text-xs">
                  {(['theme', 'evidenceType', 'readingStatus', 'importance', 'year', 'author', 'role'] as ArrangementMode[]).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setArrangeBy(mode);
                        setArrangeDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 flex items-center justify-between hover:bg-[#F2ECE1] transition-colors ${
                        arrangeBy === mode ? 'font-medium text-[#1C1917] bg-[#F2ECE1]/60' : 'text-[#5C564E]'
                      }`}
                    >
                      <span>{arrangeLabels[mode]}</span>
                      {arrangeBy === mode && <Check className="w-3 h-3 text-[#1C1917]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <span className="text-[10px] uppercase tracking-[0.16em] text-[#8A847C]">
              {resultCount} of {totalCount} volumes
            </span>
          )}
        </div>

        {/* Center: Quiet View Mode Switcher */}
        <div className="flex items-center space-x-3 text-[11px] uppercase tracking-[0.14em] font-sans">
          <button
            onClick={() => setViewMode('shelves')}
            className={`transition-colors ${
              viewMode === 'shelves'
                ? 'text-[#1C1917] font-semibold border-b border-[#1C1917] pb-0.5'
                : 'text-[#8A847C] hover:text-[#1C1917]'
            }`}
          >
            Shelves
          </button>
          <span className="text-[#DDD6C9]">·</span>
          <button
            onClick={() => setViewMode('foresight-gap')}
            className={`transition-colors ${
              viewMode === 'foresight-gap'
                ? 'text-[#1C1917] font-semibold border-b border-[#1C1917] pb-0.5'
                : 'text-[#8A847C] hover:text-[#1C1917]'
            }`}
          >
            The Foresight Gap
          </button>
          <span className="text-[#DDD6C9]">·</span>
          <button
            onClick={() => setViewMode('table')}
            className={`transition-colors ${
              viewMode === 'table'
                ? 'text-[#1C1917] font-semibold border-b border-[#1C1917] pb-0.5'
                : 'text-[#8A847C] hover:text-[#1C1917]'
            }`}
          >
            Table
          </button>
        </div>

        {/* Right: Refined "Filters +" & "Spine Guide" */}
        <div className="flex items-center space-x-3">
          {setShowSpineGuide && (
            <button
              onClick={() => setShowSpineGuide(!showSpineGuide)}
              className="text-[10px] uppercase font-sans tracking-[0.16em] text-[#8A847C] hover:text-[#1C1917] transition-colors"
            >
              {showSpineGuide ? 'Hide Guide' : 'Spine Guide'}
            </button>
          )}

          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] uppercase font-sans tracking-[0.15em] border transition-colors ${
              hasAdvancedFilters || showAdvancedFilters
                ? 'border-[#1C1917] text-[#1C1917] bg-[#1C1917]/[0.04]'
                : 'border-[#DDD6C9] text-[#78716C] hover:text-[#1C1917] hover:border-[#1C1917]'
            }`}
          >
            <SlidersHorizontal className="w-2.5 h-2.5" />
            <span>Filters +</span>
            {hasAdvancedFilters && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#A85338] ml-0.5" />
            )}
          </button>
        </div>

      </div>

      {/* 4. Refined Expandable Advanced Filters Drawer */}
      {showAdvancedFilters && (
        <div className="bg-[#FAF8F5] border border-[#DDD6C9] rounded-md p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs animate-in fade-in duration-150">
          <div>
            <label className="block text-[9px] uppercase font-medium tracking-[0.2em] text-[#8A847C] mb-1">
              Aim Relevance
            </label>
            <select
              value={filters.aimRelevance}
              onChange={(e) => setFilters(prev => ({ ...prev, aimRelevance: e.target.value }))}
              className="w-full px-2 py-1.5 rounded border border-[#DDD6C9] bg-white text-xs text-[#1C1917] focus:outline-none"
            >
              <option value="all">All Relevances</option>
              <option value="Direct">Direct</option>
              <option value="Strongly relevant">Strongly relevant</option>
              <option value="Adjacent">Adjacent</option>
              <option value="Background">Background</option>
              <option value="Methods">Methods</option>
              <option value="Theory">Theory</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] uppercase font-medium tracking-[0.2em] text-[#8A847C] mb-1">
              Evidence Type
            </label>
            <select
              value={filters.evidenceType}
              onChange={(e) => setFilters(prev => ({ ...prev, evidenceType: e.target.value }))}
              className="w-full px-2 py-1.5 rounded border border-[#DDD6C9] bg-white text-xs text-[#1C1917] focus:outline-none"
            >
              <option value="all">All Evidence Types</option>
              <option value="Foresight & Anticipation">Foresight & Anticipation</option>
              <option value="Consequences Only">Consequences Only</option>
              <option value="Bridge / Both">Bridge / Both</option>
              <option value="Theoretical / Conceptual">Theoretical / Conceptual</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] uppercase font-medium tracking-[0.2em] text-[#8A847C] mb-1">
              Reading Status
            </label>
            <select
              value={filters.readingStatus}
              onChange={(e) => setFilters(prev => ({ ...prev, readingStatus: e.target.value }))}
              className="w-full px-2 py-1.5 rounded border border-[#DDD6C9] bg-white text-xs text-[#1C1917] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Reading">Reading</option>
              <option value="To read">To read</option>
              <option value="Notes complete">Notes complete</option>
              <option value="Read">Read</option>
              <option value="Skimmed">Skimmed</option>
              <option value="Cited">Cited</option>
              <option value="Discovered">Discovered</option>
            </select>
          </div>

          <div>
            <label className="block text-[9px] uppercase font-medium tracking-[0.2em] text-[#8A847C] mb-1">
              Sort Sequence
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="w-full px-2 py-1.5 rounded border border-[#DDD6C9] bg-white text-xs text-[#1C1917] focus:outline-none"
            >
              <option value="relevance">Aim 1 Relevance</option>
              <option value="importance">Scholarly Importance</option>
              <option value="year-desc">Year (Newest First)</option>
              <option value="year-asc">Year (Oldest First)</option>
              <option value="title">Title (A–Z)</option>
            </select>
          </div>

          {/* Core Aim 1 Checkbox & Clear Action */}
          <div className="col-span-2 sm:col-span-4 flex items-center justify-between pt-2 border-t border-[#EFEAE1]">
            <label className="inline-flex items-center space-x-2 cursor-pointer text-xs text-[#44403C]">
              <input
                type="checkbox"
                checked={filters.coreOnly}
                onChange={(e) => setFilters(prev => ({ ...prev, coreOnly: e.target.checked }))}
                className="rounded border-[#DDD6C9] text-[#1C1917] focus:ring-0"
              />
              <span className="font-serif">Show Core Aim 1 Anchor Literature Only</span>
            </label>

            {hasAdvancedFilters && (
              <button
                onClick={clearFilters}
                className="text-[10px] uppercase font-sans tracking-[0.15em] text-[#A85338] hover:underline"
              >
                Reset All Filters
              </button>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
