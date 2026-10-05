'use client';

import React, { useState } from 'react';
import { Paper } from '@/types/paper';

interface PaperSpineProps {
  paper: Paper;
  onSelect: (paper: Paper) => void;
  isSearchMatch?: boolean;
  hasActiveSearch?: boolean;
  isMultiStage?: boolean;
}

// Sophisticated archival palette mirroring the reference photo:
// ~68% light & medium neutrals (white, cream, sage, grey, stone, oatmeal, dusty seafoam, pale ochre)
// ~32% rich dark accents (jet black, deep navy, rich plum burgundy, espresso, dark charcoal)
function getSpineAesthetic(paper: Paper) {
  const hash = paper.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const archivePalettes = [
    // 0: Clean Paperback White
    { bg: 'bg-[#F7F6F2]', text: 'text-[#201D1A]', meta: 'text-[#7D766D]', border: 'border-[#DDD8CF]', rule: 'bg-[#D6CEBF]', isLight: true },
    // 1: Warm Cream
    { bg: 'bg-[#F4EFE6]', text: 'text-[#221F1C]', meta: 'text-[#7A7369]', border: 'border-[#DBD3C7]', rule: 'bg-[#D0C5B3]', isLight: true },
    // 2: Pale Fog Grey
    { bg: 'bg-[#DFE2E5]', text: 'text-[#161D24]', meta: 'text-[#5F6A76]', border: 'border-[#C6CDD3]', rule: 'bg-[#B0BAC2]', isLight: true },
    // 3: Soft Sage Mist
    { bg: 'bg-[#DFE6DF]', text: 'text-[#152319]', meta: 'text-[#5A6D5E]', border: 'border-[#C5D2C5]', rule: 'bg-[#ADC0AE]', isLight: true },
    // 4: Warm Oatmeal
    { bg: 'bg-[#EAE4D8]', text: 'text-[#25201A]', meta: 'text-[#736B5E]', border: 'border-[#D7CCBC]', rule: 'bg-[#C7BAA6]', isLight: true },
    // 5: Pale Seafoam / Mint Grey
    { bg: 'bg-[#D6E4DE]', text: 'text-[#13231E]', meta: 'text-[#4F6A62]', border: 'border-[#BCD2C7]', rule: 'bg-[#A1BEB2]', isLight: true },
    // 6: Dove Limestone
    { bg: 'bg-[#E2DDD5]', text: 'text-[#221E1B]', meta: 'text-[#70685E]', border: 'border-[#CEC6BB]', rule: 'bg-[#BDB2A3]', isLight: true },
    // 7: Dusty Sky Blue
    { bg: 'bg-[#D6DFE8]', text: 'text-[#14202D]', meta: 'text-[#55697D]', border: 'border-[#BCCADA]', rule: 'bg-[#A0B5CB]', isLight: true },
    // 8: Pale Ochre Sand
    { bg: 'bg-[#EBE2D0]', text: 'text-[#2A2114]', meta: 'text-[#7A674A]', border: 'border-[#D7C9AE]', rule: 'bg-[#C2B191]', isLight: true },
    // 9: Muted Terracotta Sand
    { bg: 'bg-[#EADED7]', text: 'text-[#301E17]', meta: 'text-[#7A5D52]', border: 'border-[#D4C0B5]', rule: 'bg-[#BF9F90]', isLight: true },
    // 10: Pale Parchment
    { bg: 'bg-[#F2EDE2]', text: 'text-[#221E1A]', meta: 'text-[#7A7266]', border: 'border-[#DBD1C2]', rule: 'bg-[#CABA9B]', isLight: true },

    // --- Rich Dark Accents (~32%) ---
    // 11: Jet Archival Black
    { bg: 'bg-[#181716]', text: 'text-[#FAF7F0]', meta: 'text-[#B8B4AC]', border: 'border-[#2A2827]', rule: 'bg-[#44413F]', isLight: false },
    // 12: Deep Midnight Navy
    { bg: 'bg-[#202936]', text: 'text-[#FAF8F5]', meta: 'text-[#B9C7D8]', border: 'border-[#303E52]', rule: 'bg-[#475A74]', isLight: false },
    // 13: Rich Plum Burgundy
    { bg: 'bg-[#3A222A]', text: 'text-[#FDF8F9]', meta: 'text-[#D5B0BD]', border: 'border-[#4F2F39]', rule: 'bg-[#673E4B]', isLight: false },
    // 14: Dark Slate Charcoal
    { bg: 'bg-[#28292B]', text: 'text-[#F7F5F0]', meta: 'text-[#BCBBB9]', border: 'border-[#3A3B3E]', rule: 'bg-[#525458]', isLight: false },
    // 15: Warm Dark Espresso
    { bg: 'bg-[#302822]', text: 'text-[#FAF5EE]', meta: 'text-[#CBC0B4]', border: 'border-[#453A32]', rule: 'bg-[#5D4E43]', isLight: false },
  ];

  const palette = archivePalettes[hash % archivePalettes.length];

  // Generously scaled widths for prominent, readable book titles (56px to 108px)
  let width = 74;
  const widthTier = hash % 6;
  if (widthTier === 0) width = 56; // Slim monograph
  else if (widthTier === 1) width = 66; // Slender volume
  else if (widthTier === 2) width = 76; // Standard volume
  else if (widthTier === 3) width = 86; // Medium book
  else if (widthTier === 4) width = 96; // Substantial volume
  else width = 108; // Heavy tome

  // Anchor papers and high importance get maximum physical breadth
  if (paper.isCoreAim1 || paper.importanceRating === 5) {
    width = Math.max(width, 88);
  }

  // Taller heights (370px to 455px) for commanding presence and large typography
  let baseHeight = 395;
  if (paper.importanceRating === 5 || paper.isCoreAim1) {
    baseHeight = 445;
  } else if (paper.importanceRating === 4) {
    baseHeight = 420;
  } else if (paper.importanceRating === 3) {
    baseHeight = 395;
  } else {
    baseHeight = 375;
  }

  // Organic micro-height variation (+/- 14px) to mirror the authentic physical bookshelf skyline
  const heightVariation = ((hash * 11) % 29) - 14;
  const height = baseHeight + heightVariation;

  // Typographic layout variant (0 to 4)
  const layoutVariant = hash % 5;

  return { palette, height, width, layoutVariant };
}

