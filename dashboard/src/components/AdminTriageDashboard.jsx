import React, { useState } from 'react';
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

    return (
        <div className="admin-triage-container">
            <header className="admin-header">
                <div>
                    <h1 className="admin-title">ADMIN TRIAGE_</h1>
                    <div className="admin-subtitle">Master View / Deployment Pipeline</div>
                </div>
                <div>
                    <Link to="/" className="btn btn-outline" style={{ display: 'inline-block' }}>Return to Candidate View</Link>
                </div>
            </header>

            <div className="kanban-board">
                {columns.map(col => (
                    <div key={col} className={`kanban-column ${col.toLowerCase().replace(' ', '-')}`}>
                        <div className="kanban-column-header">
                            <h3>{col}</h3>
                            <span className="task-count">
                                {tasks.filter(t => t.status === col).length}
                            </span>
                        </div>

                        <div className="kanban-cards">
                            {tasks.filter(t => t.status === col).map(task => (
                                <div
                                    key={task.id}
                                    className={`kanban-card ${task.status === 'Blocked' ? 'is-blocked' : ''}`}
                                    onClick={() => task.status === 'Blocked' && setSelectedBlockedTask(task)}
                                >
                                    <div className="card-top">
                                        <div className="task-name">{task.title}</div>
                                        {task.status === 'Blocked' && (
                                            <AlertCircle className="blocked-icon" size={20} />
                                        )}
                                    </div>
                                    <div className="card-meta">
                                        <span className="candidate-name">{task.candidate}</span>
                                        <span className="role-tag">{task.role}</span>
                                    </div>
                                    {task.blockedBy && (
                                        <div className="dependency-link">
                                            <LinkIcon size={14} /> DEP: {task.blockedBy}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedBlockedTask && (
                <div className="modal-overlay" onClick={() => setSelectedBlockedTask(null)}>
                    <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
                        <div className="modal-header">
                            <h2 className="modal-title">Sys Query: Reassign Task</h2>
                            <button className="modal-close" onClick={() => setSelectedBlockedTask(null)}>
                                <X size={24} />
                            </button>
                        </div>
                        <div className="modal-body" style={{ flexDirection: 'column', padding: '24px' }}>
                            <div className="query-box">
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }}>&gt;</span> SELECT replacement FROM cohort</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }}>&gt;</span> WHERE role = '{selectedBlockedTask.role}'</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }}>&gt;</span> AND capacity = 'Available'</div>
                                <div className="query-line"><span style={{ color: 'var(--color-accent)' }}>&gt;</span> ORDER BY stack_match DESC LIMIT 1;</div>
                            </div>

                            <div className="query-result">
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
                            <button className="btn btn-primary" onClick={() => handleReassign(selectedBlockedTask.id)}>
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
