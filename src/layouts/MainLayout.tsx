import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';
import { ToastContainer } from '../components/common/ToastContainer';
import { CommandPalette } from '../components/common/CommandPalette';
import { TaskDetailDrawer } from '../components/tasks/TaskDetailDrawer';
import { RiskDetailModal } from '../components/risks/RiskDetailModal';
import { CreateTaskModal } from '../components/tasks/CreateTaskModal';
import { useApp } from '../context/AppContext';
import { ErrorScreen } from '../pages/ErrorPages';

export const MainLayout: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const { simulatedError, setSimulatedError } = useApp();

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#111827] flex">
      {/* 240px Sidebar */}
      <Sidebar
        isOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Container */}
      <div className="flex-1 flex flex-col md:pl-60 min-w-0">
        {/* 64px Topbar */}
        <Topbar
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          onOpenCreateTask={() => setCreateTaskModalOpen(true)}
        />

        {/* Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {simulatedError ? (
            <ErrorScreen
              code={simulatedError}
              onReset={() => setSimulatedError(null)}
            />
          ) : (
            <Outlet />
          )}
        </main>
      </div>

      {/* Global Interactive Overlays */}
      <ToastContainer />
      <CommandPalette />
      <TaskDetailDrawer />
      <RiskDetailModal />
      <CreateTaskModal
        isOpen={createTaskModalOpen}
        onClose={() => setCreateTaskModalOpen(false)}
      />
    </div>
  );
};