// Quiet hairline dot for evidence classification
export function getEvidenceAccent(type: Paper['evidenceType']) {
  switch (type) {
    case 'Foresight & Anticipation':
      return { dot: 'bg-[#34603E]', label: 'Foresight & Anticipation' };
    case 'Consequences Only':
      return { dot: 'bg-[#3D5B78]', label: 'Consequences Only' };
    case 'Bridge / Both':
      return { dot: 'bg-[#8F6126]', label: 'Bridge / Both' };
    case 'Theoretical / Conceptual':
      return { dot: 'bg-[#752F48]', label: 'Theoretical Framework' };
  }
}

export function PaperSpine({
  paper,
  onSelect,
  isSearchMatch = true,
  hasActiveSearch = false,
  isMultiStage = false
}: PaperSpineProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { palette, height, width, layoutVariant } = getSpineAesthetic(paper);
  const evidenceAccent = getEvidenceAccent(paper.evidenceType);

  // Author surname formatting
  const firstAuthorSurname = paper.authors[0]?.split(' ').pop() || 'Author';
  const authorDisplay = paper.authors.length > 2
    ? `${firstAuthorSurname} et al.`
    : paper.authors.length === 2
      ? `${firstAuthorSurname} & ${paper.authors[1]?.split(' ').pop()}`
      : firstAuthorSurname;

  // Shortened title for spine with more characters visible on the taller, wider spine
  const spineTitle = paper.title.length > 68 ? `${paper.title.substring(0, 65)}…` : paper.title;

  const isReading = paper.readingStatus === 'Reading';
  const isReadNext = paper.readingQueueCategory === 'Read next';

  // Dimming when a search query is active and this paper is not a match
  const isDimmed = hasActiveSearch && !isSearchMatch;

  return (
    <div className="relative group shrink-0 flex flex-col items-center justify-end select-none">
      
      {/* Ribbon Bookmark for active reading */}
      {(isReading || isReadNext) && (
        <div
          className={`absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-2.5 h-6 rounded-t-xs transition-opacity ${
            isDimmed ? 'opacity-20' : 'opacity-95'
          } ${isReading ? 'bg-[#A85338]' : 'bg-[#B08A42]'}`}
          title={isReading ? 'Currently Reading' : 'Read Next'}
        />
      )}

      {/* Tactile 3D Curved Paper Spine (Enlarged Scale for Clear Readability) */}
      <button
        type="button"
        onClick={() => onSelect(paper)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        style={{
          height: `${height}px`,
          width: `${width}px`,
          boxShadow: isHovered
            ? '0 26px 44px rgba(0,0,0,0.18), inset 3px 0 5px rgba(0,0,0,0.18), inset -3px 0 5px rgba(0,0,0,0.22)'
            : '0 4px 10px rgba(0,0,0,0.08), inset 2px 0 4px rgba(0,0,0,0.12), inset -2px 0 4px rgba(0,0,0,0.16)',
        }}
        aria-label={`Paper: ${paper.title} by ${paper.authors.join(', ')} (${paper.year}). Evidence type: ${paper.evidenceType}. Status: ${paper.readingStatus}.`}
        className={`relative cursor-pointer transition-all duration-300 ease-out flex flex-col justify-between py-4 px-2 rounded-t-[5px] border-l border-r border-t focus:outline-none ${
          palette.bg
        } ${palette.border} ${
          isDimmed
            ? 'opacity-20 grayscale'
            : isHovered
              ? '-translate-y-6 z-30 ring-1 ring-[#1C1917]/30'
              : 'hover:-translate-y-2.5'
        }`}
      >
        {/* Realistic spine hinge cylindrical highlight overlay */}
        <div className="pointer-events-none absolute inset-0 rounded-t-[5px] bg-gradient-to-r from-black/[0.08] via-white/[0.1] to-black/[0.14]" />

        {/* TOP OF SPINE */}
        <div className="relative z-10 flex flex-col items-center w-full">
          
          {/* Refined Anchor Indicator: hairline gold rule */}
          {paper.isCoreAim1 ? (
            <div className="w-6 h-[2.5px] bg-[#B08A42] mb-2.5 opacity-95 rounded-full shadow-2xs" title="Core Aim 1 Paper" />
          ) : (
            <div className={`w-5 h-[1.5px] ${palette.rule} opacity-40 mb-2.5`} />
          )}

          {/* Top Label based on Layout Variant */}
          {layoutVariant === 0 && (
            // Variant 0: Horizontal Author & Year
            <>
              <span className={`text-[12px] font-sans font-semibold uppercase tracking-[0.18em] truncate max-w-full text-center ${palette.text}`}>
                {firstAuthorSurname}
              </span>
              <span className={`text-[11.5px] font-serif italic mt-0.5 leading-none ${palette.meta}`}>
                {paper.year}
              </span>
            </>
          )}

          {layoutVariant === 1 && (
            // Variant 1: Monograph - Author Only
            <span className={`text-[13px] font-serif tracking-[0.06em] font-medium truncate max-w-full text-center ${palette.text}`}>
              {firstAuthorSurname}
            </span>
          )}

          {layoutVariant === 2 && (
            // Variant 2: Modernist - Year Only
            <span className={`text-[11px] font-mono tracking-widest leading-none font-semibold ${palette.meta}`}>
              {paper.year}
            </span>
          )}

          {layoutVariant === 3 && (
            // Variant 3: Academic Volume - Short uppercase
            <span className={`text-[12px] font-sans uppercase tracking-[0.2em] font-semibold truncate max-w-full text-center opacity-90 ${palette.text}`}>
              {firstAuthorSurname}
            </span>
          )}

          {layoutVariant === 4 && (
            // Variant 4: Bold Title Monograph (no top text)
            <div className={`w-4 h-[1.5px] ${palette.rule} opacity-60 mb-1.5`} />
          )}

        </div>

        {/* MIDDLE OF SPINE: Prominently Scaled, Boldly Legible Title */}
        <div className="relative z-10 flex-1 flex items-center justify-center my-3 overflow-hidden w-full px-0.5">
          <span
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
            className={`text-center leading-[1.2] truncate max-h-[290px] ${
              layoutVariant === 1 || layoutVariant === 2
                ? `text-[14px] sm:text-[15px] font-sans uppercase tracking-[0.16em] font-semibold ${palette.text}`
                : layoutVariant === 4
                  ? `text-[14.5px] sm:text-[16px] font-sans uppercase font-bold tracking-[0.12em] ${palette.text}`
                  : `text-[15px] sm:text-[16.5px] font-serif tracking-normal font-medium ${palette.text}`
            }`}
            title={paper.title}
          >
            {spineTitle}
          </span>
        </div>

        {/* BOTTOM OF SPINE */}
        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* Bottom text for variant 1, 2 or 4 */}
          {layoutVariant === 1 && (
            <span className={`text-[11.5px] font-serif italic mb-2 ${palette.meta}`}>
              {paper.year}
            </span>
          )}

          {layoutVariant === 2 && (
            <span className={`text-[12px] font-sans font-semibold uppercase tracking-[0.16em] truncate max-w-full mb-2 ${palette.text}`}>
              {firstAuthorSurname}
            </span>
          )}

          {layoutVariant === 3 && (
            <span className={`text-[11.5px] font-serif italic mb-2 ${palette.meta}`}>
              {paper.year}
            </span>
          )}

          {layoutVariant === 4 && (
            <span className={`text-[11px] font-mono tracking-widest font-semibold mb-2 ${palette.meta}`}>
              {paper.year}
            </span>
          )}

          {/* Classification Hairline Dot / Accent */}
          <div className="flex items-center space-x-1.5 mb-1">
            {(isMultiStage || paper.evidenceType === 'Bridge / Both') && (
              <span className="w-2 h-2 rounded-full bg-[#8F6126] opacity-85" title="Bridge volume" />
            )}
            <span
              className={`w-2.5 h-2.5 rounded-full opacity-90 ${evidenceAccent.dot}`}
              title={`Evidence: ${paper.evidenceType}`}
            />
          </div>

        </div>
      </button>

      {/* Floating Museum / Archive Caption Card on Hover */}
      {isHovered && !isDimmed && (
        <div 
          className="absolute bottom-full mb-5 left-1/2 -translate-x-1/2 w-88 bg-[#FAF8F5] text-[#1C1917] p-5 rounded-md shadow-[0_20px_40px_rgba(0,0,0,0.1),0_2px_8px_rgba(0,0,0,0.04)] border border-[#DDD6C9] z-50 text-left pointer-events-none animate-in fade-in duration-150"
          style={{ minWidth: '320px' }}
        >
          {/* Micro Category Heading */}
          <div className="flex items-center justify-between gap-1 mb-2">
            <span className="text-[10px] uppercase font-mono tracking-[0.2em] text-[#8A847C]">
              {paper.evidenceType}
            </span>
            <span className="text-[11px] text-[#A85338] font-serif italic">
              {paper.aimRelevance}
            </span>
          </div>

          {/* Full Title in Serif */}
          <h4 className="font-serif text-base font-normal leading-snug text-[#1C1917] mb-1.5">
            {paper.title}
          </h4>

          {/* Authors & Journal */}
          <p className="text-[12px] text-[#78716C] font-sans mb-3">
            {authorDisplay} ({paper.year}) • <span className="italic font-serif">{paper.journal}</span>
          </p>

          {/* Candidate Interpretation / Contribution */}
          <div className="border-l border-[#A85338]/60 pl-2.5 py-0.5 text-[11.5px] text-[#44403C] leading-relaxed mb-3">
            <span className="text-[9px] font-sans font-medium uppercase tracking-[0.16em] text-[#823824] block mb-0.5">
              Aim 1 Contribution:
            </span>
            <p className="line-clamp-2">
              {paper.whyThisMattersForAim1}
            </p>
          </div>

          {/* Footer Callout */}
          <div className="pt-2 border-t border-[#E8E2D6] flex items-center justify-between text-[11px] text-[#8A847C]">
            <span>Status: <strong className="text-[#1C1917] font-normal">{paper.readingStatus}</strong></span>
            <span className="text-[#1C1917]">Examine paper &rarr;</span>
          </div>
        </div>
      )}

    </div>
  );
}
