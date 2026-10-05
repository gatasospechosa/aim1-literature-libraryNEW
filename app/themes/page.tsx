'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLibrary } from '@/context/LibraryContext';
import { THEMES_DATA } from '@/data/themes';
import { PaperDetailDrawer } from '@/components/PaperDetailDrawer';
import { PaperFormModal } from '@/components/PaperFormModal';
import { Paper } from '@/types/paper';
import { 
  Layers, 
  HelpCircle, 
  BookOpen, 
  Star, 
  ArrowRight, 
  Sparkles, 
  CheckCircle,
  ExternalLink 
} from 'lucide-react';

export default function ThemesPage() {
  const { papers, updatePaper, addPaper } = useLibrary();
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCluster, setSelectedCluster] = useState<string>('all');

  // Distinct conceptual clusters
  const clusters = Array.from(new Set(THEMES_DATA.map(t => t.conceptualCluster)));

  const filteredThemes = selectedCluster === 'all' 
    ? THEMES_DATA 
    : THEMES_DATA.filter(t => t.conceptualCluster === selectedCluster);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#EAE5DC] pb-6">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#A85338] mb-1">
          <Layers className="w-4 h-4" />
          <span>Doctoral Thematic Architecture</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Research Themes & Conceptual Clusters
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1 font-serif italic max-w-3xl">
          Visual overview of the 14 conceptual domains structuring Aim 1, detailing paper density, core evidence, and the unresolved doctoral questions driving each strand.
        </p>

        {/* Cluster Filter Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 mt-5">
          <button
            onClick={() => setSelectedCluster('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              selectedCluster === 'all'
                ? 'bg-[#1C1917] text-[#FAF8F5]'
                : 'bg-[#EFECE6] text-[#57534E] hover:bg-[#E5DFD5]'
            }`}
          >
            All Clusters ({THEMES_DATA.length})
          </button>
          {clusters.map((cluster) => (
            <button
              key={cluster}
              onClick={() => setSelectedCluster(cluster)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                selectedCluster === cluster
                  ? 'bg-[#1C1917] text-[#FAF8F5]'
                  : 'bg-[#EFECE6] text-[#57534E] hover:bg-[#E5DFD5]'
              }`}
            >
              {cluster}
            </button>
          ))}
        </div>
      </div>

      {/* Thematic Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredThemes.map((theme) => {
          const themePapers = papers.filter(p => p.themes.includes(theme.title));
          const corePapers = themePapers.filter(p => p.isCoreAim1);
          const keyPapers = themePapers.slice(0, 3);

          return (
            <div
              key={theme.id}
              className="bg-[#FCFBF9] border border-[#E5DFD5] rounded-xl p-6 shadow-card hover:border-[#D0C7B9] flex flex-col justify-between transition-all"
            >
              <div>
                {/* Theme Cluster & Metrics */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#A85338] bg-[#FAF4ED] px-2.5 py-0.5 rounded border border-[#F0DFD3]">
                    {theme.conceptualCluster}
                  </span>

                  <div className="flex items-center space-x-3 text-xs text-[#78716C]">
                    <span className="font-semibold text-[#1C1917]">
                      {themePapers.length} {themePapers.length === 1 ? 'paper' : 'papers'}
                    </span>
                    <span>•</span>
                    <span className="text-[#A85338] font-semibold">
                      {corePapers.length} core
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="font-serif text-xl font-bold text-[#1C1917] mb-2 leading-tight">
                  {theme.title}
                </h2>

                {/* Description */}
                <p className="text-xs text-[#57534E] leading-relaxed mb-4">
                  {theme.description}
                </p>

                {/* Unresolved Questions for PhD */}
                <div className="bg-[#FAF7F2] border-l-2 border-[#A85338] p-3.5 rounded-r-lg mb-4 text-xs">
                  <div className="flex items-center space-x-1.5 text-[#823824] font-semibold uppercase tracking-wider text-[10px] mb-2">
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Unresolved Questions for Aim 1</span>
                  </div>
                  <ul className="space-y-1.5 text-[#38332E]">
                    {theme.unresolvedQuestions.map((q, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <span className="text-[#A85338] font-bold text-xs mt-0.5">•</span>
                        <span className="leading-snug">{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Key Papers in this Theme */}
                <div className="space-y-2 mb-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#78716C] block">
                    Key Literature in Library
                  </span>
                  {keyPapers.length > 0 ? (
                    <div className="space-y-1.5">
                      {keyPapers.map((kp) => (
                        <div
                          key={kp.id}
                          onClick={() => setSelectedPaper(kp)}
                          className="flex items-center justify-between p-2 rounded bg-white hover:bg-[#F7F4EE] border border-[#EFECE6] cursor-pointer text-xs group transition-colors"
                        >
                          <div className="truncate mr-2">
                            <span className="font-semibold text-[#1C1917] group-hover:text-[#A85338]">
                              {kp.authors[0]} ({kp.year})
                            </span>
                            <span className="text-[#78716C] mx-1.5">-</span>
                            <span className="text-[#57534E] italic truncate">
                              {kp.title}
                            </span>
                          </div>
                          {kp.isCoreAim1 && (
                            <Star className="w-3 h-3 text-[#A85338] fill-[#A85338] shrink-0" />
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-[#8A8680] italic">
                      No papers explicitly tagged with this theme yet.
                    </p>
                  )}
                </div>
              </div>

              {/* Footer link to filtered library */}
              <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
                <Link
                  href={`/library?theme=${encodeURIComponent(theme.title)}`}
                  className="inline-flex items-center space-x-1 text-xs font-semibold text-[#1C1917] hover:text-[#A85338] transition-colors"
                >
                  <span>Explore all {themePapers.length} papers in this theme</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modals and Drawers */}
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
