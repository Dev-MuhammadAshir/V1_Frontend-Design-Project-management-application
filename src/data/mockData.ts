import {
  User,
  Team,
  Project,
  Task,
  Comment,
  Risk,
  AuditLog,
  Notification,
  SystemSettings,
  ActivityItem
} from '../types';

export const initialUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Elena Rostova',
    email: 'elena.rostova@acme-corp.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    role: 'ADMIN',
    status: 'ACTIVE',
    capacityHours: 40,
    assignedHours: 32,
    department: 'Engineering Leadership',
    skills: ['Architecture', 'Kubernetes', 'Go', 'Distributed Systems'],
    workSchedule: 'Mon-Fri 09:00 - 17:00 EST',
    phone: '+1 (555) 234-8901',
    timeZone: 'America/New_York'
  },
  {
    id: 'usr-2',
    name: 'Marcus Vance',
    email: 'marcus.vance@acme-corp.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    role: 'PM',
    status: 'ACTIVE',
    capacityHours: 40,
    assignedHours: 28,
    department: 'Product Management',
    skills: ['Scrum', 'Risk Modeling', 'Roadmapping', 'User Research'],
    workSchedule: 'Mon-Fri 09:00 - 18:00 EST',
    phone: '+1 (555) 432-1098',
    timeZone: 'America/New_York'
  },
  {
    id: 'usr-3',
    name: 'Priya Sharma',
    email: 'priya.sharma@acme-corp.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    role: 'ENGINEER',
    status: 'ACTIVE',
    capacityHours: 35,
    assignedHours: 42, // Overloaded! (Triggers PIRAE Resource Overload)
    department: 'Core Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'State Machines'],
    workSchedule: 'Mon-Fri 08:30 - 16:30 PST',
    phone: '+1 (555) 678-3456',
    timeZone: 'America/Los_Angeles'
  },
  {
    id: 'usr-4',
    name: 'Liam Henderson',
    email: 'liam.henderson@acme-corp.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    role: 'ENGINEER',
    status: 'ACTIVE',
    capacityHours: 40,
    assignedHours: 24,
    department: 'Cloud Infrastructure',
    skills: ['Terraform', 'AWS', 'Docker', 'PostgreSQL', 'CI/CD'],
    workSchedule: 'Mon-Fri 09:00 - 17:00 CST',
    phone: '+1 (555) 789-0123',
    timeZone: 'America/Chicago'
  },
  {
    id: 'usr-5',
    name: 'Sofia Chen',
    email: 'sofia.chen@acme-corp.com',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=150&q=80',
    role: 'ENGINEER',
    status: 'ACTIVE',
    capacityHours: 40,
    assignedHours: 18,
    department: 'Design Systems',
    skills: ['UI/UX', 'Figma', 'Accessibility (a11y)', 'Design Tokens'],
    workSchedule: 'Mon-Fri 10:00 - 18:00 EST',
    phone: '+1 (555) 890-1234',
    timeZone: 'America/New_York'
  },
  {
    id: 'usr-6',
    name: 'David O\'Connor',
    email: 'david.oconnor@acme-corp.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80',
    role: 'VIEWER',
    status: 'ACTIVE',
    capacityHours: 20,
    assignedHours: 0,
    department: 'Quality Assurance & Compliance',
    skills: ['Audit', 'SOC2', 'Penetration Testing'],
    workSchedule: 'Part-Time 10:00 - 14:00 GMT',
    phone: '+44 20 7946 0912',
    timeZone: 'Europe/London'
  }
];

