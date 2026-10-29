import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { PriorityBadge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { CardGridSkeleton } from '../components/common/SkeletonLoader';
import { CreateProjectModal } from '../components/projects/CreateProjectModal';
import {
  FolderKanban,
  Plus,
  LayoutGrid,
  List,
  Search,
  Calendar,
  DollarSign,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { ProjectStatus } from '../types';

export const ProjectsList: React.FC = () => {
  const { projects, teams, users, isSimulatedLoading } = useApp();
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  if (isSimulatedLoading) {
    return <CardGridSkeleton count={4} />;
  }

  const filteredProjects = projects.filter(p => {
    if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return p.title.toLowerCase().includes(q) || p.key.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Projects Portfolio (S-08)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage engineering initiatives, milestones, and PIRAE risk exposure
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:border-blue-500 w-44"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="ACTIVE">Active</option>
            <option value="PLANNING">Planning</option>
            <option value="ON_HOLD">On Hold</option>
            <option value="COMPLETED">Completed</option>
          </select>

          {/* Grid / List toggle */}
          <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded cursor-pointer transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded cursor-pointer transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-2xs text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Create Project Button */}
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* Projects Content */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title="No projects found"
          description="Try adjusting your filter or create a new project initiative."
          actionText="Create Project"
          onAction={() => setIsCreateOpen(true)}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filteredProjects.map(project => {
            const team = teams.find(t => t.id === project.teamId);
            const lead = users.find(u => u.id === project.leadId);

            return (
              <div
                key={project.id}
                onClick={() => navigate(`/projects/${project.id}`)}
                className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-400 transition-all shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar: Key, Status, Priority */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-xs font-bold text-slate-500">
                      {project.key}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {project.status}
                      </span>
                      <PriorityBadge priority={project.priority} />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-mono">
                      <span className="text-slate-500 font-sans">Sprint Progress</span>
                      <span className="font-bold text-slate-900 tabular-nums">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Metrics */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  {/* Left: Lead and Team */}
                  <div className="flex items-center gap-2">
                    {lead && (
                      <img
                        src={lead.avatar}
                        alt={lead.name}
                        title={`Lead: ${lead.name}`}
                        className="w-6 h-6 rounded-full object-cover border border-slate-200"
                      />
                    )}
                    <span className="text-xs font-medium text-slate-600 truncate max-w-[140px]">
                      {team?.name || 'Core Team'}
                    </span>
                  </div>

                  {/* Right: Due Date & PIRAE risks */}
                  <div className="flex items-center gap-3">
                    {project.risksCount > 0 && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        <span>{project.risksCount} risks</span>
                      </span>
                    )}
                    <span className="text-[11px] font-mono text-slate-500">
                      Due {project.dueDate}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-4 py-3">Key</th>
                <th className="px-4 py-3">Project Title</th>
                <th className="px-4 py-3">Team</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Progress</th>
                <th className="px-4 py-3">Due Date</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.map(p => {
                const team = teams.find(t => t.id === p.teamId);
                return (
                  <tr
                    key={p.id}
                    onClick={() => navigate(`/projects/${p.id}`)}
                    className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-slate-500">{p.key}</td>
                    <td className="px-4 py-3 font-semibold text-slate-900">{p.title}</td>
                    <td className="px-4 py-3 text-slate-600">{team?.name}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {p.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono tabular-nums">{p.progress}%</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{p.dueDate}</td>
                    <td className="px-4 py-3 text-right">
                      <button className="text-blue-600 font-semibold hover:text-blue-800">
                        Details →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <CreateProjectModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
      />
    </div>
  );
};
