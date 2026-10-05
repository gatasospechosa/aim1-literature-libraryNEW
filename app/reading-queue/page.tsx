'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useLibrary } from '@/context/LibraryContext';
import { PaperDetailDrawer } from '@/components/PaperDetailDrawer';
import { PaperFormModal } from '@/components/PaperFormModal';
import { Paper, ReadingStatus, ReadingQueueCategory } from '@/types/paper';
import { 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  BookOpen, 
  Star, 
  Filter, 
  SlidersHorizontal,
  ChevronRight,
  Sparkles,
  MoveRight
} from 'lucide-react';

const QUEUE_STAGES: { id: ReadingQueueCategory; label: string; desc: string }[] = [
  { id: 'Read next', label: 'Read Next', desc: 'Highest priority papers to read immediately' },
  { id: 'Important', label: 'Important', desc: 'High analytical value for thesis' },
  { id: 'Needs full text', label: 'Needs Full Text', desc: 'Awaiting institutional PDF access' },
  { id: 'Needs notes', label: 'Needs Notes', desc: 'Read or skimmed but requires PhD critique' },
  { id: 'Needs coding', label: 'Needs Coding', desc: 'Awaiting extraction of themes and quotes' },
  { id: 'Possible core paper', label: 'Possible Core Paper', desc: 'Candidates for primary theoretical role' }
];

