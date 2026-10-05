'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLibrary } from '@/context/LibraryContext';
import { PaperDetailDrawer } from '@/components/PaperDetailDrawer';
import { PaperFormModal } from '@/components/PaperFormModal';
import { Paper } from '@/types/paper';
import { 
  GraduationCap, 
  Sparkles, 
  Edit3, 
  Save, 
  BookOpen, 
  AlertTriangle, 
  HelpCircle, 
  ArrowRight,
  CheckCircle2,
  FileText
} from 'lucide-react';

export default function CaseForAim1Page() {
  const { 
    papers, 
    caseSections, 
    updateCaseSectionNotes, 
    centralGapText, 
    updateCentralGapText,
    updatePaper,
    addPaper
  } = useLibrary();

  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Central Gap editing state
  const [editingCentralGap, setEditingCentralGap] = useState(false);
  const [gapInput, setGapInput] = useState(centralGapText);

  // Active section notes editing
  const [editingSectionNotesId, setEditingSectionNotesId] = useState<string | null>(null);
  const [sectionNotesInput, setSectionNotesInput] = useState('');

  const handleSaveCentralGap = () => {
    updateCentralGapText(gapInput);
    setEditingCentralGap(false);
  };

  const handleStartEditNotes = (secId: string, currentNotes: string) => {
    setEditingSectionNotesId(secId);
    setSectionNotesInput(currentNotes);
  };

  const handleSaveSectionNotes = (secId: string) => {
    updateCaseSectionNotes(secId, sectionNotesInput);
    setEditingSectionNotesId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div className="border-b border-[#EAE5DC] pb-6">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#A85338] mb-1">
          <GraduationCap className="w-4 h-4" />
          <span>Doctoral Thesis Core Rationale</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          The Case for Aim 1
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1 font-serif italic max-w-3xl">
          Constructing the intellectual case for why understanding foresight, expectations, uncertainty and constraints in unpaid care matters across theory, policy, economics and life-course inequality.
        </p>
      </div>

      {/* THE CENTRAL GAP (PROMINENT CALLOUT, EDITABLE) */}
      <section className="bg-[#FAF4ED] border-2 border-[#E8D4C8] rounded-2xl p-6 sm:p-10 shadow-sm relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center space-x-2 text-[#823824]">
            <Sparkles className="w-5 h-5 text-[#A85338]" />
            <h2 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider">
              The Central Gap
            </h2>
          </div>

          {!editingCentralGap ? (
            <button
              onClick={() => {
                setGapInput(centralGapText);
                setEditingCentralGap(true);
              }}
              className="inline-flex items-center space-x-1 text-xs text-[#823824] hover:text-[#1C1917] font-semibold"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Statement</span>
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSaveCentralGap}
                className="inline-flex items-center space-x-1 text-xs bg-[#1C1917] text-[#FAF8F5] px-3 py-1 rounded font-medium shadow-xs"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Statement</span>
              </button>
              <button
                onClick={() => setEditingCentralGap(false)}
                className="px-2.5 py-1 text-xs text-[#78716C] hover:text-[#1C1917]"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {editingCentralGap ? (
          <textarea
            value={gapInput}
            onChange={(e) => setGapInput(e.target.value)}
            rows={4}
            className="w-full text-base sm:text-xl p-3 rounded-lg border border-[#A85338] bg-white text-[#1C1917] font-serif leading-relaxed focus:outline-none"
          />
        ) : (
          <blockquote className="font-serif text-xl sm:text-2xl text-[#292524] font-medium leading-relaxed italic border-l-4 border-[#A85338] pl-5 my-2">
            "{centralGapText}"
          </blockquote>
        )}

        <div className="mt-4 pt-4 border-t border-[#E8D4C8]/60 text-xs text-[#78716C]">
          This proposition anchors the theoretical and empirical structure of Aim 1: existing literature models outcomes ex-post; your PhD models the ex-ante cognitive and structural decision threshold.
        </div>
      </section>

      {/* THE 6 CORE ACADEMIC CASE SECTIONS */}
      <section className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
            Core Academic Pillars of the Argument
          </h2>
          <span className="text-xs text-[#78716C]">
            6 Disciplinary Justifications
          </span>
        </div>

        <div className="space-y-8">
          {caseSections.map((sec) => {
            const isEditingNotes = editingSectionNotesId === sec.id;
            const supportingPapers = papers.filter(p => sec.supportingPaperIds.includes(p.id));

            return (
              <div
                key={sec.id}
                id={sec.id}
                className="bg-[#FCFBF9] border border-[#E5DFD5] rounded-xl p-6 sm:p-8 shadow-card space-y-6"
              >
                {/* Section Header */}
                <div className="border-b border-[#EAE5DC] pb-4 flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#A85338] bg-[#FAF4ED] px-2.5 py-0.5 rounded border border-[#F0DFD3]">
                      Pillar {sec.number}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#1C1917] mt-2">
                      {sec.title}
                    </h3>
                  </div>
                </div>

                {/* Primary Argument */}
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C]">
                    The Doctoral Argument
                  </h4>
                  <p className="text-sm text-[#292524] font-serif leading-relaxed bg-[#FAF8F5] p-4 rounded-lg border border-[#EFECE6]">
                    {sec.argument}
                  </p>
                </div>

                {/* Supporting Papers in Library */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#78716C] flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5 text-[#A85338]" />
                    <span>Supporting Evidence in Library ({supportingPapers.length})</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {supportingPapers.map((paper) => (
                      <div
                        key={paper.id}
                        onClick={() => setSelectedPaper(paper)}
                        className="p-3 bg-white hover:bg-[#F9EDE8] border border-[#EAE5DC] hover:border-[#A85338] rounded-lg cursor-pointer transition-all flex items-start justify-between group"
                      >
                        <div className="pr-2">
                          <div className="text-[11px] font-semibold text-[#A85338]">
                            {paper.authors[0]} ({paper.year})
                          </div>
                          <h5 className="font-serif text-xs font-bold text-[#1C1917] group-hover:text-[#A85338] line-clamp-1 leading-snug">
                            {paper.title}
                          </h5>
                          <span className="text-[10px] text-[#78716C]">
                            {paper.evidenceType}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8A8680] group-hover:text-[#A85338] shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contradictory Evidence & Gaps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Contradictory / Orthodoxy */}
                  <div className="bg-[#FAF8F5] border border-[#EAE5DC] p-4 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-[#8C5E1E] font-semibold uppercase tracking-wider text-[10px]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Orthodox Theory / Contradictory Evidence</span>
                    </div>
                    <p className="text-[#44403C] leading-relaxed">
                      {sec.contradictoryEvidence}
                    </p>
                  </div>

                  {/* Evidence Gaps */}
                  <div className="bg-[#FAF8F5] border border-[#EAE5DC] p-4 rounded-lg space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-[#1E3A5F] font-semibold uppercase tracking-wider text-[10px]">
                      <HelpCircle className="w-3.5 h-3.5" />
                      <span>Empirical Gaps to Exploit in Aim 1</span>
                    </div>
                    <p className="text-[#44403C] leading-relaxed">
                      {sec.evidenceGaps}
                    </p>
                  </div>
                </div>

                {/* My Doctoral Chapter Notes (Editable) */}
                <div className="bg-[#F4EFEB] border border-[#DDD5C7] rounded-lg p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 text-[#1C1917] font-semibold uppercase tracking-wider text-[11px]">
                      <FileText className="w-3.5 h-3.5 text-[#A85338]" />
                      <span>My Thesis Drafting Notes</span>
                    </div>

                    {!isEditingNotes ? (
                      <button
                        onClick={() => handleStartEditNotes(sec.id, sec.myNotes)}
                        className="inline-flex items-center space-x-1 text-xs text-[#A85338] hover:underline font-semibold"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Edit Notes</span>
                      </button>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSaveSectionNotes(sec.id)}
                          className="inline-flex items-center space-x-1 text-xs bg-[#1C1917] text-[#FAF8F5] px-2.5 py-0.5 rounded font-medium"
                        >
                          <Save className="w-3 h-3" />
                          <span>Save</span>
                        </button>
                        <button
                          onClick={() => setEditingSectionNotesId(null)}
                          className="text-xs text-[#78716C] hover:text-[#1C1917]"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>

                  {isEditingNotes ? (
                    <textarea
                      value={sectionNotesInput}
                      onChange={(e) => setSectionNotesInput(e.target.value)}
                      rows={3}
                      className="w-full text-xs p-2.5 rounded border border-[#A85338] bg-white text-[#1C1917] focus:outline-none font-sans"
                    />
                  ) : (
                    <p className="text-xs text-[#38332E] font-serif leading-relaxed italic">
                      "{sec.myNotes}"
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Drawer and Edit Modal */}
      <PaperDetailDrawer
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
        onSelectPaper={(p) => setSelectedPaper(p)}
        onOpenEditModal={(p) => {
          setEditingPaper(p);
          setIsEditModalOpen(true);
        }}
      />

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
