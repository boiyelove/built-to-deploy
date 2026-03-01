import { useState, useEffect } from 'react';
import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Lock, X, Bell } from 'lucide-react';

const initialNodes = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    const status = day < 14 ? 'past' : day === 14 ? 'current' : 'future';
    const label = `Day ${day}: ${day === 1 ? 'Setup' : day === 14 ? 'Refactor Core' : 'Execute'}`;

    return {
        id: `day-${day}`,
        position: { x: (i % 4) * 250, y: Math.floor(i / 4) * 120 },
        data: { label },
        className: `react-flow__node-custom ${status}`,
        connectable: false,
    };
});

const initialEdges = Array.from({ length: 29 }, (_, i) => ({
    id: `e-${i + 1}-${i + 2}`,
    source: `day-${i + 1}`,
    target: `day-${i + 2}`,
    animated: i === 13, // Day 14 connection animated
    style: { stroke: 'var(--color-border)', strokeWidth: 2 }
}));

const ExecutionDashboard = () => {
    const [timeLeft, setTimeLeft] = useState(14 * 3600 + 23 * 60 + 59); // 14:23:59
    const [prLink, setPrLink] = useState('');

    // UI states
    const [isCommsExpanded, setIsCommsExpanded] = useState(false);

    // Modal states
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [evalExecution, setEvalExecution] = useState('');
    const [evalEfficiency, setEvalEfficiency] = useState('');
    const [evalDebt, setEvalDebt] = useState('');

    const isEvalValid = evalDebt.trim().length > 0;

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isReviewModalOpen) {
                setIsReviewModalOpen(false);
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isReviewModalOpen]);

    const formatTime = (seconds) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    };

    return (
        <>
            <div className="dashboard-layout">
                {/* Left Column - Map */}
                <div className="dashboard-left">
                    <div className="dashboard-watermark">
                        BUILT TO DEPLOY_ // DEPLOYMENT PATH
                    </div>

                    {/* Corporate Comms Widget */}
                    <div className={`comms-widget ${isCommsExpanded ? 'expanded' : 'collapsed'}`} role="region" aria-label="Corporate Communications">
                        {isCommsExpanded ? (
                            <div className="comms-header">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <span>Corporate Comms</span>
                                    <span className="badge" aria-label="Live updates">LIVE</span>
                                </div>
                                <button className="btn-icon" onClick={() => setIsCommsExpanded(false)} aria-label="Collapse communications panel">
                                    <X size={20} />
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setIsCommsExpanded(true)}
                                style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', background: 'none', border: 'none' }}
                                aria-label="Expand communications panel - 4 new messages"
                            >
                                <div className="bell-container">
                                    <Bell size={24} className="bell-icon" aria-hidden="true" />
                                    <span className="bell-indicator" aria-label="New notifications"></span>
                                </div>
                            </button>
                        )}
                        <div className="comms-feed" role="log" aria-live="polite" aria-atomic="false">
                            <div className="comm-item critical" role="alert">
                                PM SYSTEM: You have not pushed code in 72 hours. The team is seeking a replacement. Acknowledge immediately.
                            </div>
                            <div className="comm-item warning">
                                [Alex M.]: Hey, I'm blocked waiting on your database schema update.
                            </div>
                            <div className="comm-item info">
                                System: PR #42 merged by [Sarah K.].
                            </div>
                            <div className="comm-item info">
                                System: Daily sync scheduled in 4 hours.
                            </div>
                        </div>
                    </div>

                    <ReactFlow
                        nodes={initialNodes}
                        edges={initialEdges}
                        fitView
                        attributionPosition="bottom-left"
                    >
                        <Background color="var(--color-border)" gap={24} size={1} />
                    </ReactFlow>
                </div>

                {/* Right Column - Execution Block */}
                <div className="dashboard-right">
                    <div className="execution-header">
                        <div className="execution-title">DAY 14 EXECUTION</div>
                        <div className="execution-timer" role="timer" aria-live="off" aria-label={`Time remaining: ${formatTime(timeLeft)}`}>{formatTime(timeLeft)} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)' }}>Remaining</span></div>
                    </div>

                    <div className="execution-body">
                        <div className="task-description">
                            <h3>Refactor Core System Architecture</h3>
                            <p><strong>Objective:</strong> Migrate monolithic state management into strictly typed decentralized context slices.</p>
                            <ul>
                                <li>Audit lines 40-150 in GlobalStore.</li>
                                <li>Break apart authentication and user session data.</li>
                                <li>Ensure all strict typing interfaces are documented.</li>
                                <li>Push to origin and submit PR before window lock.</li>
                            </ul>
                            <p><strong>Warning:</strong> Failure to execute within the designated time frame limits cohort progression.</p>
                        </div>

                        <div className="action-zone">
                            <label htmlFor="pr-link">Link to Pull Request (GitHub / GitLab)</label>
                            <input
                                id="pr-link"
                                type="url"
                                placeholder="https://github.com/..."
                                value={prLink}
                                onChange={(e) => setPrLink(e.target.value)}
                                aria-required="true"
                                aria-describedby="pr-link-desc"
                                required
                                pattern="https?://(github\.com|gitlab\.com)/.*"
                            />
                            <span id="pr-link-desc" className="sr-only">Enter the URL of your pull request to submit your work</span>
                            <div style={{ display: 'flex', gap: '16px' }}>
                                <button className="btn btn-primary" disabled={!prLink.trim()} style={{ flex: 1 }} aria-label="Submit pull request and mark task complete">
                                    Submit & Mark Complete
                                </button>
                                <button className="btn btn-outline" onClick={() => setIsReviewModalOpen(true)} style={{ flex: 1 }} aria-label="Review pending pull request from team member">
                                    Review Pending PR
                                </button>
                            </div>
                        </div>

                        <div className="locked-task">
                            <div className="locked-header">
                                <Lock className="locked-icon" />
                                <span className="execution-title" style={{ margin: 0, fontSize: '1rem' }}>DAY 13 EXECUTION (LOCKED)</span>
                            </div>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem' }}>
                                Tasks cannot be accessed once the 24-hour window expires. Code freeze was initiated at 00:00 UTC.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mandatory Peer Review Modal */}
            {
                isReviewModalOpen && (
                    <div className="modal-overlay" onClick={() => setIsReviewModalOpen(false)} role="dialog" aria-modal="true" aria-labelledby="review-modal-title">
                        <div className="modal-content" onClick={e => e.stopPropagation()}>
                            <div className="modal-header">
                                <h2 id="review-modal-title" className="modal-title">Reviewing PR: Context Refactor by [Alex M.]</h2>
                                <button className="modal-close" onClick={() => setIsReviewModalOpen(false)} aria-label="Close review modal">
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="modal-body">
                                {/* Left Side: Code Diff */}
                                <div className="modal-left" role="region" aria-label="Code diff preview">
                                    <div className="diff-placeholder">
                                        <span className="remove">- const [state, setState] = useState(initialState);</span>
                                        <span className="remove">- return &lt;GlobalContext.Provider value=&#123;state&#125;&gt;</span>
                                        <span className="add">+ const sessionState = useSessionContext();</span>
                                        <span className="add">+ const authState = useAuthContext();</span>
                                        <span className="add">+ </span>
                                        <span className="add">+ // Strictly typing the new context payloads</span>
                                        <span className="add">+ interface AuthPayload &#123;</span>
                                        <span className="add">+   userId: string;</span>
                                        <span className="add">+   token: string;</span>
                                        <span className="add">+ &#125;</span>
                                    </div>
                                </div>
                                {/* Right Side: Evaluation Form */}
                                <div className="modal-right">
                                    <div className="eval-form">
                                        <fieldset className="eval-group">
                                            <legend className="eval-label">Code Execution</legend>
                                            <div className="radio-group" role="radiogroup" aria-label="Code execution quality">
                                                {['Fails Tests', 'Passes but Buggy', 'Production Ready'].map(val => (
                                                    <label key={val} className="radio-label">
                                                        <input
                                                            type="radio"
                                                            name="execution"
                                                            value={val}
                                                            checked={evalExecution === val}
                                                            onChange={(e) => setEvalExecution(e.target.value)}
                                                        />
                                                        {val}
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <fieldset className="eval-group">
                                            <legend className="eval-label">Efficiency</legend>
                                            <div className="radio-group" role="radiogroup" aria-label="Code efficiency level">
                                                {['Brute Forced', 'Standard', 'Highly Optimized'].map(val => (
                                                    <label key={val} className="radio-label">
                                                        <input
                                                            type="radio"
                                                            name="efficiency"
                                                            value={val}
                                                            checked={evalEfficiency === val}
                                                            onChange={(e) => setEvalEfficiency(e.target.value)}
                                                        />
                                                        {val}
                                                    </label>
                                                ))}
                                            </div>
                                        </fieldset>

                                        <div className="eval-group">
                                            <label htmlFor="eval-debt" className="eval-label">Point of Failure / Technical Debt</label>
                                            <textarea
                                                id="eval-debt"
                                                rows="4"
                                                placeholder="Identify one potential point of failure... (Mandatory)"
                                                value={evalDebt}
                                                onChange={(e) => setEvalDebt(e.target.value)}
                                                aria-required="true"
                                                aria-describedby="eval-debt-desc"
                                                required
                                                minLength={10}
                                            ></textarea>
                                            <span id="eval-debt-desc" className="sr-only">Describe potential technical debt or failure points in the code</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-danger" disabled={!isEvalValid} onClick={() => setIsReviewModalOpen(false)} aria-label="Request changes to pull request">
                                    Request Changes
                                </button>
                                <button className="btn btn-success" disabled={!isEvalValid} onClick={() => setIsReviewModalOpen(false)} aria-label="Approve and merge pull request">
                                    Approve & Merge
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};

export default ExecutionDashboard;
