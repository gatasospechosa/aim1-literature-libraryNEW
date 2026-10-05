'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLibrary } from '@/context/LibraryContext';
import { THEMES_DATA } from '@/data/themes';
import { PaperCard } from '@/components/PaperCard';
import { PaperDetailDrawer } from '@/components/PaperDetailDrawer';
import { PaperFormModal } from '@/components/PaperFormModal';
import { Paper } from '@/types/paper';
import { 
  Search, 
  ArrowRight, 
  BookOpen, 
  Library,
  Star, 
  Clock, 
  Sparkles, 
  Layers, 
  Edit3, 
  Save, 
  Compass, 
  GraduationCap
} from 'lucide-react';

const FEATURED_THEMES = [
  'Foresight & Expectations',
  'Labour-market Decisions',
  'Financial Consequences',
  'Constrained Choice & Agency',
  'Uncertainty',
  'Retirement & Pensions',
  'Mid-life Caring'
];

export default function HomePage() {
  const router = useRouter();
  const { papers, metrics, centralGapText, updateCentralGapText, updatePaper, addPaper } = useLibrary();
  const [searchInput, setSearchInput] = useState('');
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Emerging gap state
  const [editingGap, setEditingGap] = useState(false);
  const [gapInput, setGapInput] = useState(
    'Existing research provides substantial evidence about the employment and financial consequences of unpaid care, but much less is known about what carers anticipated when labour-market decisions were made, how they understood longer-term consequences, and whether alternative choices were realistically available.'
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      router.push(`/library?q=${encodeURIComponent(searchInput.trim())}`);
    } else {
      router.push('/library');
    }
  };

  const continueReadingPapers = papers.filter(
    p => p.readingStatus === 'Reading' || p.readingStatus === 'To read'
  ).slice(0, 4);

  const corePapers = papers.filter(p => p.isCoreAim1).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Editorial Archive Masthead */}
      <section className="text-center max-w-4xl mx-auto pt-8 pb-4 space-y-5">
        <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#8A847C] block">
          A Personal Archive • Doctoral Research Library
        </span>

        <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-normal text-[#1C1917] tracking-tight leading-[1.08]">
          Aim 1 Literature Library
        </h1>

        <p className="font-serif text-lg sm:text-xl text-[#57534E] leading-relaxed max-w-2xl mx-auto font-normal italic">
          Foresight, financial consequences and labour-market decision-making in unpaid care.
        </p>

        <p className="text-xs font-sans tracking-[0.2em] uppercase text-[#8A847C]">
          {metrics.totalPapers} Papers in Archive • Curated Bookshelf View Available
        </p>

        {/* Minimal Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative pt-2">
          <Search className="w-3.5 h-3.5 text-[#8A847C] absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search papers, authors, concepts, methods, datasets or arguments…"
            className="w-full pl-10 pr-24 py-3 rounded-full border border-[#DDD6C9] bg-white/70 hover:bg-white text-xs text-[#1C1917] placeholder-[#8A847C] focus:outline-none focus:border-[#1C1917] transition-all font-sans shadow-[0_2px_8px_rgba(0,0,0,0.02)]"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 mt-1 px-4 py-1.5 rounded-full bg-[#1C1917] text-[#FAF8F5] text-xs font-medium hover:bg-[#332F2C] transition-colors"
          >
            Search
          </button>
        </form>

        {/* Delicate Thematic Quick Pills */}
        <div className="flex flex-wrap justify-center gap-1.5 pt-2">
          {FEATURED_THEMES.map((t) => (
            <Link
              key={t}
              href={`/library?theme=${encodeURIComponent(t)}`}
              className="px-3 py-1 rounded-full text-xs font-sans text-[#635F58] border border-[#E2DDD5] hover:border-[#1C1917] hover:text-[#1C1917] transition-all bg-[#FAF8F5]"
            >
              {t}
            </Link>
          ))}
          <Link
            href="/library"
            className="inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium text-[#FAF8F5] bg-[#1C1917] hover:bg-[#332F2C] transition-all"
          >
            <span>Open Bookshelves &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Summary Metrics Bar */}
      <section className="border-t border-b border-[#E8E2D6] py-6 px-4 sm:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
          <div>
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#1C1917]">
              {metrics.totalPapers}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8A847C] mt-1">
              Total Volumes
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#245934]">
              {metrics.readPapers}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8A847C] mt-1">
              Notes Complete
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#A85338]">
              {metrics.corePapers}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8A847C] mt-1">
              Anchor Papers
            </div>
          </div>

          <div>
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#1E3A5F]">
              {metrics.toReadPapers}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8A847C] mt-1">
              In Reading Queue
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <div className="font-serif text-3xl sm:text-4xl font-normal text-[#8C5E1E]">
              {metrics.directEvidence}
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] font-sans text-[#8A847C] mt-1">
              Direct Foresight
            </div>
          </div>
        </div>
      </section>

      {/* Visually Distinct Section: Emerging Gap (Editable) */}
      <section className="bg-[#FAF7F2] border border-[#E8E2D6] rounded-2xl p-6 sm:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.02)] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
          <span className="text-[10px] font-sans font-bold uppercase tracking-[0.25em] text-[#A85338]">
            The Central Thesis Problem
          </span>

          <div className="flex items-center space-x-2">
            {!editingGap ? (
              <button
                onClick={() => setEditingGap(true)}
                className="inline-flex items-center space-x-1 text-xs text-[#823824] hover:text-[#1C1917] font-sans transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Proposition</span>
              </button>
            ) : (
              <button
                onClick={() => setEditingGap(false)}
                className="inline-flex items-center space-x-1 text-xs bg-[#1C1917] text-[#FAF8F5] px-3 py-1 rounded-full font-medium"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save</span>
              </button>
            )}
          </div>
        </div>

        {editingGap ? (
          <textarea
            value={gapInput}
            onChange={(e) => setGapInput(e.target.value)}
            rows={4}
            className="w-full text-base sm:text-lg p-3 rounded-lg border border-[#A85338] bg-white text-[#1C1917] font-serif leading-relaxed focus:outline-none"
          />
        ) : (
          <blockquote className="font-serif text-xl sm:text-2xl text-[#292524] font-normal leading-relaxed italic border-l-2 border-[#1C1917] pl-5 my-2">
            "{gapInput}"
          </blockquote>
        )}

        <div className="pt-3 border-t border-[#E8E2D6] flex flex-wrap items-center justify-between gap-2 text-xs text-[#78716C]">
          <span>
            Connecting subjective anticipation with cumulative lifetime financial scarring.
          </span>
          <Link
            href="/case-for-aim1"
            className="inline-flex items-center space-x-1 text-xs text-[#1C1917] hover:underline"
          >
            <span>Examine the 6 Academic Pillars &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Continue Reading Section */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-[#E8E2D6] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] tracking-tight">
            Currently in Reading Queue
          </h2>
          <Link
            href="/reading-queue"
            className="text-xs text-[#78716C] hover:text-[#1C1917] font-sans"
          >
            View reading pipeline ({metrics.toReadPapers}) &rarr;
          </Link>
        </div>

        {continueReadingPapers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {continueReadingPapers.map((paper) => (
              <PaperCard
                key={paper.id}
                paper={paper}
                onSelect={(p) => setSelectedPaper(p)}
              />
            ))}
          </div>
        ) : (
          <div className="border border-[#EAE5DC] rounded-xl p-8 text-center text-xs text-[#8A847C]">
            No papers currently marked as reading.
          </div>
        )}
      </section>

      {/* Core Aim 1 Anchor Papers */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-[#E8E2D6] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] tracking-tight">
            Anchor Literature
          </h2>
          <Link
            href="/library?coreOnly=true"
            className="text-xs text-[#78716C] hover:text-[#1C1917] font-sans"
          >
            Examine all {metrics.corePapers} anchor volumes &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {corePapers.map((paper) => (
            <PaperCard
              key={paper.id}
              paper={paper}
              onSelect={(p) => setSelectedPaper(p)}
            />
          ))}
        </div>
      </section>

      {/* Thematic Overview Stacks */}
      <section className="space-y-6">
        <div className="flex items-baseline justify-between border-b border-[#E8E2D6] pb-3">
          <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1917] tracking-tight">
            Conceptual Domains
          </h2>
          <Link
            href="/themes"
            className="text-xs text-[#78716C] hover:text-[#1C1917] font-sans"
          >
            View all 14 research themes &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {THEMES_DATA.slice(0, 9).map((theme) => {
            const themePapers = papers.filter(p => p.themes.includes(theme.title));
            const coreThemePapers = themePapers.filter(p => p.isCoreAim1);

            return (
              <Link
                key={theme.id}
                href={`/library?theme=${encodeURIComponent(theme.title)}`}
                className="group p-5 bg-[#FCFBF9] hover:bg-white border border-[#E8E2D6] hover:border-[#1C1917] rounded-xl transition-all shadow-[0_2px_8px_rgba(0,0,0,0.02)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2 text-[10px] uppercase font-bold tracking-[0.2em] text-[#8A847C]">
                    <span>{theme.conceptualCluster}</span>
                    <span>{themePapers.length} vol.</span>
                  </div>

                  <h3 className="font-serif text-lg font-normal text-[#1C1917] group-hover:text-[#A85338] transition-colors leading-snug mb-2">
                    {theme.title}
                  </h3>

                  <p className="text-xs text-[#6E6961] line-clamp-2 leading-relaxed mb-4">
                    {theme.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#EFEAE0] flex items-center justify-between text-[11px] text-[#8A847C]">
                  <span>{coreThemePapers.length} anchor papers</span>
                  <span className="text-[#1C1917] group-hover:translate-x-0.5 transition-transform inline-flex items-center">
                    Explore &rarr;
                  </span>
                </div>
              </Link>
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