export const initialTeams: Team[] = [
  {
    id: 'tm-1',
    name: 'Core Platform Engineering',
    description: 'Responsible for backend distributed microservices, messaging queues, and primary database orchestration.',
    leadId: 'usr-1',
    memberIds: ['usr-1', 'usr-3', 'usr-4'],
    activeProjectsCount: 2,
    icon: 'Layers',
    color: '#2563EB'
  },
  {
    id: 'tm-2',
    name: 'Design & Experience (UI/UX)',
    description: 'Architecting design tokens, accessible component library, and frictionless design-to-code workflows.',
    leadId: 'usr-5',
    memberIds: ['usr-3', 'usr-5'],
    activeProjectsCount: 1,
    icon: 'Palette',
    color: '#7C3AED'
  },
  {
    id: 'tm-3',
    name: 'Cloud Infrastructure & SRE',
    description: 'Manages Kubernetes cluster telemetry, zero-downtime CI/CD pipelines, and multi-region failovers.',
    leadId: 'usr-4',
    memberIds: ['usr-1', 'usr-4'],
    activeProjectsCount: 1,
    icon: 'Cloud',
    color: '#059669'
  },
  {
    id: 'tm-4',
    name: 'Product & Intelligence',
    description: 'Directs roadmap, risk mitigation strategies (PIRAE), sprint milestones, and user feedback loops.',
    leadId: 'usr-2',
    memberIds: ['usr-2', 'usr-6'],
    activeProjectsCount: 2,
    icon: 'Sparkles',
    color: '#D97706'
  }
];

export const initialProjects: Project[] = [
  {
    id: 'prj-1',
    key: 'PRF-1',
    title: 'Cloud-Native Microservices Migration',
    description: 'Modernizing legacy monolithic backend into event-driven Go and Kafka services with zero downtime.',
    status: 'ACTIVE',
    priority: 'HIGH',
    progress: 68,
    startDate: '2026-08-01',
    dueDate: '2026-11-30',
    teamId: 'tm-1',
    leadId: 'usr-1',
    memberIds: ['usr-1', 'usr-3', 'usr-4'],
    budget: 180000,
    spent: 122400,
    openTasksCount: 5,
    completedTasksCount: 11,
    risksCount: 2
  },
  {
    id: 'prj-2',
    key: 'PRF-2',
    title: 'Design System 3.0 & Token Architecture',
    description: 'Complete overhaul of unified cross-platform component tokens, WCAG 2.2 AA accessibility, and dark mode.',
    status: 'ACTIVE',
    priority: 'CRITICAL',
    progress: 42,
    startDate: '2026-09-15',
    dueDate: '2026-12-15',
    teamId: 'tm-2',
    leadId: 'usr-5',
    memberIds: ['usr-3', 'usr-5'],
    budget: 95000,
    spent: 44200,
    openTasksCount: 6,
    completedTasksCount: 4,
    risksCount: 3
  },
  {
    id: 'prj-3',
    key: 'PRF-3',
    title: 'Zero-Trust Security & SOC2 Compliance',
    description: 'Implementing mTLS service mesh, centralized audit trail hashing, and role-based privilege access.',
    status: 'PLANNING',
    priority: 'MEDIUM',
    progress: 15,
    startDate: '2026-11-01',
    dueDate: '2027-02-28',
    teamId: 'tm-3',
    leadId: 'usr-4',
    memberIds: ['usr-1', 'usr-4', 'usr-6'],
    budget: 120000,
    spent: 18000,
    openTasksCount: 4,
    completedTasksCount: 1,
    risksCount: 1
  },
  {
    id: 'prj-4',
    key: 'PRF-4',
    title: 'Real-Time PIRAE Risk Intelligence Engine',
    description: 'Automated heuristics engine to detect sprint velocity slip, resource over-allocation, and dependency bottlenecks.',
    status: 'ACTIVE',
    priority: 'HIGH',
    progress: 84,
    startDate: '2026-07-10',
    dueDate: '2026-11-15',
    teamId: 'tm-4',
    leadId: 'usr-2',
    memberIds: ['usr-1', 'usr-2', 'usr-3'],
    budget: 145000,
    spent: 118000,
    openTasksCount: 2,
    completedTasksCount: 14,
    risksCount: 1
  }
];

