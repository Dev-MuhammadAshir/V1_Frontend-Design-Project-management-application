export type UserRole = 'ADMIN' | 'PM' | 'ENGINEER' | 'VIEWER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'INVITED';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  status: UserStatus;
  capacityHours: number; // 10 - 80 hours/week
  assignedHours: number;
  department: string;
  skills: string[];
  workSchedule?: string;
  phone?: string;
  timeZone?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  leadId: string;
  memberIds: string[];
  activeProjectsCount: number;
  icon?: string;
  color?: string;
}

export type ProjectStatus = 'PLANNING' | 'ACTIVE' | 'ON_HOLD' | 'COMPLETED';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Project {
  id: string;
  key: string;
  title: string;
  description: string;
  status: ProjectStatus;
  priority: PriorityLevel;
  progress: number; // 0 - 100
  startDate: string;
  dueDate: string;
  teamId: string;
  leadId: string;
  memberIds: string[];
  budget: number;
  spent: number;
  openTasksCount: number;
  completedTasksCount: number;
  risksCount: number;
}

export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskDependency {
  taskId: string;
  type: 'BLOCKS' | 'BLOCKED_BY';
}

export interface Task {
  id: string;
  key: string; // e.g. "PRJ-101"
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: PriorityLevel;
  isBlocked: boolean;
  blockedReason?: string;
  assigneeId: string;
  reporterId: string;
  dueDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  subtasks: Subtask[];
  dependencies: TaskDependency[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  canEditUntil: string; // ISO string 15 minutes after creation
}

export type RiskType = 'SCHEDULE_SLIP' | 'RESOURCE_OVERLOAD' | 'DEPENDENCY_BLOCK' | 'SCOPE_CREEP';
export type RiskSeverity = 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
export type LikelihoodLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type ImpactLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type RiskStatus = 'OPEN' | 'IN_REVIEW' | 'MITIGATED' | 'DISMISSED';

export interface Risk {
  id: string;
  projectId: string;
  title: string;
  type: RiskType;
  severity: RiskSeverity;
  score: number; // 1 - 100
  likelihood: LikelihoodLevel;
  impact: ImpactLevel;
  reason: string;
  recommendation: string;
  affectedTaskIds: string[];
  affectedMemberIds: string[];
  status: RiskStatus;
  detectedAt: string;
}

export type NotificationType = 'ASSIGNMENT' | 'MENTION' | 'RISK_ALERT' | 'STATUS_CHANGE' | 'SYSTEM';

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  link: string;
  createdAt: string;
}

export type AuditSeverity = 'INFO' | 'WARNING' | 'CRITICAL';

export interface AuditLog {
  id: string;
  timestamp: string;
  actorId: string;
  action: string;
  entityType: 'TASK' | 'PROJECT' | 'USER' | 'TEAM' | 'RISK' | 'SETTINGS';
  entityId: string;
  entityName: string;
  oldValues?: Record<string, any>;
  newValues?: Record<string, any>;
  severity: AuditSeverity;
}

export interface SystemSettings {
  riskThresholdCritical: number; // e.g. 75
  riskThresholdHigh: number; // e.g. 50
  defaultSprintDays: number; // e.g. 14
  maxCapacityHours: number; // e.g. 40
  emailAlerts: boolean;
  auditRetentionDays: number;
  theme: 'light' | 'dark' | 'system';
}

export interface ActivityItem {
  id: string;
  actorId: string;
  action: string;
  target: string;
  targetType: 'task' | 'project' | 'team';
  timestamp: string;
}
