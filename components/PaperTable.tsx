'use client';

import React, { useState } from 'react';
import { Paper, ReadingStatus } from '@/types/paper';
import { useLibrary } from '@/context/LibraryContext';
import { Star, ChevronDown, ChevronRight, ExternalLink, ArrowRight, BookOpen } from 'lucide-react';

interface PaperTableProps {
  papers: Paper[];
  onSelect: (paper: Paper) => void;
}

export function PaperTable({ papers, onSelect }: PaperTableProps) {
  const { toggleCoreAim1, updateReadingStatus } = useLibrary();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setExpandedId(expandedId === id ? null : id);
  };

  const getAimRelevanceColor = (relevance: Paper['aimRelevance']) => {
    switch (relevance) {
      case 'Direct': return 'text-[#A85338] bg-[#FDF1ED]';
      case 'Strongly relevant': return 'text-[#1E3A5F] bg-[#EDF3F8]';
      case 'Theory': return 'text-[#703258] bg-[#F7EFF5]';
      case 'Methods': return 'text-[#2F6141] bg-[#EEF6F1]';
      default: return 'text-[#57534E] bg-[#F5F5F4]';
    }
  };

  const getEvidenceTypeColor = (type: Paper['evidenceType']) => {
    switch (type) {
      case 'Foresight & Anticipation': return 'text-[#245934] bg-[#EBF5ED]';
      case 'Consequences Only': return 'text-[#3D4D5C] bg-[#F1F3F5]';
      case 'Bridge / Both': return 'text-[#855B18] bg-[#FCF6E8]';
      case 'Theoretical / Conceptual': return 'text-[#6E2B4B] bg-[#F8EEF2]';
    }
  };

  return (
    <div className="overflow-x-auto border border-[#E5DFD5] rounded-lg bg-[#FCFBF9] shadow-sm">
      <table className="min-w-full divide-y divide-[#EAE5DC] text-left text-xs font-sans">
        <thead className="bg-[#F5F1EB] text-[#57534E] font-medium uppercase tracking-wider text-[11px]">
          <tr>
            <th scope="col" className="w-8 px-3 py-3 text-center">Core</th>
            <th scope="col" className="px-4 py-3">Citation & Title</th>
            <th scope="col" className="px-3 py-3 w-16 text-center">Year</th>
            <th scope="col" className="px-3 py-3">Aim Relevance</th>
            <th scope="col" className="px-3 py-3">Evidence Type</th>
            <th scope="col" className="px-3 py-3">Reading Status</th>
            <th scope="col" className="px-3 py-3">Methodology / Dataset</th>
            <th scope="col" className="w-12 px-3 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#EFECE6] bg-[#FCFBF9]">
          {papers.map((paper) => {
            const isExpanded = expandedId === paper.id;
            const primaryAuthor = paper.authors.length > 2 
              ? `${paper.authors[0]} et al.` 
              : paper.authors.join(' & ');

            return (
              <React.Fragment key={paper.id}>
                <tr 
                  onClick={() => onSelect(paper)}
                  className={`hover:bg-[#F7F4EE] cursor-pointer transition-colors ${paper.isCoreAim1 ? 'bg-[#FCF9F2]/60' : ''}`}
                >
                  {/* Core Star */}
                  <td className="px-3 py-3 text-center" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => toggleCoreAim1(paper.id)}
                      title={paper.isCoreAim1 ? "Remove from Core Aim 1" : "Mark as Core Aim 1"}
                      className="text-[#B5B0A4] hover:text-[#A85338] transition-colors"
                    >
                      <Star className={`w-3.5 h-3.5 ${paper.isCoreAim1 ? 'fill-[#A85338] text-[#A85338]' : ''}`} />
                    </button>
                  </td>

                  {/* Citation & Title */}
                  <td className="px-4 py-3 max-w-md">
                    <div className="flex items-start space-x-2">
                      <button 
                        onClick={(e) => toggleExpand(paper.id, e)}
                        className="mt-0.5 text-[#8A8680] hover:text-[#1C1917]"
                      >
                        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                      </button>
                      <div>
                        <div className="font-serif font-bold text-[#1C1917] hover:text-[#A85338] text-sm leading-snug">
                          {paper.title}
                        </div>
                        <div className="text-[#686258] text-[11px] mt-0.5">
                          <span className="font-medium text-[#292524]">{primaryAuthor}</span>
                          <span className="mx-1">•</span>
                          <span className="italic">{paper.journal}</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Year */}
                  <td className="px-3 py-3 font-serif text-[#44403C] text-center font-medium">
                    {paper.year}
                  </td>

                  {/* Aim Relevance */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border border-transparent ${getAimRelevanceColor(paper.aimRelevance)}`}>
                      {paper.aimRelevance}
                    </span>
                  </td>

                  {/* Evidence Type */}
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border border-transparent ${getEvidenceTypeColor(paper.evidenceType)}`}>
                      {paper.evidenceType}
                    </span>
                  </td>

                  {/* Reading Status */}
                  <td className="px-3 py-3 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                    <select
                      value={paper.readingStatus}
                      onChange={(e) => updateReadingStatus(paper.id, e.target.value as ReadingStatus)}
                      className="text-[11px] font-medium px-2 py-0.5 rounded border border-[#E0D9CE] bg-[#FAF8F5] text-[#292524] cursor-pointer hover:border-[#B8B0A2] focus:outline-none"
                    >
                      <option value="Discovered">Discovered</option>
                      <option value="To read">To read</option>
                      <option value="Reading">Reading</option>
                      <option value="Skimmed">Skimmed</option>
                      <option value="Read">Read</option>
                      <option value="Notes complete">Notes complete</option>
                      <option value="Cited">Cited</option>
                    </select>
                  </td>

                  {/* Methodology / Dataset */}
                  <td className="px-3 py-3 text-[11px] text-[#57534E]">
                    <div className="font-medium text-[#292524] truncate max-w-[180px]">{paper.methodology}</div>
                    <div className="text-[#8A8680] truncate max-w-[180px]">{paper.dataset}</div>
                  </td>

                  {/* Action */}
                  <td className="px-3 py-3 text-right">
                    <button
                      onClick={() => onSelect(paper)}
                      className="text-[#78716C] hover:text-[#A85338] p-1 rounded"
                      title="Examine paper details"
                    >
                      <ArrowRight className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>

                {/* Expandable Row Preview for Writing/Synthesis */}
                {isExpanded && (
                  <tr className="bg-[#FAF7F2] text-xs">
                    <td colSpan={8} className="px-6 py-4 border-t border-b border-[#EAE3D6]">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border-l-2 border-[#A85338] pl-3">
                          <span className="font-semibold text-[#823824] uppercase tracking-wider text-[10px] block mb-1">
                            Why this matters for Aim 1
                          </span>
                          <p className="text-[#38332E] leading-relaxed">
                            {paper.whyThisMattersForAim1}
                          </p>
                        </div>
                        <div className="border-l-2 border-[#595652] pl-3">
                          <span className="font-semibold text-[#44403C] uppercase tracking-wider text-[10px] block mb-1">
                            PhD Interpretation (Candidate Critique)
                          </span>
                          <p className="text-[#44403C] leading-relaxed italic">
                            {paper.myInterpretation}
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3 flex flex-wrap items-center gap-2 pt-2 border-t border-[#EAE3D6]/60 text-[11px]">
                        <span className="font-semibold text-[#78716C]">Themes:</span>
                        {paper.themes.map((t, idx) => (
                          <span key={idx} className="bg-[#EFECE6] text-[#44403C] px-2 py-0.5 rounded">
                            {t}
                          </span>
                        ))}
                        {paper.usefulPages && (
                          <span className="ml-auto text-[#78716C]">
                            <strong>Pages:</strong> {paper.usefulPages}
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