export const initialTasks: Task[] = [
  {
    id: 'tsk-101',
    key: 'PRF-101',
    projectId: 'prj-1',
    title: 'Configure Kafka distributed event consumer with idempotency',
    description: 'Implement consumer groups with strict partition key ordering and commit-offset handling for financial transaction logs.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    isBlocked: false,
    assigneeId: 'usr-1',
    reporterId: 'usr-2',
    dueDate: '2026-11-05',
    estimatedHours: 16,
    actualHours: 10,
    tags: ['Backend', 'Kafka', 'Architecture'],
    subtasks: [
      { id: 'sub-1', title: 'Define Avro schema registry protocols', completed: true },
      { id: 'sub-2', title: 'Implement Redis de-duplication cache key', completed: true },
      { id: 'sub-3', title: 'Load testing with 20k events/sec', completed: false }
    ],
    dependencies: [],
    createdAt: '2026-10-15T09:30:00Z',
    updatedAt: '2026-10-27T14:15:00Z'
  },
  {
    id: 'tsk-102',
    key: 'PRF-102',
    projectId: 'prj-1',
    title: 'PostgreSQL database sharding and connection pooling setup',
    description: 'Tune PgBouncer configuration and set up schema partition keys across hot/cold query clusters.',
    status: 'TODO',
    priority: 'CRITICAL',
    isBlocked: true,
    blockedReason: 'Awaiting AWS RDS cluster quota expansion approval from security board',
    assigneeId: 'usr-4',
    reporterId: 'usr-1',
    dueDate: '2026-11-08',
    estimatedHours: 20,
    actualHours: 4,
    tags: ['Database', 'DevOps', 'PostgreSQL'],
    subtasks: [
      { id: 'sub-4', title: 'Benchmark connection limit under stress', completed: false },
      { id: 'sub-5', title: 'Setup read replica health check probes', completed: false }
    ],
    dependencies: [{ taskId: 'tsk-101', type: 'BLOCKED_BY' }],
    createdAt: '2026-10-18T11:00:00Z',
    updatedAt: '2026-10-26T16:00:00Z'
  },
  {
    id: 'tsk-103',
    key: 'PRF-103',
    projectId: 'prj-1',
    title: 'Implement API gateway rate limiting with token bucket',
    description: 'Enforce Tier-1 and Tier-2 client quotas using distributed Redis counters with sliding window algorithm.',
    status: 'DONE',
    priority: 'MEDIUM',
    isBlocked: false,
    assigneeId: 'usr-3',
    reporterId: 'usr-1',
    dueDate: '2026-10-24',
    estimatedHours: 12,
    actualHours: 11,
    tags: ['Gateway', 'Security', 'Redis'],
    subtasks: [
      { id: 'sub-6', title: 'Write unit tests for sliding window algorithm', completed: true },
      { id: 'sub-7', title: 'Deploy proxy route to staging cluster', completed: true }
    ],
    dependencies: [],
    createdAt: '2026-10-10T08:00:00Z',
    updatedAt: '2026-10-24T18:30:00Z'
  },
  {
    id: 'tsk-104',
    key: 'PRF-104',
    projectId: 'prj-2',
    title: 'Audit and rebuild form components for WCAG 2.2 compliance',
    description: 'Refactor accessible error announcements, focus rings, keyboard navigation (Tab/Shift-Tab), and aria-live regions.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    isBlocked: false,
    assigneeId: 'usr-3',
    reporterId: 'usr-5',
    dueDate: '2026-10-31',
    estimatedHours: 22,
    actualHours: 18,
    tags: ['Design System', 'a11y', 'React'],
    subtasks: [
      { id: 'sub-8', title: 'Form error message aria-describedby linkage', completed: true },
      { id: 'sub-9', title: 'Screen reader voiceover pass with NVDA', completed: true },
      { id: 'sub-10', title: 'High contrast ratio verification (>4.5:1)', completed: false }
    ],
    dependencies: [],
    createdAt: '2026-10-12T10:00:00Z',
    updatedAt: '2026-10-28T05:45:00Z'
  },
  {
    id: 'tsk-105',
    key: 'PRF-105',
    projectId: 'prj-2',
    title: 'Figma token synchronization GitHub action pipeline',
    description: 'Build CI workflow to export JSON design tokens from Figma REST API, compile Tailwind configs and validate diffs.',
    status: 'TODO',
    priority: 'MEDIUM',
    isBlocked: false,
    assigneeId: 'usr-5',
    reporterId: 'usr-2',
    dueDate: '2026-11-12',
    estimatedHours: 14,
    actualHours: 0,
    tags: ['Tokens', 'Automation', 'CI/CD'],
    subtasks: [
      { id: 'sub-11', title: 'Figma webhook integration endpoint', completed: false },
      { id: 'sub-12', title: 'StyleDictionary transform script', completed: false }
    ],
    dependencies: [],
    createdAt: '2026-10-20T14:00:00Z',
    updatedAt: '2026-10-20T14:00:00Z'
  },
  {
    id: 'tsk-106',
    key: 'PRF-106',
    projectId: 'prj-2',
    title: 'Accessible modal dialog component with focus lock',
    description: 'Implement modal backdrop dismiss, Escape key listener, scroll locking, and focus trap cycling.',
    status: 'DONE',
    priority: 'HIGH',
    isBlocked: false,
    assigneeId: 'usr-5',
    reporterId: 'usr-5',
    dueDate: '2026-10-22',
    estimatedHours: 8,
    actualHours: 7,
    tags: ['UI', 'Components', 'Accessibility'],
    subtasks: [
      { id: 'sub-13', title: 'Body scroll lock hook', completed: true },
      { id: 'sub-14', title: 'Initial autofocus element reference', completed: true }
    ],
    dependencies: [],
    createdAt: '2026-10-14T11:20:00Z',
    updatedAt: '2026-10-22T15:10:00Z'
  },
  {
    id: 'tsk-107',
    key: 'PRF-107',
    projectId: 'prj-4',
    title: 'Heuristic calculation algorithm for PIRAE resource overloading',
    description: 'Compute ratio of assigned weekly task hours against nominal capacity hours and flag engineers >110%.',
    status: 'DONE',
    priority: 'CRITICAL',
    isBlocked: false,
    assigneeId: 'usr-1',
    reporterId: 'usr-2',
    dueDate: '2026-10-20',
    estimatedHours: 14,
    actualHours: 13,
    tags: ['PIRAE', 'Algorithms', 'Risk'],
    subtasks: [
      { id: 'sub-15', title: 'Unit test suite for edge case sprint boundaries', completed: true },
      { id: 'sub-16', title: 'Real-time alert trigger pipeline', completed: true }
    ],
    dependencies: [],
    createdAt: '2026-10-08T09:00:00Z',
    updatedAt: '2026-10-20T17:40:00Z'
  },
  {
    id: 'tsk-108',
    key: 'PRF-108',
    projectId: 'prj-4',
    title: 'Risk Heatmap 3x3 interactive visualization component',
    description: 'Render SVG/CSS matrix of likelihood vs impact with interactive drill-down drawer and severity count badges.',
    status: 'IN_PROGRESS',
    priority: 'HIGH',
    isBlocked: false,
    assigneeId: 'usr-3',
    reporterId: 'usr-2',
    dueDate: '2026-11-03',
    estimatedHours: 12,
    actualHours: 8,
    tags: ['Frontend', 'PIRAE', 'Charts'],
    subtasks: [
      { id: 'sub-17', title: 'Grid coordinates mapping (Likelihood x Impact)', completed: true },
      { id: 'sub-18', title: 'Quick filter by severity category', completed: false }
    ],
    dependencies: [],
    createdAt: '2026-10-22T13:00:00Z',
    updatedAt: '2026-10-28T06:10:00Z'
  },
  {
    id: 'tsk-109',
    key: 'PRF-109',
    projectId: 'prj-3',
    title: 'Generate cryptographically verifiable audit trail hashes',
    description: 'Construct SHA-256 Merkle root trees for all database mutation events and store verification blocks periodically.',
    status: 'TODO',
    priority: 'HIGH',
    isBlocked: false,
    assigneeId: 'usr-4',
    reporterId: 'usr-6',
    dueDate: '2026-11-20',
    estimatedHours: 18,
    actualHours: 2,
    tags: ['Security', 'Audit', 'Cryptography'],
    subtasks: [
      { id: 'sub-19', title: 'Draft specification for audit log schema', completed: true },
      { id: 'sub-20', title: 'Integrate HMAC signature header', completed: false }
    ],
    dependencies: [],
    createdAt: '2026-10-24T10:00:00Z',
    updatedAt: '2026-10-25T11:00:00Z'
  },
  {
    id: 'tsk-110',
    key: 'PRF-110',
    projectId: 'prj-2',
    title: 'Data table virtualization for 10,000+ row rendering',
    description: 'Optimize DOM footprint using windowing technique to maintain solid 60 FPS while scrolling large datasets.',
    status: 'TODO',
    priority: 'LOW',
    isBlocked: false,
    assigneeId: 'usr-3',
    reporterId: 'usr-5',
    dueDate: '2026-11-25',
    estimatedHours: 10,
    actualHours: 0,
    tags: ['Performance', 'Virtualization', 'React'],
    subtasks: [],
    dependencies: [{ taskId: 'tsk-104', type: 'BLOCKED_BY' }],
    createdAt: '2026-10-25T15:00:00Z',
    updatedAt: '2026-10-25T15:00:00Z'
  }
];

