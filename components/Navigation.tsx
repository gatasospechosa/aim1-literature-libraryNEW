'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLibrary } from '@/context/LibraryContext';
import { 
  BookOpen, 
  Layers, 
  Compass, 
  GraduationCap, 
  Clock, 
  Workflow, 
  Home, 
  Search, 
  Download, 
  Plus, 
  ChevronDown,
  Sparkles,
  Info
} from 'lucide-react';

interface NavigationProps {
  onOpenAddModal?: () => void;
}

export function Navigation({ onOpenAddModal }: NavigationProps) {
  const pathname = usePathname();
  const { currentAim, setCurrentAim, metrics, exportDataAsJson, searchQuery, setSearchQuery } = useLibrary();
  const [aimDropdownOpen, setAimDropdownOpen] = useState(false);
  const [showAimModal, setShowAimModal] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/library', label: 'Library', icon: BookOpen, badge: metrics.totalPapers },
    { href: '/themes', label: 'Themes', icon: Layers },
    { href: '/case-for-aim1', label: 'Case for Aim 1', icon: GraduationCap },
    { href: '/methods', label: 'Methods', icon: Compass },
    { href: '/reading-queue', label: 'Reading Queue', icon: Clock, badge: metrics.toReadPapers },
    { href: '/research-map', label: 'Research Map', icon: Workflow },
  ];

  return (
    <>
      {/* Slender Understated Editorial Navigation */}
      <header className="border-b border-[#DDD7CD]/80 bg-[#EAE6DF]/90 backdrop-blur-md sticky top-0 z-40 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-13 py-2.5">
            
            {/* Left: Minimal Brand & Subtle Aim Indicator */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 group">
                <span className="font-serif text-sm sm:text-base font-normal text-[#1C1917] tracking-tight group-hover:text-[#A85338] transition-colors">
                  Aim 1 Literature Library
                </span>
              </Link>

              {/* Quiet Aim Switcher */}
              <div className="relative">
                <button
                  onClick={() => setAimDropdownOpen(!aimDropdownOpen)}
                  className="flex items-center space-x-1 px-2 py-0.5 text-[10px] tracking-[0.1em] uppercase font-sans rounded-full bg-[#F2EDE4] text-[#6E6961] hover:text-[#1C1917] transition-colors border border-[#DDD6C9]"
                  title="PhD Research Architecture"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#A85338]"></span>
                  <span>{currentAim}</span>
                  <ChevronDown className="w-2.5 h-2.5 opacity-60" />
                </button>

                {aimDropdownOpen && (
                  <div className="absolute left-0 mt-2 w-64 rounded-md shadow-xl bg-[#FAF8F5] border border-[#DDD6C9] py-1.5 z-50 text-xs">
                    <div className="px-3 py-1.5 text-[10px] font-sans font-medium text-[#8A847C] uppercase tracking-[0.2em] border-b border-[#EFEAE1]">
                      PhD Research Architecture
                    </div>
                    <button
                      onClick={() => { setCurrentAim('Aim 1'); setAimDropdownOpen(false); }}
                      className={`w-full text-left px-3 py-2 flex items-center justify-between hover:bg-[#F2ECE1] ${currentAim === 'Aim 1' ? 'bg-[#F2ECE1] font-medium text-[#1C1917]' : 'text-[#5C564E]'}`}
                    >
                      <div>
                        <div className="font-serif">Aim 1: Foresight & Financial Decisions</div>
                        <div className="text-[10px] text-[#8A847C]">Current active research library</div>
                      </div>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A85338]"></span>
                    </button>
                    <div 
                      onClick={() => { setAimDropdownOpen(false); setShowAimModal(true); }}
                      className="px-3 py-2 text-left cursor-pointer hover:bg-[#F2ECE1] text-[#8A847C]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-[#44403C]">Aim 2: Workplace Dynamics</span>
                        <span className="text-[9px] bg-[#EAE3D6] text-[#6E6961] px-1 py-0.2 rounded font-sans uppercase">Upcoming</span>
                      </div>
                      <div className="text-[10px]">Employer flexibility & career retention</div>
                    </div>
                    <div 
                      onClick={() => { setAimDropdownOpen(false); setShowAimModal(true); }}
                      className="px-3 py-2 text-left cursor-pointer hover:bg-[#F2ECE1] text-[#8A847C]"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-[#44403C]">Aim 3: Policy Simulations</span>
                        <span className="text-[9px] bg-[#EAE3D6] text-[#6E6961] px-1 py-0.2 rounded font-sans uppercase">Upcoming</span>
                      </div>
                      <div className="text-[10px]">Pension models & long-term welfare</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Center/Right: Streamlined Navigation Links */}
            <div className="flex items-center space-x-1 sm:space-x-5 overflow-x-auto no-scrollbar py-0.5">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center space-x-1 px-2 py-1 text-[11px] uppercase tracking-[0.14em] font-sans whitespace-nowrap transition-colors ${
                      isActive
                        ? 'text-[#1C1917] font-semibold border-b border-[#1C1917]'
                        : 'text-[#7D766C] hover:text-[#1C1917]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge !== undefined && (
                      <span className="text-[9px] opacity-70 ml-0.5 font-mono">
                        ({link.badge})
                      </span>
                    )}
                  </Link>
                );
              })}

              <div className="hidden md:block h-3 w-[1px] bg-[#DDD6C9] mx-1" />

              {/* Understated JSON Export */}
              <button
                onClick={exportDataAsJson}
                className="hidden md:inline-flex items-center text-[10px] uppercase tracking-[0.15em] font-sans text-[#8A847C] hover:text-[#1C1917] transition-colors"
                title="Export all library papers as JSON"
              >
                <span>Export</span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* Aim 2 & 3 Expansion Modal */}
      {showAimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs p-4">
          <div className="bg-[#FAF8F5] border border-[#DDD8D0] rounded-lg max-w-md w-full p-6 shadow-xl text-[#1C1917]">
            <div className="flex items-center space-x-2 text-[#A85338] mb-3">
              <Sparkles className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold">Future Aim Extension</h3>
            </div>
            <p className="text-sm text-[#44403C] mb-4 leading-relaxed">
              The application architecture is explicitly designed so you can later expand to <strong>Aim 2</strong> (Workplace dynamics & career retention) and <strong>Aim 3</strong> (Pension simulation & long-term welfare policy) without redesigning or rebuilding the system.
            </p>
            <p className="text-xs text-[#78716C] mb-6">
              Papers can already be tagged with multiple Aim labels (<code className="bg-[#EFECE6] px-1 py-0.5 rounded font-mono">Aim 1</code>, <code className="bg-[#EFECE6] px-1 py-0.5 rounded font-mono">Aim 2</code>, <code className="bg-[#EFECE6] px-1 py-0.5 rounded font-mono">Aim 3</code>), and database tables can be connected to Supabase without structural migrations.
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAimModal(false)}
                className="px-4 py-2 text-xs font-semibold rounded bg-[#1C1917] text-[#FAF8F5] hover:bg-[#332F2C]"
              >
                Understood, Return to Aim 1
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
