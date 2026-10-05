'use client';

import React, { useState, useEffect } from 'react';
import { Paper, AimRelevance, RoleInAim1, ReadingStatus, EvidenceType } from '@/types/paper';
import { THEMES_DATA } from '@/data/themes';
import { X, Sparkles } from 'lucide-react';

interface PaperFormModalProps {
  paper?: Paper | null; // If provided, edit mode; otherwise, create mode
  isOpen: boolean;
  onClose: () => void;
  onSave: (paperData: any) => void;
}

const AIM_RELEVANCE_OPTIONS: AimRelevance[] = [
  'Direct',
  'Strongly relevant',
  'Adjacent',
  'Background',
  'Methods',
  'Theory',
  'Peripheral'
];

const EVIDENCE_TYPE_OPTIONS: EvidenceType[] = [
  'Foresight & Anticipation',
  'Consequences Only',
  'Bridge / Both',
  'Theoretical / Conceptual'
];

const READING_STATUS_OPTIONS: ReadingStatus[] = [
  'Discovered',
  'To read',
  'Reading',
  'Skimmed',
  'Read',
  'Notes complete',
  'Cited'
];

const ROLES_OPTIONS: RoleInAim1[] = [
  'Motivates the research question',
  'Direct evidence',
  'Establishes why foresight matters',
  'Supports the argument',
  'Challenges the argument',
  'Provides theory',
  'Provides methodology',
  'Provides policy context',
  'Provides economic context',
  'Useful comparator'
];