export default function ReadingQueuePage() {
  const { papers, updatePaper, updateReadingStatus, updateQueueCategory, toggleCoreAim1, addPaper } = useLibrary();
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [activeStage, setActiveStage] = useState<ReadingQueueCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState<'relevance' | 'importance' | 'year'>('importance');

  // Filter papers for queue
  const queuePapers = papers
    .filter(p => {
      if (activeStage === 'all') return true;
      return p.readingQueueCategory === activeStage;
    })
    .sort((a, b) => {
      if (sortBy === 'importance') return b.importanceRating - a.importanceRating;
      if (sortBy === 'relevance') return b.relevanceScore - a.relevanceScore;
      return b.year - a.year;
    });

  // Calculate counts per stage
  const stageCounts = QUEUE_STAGES.reduce((acc, stage) => {
    acc[stage.id] = papers.filter(p => p.readingQueueCategory === stage.id).length;
    return acc;
  }, {} as Record<ReadingQueueCategory, number>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="border-b border-[#EAE5DC] pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider text-[#A85338] mb-1">
            <Clock className="w-4 h-4" />
            <span>Doctoral Reading Workflow</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#1C1917]">
            Reading Queue & Processing Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-[#78716C] mt-1 font-serif italic max-w-2xl">
            Prioritise, categorise, and track the progression of literature from initial discovery to active thesis citation.
          </p>
        </div>

        {/* Sort selector */}
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-[#78716C]">Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-1.5 rounded border border-[#DDD8D0] bg-white text-[#1C1917] font-medium"
          >
            <option value="importance">Importance Rating</option>
            <option value="relevance">Relevance Score</option>
            <option value="year">Publication Year</option>
          </select>
        </div>
      </div>

      {/* Stage Selector Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveStage('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
            activeStage === 'all'
              ? 'bg-[#1C1917] text-[#FAF8F5]'
              : 'bg-[#FCFBF9] border border-[#DDD8D0] text-[#57534E] hover:bg-[#F5F1EB]'
          }`}
        >
          All Items ({papers.length})
        </button>

        {QUEUE_STAGES.map((stage) => {
          const count = stageCounts[stage.id];
          const isSelected = activeStage === stage.id;

          return (
            <button
              key={stage.id}
              onClick={() => setActiveStage(stage.id)}
              className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                isSelected
                  ? 'bg-[#A85338] text-white shadow-xs'
                  : 'bg-[#FCFBF9] border border-[#DDD8D0] text-[#57534E] hover:bg-[#F5F1EB]'
              }`}
            >
              <span>{stage.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected ? 'bg-white/20 text-white' : 'bg-[#EAE5DC] text-[#78716C]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Stage Banner */}
      {activeStage !== 'all' && (
        <div className="bg-[#FAF4ED] border border-[#E8D4C8] rounded-lg p-3 text-xs flex items-center justify-between text-[#823824]">
          <div>
            <strong>{QUEUE_STAGES.find(s => s.id === activeStage)?.label}:</strong>{' '}
            {QUEUE_STAGES.find(s => s.id === activeStage)?.desc}
          </div>
          <button
            onClick={() => setActiveStage('all')}
            className="text-[11px] underline hover:text-[#1C1917]"
          >
            Show all
          </button>
        </div>
      )}

      {/* Queue Items List */}
      <div className="space-y-4">
        {queuePapers.length > 0 ? (
          queuePapers.map((paper) => {
            const authorFormat = paper.authors.length > 2 
              ? `${paper.authors[0]} et al.` 
              : paper.authors.join(' & ');

            return (
              <div
                key={paper.id}
                className="bg-[#FCFBF9] hover:bg-white border border-[#E5DFD5] hover:border-[#D0C7B9] rounded-xl p-5 shadow-card transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                {/* Paper Info */}
                <div className="space-y-1.5 flex-1 pr-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-semibold text-[#A85338] bg-[#FAF4ED] px-2 py-0.5 rounded text-[11px]">
                      {paper.aimRelevance}
                    </span>
                    <span className="font-medium text-[#245934] bg-[#EAF3EC] px-2 py-0.5 rounded text-[11px]">
                      {paper.evidenceType}
                    </span>
                    {paper.readingQueueCategory && (
                      <span className="font-bold text-[#8C5E1E] bg-[#FCF6E8] border border-[#EEDDB8] px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">
                        {paper.readingQueueCategory}
                      </span>
                    )}
                    {paper.isCoreAim1 && (
                      <span className="text-[#A85338] font-bold text-[11px] flex items-center space-x-0.5">
                        <Star className="w-3 h-3 fill-[#A85338]" />
                        <span>Core Aim 1</span>
                      </span>
                    )}
                  </div>

                  <h3 
                    onClick={() => setSelectedPaper(paper)}
                    className="font-serif text-base sm:text-lg font-bold text-[#1C1917] hover:text-[#A85338] cursor-pointer transition-colors leading-snug"
                  >
                    {paper.title}
                  </h3>

                  <p className="text-xs text-[#57534E]">
                    <span className="font-semibold text-[#292524]">{authorFormat}</span>
                    <span className="text-[#8A8680] mx-1.5">•</span>
                    <span className="italic">{paper.journal}</span> ({paper.year})
                  </p>

                  <p className="text-xs text-[#78716C] line-clamp-1 italic">
                    {paper.whyThisMattersForAim1}
                  </p>
                </div>

                {/* Workflow Controls: Queue Category & Status Selector */}
                <div className="flex flex-wrap items-center gap-3 shrink-0 self-end md:self-center text-xs">
                  {/* Queue Stage Mover */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8680]">
                      Queue Stage
                    </span>
                    <select
                      value={paper.readingQueueCategory || 'None'}
                      onChange={(e) => updateQueueCategory(paper.id, e.target.value === 'None' ? undefined : e.target.value as ReadingQueueCategory)}
                      className="px-2.5 py-1 rounded border border-[#DDD8D0] bg-white text-[#1C1917] text-xs font-medium cursor-pointer"
                    >
                      <option value="None">None</option>
                      {QUEUE_STAGES.map(s => (
                        <option key={s.id} value={s.id}>{s.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Reading Status Mover */}
                  <div className="flex flex-col space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A8680]">
                      Reading Status
                    </span>
                    <select
                      value={paper.readingStatus}
                      onChange={(e) => updateReadingStatus(paper.id, e.target.value as ReadingStatus)}
                      className="px-2.5 py-1 rounded border border-[#DDD8D0] bg-white text-[#1C1917] text-xs font-semibold cursor-pointer"
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

                  {/* Examine Button */}
                  <button
                    onClick={() => setSelectedPaper(paper)}
                    className="p-2 text-[#78716C] hover:text-[#A85338] hover:bg-[#F5F1EB] rounded-lg transition-colors mt-3"
                    title="Examine paper details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-[#FCFBF9] border border-[#EAE5DC] rounded-xl p-12 text-center text-xs text-[#78716C] space-y-2">
            <p className="font-serif text-sm font-bold text-[#1C1917]">
              No papers currently in this queue stage.
            </p>
            <p>
              Use the dropdown on any paper in your library to assign it to this reading category.
            </p>
          </div>
        )}
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
