import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, FolderKanban, ArrowRight, X } from 'lucide-react';
import { CardGridSkeleton } from '../components/common/SkeletonLoader';

export const TeamsList: React.FC = () => {
  const { teams, users, projects, addTeam, currentUser, isSimulatedLoading } = useApp();
  const navigate = useNavigate();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [leadId, setLeadId] = useState(currentUser.id);

  if (isSimulatedLoading) {
    return <CardGridSkeleton count={4} />;
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    addTeam({
      name: name.trim(),
      description: description.trim(),
      leadId,
      memberIds: [leadId]
    });
    setName('');
    setDescription('');
    setIsCreateOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Teams & Departments (S-06)
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Cross-functional pods, platform groups, and project assignments
          </p>
        </div>

        {(currentUser.role === 'ADMIN' || currentUser.role === 'PM') && (
          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Create Team</span>
          </button>
        )}
      </div>

      {/* Team Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {teams.map(team => {
          const lead = users.find(u => u.id === team.leadId);
          const teamProjects = projects.filter(p => p.teamId === team.id);

          return (
            <div
              key={team.id}
              onClick={() => navigate(`/teams/${team.id}`)}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Users className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {team.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    {team.memberIds.length} members
                  </span>
                </div>

                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-2">
                  {team.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                {/* Lead info */}
                <div className="flex items-center gap-2">
                  {lead && (
                    <img
                      src={lead.avatar}
                      alt={lead.name}
                      className="w-5 h-5 rounded-full object-cover border border-slate-200"
                    />
                  )}
                  <span className="text-slate-600 text-[11px]">
                    Lead: <span className="font-semibold text-slate-800">{lead?.name}</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-slate-500">
                    {teamProjects.length} active projects
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-blue-600 transition-colors" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Team Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl border border-slate-200 p-5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">Create New Team</h3>
              <button onClick={() => setIsCreateOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Team Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed Infrastructure Pod"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Scope of work and responsibilities..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Team Lead</label>
                <select
                  value={leadId}
                  onChange={e => setLeadId(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none"
                >
                  {users.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
                >
                  Save Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