export const initialComments: Comment[] = [
  {
    id: 'cmt-1',
    taskId: 'tsk-101',
    authorId: 'usr-1',
    content: 'Initial stress test completed on staging. Offset commits are performing within 4ms latency SLAs. Moving forward with failover recovery tests.',
    createdAt: '2026-10-27T10:15:00Z',
    updatedAt: '2026-10-27T10:15:00Z',
    canEditUntil: '2026-10-27T10:30:00Z'
  },
  {
    id: 'cmt-2',
    taskId: 'tsk-101',
    authorId: 'usr-2',
    content: '@elena.rostova Great news! Make sure to verify whether @priya.sharma frontend pipeline will receive the real-time websocket heartbeat.',
    createdAt: '2026-10-27T11:40:00Z',
    updatedAt: '2026-10-27T11:40:00Z',
    canEditUntil: '2026-10-27T11:55:00Z'
  },
  {
    id: 'cmt-3',
    taskId: 'tsk-102',
    authorId: 'usr-4',
    content: 'Ticket submitted to AWS Support for quota increase. ETA from their enterprise rep is tomorrow morning at 09:00 EST.',
    createdAt: '2026-10-26T14:20:00Z',
    updatedAt: '2026-10-26T14:20:00Z',
    canEditUntil: '2026-10-26T14:35:00Z'
  },
  {
    id: 'cmt-4',
    taskId: 'tsk-104',
    authorId: 'usr-5',
    content: 'Checked the focus ring color in dark mode. Please use border-blue-500 with a 2px offset for contrast compliance against neutral-900.',
    createdAt: '2026-10-28T05:30:00Z',
    updatedAt: '2026-10-28T05:30:00Z',
    // Recent enough for the 15-minute edit countdown!
    canEditUntil: '2026-10-28T06:38:00Z'
  }
];

