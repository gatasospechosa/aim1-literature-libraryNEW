'use client';

import React, { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { PaperFormModal } from '@/components/PaperFormModal';
import { PaperDetailDrawer } from '@/components/PaperDetailDrawer';
import { useLibrary } from '@/context/LibraryContext';
import { Paper } from '@/types/paper';

export function AppShell({ children }: { children: React.ReactNode }) {
  const { addPaper, updatePaper } = useLibrary();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editPaper, setEditPaper] = useState<Paper | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null);

  const handleOpenAddModal = () => {
    setEditPaper(null);
    setAddModalOpen(true);
  };

  const handleOpenEditModal = (paper: Paper) => {
    setEditPaper(paper);
    setAddModalOpen(true);
  };

  const handleSavePaper = (data: any) => {
    if (editPaper) {
      updatePaper(editPaper.id, data);
      if (selectedPaper && selectedPaper.id === editPaper.id) {
        setSelectedPaper({ ...selectedPaper, ...data });
      }
    } else {
      addPaper(data);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1C1917]">
      <Navigation onOpenAddModal={handleOpenAddModal} />

      <main className="flex-1">
        {children}
      </main>

      {/* Academic Colophon & Footer */}
      <footer className="border-t border-[#E6E1D8] bg-[#FAF8F5] py-8 mt-16 text-xs text-[#78716C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="font-serif font-bold text-[#1C1917]">Aim 1 Literature Library</div>
            <div className="text-[11px] mt-0.5">
              Doctoral Research Framework: Foresight, financial consequences & labour-market decision-making in unpaid care.
            </div>
          </div>
          <div className="flex items-center space-x-6 text-[11px]">
            <span>Local Seed Database</span>
            <span>•</span>
            <span>Extensible to Aim 2 & Aim 3</span>
            <span>•</span>
            <span>British English Edition</span>
          </div>
        </div>
      </footer>

      {/* Global Add/Edit Modal */}
      <PaperFormModal
        isOpen={addModalOpen}
        paper={editPaper}
        onClose={() => setAddModalOpen(false)}
        onSave={handleSavePaper}
      />

      {/* Global Paper Detail Drawer */}
      <PaperDetailDrawer
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
        onSelectPaper={(p) => setSelectedPaper(p)}
        onOpenEditModal={(p) => handleOpenEditModal(p)}
      />
    </div>
  );
}
