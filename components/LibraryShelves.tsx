'use client';

import React, { useState, useMemo } from 'react';
import { Paper } from '@/types/paper';
import { THEMES_DATA } from '@/data/themes';
import { Shelf } from '@/components/Shelf';
import { SpecialShelves } from '@/components/SpecialShelves';
import { SpineLegend } from '@/components/SpineLegend';

export type ArrangementMode = 
  | 'collection'
  | 'theme' 
  | 'evidenceType' 
  | 'readingStatus' 
  | 'importance' 
  | 'year' 
  | 'author' 
  | 'role';

export interface ShelfSectionData {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  papers: Paper[];
}

interface LibraryShelvesProps {
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  searchQuery?: string;
  arrangeBy?: ArrangementMode;
  showSpineGuide?: boolean;
}

export function LibraryShelves({
  papers,
  onSelectPaper,
  searchQuery = '',
  arrangeBy = 'collection',
  showSpineGuide = false
}: LibraryShelvesProps) {
  const [showCuratedReserves, setShowCuratedReserves] = useState(false);

  // Group papers dynamically based on selected arrangement
  const shelfSections: ShelfSectionData[] = useMemo(() => {
    switch (arrangeBy) {
      case 'collection': {
        return [{
          id: 'grand-collection',
          title: '',
          papers: papers
        }];
      }

      case 'theme': {
        return THEMES_DATA.map((theme) => {
          const shelfPapers = papers.filter(p => p.themes[0] === theme.title);
          return {
            id: theme.id,
            title: theme.title,
            subtitle: theme.conceptualCluster,
            description: theme.description,
            papers: shelfPapers
          };
        });
      }

      case 'evidenceType': {
        const types: Paper['evidenceType'][] = [
          'Foresight & Anticipation',
          'Bridge / Both',
          'Consequences Only',
          'Theoretical / Conceptual'
        ];
        return types.map(type => {
          const shelfPapers = papers.filter(p => p.evidenceType === type);
          let desc = '';
          if (type === 'Foresight & Anticipation') desc = 'Studies examining what carers expected, anticipated, or calculated regarding duration and financial consequences.';
          if (type === 'Consequences Only') desc = 'Studies documenting ex-post wage penalties, hours loss, or pension scarring without measuring subjective expectations.';
          if (type === 'Bridge / Both') desc = 'Literature connecting labour adjustments directly with subsequent economic scarring.';
          if (type === 'Theoretical / Conceptual') desc = 'Foundational microeconomic, sociological, or behavioral frameworks structuring the inquiry.';
          return {
            id: type,
            title: type,
            subtitle: `${shelfPapers.length} volumes`,
            description: desc,
            papers: shelfPapers
          };
        });
      }

      case 'readingStatus': {
        const statuses: Paper['readingStatus'][] = [
          'Reading',
          'To read',
          'Notes complete',
          'Read',
          'Skimmed',
          'Cited',
          'Discovered'
        ];
        return statuses.map(status => ({
          id: status,
          title: `Status: ${status}`,
          subtitle: `${papers.filter(p => p.readingStatus === status).length} volumes`,
          papers: papers.filter(p => p.readingStatus === status)
        }));
      }

      case 'importance': {
        const ratings: Paper['importanceRating'][] = [5, 4, 3, 2, 1];
        return ratings.map(rating => {
          const shelfPapers = papers.filter(p => p.importanceRating === rating);
          const labels: Record<number, string> = {
            5: 'Anchor & Core Literature',
            4: 'High Priority & Analytical Anchors',
            3: 'Substantive Empirical Studies',
            2: 'Contextual & Background Evidence',
            1: 'Peripheral References'
          };
          return {
            id: `rating-${rating}`,
            title: labels[rating],
            subtitle: `${shelfPapers.length} volumes`,
            papers: shelfPapers
          };
        });
      }

      case 'year': {
        const periods = [
          { id: '2020s', title: '2020–Present (Contemporary Scholarship)', filter: (p: Paper) => p.year >= 2020 },
          { id: '2010s', title: '2010–2019 (Austerity & Care Transitions)', filter: (p: Paper) => p.year >= 2010 && p.year < 2020 },
          { id: '2000s', title: '2000–2009 (Econometric Panel Innovations)', filter: (p: Paper) => p.year >= 2000 && p.year < 2010 },
          { id: '1990s', title: '1990–1999 (Early Wage Penalty Literature)', filter: (p: Paper) => p.year >= 1990 && p.year < 2000 },
          { id: 'pre-1990', title: 'Pre-1990 (Foundational Economic & Behavioral Theory)', filter: (p: Paper) => p.year < 1990 },
        ];
        return periods.map(p => ({
          id: p.id,
          title: p.title,
          subtitle: `${papers.filter(p.filter).length} volumes`,
          papers: papers.filter(p.filter)
        }));
      }

      case 'author': {
        const alphaBands = [
          { id: 'a-e', title: 'Authors A – E', filter: (p: Paper) => /^[A-E]/i.test(p.authors[0]?.split(' ').pop() || '') },
          { id: 'f-j', title: 'Authors F – J', filter: (p: Paper) => /^[F-J]/i.test(p.authors[0]?.split(' ').pop() || '') },
          { id: 'k-o', title: 'Authors K – O', filter: (p: Paper) => /^[K-O]/i.test(p.authors[0]?.split(' ').pop() || '') },
          { id: 'p-t', title: 'Authors P – T', filter: (p: Paper) => /^[P-T]/i.test(p.authors[0]?.split(' ').pop() || '') },
          { id: 'u-z', title: 'Authors U – Z', filter: (p: Paper) => /^[U-Z]/i.test(p.authors[0]?.split(' ').pop() || '') },
        ];
        return alphaBands.map(b => ({
          id: b.id,
          title: b.title,
          subtitle: `${papers.filter(b.filter).length} volumes`,
          papers: papers.filter(b.filter)
        }));
      }

      case 'role': {
        const roles: Paper['roleInAim1'][number][] = [
          'Direct evidence',
          'Motivates the research question',
          'Establishes why foresight matters',
          'Supports the argument',
          'Provides theory',
          'Provides economic context',
          'Provides policy context',
          'Provides methodology'
        ];
        return roles.map(role => ({
          id: role,
          title: `Role: ${role}`,
          subtitle: `${papers.filter(p => p.roleInAim1.includes(role)).length} volumes`,
          papers: papers.filter(p => p.roleInAim1.includes(role))
        }));
      }
    }
  }, [papers, arrangeBy]);

  // If a search or theme filter is active, only show non-empty sections (or keep all if no search)
  const visibleSections = useMemo(() => {
    if (searchQuery.trim().length > 0) {
      return shelfSections.filter(s => s.papers.length > 0);
    }
    return shelfSections;
  }, [shelfSections, searchQuery]);

  return (
    <div className="space-y-6">
      
      {/* Optional Spine Guide */}
      {showSpineGuide && (
        <div className="pb-6 animate-in fade-in duration-150">
          <SpineLegend />
        </div>
      )}

      {/* Primary Visual Experience: The Curated Library Shelves */}
      <div>
        {visibleSections.map((section) => (
          <Shelf
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            description={section.description}
            papers={section.papers}
            onSelectPaper={onSelectPaper}
            searchQuery={searchQuery}
          />
        ))}
      </div>

      {/* Secondary Reserve: Anchor Papers, Currently Reading & Read Next */}
      <div className="pt-12 border-t border-[#DDD6C9]/80 mt-16 text-center">
        <button
          onClick={() => setShowCuratedReserves(!showCuratedReserves)}
          className="text-[11px] uppercase tracking-[0.2em] font-sans text-[#78716C] hover:text-[#1C1917] transition-colors"
        >
          {showCuratedReserves ? '— Hide Curated Reserves —' : '+ View Curated Reserves (Anchor Papers & Reading Queue)'}
        </button>

        {showCuratedReserves && (
          <div className="pt-10 text-left animate-in fade-in duration-200">
            <SpecialShelves
              papers={papers}
              onSelectPaper={onSelectPaper}
              searchQuery={searchQuery}
            />
          </div>
        )}
      </div>

    </div>
  );
}
