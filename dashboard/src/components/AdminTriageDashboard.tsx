import { useState, useEffect } from 'react';
import { AlertCircle, Link as LinkIcon, X } from 'lucide-react';

interface Task {
    id: string;
    title: string;
    candidate: string;
    role: string;
    status: 'Blocked' | 'In Progress' | 'Peer Review' | 'Production';
    blockedBy: string | null;
}

const mockTasks: Task[] = [
    { id: 't1', title: 'Migrate Auth to JWT', candidate: 'Alex M.', role: 'Backend', status: 'Blocked', blockedBy: 'DB Schema Update' },
    { id: 't2', title: 'Refactor Context API', candidate: 'Sarah K.', role: 'Frontend', status: 'Peer Review', blockedBy: null },
    { id: 't3', title: 'Setup CI/CD Pipeline', candidate: 'David J.', role: 'DevOps', status: 'In Progress', blockedBy: null },
    { id: 't4', title: 'Optimize API Queries', candidate: 'Fiona B.', role: 'Backend', status: 'Production', blockedBy: null },
    { id: 't5', title: 'Dockerize Frontend', candidate: 'James L.', role: 'SysOps', status: 'In Progress', blockedBy: null },
    { id: 't6', title: 'Implement Rate Limiting', candidate: 'Mia V.', role: 'Backend', status: 'Blocked', blockedBy: 'Redis Provisioning' },
];

const AdminTriageDashboard = () => {
    const [tasks, setTasks] = useState<Task[]>(mockTasks);
    const [selectedBlockedTask, setSelectedBlockedTask] = useState<Task | null>(null);

    const columns: Array<'Blocked' | 'In Progress' | 'Peer Review' | 'Production'> = ['Blocked', 'In Progress', 'Peer Review', 'Production'];

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && selectedBlockedTask) {
                setSelectedBlockedTask(null);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [selectedBlockedTask]);

    const handleReassign = (taskId: string) => {
        setTasks(prev => prev.map(t => {
            if (t.id === taskId) {
                return { ...t, candidate: 'Elena R. (Reassigned)' };
            }
            return t;
        }));
        setSelectedBlockedTask(null);
    };

    return (
        <div className="admin-triage-container">
            <header className="admin-header">
                <div>
                    <h1 className="admin-title">ADMIN TRIAGE_</h1>
                    <div className="admin-subtitle">Master View / Deployment Pipeline</div>
                </div>
            </header>

            <div className="kanban-board" role="region" aria-label="Task management board">
                {columns.map(col => (
                    <div key={col} className={`kanban-column ${col.toLowerCase().replace(' ', '-')}`} role="region" aria-label={`${col} tasks`}>
                        <div className="kanban-column-header">
                            <h3>{col}</h3>
                            <span className="task-count" aria-label={`${tasks.filter(t => t.status === col).length} tasks`}>
                                {tasks.filter(t => t.status === col).length}
                            </span>
                        </div>

                        <div className="kanban-cards" role="list">
                            {tasks.filter(t => t.status === col).map(task => (
                                <div
                                    key={task.id}
                                    className={`kanban-card ${task.status === 'Blocked' ? 'is-blocked' : ''}`}
                                    onClick={() => task.status === 'Blocked' && setSelectedBlockedTask(task)}
                                    onKeyDown={(e) => task.status === 'Blocked' && (e.key === 'Enter' || e.key === ' ') && setSelectedBlockedTask(task)}
                                    role="listitem"
                                    tabIndex={task.status === 'Blocked' ? 0 : undefined}
                                    aria-label={`${task.title} by ${task.candidate}, ${task.role}, ${task.status}${task.blockedBy ? `, blocked by ${task.blockedBy}` : ''}`}
                                >
                                    <div className="card-top">
                                        <div className="task-name">{task.title}</div>
                                        {task.status === 'Blocked' && (
                                            <AlertCircle className="blocked-icon" size={20} aria-label="Blocked" />
                                        )}
                                    </div>
                                    <div className="card-meta">
                                        <span className="candidate-name">{task.candidate}</span>
                                        <span className="role-tag">{task.role}</span>
                                    </div>
                                    {task.blockedBy && (
                                        <div className="dependency-link">
                                            <LinkIcon size={14} aria-hidden="true" /> DEP: {task.blockedBy}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedBlockedTask && (
                <div className="modal-overlay" onClick={() => setSelectedBlockedTask(null)} role="dialog" aria-modal="true" aria-labelledby="reassign-modal-title">
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div className="modal-header">
                            <h2 id="reassign-modal-title" className="modal-title">Sys Query: Reassign Task</h2>
                            <button className="modal-close" onClick={() => setSelectedBlockedTask(null)} aria-label="Close reassignment modal">
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body" style={{ flexDirection: 'column', padding: '24px' }}>
                            <div className="query-box" role="region" aria-label="Database query">
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }} aria-hidden="true">&gt;</span> SELECT replacement FROM cohort</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }} aria-hidden="true">&gt;</span> WHERE role = '{selectedBlockedTask.role}'</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }} aria-hidden="true">&gt;</span> AND capacity = 'Available'</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }} aria-hidden="true">&gt;</span> ORDER BY stack_match DESC LIMIT 1;</div>
                            </div>

                            <div className="query-result" role="region" aria-label="Query results">
                                <div className="match-label">Suggested Replacement Found:</div>
                                <div className="match-card">
                                    <div className="match-name">Elena R.</div>
                                    <div className="match-score">98% Stack Match</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={() => setSelectedBlockedTask(null)} aria-label="Cancel reassignment">
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={() => handleReassign(selectedBlockedTask.id)} aria-label="Execute reassignment to Elena R.">
                                Execute Reassignment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminTriageDashboard;
