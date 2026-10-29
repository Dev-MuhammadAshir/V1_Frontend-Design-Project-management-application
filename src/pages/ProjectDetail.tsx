import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { PriorityBadge, StatusBadge, RiskSeverityBadge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import {
  FolderKanban,
  Kanban,
  CheckSquare,
  Users,
  ShieldAlert,
  BarChart2,
  FileText,
  Calendar,
  DollarSign,
  Clock,
  ArrowLeft,
  Plus,
  AlertTriangle,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const {
    projects,
    tasks,
    teams,
    users,
    risks,
    auditLogs,
    openTaskDrawer,
    openRiskModal,
    moveTaskStatus
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'board' | 'list' | 'members' | 'risks' | 'analytics' | 'audit'>('overview');

  const project = projects.find(p => p.id === projectId);
  if (!project) {
    return (
      <EmptyState
        title="Project Not Found"
        description="The project you are looking for does not exist or has been removed."
        actionText="Back to Projects"
        onAction={() => navigate('/projects')}
      />
    );
  }

  const team = teams.find(t => t.id === project.teamId);
  const lead = users.find(u => u.id === project.leadId);
  const projectTasks = tasks.filter(t => t.projectId === project.id);
  const projectRisks = risks.filter(r => r.projectId === project.id);
  const projectAudit = auditLogs.filter(a => a.entityType === 'PROJECT' && a.entityId === project.id || projectTasks.some(t => t.id === a.entityId));

  const completedTasks = projectTasks.filter(t => t.status === 'DONE');
  const inProgressTasks = projectTasks.filter(t => t.status === 'IN_PROGRESS');
  const todoTasks = projectTasks.filter(t => t.status === 'TODO');
  const now = new Date().toISOString().split('T')[0];
  const overdueTasks = projectTasks.filter(t => t.dueDate < now && t.status !== 'DONE');

  // Workload per team member data for S-22 Analytics
  const memberWorkloadData = users
    .filter(u => projectTasks.some(t => t.assigneeId === u.id))
    .map(u => {
      const assignedToUser = projectTasks
        .filter(t => t.assigneeId === u.id)
        .reduce((acc, curr) => acc + curr.estimatedHours, 0);
      return {
        name: u.name.split(' ')[0],
        assigned: assignedToUser,
        capacity: u.capacityHours
      };
    });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FolderKanban },
    { id: 'board', label: 'Board', icon: Kanban, count: projectTasks.length },
    { id: 'list', label: 'Task List', icon: CheckSquare },
    { id: 'members', label: 'Members', icon: Users, count: team?.memberIds.length },
    { id: 'risks', label: 'PIRAE Risks', icon: ShieldAlert, count: projectRisks.length, highlight: projectRisks.length > 0 },
    { id: 'analytics', label: 'Analytics (S-22)', icon: BarChart2 },
    { id: 'audit', label: 'Audit Trail', icon: FileText }
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/projects')}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-500 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs font-bold text-slate-500">{project.key}</span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                  {project.status}
                </span>
                <PriorityBadge priority={project.priority} />
              </div>
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">{project.title}</h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500">Project Lead:</span>
            {lead && (
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200">
                <img src={lead.avatar} alt={lead.name} className="w-5 h-5 rounded-full object-cover" />
                <span className="text-xs font-semibold text-slate-800">{lead.name}</span>
              </div>
            )}
          </div>
        </div>

        {/* Description & KPI strip */}
        <p className="text-xs text-slate-600 leading-relaxed max-w-3xl">
          {project.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-100 text-xs">
          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Target Due Date</span>
            <div className="flex items-center gap-1.5 mt-1 font-mono font-semibold text-slate-800">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{project.dueDate}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Budget & Spend</span>
            <div className="flex items-center gap-1.5 mt-1 font-mono font-semibold text-slate-800">
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
              <span>${project.spent.toLocaleString()} / ${project.budget.toLocaleString()}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Delivery Progress</span>
            <div className="flex items-center gap-1.5 mt-1 font-mono font-bold text-blue-600">
              <TrendingUp className="w-3.5 h-3.5 text-blue-600" />
              <span>{project.progress}% completed</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">Tasks Ratio</span>
            <div className="flex items-center gap-1.5 mt-1 font-mono font-semibold text-slate-800">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-400" />
              <span>{completedTasks.length} done / {projectTasks.length} total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs (S-09) */}
      <div className="border-b border-slate-200 flex items-center gap-2 overflow-x-auto pb-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold rounded-t-lg transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/50'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                    tab.highlight
                      ? 'bg-rose-100 text-rose-700 font-bold'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panels */}
      <div>
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Sprint Milestone State
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Tasks Completed</span>
                    <span className="font-mono font-bold text-slate-800">{completedTasks.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">In Progress</span>
                    <span className="font-mono font-bold text-blue-600">{inProgressTasks.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Backlog (To Do)</span>
                    <span className="font-mono font-bold text-slate-600">{todoTasks.length}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Overdue Deliverables</span>
                    <span className="font-mono font-bold text-rose-600">{overdueTasks.length}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Associated Team
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{team?.name || 'Assigned Team'}</h4>
                    <p className="text-[11px] text-slate-500">{team?.description}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  PIRAE Risk Snapshot
                </h3>
                {projectRisks.length === 0 ? (
                  <p className="text-xs text-emerald-600 font-medium">
                    No active risks identified by PIRAE engine.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {projectRisks.map(r => (
                      <div
                        key={r.id}
                        onClick={() => openRiskModal(r.id)}
                        className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-xs cursor-pointer hover:bg-rose-100 transition-colors flex items-center justify-between"
                      >
                        <span className="font-medium text-rose-900 truncate max-w-[180px]">{r.title}</span>
                        <span className="font-mono font-bold text-rose-700">{r.score}/100</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Board */}
        {activeTab === 'board' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['TODO', 'IN_PROGRESS', 'DONE'].map(statusCol => {
              const colTasks = projectTasks.filter(t => t.status === statusCol);
              return (
                <div key={statusCol} className="bg-slate-100/70 p-3.5 rounded-xl border border-slate-200 min-h-[400px]">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
                    <span className="text-xs font-bold uppercase text-slate-700">{statusCol.replace('_', ' ')}</span>
                    <span className="font-mono text-xs font-bold text-slate-600">{colTasks.length}</span>
                  </div>
                  <div className="space-y-2.5">
                    {colTasks.map(t => (
                      <div
                        key={t.id}
                        onClick={() => openTaskDrawer(t.id)}
                        className="bg-white p-3 rounded-lg border border-slate-200 shadow-2xs hover:border-blue-400 cursor-pointer"
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-mono text-[10px] font-bold text-slate-400">{t.key}</span>
                          <PriorityBadge priority={t.priority} />
                        </div>
                        <h4 className="text-xs font-semibold text-slate-900">{t.title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: List */}
        {activeTab === 'list' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="px-4 py-2.5">Key</th>
                  <th className="px-4 py-2.5">Title</th>
                  <th className="px-4 py-2.5">Status</th>
                  <th className="px-4 py-2.5">Priority</th>
                  <th className="px-4 py-2.5">Due Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projectTasks.map(t => (
                  <tr
                    key={t.id}
                    onClick={() => openTaskDrawer(t.id)}
                    className="hover:bg-slate-50 cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-slate-500">{t.key}</td>
                    <td className="px-4 py-3 font-medium text-slate-900">{t.title}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.status} isBlocked={t.isBlocked} /></td>
                    <td className="px-4 py-3"><PriorityBadge priority={t.priority} /></td>
                    <td className="px-4 py-3 font-mono">{t.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 4: Members */}
        {activeTab === 'members' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {users
              .filter(u => team?.memberIds.includes(u.id))
              .map(member => (
                <div key={member.id} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
                  <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">{member.name}</h4>
                    <p className="text-[11px] text-slate-500">{member.department} · {member.role}</p>
                    <p className="text-[10px] text-blue-600 font-mono mt-0.5">{member.capacityHours}h weekly capacity</p>
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Tab 5: Risks */}
        {activeTab === 'risks' && (
          <div className="space-y-3">
            {projectRisks.map(r => (
              <div
                key={r.id}
                onClick={() => openRiskModal(r.id)}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:border-red-400 cursor-pointer flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <RiskSeverityBadge severity={r.severity} />
                    <span className="text-[11px] font-mono text-slate-400">{r.type}</span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{r.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{r.reason}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-lg font-bold text-rose-600">{r.score}/100</span>
                  <span className="block text-[10px] text-slate-400">Risk Score</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Analytics (S-22 Project Analytics) */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Completion Gauge Card */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Completion Gauge (S-22)
                </h3>
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-28 h-28 rounded-full border-8 border-blue-600 border-t-slate-200 flex items-center justify-center font-mono font-bold text-2xl text-slate-900">
                    {project.progress}%
                  </div>
                  <span className="text-xs text-slate-500 mt-3">Overall Deliverable Completion</span>
                </div>
              </div>

              {/* Workload per Member Chart */}
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Assigned Hours vs Capacity
                </h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={memberWorkloadData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" fontSize={11} />
                      <YAxis fontSize={11} />
                      <Tooltip />
                      <Bar dataKey="assigned" fill="#2563EB" name="Assigned Hrs" />
                      <Bar dataKey="capacity" fill="#94A3B8" name="Capacity Hrs" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Overdue List if any */}
            {overdueTasks.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200">
                <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide mb-2">
                  Overdue Project Deliverables ({overdueTasks.length})
                </h4>
                <div className="space-y-1">
                  {overdueTasks.map(ot => (
                    <div key={ot.id} className="text-xs flex justify-between text-rose-800">
                      <span>{ot.key}: {ot.title}</span>
                      <span className="font-mono">Due: {ot.dueDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 7: Audit */}
        {activeTab === 'audit' && (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium">
                <tr>
                  <th className="px-4 py-2.5">Timestamp</th>
                  <th className="px-4 py-2.5">Action</th>
                  <th className="px-4 py-2.5">Entity</th>
                  <th className="px-4 py-2.5">Severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projectAudit.map(a => (
                  <tr key={a.id}>
                    <td className="px-4 py-2.5 font-mono text-slate-500">{new Date(a.timestamp).toLocaleString()}</td>
                    <td className="px-4 py-2.5 font-medium text-slate-800">{a.action}</td>
                    <td className="px-4 py-2.5 text-slate-600">{a.entityName}</td>
                    <td className="px-4 py-2.5">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {a.severity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