export const initialRisks: Risk[] = [
  {
    id: 'rsk-1',
    projectId: 'prj-1',
    title: 'Resource Overload: Priya Sharma assigned 42h (Capacity: 35h)',
    type: 'RESOURCE_OVERLOAD',
    severity: 'CRITICAL',
    score: 88,
    likelihood: 'HIGH',
    impact: 'HIGH',
    reason: 'Priya is assigned 4 complex frontend tasks across PRF-1 and PRF-2 within the current active sprint, exceeding nominal weekly capacity by 20%.',
    recommendation: 'Reassign PRF-110 (Data Table Virtualization) to Liam Henderson or defer to Sprint 28 to relieve 10h load.',
    affectedTaskIds: ['tsk-103', 'tsk-104', 'tsk-108', 'tsk-110'],
    affectedMemberIds: ['usr-3'],
    status: 'OPEN',
    detectedAt: '2026-10-28T04:00:00Z'
  },
  {
    id: 'rsk-2',
    projectId: 'prj-1',
    title: 'Critical Dependency Block on Database Sharding (PRF-102)',
    type: 'DEPENDENCY_BLOCK',
    severity: 'HIGH',
    score: 74,
    likelihood: 'HIGH',
    impact: 'MEDIUM',
    reason: 'PRF-102 is blocked waiting for AWS RDS cluster quota expansion, directly endangering PRF-101 completion milestone.',
    recommendation: 'Escalate AWS ticket #89410 to P1 emergency or spin up temporary dev test container on local Kubernetes node.',
    affectedTaskIds: ['tsk-102'],
    affectedMemberIds: ['usr-4'],
    status: 'IN_REVIEW',
    detectedAt: '2026-10-27T16:00:00Z'
  },
  {
    id: 'rsk-3',
    projectId: 'prj-2',
    title: 'Schedule Slip: WCAG Compliance Verification trailing deadline',
    type: 'SCHEDULE_SLIP',
    severity: 'HIGH',
    score: 72,
    likelihood: 'MEDIUM',
    impact: 'HIGH',
    reason: 'Task PRF-104 is only 60% complete with 3 days remaining before sprint freeze. Screen reader accessibility passes require 2 full days.',
    recommendation: 'Pair Sofia Chen with Priya Sharma today for 4 hours of dedicated voiceover testing.',
    affectedTaskIds: ['tsk-104'],
    affectedMemberIds: ['usr-3', 'usr-5'],
    status: 'OPEN',
    detectedAt: '2026-10-28T05:00:00Z'
  },
  {
    id: 'rsk-4',
    projectId: 'prj-2',
    title: 'Scope Creep in Design System Token Exports',
    type: 'SCOPE_CREEP',
    severity: 'MODERATE',
    score: 48,
    likelihood: 'MEDIUM',
    impact: 'LOW',
    reason: 'Three additional unofficial Figma variant token schemas were introduced without prior architecture review.',
    recommendation: 'Freeze token schema to Core Colors & Typography until Sprint 27 retro.',
    affectedTaskIds: ['tsk-105'],
    affectedMemberIds: ['usr-5'],
    status: 'OPEN',
    detectedAt: '2026-10-26T09:30:00Z'
  }
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'aud-1',
    timestamp: '2026-10-28T06:15:22Z',
    actorId: 'usr-2',
    action: 'UPDATED_TASK_STATUS',
    entityType: 'TASK',
    entityId: 'tsk-108',
    entityName: 'Risk Heatmap 3x3 interactive visualization component',
    oldValues: { status: 'TODO' },
    newValues: { status: 'IN_PROGRESS' },
    severity: 'INFO'
  },
  {
    id: 'aud-2',
    timestamp: '2026-10-28T05:30:10Z',
    actorId: 'usr-5',
    action: 'POSTED_COMMENT',
    entityType: 'TASK',
    entityId: 'tsk-104',
    entityName: 'Audit and rebuild form components for WCAG 2.2',
    newValues: { commentId: 'cmt-4' },
    severity: 'INFO'
  },
  {
    id: 'aud-3',
    timestamp: '2026-10-28T04:00:00Z',
    actorId: 'usr-1',
    action: 'PIRAE_RISK_TRIGGERED',
    entityType: 'RISK',
    entityId: 'rsk-1',
    entityName: 'Resource Overload: Priya Sharma',
    newValues: { score: 88, severity: 'CRITICAL', assignedHours: 42, capacity: 35 },
    severity: 'CRITICAL'
  },
  {
    id: 'aud-4',
    timestamp: '2026-10-27T16:22:40Z',
    actorId: 'usr-4',
    action: 'MARKED_TASK_BLOCKED',
    entityType: 'TASK',
    entityId: 'tsk-102',
    entityName: 'PostgreSQL database sharding and connection pooling setup',
    oldValues: { isBlocked: false },
    newValues: { isBlocked: true, blockedReason: 'Awaiting AWS RDS cluster quota expansion approval' },
    severity: 'WARNING'
  },
  {
    id: 'aud-5',
    timestamp: '2026-10-27T14:15:00Z',
    actorId: 'usr-1',
    action: 'LOGGED_TASK_HOURS',
    entityType: 'TASK',
    entityId: 'tsk-101',
    entityName: 'Configure Kafka distributed event consumer',
    oldValues: { actualHours: 6 },
    newValues: { actualHours: 10 },
    severity: 'INFO'
  },
  {
    id: 'aud-6',
    timestamp: '2026-10-26T11:00:00Z',
    actorId: 'usr-1',
    action: 'SYSTEM_SETTINGS_UPDATE',
    entityType: 'SETTINGS',
    entityId: 'sys-1',
    entityName: 'PIRAE Thresholds',
    oldValues: { riskThresholdCritical: 80 },
    newValues: { riskThresholdCritical: 75 },
    severity: 'WARNING'
  }
];

