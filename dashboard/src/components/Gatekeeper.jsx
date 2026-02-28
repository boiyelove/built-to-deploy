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

            <div className="checklist" role="list" aria-label="Pre-flight checklist steps">
                {steps.map((step, index) => (
                    <div key={step.id} className="checklist-item" role="listitem">
                        <div className="checklist-header">
                            <div className="checklist-title">
                                <span className="checklist-number" aria-hidden="true">0{index + 1}.</span>
                                {step.label}
                            </div>
                            <div className="checklist-status" aria-live="polite" aria-atomic="true">
                                {step.status === 'success' && <Check className="status-check" size={20} aria-label="Completed" />}
                                {step.status === 'loading' && <div className="spinner" aria-label="Loading"></div>}
                                {step.status === 'pending' && <span className="sr-only">Pending</span>}
                            </div>
                        </div>

                        {step.status === 'pending' && (
                            <div className="checklist-action">
                                {step.type === 'oauth' && (
                                    <button className="btn btn-outline" onClick={() => handleAction(step.id)} aria-label={`Connect ${step.label}`}>
                                        Connect
                                    </button>
                                )}

                                {step.type === 'upload' && (
                                    <button className="drop-zone" onClick={() => handleAction(step.id)} aria-label="Upload resume PDF file">
                                        <UploadCloud size={24} style={{ marginBottom: '8px', color: 'var(--color-text-muted)' }} aria-hidden="true" />
                                        <p>Drag & Drop or Click to Browse PDF</p>
                                    </button>
                                )}

                                {step.type === 'profiler' && (
                                    <form className="profiler-form" aria-label="Skills profiler form">
                                        <fieldset className="profiler-group">
                                            <legend>Role Selector</legend>
                                            <div className="role-toggles" role="radiogroup" aria-label="Select your role">
                                                {['Frontend', 'Backend', 'DevOps', 'SysOps'].map(role => (
                                                    <button
                                                        key={role}
                                                        type="button"
                                                        className={`btn-pill ${step.value.role === role ? 'active' : ''}`}
                                                        onClick={() => handleInputChange(step.id, { ...step.value, role })}
                                                        role="radio"
                                                        aria-checked={step.value.role === role}
                                                    >
                                                        {role}
                                                    </button>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <div className="profiler-group">
                                            <label htmlFor="stack-input">Stack Selector</label>
                                            <input
                                                id="stack-input"
                                                type="text"
                                                list="stack-options"
                                                placeholder="Search stack (e.g. React/Node)..."
                                                value={step.value.stack}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, stack: e.target.value })}
                                                aria-required="true"
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
                                            <label htmlFor="design-range">Self-Audit: System Design ({step.value.design}/5)</label>
                                            <input
                                                id="design-range"
                                                type="range" min="1" max="5"
                                                value={step.value.design}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, design: e.target.value })}
                                                aria-valuemin="1"
                                                aria-valuemax="5"
                                                aria-valuenow={step.value.design}
                                                aria-label={`System design skill level: ${step.value.design} out of 5`}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label htmlFor="efficiency-range">Self-Audit: Algorithmic Efficiency ({step.value.efficiency}/5)</label>
                                            <input
                                                id="efficiency-range"
                                                type="range" min="1" max="5"
                                                value={step.value.efficiency}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, efficiency: e.target.value })}
                                                aria-valuemin="1"
                                                aria-valuemax="5"
                                                aria-valuenow={step.value.efficiency}
                                                aria-label={`Algorithmic efficiency skill level: ${step.value.efficiency} out of 5`}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label htmlFor="debugging-range">Self-Audit: Debugging/Testing ({step.value.debugging}/5)</label>
                                            <input
                                                id="debugging-range"
                                                type="range" min="1" max="5"
                                                value={step.value.debugging}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, debugging: e.target.value })}
                                                aria-valuemin="1"
                                                aria-valuemax="5"
                                                aria-valuenow={step.value.debugging}
                                                aria-label={`Debugging and testing skill level: ${step.value.debugging} out of 5`}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label htmlFor="objective-select">Primary Objective</label>
                                            <select
                                                id="objective-select"
                                                value={step.value.objective}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value, objective: e.target.value })}
                                                aria-required="true"
                                            >
                                                <option value="" disabled>Select Objective</option>
                                                <option value="Fix Portfolio">Fix Portfolio</option>
                                                <option value="Learn Architecture">Learn Architecture</option>
                                                <option value="Scale to Production">Scale to Production</option>
                                            </select>
                                        </div>

                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={() => {
                                                if (step.value.role && step.value.stack && step.value.objective) {
                                                    updateStatus(step.id, 'loading');
                                                    mockValidate(() => updateStatus(step.id, 'success'));
                                                }
                                            }}
                                            disabled={!(step.value.role && step.value.stack && step.value.objective)}
                                            style={{ marginTop: '16px', width: '100%' }}
                                            aria-label="Save profile identity"
                                        >
                                            Save Profile Identity
                                        </button>
                                    </form>
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
                    aria-label={allComplete ? 'Generate deployment path' : 'Complete all checklist items to continue'}
                    aria-disabled={!allComplete}
                >
                    {allComplete ? 'Generate Deployment Path' : 'Awaiting Clearances...'}
                </button>
            </div>
        </div>
    );
};

export default Gatekeeper;