export function PaperFormModal({ paper, isOpen, onClose, onSave }: PaperFormModalProps) {
  const [title, setTitle] = useState('');
  const [authors, setAuthors] = useState('');
  const [year, setYear] = useState<number>(2023);
  const [journal, setJournal] = useState('');
  const [doi, setDoi] = useState('');
  const [consensusUrl, setConsensusUrl] = useState('');
  const [abstract, setAbstract] = useState('');
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [population, setPopulation] = useState('');
  const [country, setCountry] = useState('United Kingdom');
  const [dataset, setDataset] = useState('');
  const [methodology, setMethodology] = useState('Longitudinal analysis');
  const [studyDesign, setStudyDesign] = useState('');
  const [aimRelevance, setAimRelevance] = useState<AimRelevance>('Direct');
  const [evidenceType, setEvidenceType] = useState<EvidenceType>('Foresight & Anticipation');
  const [selectedRoles, setSelectedRoles] = useState<RoleInAim1[]>(['Direct evidence']);
  const [importanceRating, setImportanceRating] = useState<1 | 2 | 3 | 4 | 5>(4);
  const [readingStatus, setReadingStatus] = useState<ReadingStatus>('To read');
  const [isCoreAim1, setIsCoreAim1] = useState(false);
  const [mainFinding, setMainFinding] = useState('');
  const [whyThisMattersForAim1, setWhyThisMattersForAim1] = useState('');
  const [myInterpretation, setMyInterpretation] = useState('');
  const [supportsOrChallenges, setSupportsOrChallenges] = useState('');
  const [usefulPages, setUsefulPages] = useState('');
  const [keyQuotations, setKeyQuotations] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (paper) {
      setTitle(paper.title);
      setAuthors(paper.authors.join(', '));
      setYear(paper.year);
      setJournal(paper.journal);
      setDoi(paper.doi);
      setConsensusUrl(paper.consensusUrl || '');
      setAbstract(paper.abstract);
      setSelectedThemes(paper.themes || []);
      setPopulation(paper.population);
      setCountry(paper.country);
      setDataset(paper.dataset);
      setMethodology(paper.methodology);
      setStudyDesign(paper.studyDesign);
      setAimRelevance(paper.aimRelevance);
      setEvidenceType(paper.evidenceType);
      setSelectedRoles(paper.roleInAim1 || []);
      setImportanceRating(paper.importanceRating);
      setReadingStatus(paper.readingStatus);
      setIsCoreAim1(paper.isCoreAim1);
      setMainFinding(paper.mainFinding);
      setWhyThisMattersForAim1(paper.whyThisMattersForAim1);
      setMyInterpretation(paper.myInterpretation);
      setSupportsOrChallenges(paper.supportsOrChallenges);
      setUsefulPages(paper.usefulPages || '');
      setKeyQuotations(paper.keyQuotations?.join('\n') || '');
      setNotes(paper.notes || '');
    } else {
      // defaults for new paper
      setTitle('');
      setAuthors('');
      setYear(new Date().getFullYear());
      setJournal('');
      setDoi('');
      setConsensusUrl('');
      setAbstract('');
      setSelectedThemes(['Foresight & expectations']);
      setPopulation('Working-age adult carers (18-64)');
      setCountry('United Kingdom');
      setDataset('UK Household Longitudinal Study (UKHLS)');
      setMethodology('Longitudinal analysis');
      setStudyDesign('');
      setAimRelevance('Direct');
      setEvidenceType('Foresight & Anticipation');
      setSelectedRoles(['Direct evidence']);
      setImportanceRating(4);
      setReadingStatus('To read');
      setIsCoreAim1(false);
      setMainFinding('');
      setWhyThisMattersForAim1('');
      setMyInterpretation('');
      setSupportsOrChallenges('');
      setUsefulPages('');
      setKeyQuotations('');
      setNotes('');
    }
  }, [paper, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const authorsArray = authors.split(/,|;/).map(a => a.trim()).filter(Boolean);
    const quotesArray = keyQuotations.split('\n').map(q => q.trim()).filter(Boolean);

    const paperData = {
      title,
      authors: authorsArray.length > 0 ? authorsArray : ['Anonymous / Research Group'],
      year: Number(year),
      journal,
      doi,
      consensusUrl: consensusUrl || undefined,
      abstract,
      themes: selectedThemes,
      subthemes: [],
      population,
      country,
      dataset,
      methodology,
      studyDesign: studyDesign || methodology,
      outcomes: [],
      aimRelevance,
      roleInAim1: selectedRoles,
      relevanceScore: aimRelevance === 'Direct' ? 9 : 7,
      importanceRating,
      readingStatus,
      evidenceType,
      isCoreAim1,
      mainFinding,
      whyThisMattersForAim1,
      myInterpretation,
      supportsOrChallenges,
      usefulPages,
      keyQuotations: quotesArray,
      notes,
      aimTags: ['Aim 1'],
    };

    onSave(paperData);
    onClose();
  };

  const toggleTheme = (themeTitle: string) => {
    setSelectedThemes(prev => 
      prev.includes(themeTitle) ? prev.filter(t => t !== themeTitle) : [...prev, themeTitle]
    );
  };

  const toggleRole = (role: RoleInAim1) => {
    setSelectedRoles(prev => 
      prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF8F5] border border-[#DDD8D0] rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#EAE5DC] flex items-center justify-between bg-[#F5F1EB]">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#1C1917]">
              {paper ? 'Edit Literature Record' : 'Add New Paper to Aim 1 Library'}
            </h2>
            <p className="text-xs text-[#78716C]">
              Ensure strict distinction between authors' findings, personal interpretation, and Aim 1 role.
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#78716C] hover:text-[#1C1917] rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs text-[#1C1917]">
          
          {/* Section 1: Citation Essentials */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#A85338] mb-3">
              1. Citation & Publication Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-3">
                <label className="block font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white text-sm font-serif"
                  placeholder="e.g. Expectations Versus Reality: How Female Carers Navigate Employment..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">Authors (comma-separated) *</label>
                <input
                  type="text"
                  required
                  value={authors}
                  onChange={(e) => setAuthors(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                  placeholder="e.g. Kathleen Fahy, Claire O'Neill, Aisling O'Sullivan"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Year *</label>
                <input
                  type="number"
                  required
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">Journal / Publisher *</label>
                <input
                  type="text"
                  required
                  value={journal}
                  onChange={(e) => setJournal(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                  placeholder="e.g. Journal of Health Economics, Ageing & Society"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">DOI</label>
                <input
                  type="text"
                  value={doi}
                  onChange={(e) => setDoi(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white font-mono"
                  placeholder="10.1007/..."
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block font-semibold mb-1">Consensus Discovery Link (Optional)</label>
                <input
                  type="url"
                  value={consensusUrl}
                  onChange={(e) => setConsensusUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                  placeholder="https://consensus.app/papers/..."
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block font-semibold mb-1">Abstract</label>
                <textarea
                  rows={3}
                  value={abstract}
                  onChange={(e) => setAbstract(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white leading-relaxed"
                  placeholder="Paste paper abstract here..."
                />
              </div>
            </div>
          </div>

          {/* Section 2: Intellectual Role & Core Aim 1 Distinction */}
          <div className="pt-4 border-t border-[#EAE5DC]">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#A85338] mb-3">
              2. Aim 1 Intellectual Positioning
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
              <div>
                <label className="block font-semibold mb-1">Aim Relevance *</label>
                <select
                  value={aimRelevance}
                  onChange={(e) => setAimRelevance(e.target.value as AimRelevance)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                >
                  {AIM_RELEVANCE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">
                  Evidence Type (Critical Thesis Distinction) *
                </label>
                <select
                  value={evidenceType}
                  onChange={(e) => setEvidenceType(e.target.value as EvidenceType)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white font-medium"
                >
                  {EVIDENCE_TYPE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1">Reading Status *</label>
                <select
                  value={readingStatus}
                  onChange={(e) => setReadingStatus(e.target.value as ReadingStatus)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                >
                  {READING_STATUS_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2 mb-4 bg-[#F5F1EB] p-3 rounded">
              <input
                type="checkbox"
                id="isCoreCheck"
                checked={isCoreAim1}
                onChange={(e) => setIsCoreAim1(e.target.checked)}
                className="w-4 h-4 text-[#A85338] rounded"
              />
              <label htmlFor="isCoreCheck" className="font-semibold text-xs cursor-pointer">
                Mark as Core Aim 1 Paper (Highest priority for doctoral thesis)
              </label>
            </div>

            {/* Role in Aim 1 */}
            <div className="mb-4">
              <label className="block font-semibold mb-1.5">
                Role in Aim 1 (Select all applicable) *
              </label>
              <div className="flex flex-wrap gap-1.5">
                {ROLES_OPTIONS.map(role => {
                  const isSelected = selectedRoles.includes(role);
                  return (
                    <button
                      type="button"
                      key={role}
                      onClick={() => toggleRole(role)}
                      className={`px-2.5 py-1 rounded text-xs transition-colors ${
                        isSelected 
                          ? 'bg-[#1C1917] text-[#FAF8F5] font-semibold' 
                          : 'bg-[#EFECE6] text-[#57534E] hover:bg-[#E2DDD5]'
                      }`}
                    >
                      {role}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Themes */}
            <div>
              <label className="block font-semibold mb-1.5">
                Themes (Multiple allowed) *
              </label>
              <div className="flex flex-wrap gap-1.5 max-h-32 overflow-y-auto p-2 bg-[#FCFBF9] border border-[#DDD8D0] rounded">
                {THEMES_DATA.map(t => {
                  const isSelected = selectedThemes.includes(t.title);
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => toggleTheme(t.title)}
                      className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
                        isSelected 
                          ? 'bg-[#A85338] text-white font-medium' 
                          : 'bg-[#EFECE6] text-[#57534E] hover:bg-[#E5DFD5]'
                      }`}
                    >
                      {t.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 3: Core Analytical Synthesis (CRITICAL DATA PRINCIPLE) */}
          <div className="pt-4 border-t border-[#EAE5DC] space-y-4">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#A85338]">
              3. Analytical Rigour: Distinguishing Claims
            </h3>

            {/* Why This Matters for Aim 1 */}
            <div className="bg-[#FAF4ED] p-3 rounded border-l-4 border-[#A85338]">
              <label className="block font-bold text-[#823824] mb-1">
                Why this matters for Aim 1 *
              </label>
              <textarea
                required
                rows={2}
                value={whyThisMattersForAim1}
                onChange={(e) => setWhyThisMattersForAim1(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#E8D0C5] bg-white leading-relaxed"
                placeholder="Explain the specific contribution to your research question on foresight and financial decisions..."
              />
            </div>

            {/* Main finding (Authors) */}
            <div>
              <label className="block font-bold mb-1">
                Main Empirical Finding (What the authors found) *
              </label>
              <textarea
                required
                rows={2}
                value={mainFinding}
                onChange={(e) => setMainFinding(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white leading-relaxed"
                placeholder="Summarise the authors' actual empirical or theoretical findings..."
              />
            </div>

            {/* My interpretation */}
            <div className="bg-[#F2ECE1] p-3 rounded border border-[#DDD5C7]">
              <label className="block font-bold text-[#1C1917] mb-1">
                My Interpretation (What I think / PhD candidate critique) *
              </label>
              <textarea
                required
                rows={2}
                value={myInterpretation}
                onChange={(e) => setMyInterpretation(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#C9C0AF] bg-white leading-relaxed font-serif italic"
                placeholder="Your personal critical critique, limitations, potential recall bias, or theoretical foil..."
              />
            </div>

            {/* Supports or challenges */}
            <div>
              <label className="block font-semibold mb-1">
                Supports or Challenges (What argument or other papers it supports/challenges)
              </label>
              <input
                type="text"
                value={supportsOrChallenges}
                onChange={(e) => setSupportsOrChallenges(e.target.value)}
                className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                placeholder="e.g. Challenges Beckerian human-capital optimization; supports Fahy on truncated horizons"
              />
            </div>
          </div>

          {/* Section 4: Empirical Architecture */}
          <div className="pt-4 border-t border-[#EAE5DC]">
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[#A85338] mb-3">
              4. Research Design & Evidence Base
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1">Population</label>
                <input
                  type="text"
                  value={population}
                  onChange={(e) => setPopulation(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                  placeholder="e.g. Mid-life female carers aged 45-64"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Country / Geography</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                  placeholder="e.g. United Kingdom"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Dataset / Source</label>
                <input
                  type="text"
                  value={dataset}
                  onChange={(e) => setDataset(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                  placeholder="e.g. BHPS / Understanding Society / ELSA"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Methodology</label>
                <input
                  type="text"
                  value={methodology}
                  onChange={(e) => setMethodology(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                  placeholder="e.g. Longitudinal fixed effects / Qualitative interviews"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">Useful Pages</label>
                <input
                  type="text"
                  value={usefulPages}
                  onChange={(e) => setUsefulPages(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white"
                  placeholder="e.g. pp. 112-118 (discussion of duration expectations)"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">Key Quotations (One per line)</label>
                <textarea
                  rows={2}
                  value={keyQuotations}
                  onChange={(e) => setKeyQuotations(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white leading-relaxed font-serif italic"
                  placeholder="Paste direct verbatim quotations with page numbers..."
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold mb-1">Working Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-[#DDD8D0] bg-white leading-relaxed"
                  placeholder="General doctoral notes, chapter cross-references..."
                />
              </div>
            </div>
          </div>

          {/* Footer Submit */}
          <div className="pt-4 border-t border-[#EAE5DC] flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-[#DDD8D0] text-[#57534E] hover:bg-[#EFECE6] font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded bg-[#1C1917] text-[#FAF8F5] hover:bg-[#332F2C] font-semibold shadow-sm"
            >
              {paper ? 'Save Changes' : 'Save to Aim 1 Library'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
