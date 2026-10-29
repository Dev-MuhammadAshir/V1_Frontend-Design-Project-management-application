import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Users, FolderKanban, ArrowLeft, Plus, Trash2, X } from 'lucide-react';
import { RoleBadge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';

export const TeamDetail: React.FC = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const navigate = useNavigate();
  const { teams, users, projects, addMemberToTeam, removeMemberFromTeam, currentUser } = useApp();

  const [activeTab, setActiveTab] = useState<'members' | 'projects'>('members');
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');

  const team = teams.find(t => t.id === teamId);
  if (!team) {
    return (
      <EmptyState
        title="Team Not Found"
        description="The team you are looking for does not exist."
        actionText="Back to Teams"
        onAction={() => navigate('/teams')}
      />
    );
  }

  const lead = users.find(u => u.id === team.leadId);
  const teamMembers = users.filter(u => team.memberIds.includes(u.id));
  const availableUsers = users.filter(u => !team.memberIds.includes(u.id));
  const teamProjects = projects.filter(p => p.teamId === team.id);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) return;
    addMemberToTeam(team.id, selectedUserId);
    setSelectedUserId('');
    setIsAddMemberOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/teams')}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">{team.name}</h1>
              <p className="text-xs text-slate-500 mt-0.5">{team.description}</p>
            </div>
          </div>

          {lead && (
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-200">
              <img src={lead.avatar} alt={lead.name} className="w-6 h-6 rounded-full object-cover" />
              <div className="text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Team Lead</span>
                <span className="font-semibold text-slate-800">{lead.name}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('members')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 cursor-pointer ${
              activeTab === 'members'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Members ({teamMembers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 cursor-pointer ${
              activeTab === 'projects'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FolderKanban className="w-3.5 h-3.5" />
            <span>Projects ({teamProjects.length})</span>
          </button>
        </div>

        {activeTab === 'members' && (currentUser.role === 'ADMIN' || currentUser.role === 'PM') && (
          <button
            onClick={() => setIsAddMemberOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        )}
      </div>

      {/* Tab Panels */}
      {activeTab === 'members' ? (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
              <tr>
                <th className="px-4 py-3">Member</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Capacity Hours</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {teamMembers.map(member => (
                <tr key={member.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <img src={member.avatar} alt={member.name} className="w-7 h-7 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-slate-900">{member.name}</p>
                        <p className="text-[11px] text-slate-400">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <RoleBadge role={member.role} />
                  </td>
                  <td className="px-4 py-3 text-slate-600">{member.department}</td>
                  <td className="px-4 py-3 font-mono font-medium text-slate-700 tabular-nums">
                    {member.capacityHours}h/week
                  </td>
                  <td className="px-4 py-3 text-right">
                    {team.leadId !== member.id && (currentUser.role === 'ADMIN' || currentUser.role === 'PM') && (
                      <button
                        onClick={() => removeMemberFromTeam(team.id, member.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        title="Remove member from team"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {teamProjects.map(p => (
            <div
              key={p.id}
              onClick={() => navigate(`/projects/${p.id}`)}
              className="bg-white p-4 rounded-xl border border-slate-200 hover:border-blue-400 cursor-pointer shadow-2xs transition-all"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-mono text-xs font-bold text-slate-400">{p.key}</span>
                <span className="text-[11px] font-semibold text-slate-700">{p.status}</span>
              </div>
              <h3 className="text-xs font-bold text-slate-900">{p.title}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{p.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Add Member Modal */}
      {isAddMemberOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white rounded-xl shadow-2xl border border-slate-200 p-5 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-900">Add Member to {team.name}</h3>
              <button onClick={() => setIsAddMemberOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Teammate</label>
                <select
                  value={selectedUserId}
                  onChange={e => setSelectedUserId(e.target.value)}
                  className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none"
                  required
                >
                  <option value="">-- Choose User --</option>
                  {availableUsers.map(u => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.role} - {u.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddMemberOpen(false)}
                  className="px-3 py-1.5 rounded text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedUserId}
                  className="px-4 py-1.5 rounded font-semibold text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                >
                  Add to Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
