'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLibrary } from '@/context/LibraryContext';
import { METHODS_DATA } from '@/data/methodsData';
import { PaperDetailDrawer } from '@/components/PaperDetailDrawer';
import { PaperFormModal } from '@/components/PaperFormModal';
import { Paper } from '@/types/paper';
import { 
  Compass, 
  CheckCircle2, 
  XCircle, 
  AlertOctagon, 
  BookOpen, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';

export default function MethodsPage() {
  const { papers, updatePaper, addPaper } = useLibrary();
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchMethod, setSearchMethod] = useState('');

  const filteredMethods = METHODS_DATA.filter(m => 
    m.name.toLowerCase().includes(searchMethod.toLowerCase()) ||
    m.description.toLowerCase().includes(searchMethod.toLowerCase()) ||
    m.blindSpotForAim1.toLowerCase().includes(searchMethod.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#EAE5DC] pb-6">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#A85338] mb-1">
          <Compass className="w-4 h-4" />
          <span>Epistemic Foundations</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Methodological Approaches & Epistemic Boundaries
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1 font-serif italic max-w-3xl">
          How different research methods shape what studies can and cannot reveal regarding carers' foresight, subjective expectations, and labour-market decisions.
        </p>

        {/* Method Search */}
        <div className="mt-5 max-w-md">
          <input
            type="text"
            value={searchMethod}
            onChange={(e) => setSearchMethod(e.target.value)}
            placeholder="Filter methodologies (e.g. fixed effects, qualitative, hazard)..."
            className="w-full px-3.5 py-2 rounded-lg border border-[#DDD8D0] bg-white text-xs text-[#1C1917] placeholder-[#8A8680] focus:outline-none focus:border-[#A85338]"
          />
        </div>
      </div>

      {/* Methods Overview Grid */}
      <div className="space-y-8">
        {filteredMethods.map((method) => {
          // Find matching papers in library by paperIds or matching methodology string
          const matchingPapers = papers.filter(p => 
            method.paperIds.includes(p.id) || 
            p.methodology.toLowerCase().includes(method.name.toLowerCase()) ||
            method.name.toLowerCase().includes(p.methodology.toLowerCase())
          );

          return (
            <div
              key={method.id}
              className="bg-[#FCFBF9] border border-[#E5DFD5] rounded-xl p-6 sm:p-8 shadow-card space-y-5"
            >
              {/* Method Title & Description */}
              <div className="border-b border-[#EAE5DC] pb-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-[#1C1917]">
                    {method.name}
                  </h2>
                  <p className="text-xs text-[#57534E] mt-1 leading-relaxed max-w-3xl">
                    {method.description}
                  </p>
                </div>
                <span className="text-xs font-semibold text-[#78716C] bg-[#F5F1EB] px-2.5 py-1 rounded border border-[#E0D9CE] shrink-0 self-start">
                  {matchingPapers.length} {matchingPapers.length === 1 ? 'Study in Library' : 'Studies in Library'}
                </span>
              </div>

              {/* What It Can & Cannot Tell Us (Comparison Columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* What it tells us */}
                <div className="bg-[#EAF3EC]/50 border border-[#CDE3D5] rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-[#245934] font-bold uppercase tracking-wider text-[11px]">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>What This Method Can Tell Us</span>
                  </div>
                  <p className="text-[#1F4529] leading-relaxed">
                    {method.whatItTellsUs}
                  </p>
                </div>

                {/* What it cannot tell us */}
                <div className="bg-[#FBF1F1]/50 border border-[#EACDCD] rounded-lg p-4 space-y-2">
                  <div className="flex items-center space-x-2 text-[#8F3333] font-bold uppercase tracking-wider text-[11px]">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>What This Method Cannot Tell Us</span>
                  </div>
                  <p className="text-[#592222] leading-relaxed">
                    {method.whatItCannotTellUs}
                  </p>
                </div>
              </div>

              {/* Blind Spot for Aim 1 Callout */}
              <div className="bg-[#FAF4ED] border-l-3 border-[#A85338] p-3.5 rounded-r text-xs">
                <span className="text-[#823824] font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                  Critical Epistemic Blind Spot for Aim 1
                </span>
                <p className="text-[#38332E] font-medium leading-relaxed">
                  {method.blindSpotForAim1}
                </p>
              </div>

              {/* Linked Papers in Library */}
              {matchingPapers.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block">
                    Exemplar Papers in Library
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {matchingPapers.map((paper) => (
                      <div
                        key={paper.id}
                        onClick={() => setSelectedPaper(paper)}
                        className="p-3 bg-white hover:bg-[#F9EDE8] border border-[#EAE5DC] hover:border-[#A85338] rounded-lg cursor-pointer transition-all flex items-start justify-between group shadow-2xs"
                      >
                        <div className="pr-2">
                          <div className="text-[11px] font-semibold text-[#A85338]">
                            {paper.authors[0]} ({paper.year})
                          </div>
                          <h4 className="font-serif text-xs font-bold text-[#1C1917] group-hover:text-[#A85338] line-clamp-1 leading-snug">
                            {paper.title}
                          </h4>
                          <span className="text-[10px] text-[#78716C]">
                            {paper.evidenceType}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-[#8A8680] group-hover:text-[#A85338] shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

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
