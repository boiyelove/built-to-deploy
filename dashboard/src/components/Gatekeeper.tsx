import { useState } from 'react';
import { Check, UploadCloud } from 'lucide-react';

interface ProfilerValue {
    role: string;
    stack: string;
    design: number;
    efficiency: number;
    debugging: number;
    objective: string;
}

interface Step {
    id: number;
    type: string;
    label: string;
    status: string;
    value?: ProfilerValue;
}

interface GatekeeperProps {
    onComplete: () => void;
}

const mockValidate = (callback: () => void) => {
    setTimeout(() => callback(), 1500);
};

const Gatekeeper = ({ onComplete }: GatekeeperProps) => {
    const [steps, setSteps] = useState<Step[]>([
        { id: 1, type: 'oauth', label: 'Authenticate with Google', status: 'pending' },
        { id: 2, type: 'oauth', label: 'Connect LinkedIn Profile', status: 'pending' },
        { id: 3, type: 'upload', label: 'Upload Resume (.pdf only)', status: 'pending' },
        { id: 4, type: 'profiler', label: 'The Skills Profiler', status: 'pending', value: { role: '', stack: '', design: 3, efficiency: 3, debugging: 3, objective: '' } }
    ]);

    const allComplete = steps.every(s => s.status === 'success');

    const updateStatus = (id: number, status: string) => {
        setSteps(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };

    const handleAction = (id: number) => {
        updateStatus(id, 'loading');
        mockValidate(() => updateStatus(id, 'success'));
    };

    const handleInputChange = (id: number, value: ProfilerValue) => {
        setSteps(prev => prev.map(s => s.id === id ? { ...s, value } : s));
    };

    return (
        <div className="gatekeeper-container">
            <h2 className="terminal-heading">Pre-Flight Checklist</h2>

            <div className="checklist" role="list">
                {steps.map((step, index) => (
                    <div key={step.id} className="checklist-item" role="listitem">
                        <div className="checklist-header">
                            <div className="checklist-title">
                                <span className="checklist-number" aria-hidden="true">0{index + 1}.</span>
                                {step.label}
                            </div>
                            <div className="checklist-status" aria-live="polite" aria-atomic="true">
                                {step.status === 'success' && <Check className="status-check" size={20} aria-label="Completed" />}
                                {step.status === 'loading' && <div className="spinner" role="status" aria-label="Loading"></div>}
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
                                    <div className="drop-zone" onClick={() => handleAction(step.id)} role="button" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && handleAction(step.id)} aria-label="Upload resume PDF file">
                                        <UploadCloud size={24} style={{ marginBottom: '8px', color: 'var(--color-text-muted)' }} aria-hidden="true" />
                                        <p>Drag & Drop or Click to Browse PDF</p>
                                    </div>
                                )}

                                {step.type === 'profiler' && step.value && (
                                    <div className="profiler-form">
                                        <div className="profiler-group">
                                            <label htmlFor={`role-${step.id}`}>Role Selector</label>
                                            <div className="role-toggles" role="radiogroup" aria-labelledby={`role-${step.id}`}>
                                                {['Frontend', 'Backend', 'DevOps', 'SysOps'].map(role => (
                                                    <button
                                                        key={role}
                                                        className={`btn-pill ${step.value!.role === role ? 'active' : ''}`}
                                                        onClick={() => handleInputChange(step.id, { ...step.value!, role })}
                                                        role="radio"
                                                        aria-checked={step.value!.role === role}
                                                        aria-label={`Select ${role} role`}
                                                    >
                                                        {role}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="profiler-group">
                                            <label htmlFor={`stack-${step.id}`}>Stack Selector</label>
                                            <input
                                                id={`stack-${step.id}`}
                                                type="text"
                                                list="stack-options"
                                                placeholder="Search stack (e.g. React/Node)..."
                                                value={step.value.stack}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value!, stack: e.target.value })}
                                                aria-label="Search and select your technology stack"
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
                                            <label htmlFor={`design-${step.id}`}>Self-Audit: System Design ({step.value.design}/5)</label>
                                            <input
                                                id={`design-${step.id}`}
                                                type="range" min="1" max="5"
                                                value={step.value.design}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value!, design: Number(e.target.value) })}
                                                aria-label={`System Design skill level: ${step.value.design} out of 5`}
                                                aria-valuemin={1}
                                                aria-valuemax={5}
                                                aria-valuenow={step.value.design}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label htmlFor={`efficiency-${step.id}`}>Self-Audit: Algorithmic Efficiency ({step.value.efficiency}/5)</label>
                                            <input
                                                id={`efficiency-${step.id}`}
                                                type="range" min="1" max="5"
                                                value={step.value.efficiency}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value!, efficiency: Number(e.target.value) })}
                                                aria-label={`Algorithmic Efficiency skill level: ${step.value.efficiency} out of 5`}
                                                aria-valuemin={1}
                                                aria-valuemax={5}
                                                aria-valuenow={step.value.efficiency}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label htmlFor={`debugging-${step.id}`}>Self-Audit: Debugging/Testing ({step.value.debugging}/5)</label>
                                            <input
                                                id={`debugging-${step.id}`}
                                                type="range" min="1" max="5"
                                                value={step.value.debugging}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value!, debugging: Number(e.target.value) })}
                                                aria-label={`Debugging and Testing skill level: ${step.value.debugging} out of 5`}
                                                aria-valuemin={1}
                                                aria-valuemax={5}
                                                aria-valuenow={step.value.debugging}
                                            />
                                        </div>

                                        <div className="profiler-group">
                                            <label htmlFor={`objective-${step.id}`}>Primary Objective</label>
                                            <select
                                                id={`objective-${step.id}`}
                                                value={step.value.objective}
                                                onChange={(e) => handleInputChange(step.id, { ...step.value!, objective: e.target.value })}
                                                aria-label="Select your primary objective"
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
                                                if (step.value!.role && step.value!.stack && step.value!.objective) {
                                                    updateStatus(step.id, 'loading');
                                                    mockValidate(() => updateStatus(step.id, 'success'));
                                                }
                                            }}
                                            disabled={!(step.value!.role && step.value!.stack && step.value!.objective)}
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
                    aria-label={allComplete ? 'Generate Deployment Path' : 'Complete all checklist items to continue'}
                    aria-disabled={!allComplete}
                >
                    {allComplete ? 'Generate Deployment Path' : 'Awaiting Clearances...'}
                </button>
            </div>
        </div>
    );
};

export default Gatekeeper;
