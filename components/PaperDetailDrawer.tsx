'use client';

import React, { useState } from 'react';
import { Paper, ReadingStatus, ReadingQueueCategory } from '@/types/paper';
import { useLibrary } from '@/context/LibraryContext';
import { 
  X, 
  ExternalLink, 
  Star, 
  BookMarked, 
  Copy, 
  Check, 
  Edit3, 
  Save, 
  Compass, 
  Globe, 
  FileText, 
  Quote, 
  Sparkles, 
  AlertCircle,
  Link as LinkIcon,
  Trash2
} from 'lucide-react';

interface PaperDetailDrawerProps {
  paper: Paper | null;
  onClose: () => void;
  onSelectPaper: (paper: Paper) => void;
  onOpenEditModal: (paper: Paper) => void;
}

export function PaperDetailDrawer({ paper, onClose, onSelectPaper, onOpenEditModal }: PaperDetailDrawerProps) {
  const { papers, updatePaper, deletePaper, toggleCoreAim1, updateReadingStatus, updateQueueCategory } = useLibrary();
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState(paper?.notes || '');

  if (!paper) return null;

  // Format APA / Harvard academic citation
  const formattedCitation = `${paper.authors.join(', ')} (${paper.year}). ${paper.title}. ${paper.journal}. https://doi.org/${paper.doi}`;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(formattedCitation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  const handleSaveNotes = () => {
    updatePaper(paper.id, { notes: notesValue });
    setEditingNotes(false);
  };

  // Dynamically compute related papers based on shared themes or methodology
  const relatedPapers = papers
    .filter(p => p.id !== paper.id)
    .map(p => {
      let score = 0;
      // Shared themes
      const sharedThemes = p.themes.filter(t => paper.themes.includes(t));
      score += sharedThemes.length * 3;
      // Shared methodology
      if (p.methodology === paper.methodology) score += 2;
      // Both core
      if (p.isCoreAim1 && paper.isCoreAim1) score += 2;
      // Evidence type match
      if (p.evidenceType === paper.evidenceType) score += 1;
      return { paper: p, score, sharedThemes };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div 
        className="w-full max-w-3xl bg-[#FAF8F5] border-l border-[#E2DDD5] shadow-2xl h-full flex flex-col text-[#1C1917] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Sticky Header */}
        <div className="sticky top-0 z-20 bg-[#FAF8F5]/95 backdrop-blur border-b border-[#EAE5DC] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#8A8680]">
              PhD Literature Record
            </span>
            <span className="text-[#D6D1C7]">•</span>
            <span className="font-mono text-xs text-[#78716C] bg-[#EFECE6] px-2 py-0.5 rounded">
              {paper.id}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleCoreAim1(paper.id)}
              className={`p-1.5 rounded hover:bg-[#EFECE6] transition-colors ${paper.isCoreAim1 ? 'text-[#A85338]' : 'text-[#8A8680]'}`}
              title={paper.isCoreAim1 ? "Remove from Core" : "Mark as Core Aim 1"}
            >
              <Star className={`w-4 h-4 ${paper.isCoreAim1 ? 'fill-[#A85338]' : ''}`} />
            </button>

            <button
              onClick={() => onOpenEditModal(paper)}
              className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFECE6] rounded transition-colors"
              title="Edit paper details"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this paper from your library?')) {
                  deletePaper(paper.id);
                  onClose();
                }
              }}
              className="p-1.5 text-[#8A8680] hover:text-red-700 hover:bg-[#EFECE6] rounded transition-colors"
              title="Delete paper"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            <div className="h-4 w-px bg-[#DDD8D0] mx-1"></div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#57534E] hover:text-[#1C1917] hover:bg-[#EFECE6] rounded-md transition-colors"
              title="Close panel (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-8 flex-1">
          
          {/* Main Title & Authors */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                paper.aimRelevance === 'Direct' ? 'bg-[#F9EDE8] text-[#A85338] border border-[#E8D0C5]' : 'bg-[#EBF1F5] text-[#1E3A5F] border border-[#CBD8E2]'
              }`}>
                Aim Relevance: {paper.aimRelevance}
              </span>
              <span className="bg-[#EAF3EC] text-[#245934] border border-[#BDDCBF] px-2.5 py-0.5 rounded-full text-xs font-medium">
                {paper.evidenceType}
              </span>
              {paper.isCoreAim1 && (
                <span className="bg-[#FAF0DE] text-[#935D14] border border-[#ECD1A4] px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider">
                  Core Aim 1 Paper
                </span>
              )}
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917] leading-tight mb-3">
              {paper.title}
            </h1>

            <p className="text-sm font-medium text-[#44403C] mb-4">
              {paper.authors.join(', ')}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-[#78716C] border-y border-[#EAE5DC] py-2.5">
              <span><strong>Journal:</strong> {paper.journal}</span>
              <span><strong>Year:</strong> {paper.year}</span>
              {paper.doi && (
                <a 
                  href={`https://doi.org/${paper.doi}`}
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-[#A85338] hover:underline"
                >
                  <LinkIcon className="w-3 h-3" />
                  <span>DOI: {paper.doi}</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
              {paper.consensusUrl && (
                <a 
                  href={paper.consensusUrl}
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center space-x-1 text-[#1E3A5F] hover:underline"
                >
                  <Sparkles className="w-3 h-3 text-[#A85338]" />
                  <span>Consensus Search</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              )}
            </div>

            {/* Copy Citation Button */}
            <div className="mt-3 flex items-center justify-between">
              <span className="text-xs text-[#78716C] font-mono italic truncate max-w-[80%]">
                {formattedCitation}
              </span>
              <button
                onClick={handleCopyCitation}
                className="inline-flex items-center space-x-1 text-xs px-2.5 py-1 rounded bg-[#EFECE6] text-[#44403C] hover:bg-[#E2DDD5] transition-colors shrink-0"
              >
                {copiedCitation ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#245934]" />
                    <span className="text-[#245934] font-medium">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#78716C]" />
                    <span>Copy Citation</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Reading Status & Workflow Controls */}
          <div className="bg-[#F6F2EB] p-4 rounded-lg border border-[#E5DFD5] flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex items-center space-x-3">
              <span className="font-semibold text-[#57534E]">Reading Status:</span>
              <select
                value={paper.readingStatus}
                onChange={(e) => updateReadingStatus(paper.id, e.target.value as ReadingStatus)}
                className="font-medium px-2.5 py-1 rounded border border-[#DDD8D0] bg-[#FAF8F5] text-[#1C1917] focus:outline-none cursor-pointer"
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

            <div className="flex items-center space-x-3">
              <span className="font-semibold text-[#57534E]">Reading Queue:</span>
              <select
                value={paper.readingQueueCategory || 'None'}
                onChange={(e) => updateQueueCategory(paper.id, e.target.value === 'None' ? undefined : e.target.value as ReadingQueueCategory)}
                className="font-medium px-2.5 py-1 rounded border border-[#DDD8D0] bg-[#FAF8F5] text-[#1C1917] focus:outline-none cursor-pointer"
              >
                <option value="None">None</option>
                <option value="Read next">Read next</option>
                <option value="Important">Important</option>
                <option value="Needs full text">Needs full text</option>
                <option value="Needs notes">Needs notes</option>
                <option value="Needs coding">Needs coding</option>
                <option value="Possible core paper">Possible core paper</option>
              </select>
            </div>
          </div>

          {/* PROMINENT SECTION: WHY THIS MATTERS FOR AIM 1 */}
          <div className="bg-[#FAF4ED] border-l-4 border-[#A85338] p-5 rounded-r-lg shadow-sm">
            <div className="flex items-center space-x-2 text-[#823824] mb-2">
              <Sparkles className="w-4 h-4 text-[#A85338]" />
              <h2 className="font-serif text-base font-bold uppercase tracking-wider">
                Why this matters for Aim 1
              </h2>
            </div>
            <p className="text-[#2D2A26] font-sans text-sm leading-relaxed font-medium">
              {paper.whyThisMattersForAim1}
            </p>
          </div>

          {/* MAIN FINDING (AUTHORS' CLAIMS) */}
          <div className="space-y-2">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#57534E]">
              Main Empirical / Theoretical Finding (Authors' Findings)
            </h3>
            <p className="text-sm text-[#292524] bg-[#FCFBF9] p-4 rounded-lg border border-[#EAE5DC] leading-relaxed">
              {paper.mainFinding}
            </p>
          </div>

          {/* MY INTERPRETATION (CRITICAL DOCTORAL CANDIDATE CRITIQUE) */}
          {/* MUST REMAIN VISUALLY DISTINCT FROM AUTHORS' FINDINGS */}
          <div className="bg-[#F2ECE1] border border-[#DDD5C7] rounded-lg p-5 shadow-xs relative">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1C1917]"></span>
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1C1917]">
                  My Interpretation (PhD Candidate Critical Analysis)
                </h3>
              </div>
              <span className="text-[11px] bg-[#E5DFD5] text-[#57534E] px-2 py-0.5 rounded font-mono">
                Distinct from authors' empirical claims
              </span>
            </div>
            <p className="text-sm text-[#38332E] font-serif leading-relaxed italic">
              "{paper.myInterpretation}"
            </p>
          </div>

          {/* SUPPORTS OR CHALLENGES */}
          <div className="bg-[#FAF8F5] border border-[#EAE5DC] rounded-lg p-4">
            <h4 className="font-sans text-xs font-bold uppercase tracking-wider text-[#78716C] mb-1.5">
              Supports / Challenges in Literature
            </h4>
            <p className="text-xs text-[#44403C] leading-relaxed">
              {paper.supportsOrChallenges}
            </p>
          </div>

          {/* RESEARCH DESIGN GRID */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#57534E]">
              Research Design & Empirical Architecture
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#FCFBF9] border border-[#EAE5DC] p-3 rounded">
                <span className="text-[#8A8680] block font-medium">Population & Sample</span>
                <span className="text-[#1C1917] font-semibold">{paper.population}</span>
              </div>
              <div className="bg-[#FCFBF9] border border-[#EAE5DC] p-3 rounded">
                <span className="text-[#8A8680] block font-medium">Geography / Country</span>
                <span className="text-[#1C1917] font-semibold">{paper.country}</span>
              </div>
              <div className="bg-[#FCFBF9] border border-[#EAE5DC] p-3 rounded">
                <span className="text-[#8A8680] block font-medium">Dataset / Source</span>
                <span className="text-[#1C1917] font-semibold">{paper.dataset}</span>
              </div>
              <div className="bg-[#FCFBF9] border border-[#EAE5DC] p-3 rounded">
                <span className="text-[#8A8680] block font-medium">Methodology & Design</span>
                <span className="text-[#1C1917] font-semibold">{paper.methodology}</span>
                <p className="text-[11px] text-[#78716C] mt-0.5">{paper.studyDesign}</p>
              </div>
            </div>

            {paper.outcomes && paper.outcomes.length > 0 && (
              <div className="bg-[#FCFBF9] border border-[#EAE5DC] p-3 rounded text-xs">
                <span className="text-[#8A8680] block font-medium mb-1">Key Outcomes Measured</span>
                <div className="flex flex-wrap gap-1.5">
                  {paper.outcomes.map((out, idx) => (
                    <span key={idx} className="bg-[#EFECE6] text-[#44403C] px-2 py-0.5 rounded text-[11px]">
                      {out}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* INTELLECTUAL ROLE & THEMES */}
          <div className="space-y-3">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#57534E]">
              Intellectual Role in Aim 1
            </h3>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {paper.roleInAim1.map((role, idx) => (
                <span key={idx} className="bg-[#1C1917] text-[#FAF8F5] px-2.5 py-1 rounded text-xs font-medium">
                  {role}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              <span className="text-xs text-[#78716C] self-center mr-1">Themes:</span>
              {paper.themes.map((theme, idx) => (
                <span key={idx} className="bg-[#EAE5DC] text-[#44403C] px-2.5 py-0.5 rounded-full text-xs">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* ABSTRACT */}
          <div className="space-y-2">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#57534E]">
              Full Abstract
            </h3>
            <p className="text-xs text-[#44403C] leading-relaxed bg-[#FCFBF9] p-4 rounded-lg border border-[#EAE5DC] font-serif">
              {paper.abstract}
            </p>
          </div>

          {/* KEY QUOTATIONS & USEFUL PAGES */}
          {(paper.keyQuotations?.length > 0 || paper.usefulPages) && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#57534E]">
                  Key Quotations & Useful Pages
                </h3>
                {paper.usefulPages && (
                  <span className="text-xs text-[#78716C] font-mono">
                    <strong>Pages:</strong> {paper.usefulPages}
                  </span>
                )}
              </div>

              {paper.keyQuotations?.map((q, idx) => (
                <div key={idx} className="bg-[#FCFBF9] border-l-2 border-[#595652] p-3 text-xs text-[#38332E] italic font-serif leading-relaxed">
                  <Quote className="w-3.5 h-3.5 text-[#A8A29E] inline mr-1.5 -mt-1" />
                  {q}
                </div>
              ))}
            </div>
          )}

          {/* WORKING NOTES (EDITABLE DIRECTLY) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#57534E]">
                Doctoral Working Notes
              </h3>
              {!editingNotes ? (
                <button
                  onClick={() => { setNotesValue(paper.notes || ''); setEditingNotes(true); }}
                  className="text-xs text-[#A85338] hover:underline flex items-center space-x-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Edit Notes</span>
                </button>
              ) : (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs bg-[#1C1917] text-[#FAF8F5] px-2.5 py-0.5 rounded font-medium flex items-center space-x-1"
                  >
                    <Save className="w-3 h-3" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={() => setEditingNotes(false)}
                    className="text-xs text-[#78716C] hover:text-[#1C1917] px-2 py-0.5"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {editingNotes ? (
              <textarea
                value={notesValue}
                onChange={(e) => setNotesValue(e.target.value)}
                rows={4}
                className="w-full text-xs p-3 rounded-lg border border-[#A85338] bg-white focus:outline-none text-[#1C1917] font-sans"
                placeholder="Add doctoral thoughts, chapter connections, or writing prompts..."
              />
            ) : (
              <p className="text-xs text-[#44403C] bg-[#FCFBF9] p-4 rounded-lg border border-[#EAE5DC] leading-relaxed whitespace-pre-line">
                {paper.notes || "No specific working notes added yet. Click 'Edit Notes' to record thesis reflections."}
              </p>
            )}
          </div>

          {/* DYNAMICALLY SUGGESTED RELATED PAPERS */}
          {relatedPapers.length > 0 && (
            <div className="pt-6 border-t border-[#EAE5DC]">
              <h3 className="font-serif text-base font-bold text-[#1C1917] mb-3">
                Related Papers in Library
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {relatedPapers.map(({ paper: relPaper, sharedThemes }) => (
                  <div
                    key={relPaper.id}
                    onClick={() => onSelectPaper(relPaper)}
                    className="p-3 bg-[#FCFBF9] hover:bg-white border border-[#EAE5DC] hover:border-[#A85338] rounded-lg cursor-pointer transition-all shadow-card hover:shadow-card-hover group"
                  >
                    <div className="text-[11px] text-[#A85338] font-semibold mb-1">
                      {relPaper.aimRelevance} • {relPaper.year}
                    </div>
                    <h4 className="font-serif text-xs font-bold text-[#1C1917] group-hover:text-[#A85338] line-clamp-2 leading-snug mb-1">
                      {relPaper.title}
                    </h4>
                    <p className="text-[11px] text-[#78716C] line-clamp-1">
                      {relPaper.authors[0]} et al.
                    </p>
                    <div className="mt-2 text-[10px] text-[#8A8680] truncate">
                      Shared: {sharedThemes.slice(0, 2).join(', ')}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