export const initialNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'usr-2',
    title: 'PIRAE Critical Risk Detected',
    message: 'Resource Overload alert triggered for Priya Sharma (42h / 35h capacity). Immediate rebalancing recommended.',
    type: 'RISK_ALERT',
    read: false,
    link: '/risks',
    createdAt: '2026-10-28T04:00:00Z'
  },
  {
    id: 'notif-2',
    userId: 'usr-1',
    title: 'New Mention in Task Discussion',
    message: 'Marcus Vance mentioned you in "Configure Kafka distributed event consumer": "@elena.rostova Great news..."',
    type: 'MENTION',
    read: false,
    link: '/kanban?task=tsk-101',
    createdAt: '2026-10-27T11:40:00Z'
  },
  {
    id: 'notif-3',
    userId: 'usr-4',
    title: 'Task Marked as Blocked',
    message: 'PostgreSQL database sharding was flagged as blocked due to AWS RDS quota dependencies.',
    type: 'STATUS_CHANGE',
    read: true,
    link: '/kanban?task=tsk-102',
    createdAt: '2026-10-27T16:22:40Z'
  },
  {
    id: 'notif-4',
    userId: 'usr-3',
    title: 'Task Assigned to You',
    message: 'You have been assigned to "Risk Heatmap 3x3 interactive visualization component" due Nov 03.',
    type: 'ASSIGNMENT',
    read: true,
    link: '/kanban?task=tsk-108',
    createdAt: '2026-10-22T13:00:00Z'
  }
];

