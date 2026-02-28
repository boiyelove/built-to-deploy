import React, { useState } from 'react';
import { Check, UploadCloud } from 'lucide-react';

const mockValidate = (callback) => {
    setTimeout(() => callback(), 1500);
};

const Gatekeeper = ({ onComplete }) => {
    const [steps, setSteps] = useState([
        { id: 1, type: 'oauth', label: 'Authenticate with Google', status: 'pending' },
        { id: 2, type: 'oauth', label: 'Connect LinkedIn Profile', status: 'pending' },
        { id: 3, type: 'upload', label: 'Upload Resume (.pdf only)', status: 'pending' },
        { id: 4, type: 'profiler', label: 'The Skills Profiler', status: 'pending', value: { role: '', stack: '', design: 3, efficiency: 3, debugging: 3, objective: '' } }
    ]);

    const allComplete = steps.every(s => s.status === 'success');

    const updateStatus = (id, status) => {
        setSteps(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };

    const handleAction = (id) => {
        updateStatus(id, 'loading');
        mockValidate(() => updateStatus(id, 'success'));
    };

    const handleInputChange = (id, value) => {
        setSteps(prev => prev.map(s => s.id === id ? { ...s, value } : s));
    };

    const _handleInputSubmit = (id) => {
        const step = steps.find(s => s.id === id);
        if (step.value.trim().length > 0) {
            updateStatus(id, 'loading');
            mockValidate(() => updateStatus(id, 'success'));
        }
    };

    return (
        <div className="gatekeeper-container">
            <h2 className="terminal-heading">Pre-Flight Checklist</h2>

            <div className="checklist">
                {steps.map((step, index) => (
                    <div key={step.id} className="checklist-item">
                        <div className="checklist-header">
                            <div className="checklist-title">
                                <span className="checklist-number">0{index + 1}.</span>
                                {step.label}
                            </div>
                            <div className="checklist-status">
                                {step.status === 'success' && <Check className="status-check" size={20} />}
                                {step.status === 'loading' && <div className="spinner"></div>}
                            </div>
                        </div>

                        {step.status === 'pending' && (
                            <div className="checklist-action">
                                {step.type === 'oauth' && (
                                    <button className="btn btn-outline" onClick={() => handleAction(step.id)}>
                                        Connect
                                    </button>
                                )}

                                {step.type === 'upload' && (
                                    <div className="drop-zone" onClick={() => handleAction(step.id)}>
                                        <UploadCloud size={24} style={{ marginBottom: '8px', color: 'var(--color-text-muted)' }} />
                                        <p>Drag & Drop or Click to Browse PDF</p>
                                    </div>
                                )}

                                {step.type === 'profiler' && (
                                    <div className="profiler-form">
                                        <div className="profiler-group">
                                            <label>Role Selector</label>
                                            <div className="role-toggles">
                                                {['Frontend', 'Backend', 'DevOps', 'SysOps'].map(role => (
                                                    <button
                                                        key={role}
                                                        className={`btn-pill ${step.value.role === role ? 'active' : ''}`}
                                                        onClick={() => handleInputChange(step.id, { ...step.value, role })}
                                                    >
                                                        {role}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="profiler-group">
                                            <label>Stack Selector</label>
                                            <input
                                                type="text"
                                                list="stack-options"
                                                placeholder="Search stack (e.g. React/Node)..."
                                                value={step.value.stack}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, stack: e.target.value })}
                                            />
                                            <datalist id="stack-options">
                                                <option value="React/NodeJS/PostgreSQL" />
                                                <option value="Vue/Laravel/MySQL" />
                                                <option value="Angular/Java/Oracle" />
                                                <option value="Go/gRPC/Kubernetes" />
                                                <option value="Python/Django/AWS" />
                                                <option value="C#/ASPNET/Azure" />
                                            </datalist>
                                        </div>

                                        <div className="profiler-group">
                                            <label>Self-Audit: System Design ({step.value.design}/5)</label>
                                            <input
                                                type="range" min="1" max="5"
                                                value={step.value.design}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, design: e.target.value })}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label>Self-Audit: Algorithmic Efficiency ({step.value.efficiency}/5)</label>
                                            <input
                                                type="range" min="1" max="5"
                                                value={step.value.efficiency}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, efficiency: e.target.value })}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label>Self-Audit: Debugging/Testing ({step.value.debugging}/5)</label>
                                            <input
                                                type="range" min="1" max="5"
                                                value={step.value.debugging}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, debugging: e.target.value })}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label>Primary Objective</label>
                                            <select
                                                value={step.value.objective}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, objective: e.target.value })}
                                            >
                                                <option value="" disabled>Select Objective</option>
                                                <option value="Fix Portfolio">Fix Portfolio</option>
                                                <option value="Learn Architecture">Learn Architecture</option>
                                                <option value="Scale to Production">Scale to Production</option>
                                            </select>
                                        </div>

                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                if (step.value.role && step.value.stack && step.value.objective) {
                                                    updateStatus(step.id, 'loading');
                                                    mockValidate(() => updateStatus(step.id, 'success'));
                                                }
                                            }}
                                            disabled={!(step.value.role && step.value.stack && step.value.objective)}
                                            style={{ marginTop: '16px', width: '100%' }}
                                        >
                                            Save Profile Identity
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '40px', textAlign: 'center' }}>
                <button
                    className="btn btn-primary btn-large"
                    onClick={onComplete}
                    disabled={!allComplete}
                    style={{ width: '100%', opacity: allComplete ? 1 : 0.5 }}
                >
                    {allComplete ? 'Generate Deployment Path' : 'Awaiting Clearances...'}
                </button>
            </div>
        </div>
    );
};

export default Gatekeeper;
