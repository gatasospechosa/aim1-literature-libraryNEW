'use client';

import React from 'react';
import { Paper, ReadingStatus } from '@/types/paper';
import { useLibrary } from '@/context/LibraryContext';
import { 
  Star, 
  ExternalLink, 
  BookMarked, 
  Compass, 
  ArrowRight,
  Layers,
  FileText,
  Clock
} from 'lucide-react';

interface PaperCardProps {
  paper: Paper;
  onSelect: (paper: Paper) => void;
}

export function PaperCard({ paper, onSelect }: PaperCardProps) {
  const { toggleCoreAim1, updateReadingStatus } = useLibrary();

  // Color mappings for Aim Relevance
  const getAimRelevanceBadge = (relevance: Paper['aimRelevance']) => {
    switch (relevance) {
      case 'Direct':
        return 'bg-[#F9EDE8] text-[#A85338] border-[#E8D0C5]';
      case 'Strongly relevant':
        return 'bg-[#EBF1F5] text-[#1E3A5F] border-[#CBD8E2]';
      case 'Adjacent':
        return 'bg-[#F3EFE6] text-[#635543] border-[#E2DAD0]';
      case 'Background':
        return 'bg-[#F5F5F4] text-[#57534E] border-[#E7E5E4]';
      case 'Methods':
        return 'bg-[#EDF5F0] text-[#2F6141] border-[#CDE3D5]';
      case 'Theory':
        return 'bg-[#F6EFF4] text-[#703258] border-[#E5D0DF]';
      default:
        return 'bg-[#F5F5F4] text-[#78716C] border-[#E7E5E4]';
    }
  };

  // Color mappings for Evidence Type (Central thesis distinction!)
  const getEvidenceTypeBadge = (type: Paper['evidenceType']) => {
    switch (type) {
      case 'Foresight & Anticipation':
        return 'bg-[#EAF3EC] text-[#245934] border-[#BDDCBF]';
      case 'Consequences Only':
        return 'bg-[#F1F3F5] text-[#3D4D5C] border-[#CBD5E1]';
      case 'Bridge / Both':
        return 'bg-[#FCF6E8] text-[#855B18] border-[#EEDDB8]';
      case 'Theoretical / Conceptual':
        return 'bg-[#F7EDF1] text-[#6E2B4B] border-[#E8CCD8]';
    }
  };

  const getReadingStatusBadge = (status: ReadingStatus) => {
    switch (status) {
      case 'Read':
      case 'Notes complete':
      case 'Cited':
        return 'bg-[#EAF3EC] text-[#245934]';
      case 'Reading':
        return 'bg-[#FEF7E6] text-[#8C6214]';
      case 'To read':
        return 'bg-[#EFF6FF] text-[#1D4ED8]';
      default:
        return 'bg-[#F5F5F4] text-[#78716C]';
    }
  };

  const formattedAuthors = paper.authors.length <= 2 
    ? paper.authors.join(' & ') 
    : `${paper.authors[0]} et al.`;

  return (
    <div 
      className={`group relative bg-[#FCFBF9] hover:bg-[#FFFFFF] border rounded-lg p-5 transition-all duration-200 shadow-card hover:shadow-card-hover flex flex-col justify-between ${
        paper.isCoreAim1 
          ? 'border-[#D9C4A5] ring-1 ring-[#E8D7BE]/60' 
          : 'border-[#E5DFD5] hover:border-[#D0C7B9]'
      }`}
    >
      <div>
        {/* Top Meta Header: Citation & Badges */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className={`px-2 py-0.5 rounded-full border text-[11px] font-semibold ${getAimRelevanceBadge(paper.aimRelevance)}`}>
              {paper.aimRelevance}
            </span>
            <span className={`px-2 py-0.5 rounded-full border text-[11px] font-medium ${getEvidenceTypeBadge(paper.evidenceType)}`}>
              {paper.evidenceType}
            </span>
            {paper.isCoreAim1 && (
              <span className="bg-[#FAF0DE] text-[#935D14] border border-[#ECD1A4] px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                Core Aim 1
              </span>
            )}
          </div>

          {/* Quick Bookmark / Core toggle */}
          <div className="flex items-center space-x-1 shrink-0">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCoreAim1(paper.id);
              }}
              title={paper.isCoreAim1 ? "Remove from Core Aim 1 papers" : "Mark as Core Aim 1 paper"}
              className="p-1 rounded text-[#A8A29E] hover:text-[#A85338] transition-colors"
            >
              <Star className={`w-4 h-4 ${paper.isCoreAim1 ? 'fill-[#A85338] text-[#A85338]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Paper Title (Serif Editorial) */}
        <h3 
          onClick={() => onSelect(paper)}
          className="font-serif text-lg font-bold text-[#1C1917] leading-snug tracking-tight hover:text-[#A85338] cursor-pointer mb-2 group-hover:transition-colors"
        >
          {paper.title}
        </h3>

        {/* Authors, Year & Journal */}
        <p className="text-xs text-[#57534E] font-medium mb-3">
          <span className="font-semibold text-[#292524]">{formattedAuthors}</span>
          <span className="text-[#8A8680] mx-1.5">•</span>
          <span className="text-[#44403C] font-serif italic">{paper.year}</span>
          <span className="text-[#8A8680] mx-1.5">•</span>
          <span className="text-[#57534E] italic">{paper.journal}</span>
        </p>

        {/* Doctoral Highlight: Why this matters for Aim 1 */}
        <div className="bg-[#FAF7F2] border-l-2 border-[#A85338] p-2.5 rounded-r text-xs mb-3.5">
          <span className="font-semibold text-[#823824] uppercase tracking-wider text-[10px] block mb-0.5">
            Why this matters for Aim 1
          </span>
          <p className="text-[#38332E] line-clamp-2 leading-relaxed">
            {paper.whyThisMattersForAim1}
          </p>
        </div>

        {/* Main finding summary */}
        <div className="text-xs text-[#57534E] mb-3 line-clamp-2 leading-relaxed">
          <span className="font-medium text-[#292524]">Author finding: </span>
          {paper.mainFinding}
        </div>

        {/* Sub-meta: Methodology & Population */}
        <div className="flex flex-wrap items-center gap-y-1 gap-x-2 text-[11px] text-[#78716C] mb-3">
          <span className="inline-flex items-center space-x-1">
            <Compass className="w-3 h-3 text-[#A8A29E]" />
            <span>{paper.methodology}</span>
          </span>
          <span className="text-[#D6D1C7]">•</span>
          <span className="truncate max-w-[200px]" title={paper.dataset}>
            {paper.dataset}
          </span>
        </div>
      </div>

      {/* Card Footer: Themes, Status selector & Link */}
      <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between text-xs mt-2">
        {/* Status Dropdown */}
        <div className="flex items-center space-x-2">
          <select
            value={paper.readingStatus}
            onChange={(e) => updateReadingStatus(paper.id, e.target.value as ReadingStatus)}
            onClick={(e) => e.stopPropagation()}
            className={`text-[11px] font-medium px-2 py-0.5 rounded border border-transparent hover:border-[#D6D1C7] focus:outline-none cursor-pointer ${getReadingStatusBadge(paper.readingStatus)}`}
          >
            <option value="Discovered">Discovered</option>
            <option value="To read">To read</option>
            <option value="Reading">Reading</option>
            <option value="Skimmed">Skimmed</option>
            <option value="Read">Read</option>
            <option value="Notes complete">Notes complete</option>
            <option value="Cited">Cited</option>
          </select>
        </div>

        {/* View Details Button */}
        <button
          onClick={() => onSelect(paper)}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-[#665F55] hover:text-[#A85338] transition-colors"
        >
          <span>Examine</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
