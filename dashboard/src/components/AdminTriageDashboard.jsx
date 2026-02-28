import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, Link as LinkIcon, X } from 'lucide-react';

const mockTasks = [
    { id: 't1', title: 'Migrate Auth to JWT', candidate: 'Alex M.', role: 'Backend', status: 'Blocked', blockedBy: 'DB Schema Update' },
    { id: 't2', title: 'Refactor Context API', candidate: 'Sarah K.', role: 'Frontend', status: 'Peer Review', blockedBy: null },
    { id: 't3', title: 'Setup CI/CD Pipeline', candidate: 'David J.', role: 'DevOps', status: 'In Progress', blockedBy: null },
    { id: 't4', title: 'Optimize API Queries', candidate: 'Fiona B.', role: 'Backend', status: 'Production', blockedBy: null },
    { id: 't5', title: 'Dockerize Frontend', candidate: 'James L.', role: 'SysOps', status: 'In Progress', blockedBy: null },
    { id: 't6', title: 'Implement Rate Limiting', candidate: 'Mia V.', role: 'Backend', status: 'Blocked', blockedBy: 'Redis Provisioning' },
];

const AdminTriageDashboard = () => {
    const [tasks, setTasks] = useState(mockTasks);
    const [selectedBlockedTask, setSelectedBlockedTask] = useState(null);

    const columns = ['Blocked', 'In Progress', 'Peer Review', 'Production'];

    const handleReassign = (taskId) => {
        setTasks(prev => prev.map(t => {
            if (t.id === taskId) {
                return { ...t, candidate: 'Elena R. (Reassigned)' };
            }
            return t;
        }));
        setSelectedBlockedTask(null);
    };

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && selectedBlockedTask) {
                setSelectedBlockedTask(null);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [selectedBlockedTask]);

    return (
        <div className="admin-triage-container">
            <header className="admin-header">
                <div>
                    <h1 className="admin-title">ADMIN TRIAGE_</h1>
                    <p className="admin-subtitle">Master View / Deployment Pipeline</p>
                </div>
                <nav aria-label="Admin navigation">
                    <Link to="/" className="btn btn-outline" style={{ display: 'inline-block' }}>Return to Candidate View</Link>
                </nav>
            </header>

            <main className="kanban-board" role="main" aria-label="Task management board">
                {columns.map(col => (
                    <section key={col} className={`kanban-column ${col.toLowerCase().replace(' ', '-')}`} aria-labelledby={`column-${col.replace(' ', '-')}`}>
                        <div className="kanban-column-header">
                            <h2 id={`column-${col.replace(' ', '-')}`}>{col}</h2>
                            <span className="task-count" aria-label={`${tasks.filter(t => t.status === col).length} tasks`}>
                                {tasks.filter(t => t.status === col).length}
                            </span>
                        </div>

                        <div className="kanban-cards">
                            {tasks.filter(t => t.status === col).map(task => (
                                <article
                                    key={task.id}
                                    className={`kanban-card ${task.status === 'Blocked' ? 'is-blocked' : ''}`}
                                    onClick={() => task.status === 'Blocked' && setSelectedBlockedTask(task)}
                                    onKeyDown={(e) => {
                                        if (task.status === 'Blocked' && (e.key === 'Enter' || e.key === ' ')) {
                                            e.preventDefault();
                                            setSelectedBlockedTask(task);
                                        }
                                    }}
                                    tabIndex={task.status === 'Blocked' ? 0 : undefined}
                                    role={task.status === 'Blocked' ? 'button' : undefined}
                                    aria-label={task.status === 'Blocked' ? `${task.title}, blocked by ${task.blockedBy}, click to reassign` : undefined}
                                >
                                    <div className="card-top">
                                        <div className="task-name">{task.title}</div>
                                        {task.status === 'Blocked' && (
                                            <AlertCircle className="blocked-icon" size={20} aria-hidden="true" />
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
                                </article>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            {selectedBlockedTask && (
                <div className="modal-overlay" onClick={() => setSelectedBlockedTask(null)} role="dialog" aria-modal="true" aria-labelledby="reassign-title">
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div className="modal-header">
                            <h2 id="reassign-title" className="modal-title">Sys Query: Reassign Task</h2>
                            <button className="modal-close" onClick={() => setSelectedBlockedTask(null)} aria-label="Close reassignment dialog">
                                <X size={24} aria-hidden="true" />
                            </button>
                        </div>
                        <div className="modal-body" style={{ flexDirection: 'column', padding: '24px' }}>
                            <div className="query-box" role="region" aria-label="System query">
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }} aria-hidden="true">&gt;</span> SELECT replacement FROM cohort</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }} aria-hidden="true">&gt;</span> WHERE role = '{selectedBlockedTask.role}'</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }} aria-hidden="true">&gt;</span> AND capacity = 'Available'</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }} aria-hidden="true">&gt;</span> ORDER BY stack_match DESC LIMIT 1;</div>
                            </div>

                            <div className="query-result" role="region" aria-live="polite" aria-label="Suggested replacement">
                                <div className="match-label">Suggested Replacement Found:</div>
                                <div className="match-card">
                                    <div className="match-name">Elena R.</div>
                                    <div className="match-score">98% Stack Match</div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-outline" onClick={() => setSelectedBlockedTask(null)}>
                                Cancel
                            </button>
                            <button className="btn btn-primary" onClick={() => handleReassign(selectedBlockedTask.id)} aria-label="Reassign task to Elena R.">
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
