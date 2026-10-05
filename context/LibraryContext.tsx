'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Paper, CaseSection, ReadingStatus, ReadingQueueCategory } from '@/types/paper';
import { INITIAL_PAPERS } from '@/data/papers';
import { CASE_SECTIONS_DATA, CENTRAL_GAP_TEXT } from '@/data/caseArguments';

interface LibraryContextType {
  papers: Paper[];
  addPaper: (paper: Omit<Paper, 'id' | 'dateAdded'> & { id?: string }) => void;
  updatePaper: (id: string, updates: Partial<Paper>) => void;
  deletePaper: (id: string) => void;
  updateReadingStatus: (id: string, status: ReadingStatus) => void;
  updateQueueCategory: (id: string, category: ReadingQueueCategory | undefined) => void;
  toggleCoreAim1: (id: string) => void;
  resetToInitialData: () => void;
  exportDataAsJson: () => void;
  
  // Thesis Central Gap & Case sections
  centralGapText: string;
  updateCentralGapText: (text: string) => void;
  caseSections: CaseSection[];
  updateCaseSectionNotes: (id: string, notes: string) => void;

  // Aim selection (for future Aim 2 and Aim 3 extensibility)
  currentAim: 'Aim 1' | 'Aim 2' | 'Aim 3';
  setCurrentAim: (aim: 'Aim 1' | 'Aim 2' | 'Aim 3') => void;

  // Global search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Derived metrics
  metrics: {
    totalPapers: number;
    readPapers: number;
    corePapers: number;
    toReadPapers: number;
    directEvidence: number;
    foresightPapers: number;
    consequencesPapers: number;
    bridgePapers: number;
  };
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

const LOCAL_STORAGE_PAPERS_KEY = 'aim1_literature_library_papers_v1';
const LOCAL_STORAGE_GAP_KEY = 'aim1_literature_library_central_gap_v1';
const LOCAL_STORAGE_CASE_KEY = 'aim1_literature_library_case_sections_v1';

export function LibraryProvider({ children }: { children: React.ReactNode }) {
  const [papers, setPapers] = useState<Paper[]>(INITIAL_PAPERS);
  const [centralGapText, setCentralGapText] = useState<string>(CENTRAL_GAP_TEXT);
  const [caseSections, setCaseSections] = useState<CaseSection[]>(CASE_SECTIONS_DATA);
  const [currentAim, setCurrentAim] = useState<'Aim 1' | 'Aim 2' | 'Aim 3'>('Aim 1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const storedPapers = localStorage.getItem(LOCAL_STORAGE_PAPERS_KEY);
      if (storedPapers) {
        const parsed = JSON.parse(storedPapers);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPapers(parsed);
        }
      }

      const storedGap = localStorage.getItem(LOCAL_STORAGE_GAP_KEY);
      if (storedGap) {
        setCentralGapText(storedGap);
      }

      const storedCases = localStorage.getItem(LOCAL_STORAGE_CASE_KEY);
      if (storedCases) {
        setCaseSections(JSON.parse(storedCases));
      }
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save papers when changed
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(LOCAL_STORAGE_PAPERS_KEY, JSON.stringify(papers));
      } catch (e) {
        console.error('Error saving papers to localStorage', e);
      }
    }
  }, [papers, isLoaded]);

  // Save central gap
  const updateCentralGapText = (text: string) => {
    setCentralGapText(text);
    try {
      localStorage.setItem(LOCAL_STORAGE_GAP_KEY, text);
    } catch (e) {
      console.error('Error saving gap text to localStorage', e);
    }
  };

  // Save case sections
  const updateCaseSectionNotes = (id: string, notes: string) => {
    setCaseSections(prev => {
      const updated = prev.map(sec => sec.id === id ? { ...sec, myNotes: notes } : sec);
      try {
        localStorage.setItem(LOCAL_STORAGE_CASE_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving case section notes', e);
      }
      return updated;
    });
  };

  const addPaper = (paperData: Omit<Paper, 'id' | 'dateAdded'> & { id?: string }) => {
    const newId = paperData.id || `paper-${Date.now()}`;
    const newPaper: Paper = {
      ...paperData,
      id: newId,
      dateAdded: new Date().toISOString().split('T')[0],
      isCoreAim1: paperData.isCoreAim1 ?? (paperData.importanceRating === 5),
    };
    setPapers(prev => [newPaper, ...prev]);
  };

  const updatePaper = (id: string, updates: Partial<Paper>) => {
    setPapers(prev => prev.map(paper => paper.id === id ? { ...paper, ...updates } : paper));
  };

  const deletePaper = (id: string) => {
    setPapers(prev => prev.filter(paper => paper.id !== id));
  };

  const updateReadingStatus = (id: string, status: ReadingStatus) => {
    updatePaper(id, { readingStatus: status });
  };

  const updateQueueCategory = (id: string, category: ReadingQueueCategory | undefined) => {
    updatePaper(id, { readingQueueCategory: category });
  };

  const toggleCoreAim1 = (id: string) => {
    setPapers(prev => prev.map(paper => paper.id === id ? { ...paper, isCoreAim1: !paper.isCoreAim1 } : paper));
  };

  const resetToInitialData = () => {
    setPapers(INITIAL_PAPERS);
    setCentralGapText(CENTRAL_GAP_TEXT);
    setCaseSections(CASE_SECTIONS_DATA);
    localStorage.removeItem(LOCAL_STORAGE_PAPERS_KEY);
    localStorage.removeItem(LOCAL_STORAGE_GAP_KEY);
    localStorage.removeItem(LOCAL_STORAGE_CASE_KEY);
  };

  const exportDataAsJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(papers, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aim1_literature_library_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Derived metrics
  const metrics = {
    totalPapers: papers.length,
    readPapers: papers.filter(p => p.readingStatus === 'Read' || p.readingStatus === 'Notes complete' || p.readingStatus === 'Cited').length,
    corePapers: papers.filter(p => p.isCoreAim1).length,
    toReadPapers: papers.filter(p => p.readingStatus === 'To read' || p.readingStatus === 'Discovered').length,
    directEvidence: papers.filter(p => p.aimRelevance === 'Direct').length,
    foresightPapers: papers.filter(p => p.evidenceType === 'Foresight & Anticipation').length,
    consequencesPapers: papers.filter(p => p.evidenceType === 'Consequences Only').length,
    bridgePapers: papers.filter(p => p.evidenceType === 'Bridge / Both').length,
  };

  return (
    <LibraryContext.Provider
      value={{
        papers,
        addPaper,
        updatePaper,
        deletePaper,
        updateReadingStatus,
        updateQueueCategory,
        toggleCoreAim1,
        resetToInitialData,
        exportDataAsJson,
        centralGapText,
        updateCentralGapText,
        caseSections,
        updateCaseSectionNotes,
        currentAim,
        setCurrentAim,
        searchQuery,
        setSearchQuery,
        metrics,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
}
