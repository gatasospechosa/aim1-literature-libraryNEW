'use client';

import React, { useState } from 'react';
import { useLibrary } from '@/context/LibraryContext';
import { RESEARCH_MAP_STAGES, RESEARCH_MAP_OVERLAYS, ResearchMapStage, ResearchMapOverlay } from '@/data/researchMapData';
import { PaperDetailDrawer } from '@/components/PaperDetailDrawer';
import { PaperFormModal } from '@/components/PaperFormModal';
import { Paper } from '@/types/paper';
import { 
  Workflow, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  BookOpen, 
  Layers, 
  AlertCircle,
  ShieldAlert,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export default function ResearchMapPage() {
  const { papers, updatePaper, addPaper } = useLibrary();
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-1-expectations');
  const [selectedOverlayId, setSelectedOverlayId] = useState<string | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const activeStage = RESEARCH_MAP_STAGES.find(s => s.id === selectedStageId) || RESEARCH_MAP_STAGES[0];
  const activeOverlay = RESEARCH_MAP_OVERLAYS.find(o => o.id === selectedOverlayId);

  // Papers linked to this stage
  const stagePapers = papers.filter(p => activeStage.corePaperIds.includes(p.id));

  // Category color tags for overlays
  const getOverlayBadgeColor = (category: ResearchMapOverlay['category']) => {
    switch (category) {
      case 'Cognitive & Agency': return 'bg-[#FAF4ED] text-[#823824] border-[#E8D0C5]';
      case 'Care Trajectory': return 'bg-[#EBF1F5] text-[#1E3A5F] border-[#CBD8E2]';
      case 'Household Dynamics': return 'bg-[#F2ECE1] text-[#635543] border-[#DDD5C7]';
      case 'Institutional & Structural': return 'bg-[#EAF3EC] text-[#245934] border-[#BDDCBF]';
    }
  };

  const getStatusBadge = (status: ResearchMapStage['statusInLiterature']) => {
    switch (status) {
      case 'Critical Empirical Gap (Aim 1 Core)':
        return 'bg-[#FAF4ED] text-[#A85338] border border-[#E8D0C5] font-bold';
      case 'Partially Understood':
        return 'bg-[#FCF6E8] text-[#8C6214] border border-[#EEDDB8] font-semibold';
      case 'Heavily Researched':
        return 'bg-[#EBF1F5] text-[#1E3A5F] border border-[#CBD8E2] font-medium';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Header */}
      <div className="border-b border-[#EAE5DC] pb-6">
        <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#A85338] mb-1">
          <Workflow className="w-4 h-4" />
          <span>Intellectual Synthesis Map</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
          Research Map: The Decision & Consequence Pathway
        </h1>
        <p className="text-xs sm:text-sm text-[#78716C] mt-1 font-serif italic max-w-3xl">
          Visual conceptualisation of the 6-stage causal chain connecting ex-ante expectations to later-life financial insecurity, overlaid with intersecting structural, cognitive, and institutional forces.
        </p>
      </div>

      {/* THE 6-STAGE CAUSAL CHAIN DIAGRAM */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-xs text-[#78716C]">
          <span className="font-bold uppercase tracking-wider text-[#1C1917]">
            Causal Pathway Progression
          </span>
          <span>Click any stage to examine mechanisms & Aim 1 gaps</span>
        </div>

        {/* Pathway Chain Horizontal Flow */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {RESEARCH_MAP_STAGES.map((stage) => {
            const isSelected = selectedStageId === stage.id;
            const isAffectedByOverlay = activeOverlay?.affectsStages.includes(stage.id);

            return (
              <div
                key={stage.id}
                onClick={() => setSelectedStageId(stage.id)}
                className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-lg ring-2 ring-[#A85338]/40 scale-[1.02]'
                    : isAffectedByOverlay
                      ? 'bg-[#FAF4ED] text-[#1C1917] border-[#A85338] shadow-sm'
                      : 'bg-[#FCFBF9] text-[#1C1917] border-[#E5DFD5] hover:border-[#D0C7B9] shadow-card'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-[#FAF8F5]' : 'bg-[#EFECE6] text-[#78716C]'
                    }`}>
                      Stage {stage.step}
                    </span>
                    {stage.statusInLiterature.includes('Critical') && (
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-[#A85338]' : 'bg-[#A85338]'}`} title="Critical Aim 1 Core Gap" />
                    )}
                  </div>

                  <h3 className={`font-serif text-sm font-bold leading-snug mb-2 ${
                    isSelected ? 'text-[#FAF8F5]' : 'text-[#1C1917]'
                  }`}>
                    {stage.label}
                  </h3>

                  <p className={`text-[11px] line-clamp-3 leading-relaxed ${
                    isSelected ? 'text-[#D6D1C7]' : 'text-[#57534E]'
                  }`}>
                    {stage.shortDescription}
                  </p>
                </div>

                <div className={`mt-3 pt-2 border-t text-[10px] font-semibold flex items-center justify-between ${
                  isSelected ? 'border-white/10 text-[#A85338]' : 'border-[#EFECE6] text-[#78716C]'
                }`}>
                  <span className="truncate">{stage.statusInLiterature.includes('Critical') ? 'Aim 1 Core Gap' : stage.statusInLiterature}</span>
                  <ArrowRight className="w-3 h-3 shrink-0" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* INTERSECTING STRUCTURAL OVERLAYS */}
      <section className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl p-5 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1C1917] flex items-center space-x-1.5">
              <Layers className="w-4 h-4 text-[#A85338]" />
              <span>Intersecting Overlays & Modifying Forces</span>
            </h3>
            <p className="text-xs text-[#78716C]">
              Select an overlay to see how it reshapes decision stages across the causal chain:
            </p>
          </div>

          {selectedOverlayId && (
            <button
              onClick={() => setSelectedOverlayId(null)}
              className="text-xs text-[#A85338] hover:underline self-start sm:self-center font-semibold"
            >
              Clear Overlay Selection
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {RESEARCH_MAP_OVERLAYS.map((overlay) => {
            const isSelected = selectedOverlayId === overlay.id;

            return (
              <button
                key={overlay.id}
                onClick={() => setSelectedOverlayId(isSelected ? null : overlay.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all text-left flex items-center space-x-2 ${
                  isSelected
                    ? 'bg-[#1C1917] text-[#FAF8F5] border-[#1C1917] shadow-sm'
                    : 'bg-white text-[#44403C] border-[#DDD8D0] hover:bg-[#F5F1EB]'
                }`}
              >
                <span>{overlay.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                  isSelected ? 'bg-white/20 text-[#FAF8F5]' : 'bg-[#EFECE6] text-[#78716C]'
                }`}>
                  {overlay.category}
                </span>
              </button>
            );
          })}
        </div>

        {activeOverlay && (
          <div className="mt-3 p-3.5 bg-white border border-[#E5DFD5] rounded-lg text-xs space-y-1">
            <div className="flex items-center space-x-2 text-[#A85338] font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeOverlay.name} ({activeOverlay.category})</span>
            </div>
            <p className="text-[#38332E] leading-relaxed">
              {activeOverlay.impactDescription}
            </p>
            <div className="text-[11px] text-[#78716C] pt-1">
              <strong>Modifies Stages:</strong> {activeOverlay.affectsStages.map(s => {
                const stageObj = RESEARCH_MAP_STAGES.find(st => st.id === s);
                return stageObj ? `Stage ${stageObj.step} (${stageObj.label})` : s;
              }).join(' → ')}
            </div>
          </div>
        )}
      </section>

      {/* SELECTED STAGE DEEP DIVE */}
      <section className="bg-[#FCFBF9] border border-[#E5DFD5] rounded-2xl p-6 sm:p-8 shadow-card space-y-6">
        
        {/* Stage Header */}
        <div className="border-b border-[#EAE5DC] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2 text-xs mb-1">
              <span className="font-bold text-[#A85338]">Stage {activeStage.step} of 6</span>
              <span className="text-[#D6D1C7]">•</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs ${getStatusBadge(activeStage.statusInLiterature)}`}>
                {activeStage.statusInLiterature}
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C1917]">
              {activeStage.label}
            </h2>
          </div>
        </div>

        {/* Central Intellectual Question */}
        <div className="bg-[#FAF4ED] border-l-4 border-[#A85338] p-4 rounded-r-lg">
          <span className="font-serif text-xs font-bold text-[#823824] uppercase tracking-wider block mb-1">
            Central Research Question for this Stage
          </span>
          <p className="font-serif text-base sm:text-lg text-[#292524] italic font-medium leading-relaxed">
            "{activeStage.intellectualQuestion}"
          </p>
        </div>

        {/* Mechanisms & Aim 1 Gap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          
          {/* Key Mechanisms */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[#57534E] flex items-center space-x-1.5">
              <Sliders className="w-3.5 h-3.5 text-[#A85338]" />
              <span>Key Behavioural & Economic Mechanisms</span>
            </h4>
            <ul className="space-y-2">
              {activeStage.keyMechanisms.map((mech, idx) => (
                <li key={idx} className="flex items-start space-x-2 bg-white p-3 rounded border border-[#EAE5DC]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#245934] shrink-0 mt-0.5" />
                  <span className="text-[#38332E] leading-relaxed">{mech}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Aim 1 Gap Notes */}
          <div className="space-y-3">
            <h4 className="font-bold uppercase tracking-wider text-[#57534E] flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A85338]" />
              <span>The Aim 1 Doctoral Gap in this Stage</span>
            </h4>
            <div className="bg-[#F2ECE1] border border-[#DDD5C7] rounded-lg p-4 space-y-2">
              <p className="text-xs text-[#2D2A26] font-serif leading-relaxed italic">
                "{activeStage.aim1GapNotes}"
              </p>
              <div className="text-[11px] text-[#78716C] pt-2 border-t border-[#DDD5C7]/60">
                Notice how the existing empirical consensus weakens sharply in stages 1 and 2: we understand the final consequence (stage 6), but not the initial cognitive anticipation.
              </div>
            </div>
          </div>
        </div>

        {/* Exemplar Linked Papers for this Stage */}
        <div className="space-y-3 pt-4 border-t border-[#EAE5DC]">
          <h4 className="font-serif text-sm font-bold uppercase tracking-wider text-[#1C1917] flex items-center space-x-1.5">
            <BookOpen className="w-4 h-4 text-[#A85338]" />
            <span>Core Literature Speaking to this Stage ({stagePapers.length})</span>
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {stagePapers.map((paper) => (
              <div
                key={paper.id}
                onClick={() => setSelectedPaper(paper)}
                className="p-3.5 bg-white hover:bg-[#F9EDE8] border border-[#EAE5DC] hover:border-[#A85338] rounded-lg cursor-pointer transition-all flex flex-col justify-between group shadow-card hover:shadow-card-hover"
              >
                <div>
                  <div className="text-[11px] font-semibold text-[#A85338] mb-1">
                    {paper.authors[0]} ({paper.year}) • {paper.aimRelevance}
                  </div>
                  <h5 className="font-serif text-xs font-bold text-[#1C1917] group-hover:text-[#A85338] line-clamp-2 leading-snug mb-1">
                    {paper.title}
                  </h5>
                  <p className="text-[11px] text-[#78716C] line-clamp-2">
                    {paper.whyThisMattersForAim1}
                  </p>
                </div>
                <div className="mt-2 pt-2 border-t border-[#EFECE6] flex items-center justify-between text-[10px] text-[#8A8680]">
                  <span>{paper.evidenceType}</span>
                  <span className="text-[#A85338] font-semibold group-hover:translate-x-0.5 transition-transform">
                    Examine &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
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