export const initialSettings: SystemSettings = {
  riskThresholdCritical: 75,
  riskThresholdHigh: 50,
  defaultSprintDays: 14,
  maxCapacityHours: 40,
  emailAlerts: true,
  auditRetentionDays: 90,
  theme: 'light'
};

export const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    actorId: 'usr-3',
    action: 'moved task to IN PROGRESS',
    target: 'Risk Heatmap 3x3 interactive visualization',
    targetType: 'task',
    timestamp: '15m ago'
  },
  {
    id: 'act-2',
    actorId: 'usr-5',
    action: 'commented on',
    target: 'Audit and rebuild form components',
    targetType: 'task',
    timestamp: '52m ago'
  },
  {
    id: 'act-3',
    actorId: 'usr-1',
    action: 'logged 4.0 hours on',
    target: 'Configure Kafka distributed event consumer',
    targetType: 'task',
    timestamp: '2h ago'
  },
  {
    id: 'act-4',
    actorId: 'usr-4',
    action: 'flagged blocker on',
    target: 'PostgreSQL database sharding setup',
    targetType: 'task',
    timestamp: '14h ago'
  },
  {
    id: 'act-5',
    actorId: 'usr-2',
    action: 'updated sprint roadmap for',
    target: 'Cloud-Native Microservices Migration',
    targetType: 'project',
    timestamp: '1d ago'
  }
];
