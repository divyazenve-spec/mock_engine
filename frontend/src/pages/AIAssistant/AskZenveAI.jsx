import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';

export default function AskZenveAI() {
  const [query, setQuery] = useState('');
  const [context, setContext] = useState({ intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' });
  const [isTyping, setIsTyping] = useState(false);
  const [showAuditModal, setShowAuditModal] = useState(false);
  const [auditLogs, setAuditLogs] = useState([]);
  const [history, setHistory] = useState([
    {
      role: 'ai',
      text: "Hello! 🐾 I'm **Dr. Zenve**, your dedicated **Autonomous Multi-Agent Executive Co-Pilot** for Zenve Pets Healthcare.\n\nI can:\n- **Summarize** all business operations in one shot (Sales, Inventory, Clinics, Pets, Logistics, Subscriptions, Alerts)\n- Analyze live clinic EBITDA, pharmacy stockouts, and 60-minute delivery SLAs\n- **Draft and execute operational actions** (Purchase Orders, WhatsApp booster campaigns, rider reallocations)\n\n💡 Try **📋 Full Enterprise Summary** below, or ask me any specific question!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      kpis: [
        { label: "Database Records", val: "46,200 Loaded", delta: "8 Domains Active", trend: "up", icon: "🗄️" },
        { label: "Hospital Network", val: "14 Facilities", delta: "10 Cities", trend: "success", icon: "🏥" },
        { label: "Co-Pilot Backend", val: "FastAPI Online", delta: "4-Agent Pipeline", trend: "success", icon: "⚡" },
        { label: "Summarize Ready", val: "One Click", delta: "All Domains", trend: "up", icon: "📋" }
      ]
    }
  ]);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isTyping]);

  async function sendQueryToBackend(userQuery) {
    if (!userQuery || !userQuery.trim()) return;
    const cleanQuery = userQuery.trim();

    const userMsg = {
      role: 'user',
      text: cleanQuery,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setHistory(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      // Connect to live FastAPI Autonomous Co-Pilot
      const res = await fetch('/api/v1/copilot/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cleanQuery, context })
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP ${res.status}: ${errorText || 'Server error'}`);
      }
      const data = await res.json();

      if (data.context) setContext(data.context);

      const aiMsg = {
        role: 'ai',
        text: data.text,
        intent: data.intent,
        model_used: data.model_used,
        rag_citations: data.rag_citations,
        agent_steps: data.agent_steps,
        kpis: data.kpis,
        chart: data.chart,
        table: data.table,
        actions: data.actions,
        followups: data.followups,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setHistory(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('[Zenve Copilot React] API error:', err);
      const errorMsg = {
        role: 'ai',
        isError: true,
        text: `⚠️ **Connection Error:** Unable to reach Dr. Zenve Copilot service (\`/api/v1/copilot/query\`).\n\nPlease ensure the FastAPI backend is running on port 8000 and the Vite proxy is active.\n\n*Details:* ${err.message || 'Network request failed'}`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setHistory(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }

  async function handleAsk(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (!query.trim() || isTyping) return;
    const q = query;
    setQuery('');
    await sendQueryToBackend(q);
  }

  function handleSendFollowup(followupText) {
    if (isTyping) return;
    sendQueryToBackend(followupText);
  }

  async function handleExecuteAction(actionId, msgIndex) {
    try {
      const res = await fetch('/api/v1/copilot/execute-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action_id: actionId, user: 'Executive Admin' })
      });
      const receipt = await res.json();

      setHistory(prev => {
        const next = [...prev];
        const msg = next[msgIndex];
        if (msg && msg.actions) {
          msg.actions = msg.actions.map(act => {
            if (act.action_id === actionId) {
              return { ...act, status: 'EXECUTED', receipt };
            }
            return act;
          });
        }
        return next;
      });
    } catch (err) {
      alert(`Action Execution Error: ${err.message}`);
    }
  }

  async function fetchAuditLogs() {
    try {
      const res = await fetch('/api/v1/copilot/audit-trail');
      const data = await res.json();
      setAuditLogs(data.audit_trail || []);
    } catch (err) {
      console.error('[Zenve Copilot] Failed to fetch audit trail:', err);
      setAuditLogs([]);
    }
    setShowAuditModal(true);
  }

  function resetChat() {
    setHistory([
      {
        role: 'ai',
        text: "Chat reset. 🐾 I'm ready for your next question or action command! Ask me about pet demographics, clinic EBITDA, pharmacy stockouts, or draft automated Purchase Orders.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setContext({ intent: 'GENERAL_OVERVIEW', location: null, timeframe: 'MTD' });
    setIsTyping(false);
    inputRef.current?.focus();
  }

  function handleQuickPrompt(prompt) {
    setQuery(prompt);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  }

  /* ── Markdown-like text renderer ── */
  function renderFormattedText(text) {
    if (!text) return null;
    const lines = text.split('\n');
    const elements = [];
    let key = 0;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      if (line.trim() === '') {
        elements.push(<div key={key++} style={{ height: '8px' }} />);
        continue;
      }

      const parts = [];
      const boldRe = /\*\*(.+?)\*\*/g;
      let lastIdx = 0;
      let match;
      while ((match = boldRe.exec(line)) !== null) {
        if (match.index > lastIdx) {
          parts.push(line.slice(lastIdx, match.index));
        }
        parts.push(<strong key={`b${key++}`} style={{ fontWeight: 700, color: '#0f172a' }}>{match[1]}</strong>);
        lastIdx = match.index + match[0].length;
      }
      if (lastIdx < line.length) {
        parts.push(line.slice(lastIdx));
      }

      const content = parts.length > 0 ? parts : line;

      if (/^\s*[•\-]\s/.test(line)) {
        const bulletText = line.replace(/^\s*[•\-]\s*/, '');
        const bParts = [];
        let bLast = 0;
        let bMatch;
        const bRe = /\*\*(.+?)\*\*/g;
        while ((bMatch = bRe.exec(bulletText)) !== null) {
          if (bMatch.index > bLast) bParts.push(bulletText.slice(bLast, bMatch.index));
          bParts.push(<strong key={`bb${key++}`} style={{ fontWeight: 700, color: '#0f172a' }}>{bMatch[1]}</strong>);
          bLast = bMatch.index + bMatch[0].length;
        }
        if (bLast < bulletText.length) bParts.push(bulletText.slice(bLast));

        elements.push(
          <div key={key++} style={{
            display: 'flex',
            gap: '8px',
            paddingLeft: '4px',
            marginBottom: '4px',
            lineHeight: '1.65'
          }}>
            <span style={{ color: '#10b981', fontWeight: 700, flexShrink: 0 }}>•</span>
            <span>{bParts.length > 0 ? bParts : bulletText}</span>
          </div>
        );
      } else {
        elements.push(
          <div key={key++} style={{ lineHeight: '1.7', marginBottom: '3px' }}>
            {content}
          </div>
        );
      }
    }
    return elements;
  }

  /* ── Interactive In-Chat Chart Renderer ── */
  function renderChart(chart) {
    if (!chart || !chart.data || !chart.data.length) return null;
    const colors = chart.colors || ['#10b981', '#6366f1', '#f59e0b', '#ef4444'];
    const xKey = chart.xKey || 'name';
    const yKeys = chart.yKeys || ['val', 'value'];

    let maxVal = 1;
    chart.data.forEach(d => {
      yKeys.forEach(k => {
        if (typeof d[k] === 'number' && d[k] > maxVal) maxVal = d[k];
      });
      if (typeof d.value === 'number' && d.value > maxVal) maxVal = d.value;
    });

    return (
      <div style={{
        margin: '14px 0',
        padding: '16px 18px',
        borderRadius: '12px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '6px' }}>
          📊 {chart.title || 'Live Executive Telemetry'}
        </div>
        {chart.type === 'pie' ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
            {chart.data.map((d, i) => (
              <div key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '11.5px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: d.color || colors[i % colors.length] }} />
                <span style={{ fontWeight: 700, color: '#0f172a' }}>{d.name}</span>
                <span style={{ fontFamily: 'monospace', color: '#059669', fontWeight: 700 }}>{d.value}%</span>
              </div>
            ))}
          </div>
        ) : (
          chart.data.map((d, i) => {
            const label = d[xKey] || d.name || '';
            const primaryKey = yKeys[0];
            const val = d[primaryKey] != null ? d[primaryKey] : (d.value || 0);
            const pct = Math.min(100, Math.max(14, Math.round((val / maxVal) * 100)));
            const barColor = colors[0];
            const displayVal = typeof val === 'number' ? (val % 1 !== 0 ? val.toFixed(1) : val) : val;

            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', marginBottom: '8px', gap: '12px', fontSize: '11.5px' }}>
                <div style={{ width: '140px', flexShrink: 0, fontWeight: 600, color: '#475569', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {label}
                </div>
                <div style={{ flex: 1, height: '20px', background: '#f1f5f9', borderRadius: '6px', overflow: 'hidden', position: 'relative', display: 'flex' }}>
                  <div style={{ width: `${pct}%`, background: barColor, height: '100%', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '8px', color: '#ffffff', fontSize: '10.5px', fontWeight: 700, fontFamily: 'monospace' }}>
                    {displayVal}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    );
  }

  /* ── Interactive In-Chat Table Renderer ── */
  function renderTable(table) {
    if (!table || !table.rows || !table.rows.length) return null;
    const cols = table.columns || Object.keys(table.rows[0]);
    return (
      <div style={{
        margin: '14px 0',
        borderRadius: '10px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(15, 23, 42, 0.04)'
      }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                {cols.map((c, ci) => (
                  <th key={ci} style={{ padding: '8px 12px', textAlign: 'left', fontWeight: 700, color: '#475569', fontSize: '11px', textTransform: 'uppercase' }}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {table.rows.map((r, ri) => (
                <tr key={ri} style={{ borderBottom: ri < table.rows.length - 1 ? '1px solid #f1f5f9' : 'none', background: ri % 2 === 0 ? '#ffffff' : '#fafbfc' }}>
                  {cols.map((c, ci) => {
                    const val = r[c] != null ? r[c] : Object.values(r)[ci];
                    return (
                      <td key={ci} style={{ padding: '8px 12px', color: '#1e293b' }}>
                        {String(val)}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  /* ── Interactive Text-to-Action Proposal Card ── */
  function renderActionProposal(act, msgIdx) {
    if (!act) return null;
    const isExecuted = act.status === 'EXECUTED';
    const badgeLabel = (act.action_type || 'ACTION PROPOSAL').replace(/_/g, ' ');

    return (
      <div key={act.action_id || msgIdx} style={{
        margin: '16px 0 10px 0',
        borderRadius: '12px',
        border: '1.5px solid #10b981',
        background: 'linear-gradient(180deg, #f0fdf4 0%, #ffffff 60%)',
        padding: '16px 18px',
        boxShadow: '0 4px 16px rgba(16, 185, 129, 0.12)'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 9px', borderRadius: '12px', fontSize: '10.5px', fontWeight: 800, textTransform: 'uppercase', background: '#10b981', color: '#ffffff' }}>
              ⚡ {badgeLabel}
            </span>
            <h4 style={{ margin: 0, fontSize: '14px', fontWeight: 800, color: '#064e3b' }}>
              {act.title}
            </h4>
          </div>
          {act.impact_badge && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', borderRadius: '6px', background: '#dcfce7', color: '#047857', fontSize: '11px', fontWeight: 700, border: '1px solid #86efac' }}>
              💹 {act.impact_badge}
            </span>
          )}
        </div>
        <p style={{ margin: '8px 0 12px 0', fontSize: '12.5px', color: '#334155', lineHeight: '1.6' }}>
          {act.description}
        </p>

        {act.parameters && Object.keys(act.parameters).length > 0 && (
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '8px', padding: '10px 14px', marginBottom: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
              {Object.entries(act.parameters).map(([k, v]) => (
                <div key={k} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', fontFamily: 'monospace' }}>
                    {k.replace(/_/g, ' ')}
                  </span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>
                    {String(v)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {isExecuted ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', borderRadius: '8px', background: '#ecfdf5', border: '1.5px solid #10b981', color: '#065f46', fontSize: '12px', fontWeight: 700 }}>
            <span>✅ <strong>Action Executed in ERP:</strong> {act.receipt?.summary || act.description}</span>
            <span style={{ marginLeft: 'auto', fontFamily: 'monospace', fontSize: '11px', color: '#047857', fontWeight: 700 }}>
              {act.receipt?.transaction_ref || 'TXN-CONFIRMED'}
            </span>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {act.action_type === 'NAVIGATE_DASHBOARD' || act.type === 'NAVIGATE' || act.parameters?.route || act.route ? (
              <button
                type="button"
                onClick={() => {
                  const targetRoute = act.parameters?.route || act.route || '#';
                  const cat = act.parameters?.category || act.category;
                  const subcat = act.parameters?.subcategory || act.subcategory || act.title;
                  if (window.ZenveRouter && typeof window.ZenveRouter.navigateToRoute === 'function') {
                    window.ZenveRouter.navigateToRoute(targetRoute, cat, subcat);
                  } else {
                    window.location.hash = targetRoute;
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(2, 132, 199, 0.3)'
                }}
              >
                🚀 Open Dashboard ({act.parameters?.title || act.title || act.parameters?.route || 'View'}) →
              </button>
            ) : (
              <button
                type="button"
                onClick={() => handleExecuteAction(act.action_id, msgIdx)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '9px 18px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  color: '#ffffff',
                  fontSize: '12.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  boxShadow: '0 3px 10px rgba(16, 185, 129, 0.3)'
                }}
              >
                ⚡ Approve &amp; Execute Action
              </button>
            )}
            <button
              type="button"
              onClick={() => alert(`Action parameters configured: ${act.title}`)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#334155',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              ✏️ Customize
            </button>
            <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 600, marginLeft: 'auto' }}>
              🛡️ Human-in-the-Loop Safeguard
            </span>
          </div>
        )}
      </div>
    );
  }

  const quickPrompts = [
    { label: '📋 Full Enterprise Summary', prompt: 'Give me a full enterprise summary of all business operations', featured: true },
    { label: 'Who are you?', prompt: 'Hello Dr. Zenve, who are you and what can you do?', featured: false },
    { label: 'AOV Definition', prompt: 'What is AOV and how is it calculated?', featured: false },
    { label: 'Gross Revenue', prompt: 'What is our consolidated gross revenue and average order value across all cities?', featured: false },
    { label: 'Top Revenue City', prompt: 'Which city generated the highest sales revenue?', featured: false },
    { label: 'Bravecto Stock', prompt: 'What is the current inventory status of Bravecto?', featured: false },
    { label: 'Overdue Vaccines', prompt: 'How many pets are overdue for core vaccinations across our network?', featured: false },
    { label: 'Clinic Footfall', prompt: 'Which clinic has the highest patient footfall, and what is our total hospital bed capacity?', featured: false },
  ];

  return (
    <DashboardLayout
      category="AI Assistant"
      subcategory="Ask Zenve AI"
      title="Ask Zenve AI — Executive Co-Pilot"
      subtitle="Autonomous Multi-Agent Pet Healthcare Intelligence & Live Text-to-Action Platform"
      icon="🐾"
    >
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 180px)',
        background: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 24px rgba(15, 23, 42, 0.04)',
        overflow: 'hidden'
      }}>
        {/* ─── Chat Header ─── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 22px',
          borderBottom: '1px solid #f1f5f9',
          background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #f0f9ff 100%)',
          flexShrink: 0
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 2px 8px rgba(16, 185, 129, 0.3)'
            }}>
              🐾
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: '#0f172a', fontFamily: '"Sora", sans-serif' }}>
                Dr. Zenve — Autonomous Multi-Agent Executive Co-Pilot
              </div>
              <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: '#10b981',
                  display: 'inline-block'
                }} />
                Live Text-to-Action Online · MySQL `zenve_engine` Grounded
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              type="button"
              onClick={() => {
                if (window.ZenveSettingsDashboard) {
                  window.ZenveSettingsDashboard.open('integrations');
                } else {
                  window.location.hash = '#api-integrations';
                }
              }}
              title="Configure Custom API Integration, Enterprise RAG, and Agentic Architecture"
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid #6366f1',
                background: '#eef2ff',
                color: '#4338ca',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              🔌 Custom API &amp; Enterprise RAG
            </button>
            <button
              type="button"
              onClick={fetchAuditLogs}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid #10b981',
                background: '#ecfdf5',
                color: '#065f46',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              📋 Action Audit Log
            </button>
            <button
              type="button"
              onClick={resetChat}
              style={{
                padding: '7px 14px',
                borderRadius: '8px',
                border: '1px solid #d1d5db',
                background: '#ffffff',
                color: '#475569',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Clear Chat
            </button>
          </div>
        </div>

        {/* ─── Enterprise RAG & Agentic Architecture Live Bar ─── */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          padding: '8px 22px',
          background: '#f8fafc',
          borderBottom: '1px solid #e2e8f0',
          fontSize: '11.5px',
          color: '#334155'
        }}>
          <span style={{ fontWeight: 800, color: '#4338ca', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            ⚡ Enterprise Architecture:
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#ecfdf5', color: '#047857', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>
            Custom Multi-LLM API Gateway
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#eef2ff', color: '#4338ca', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
            🛡️ 4-Layer RAG Active (MySQL, Cold-chain, EBITDA, SLAs)
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#fdf4ff', color: '#86198f', padding: '2px 8px', borderRadius: '6px', fontWeight: 600 }}>
            🤖 5-Agent Pipeline
          </span>
          <a
            href="#api-integrations"
            onClick={(e) => {
              e.preventDefault();
              if (window.ZenveSettingsDashboard) {
                window.ZenveSettingsDashboard.open('integrations');
              } else {
                window.location.hash = '#api-integrations';
              }
            }}
            style={{ marginLeft: 'auto', color: '#2563eb', fontWeight: 700, textDecoration: 'none', fontSize: '11px' }}
          >
            Configure Gateway &amp; RAG Toggles →
          </a>
        </div>

        {/* ─── Chat Messages Area ─── */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          background: '#fafbfc'
        }}>
          {history.map((msg, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                gap: '10px'
              }}
            >
              {msg.role === 'ai' && (
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  flexShrink: 0,
                  marginTop: '2px',
                  boxShadow: '0 2px 6px rgba(16, 185, 129, 0.2)'
                }}>
                  🐾
                </div>
              )}

              <div style={{
                maxWidth: msg.role === 'user' ? '70%' : '85%',
                padding: '14px 18px',
                borderRadius: msg.role === 'user'
                  ? '16px 16px 4px 16px'
                  : '16px 16px 16px 4px',
                background: msg.role === 'user'
                  ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                  : '#ffffff',
                color: msg.role === 'user' ? '#ffffff' : '#334155',
                fontSize: '13.5px',
                lineHeight: '1.7',
                boxShadow: msg.role === 'user'
                  ? '0 2px 10px rgba(16, 185, 129, 0.25)'
                  : '0 1px 6px rgba(15, 23, 42, 0.06)',
                border: msg.role === 'user' ? 'none' : '1px solid #f1f5f9'
              }}>
                {/* Agent Steps & Model Engine Pipeline */}
                {(msg.agent_steps || msg.model_used) && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '6px', marginBottom: '10px', padding: '6px 10px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '10px', fontWeight: 800, color: '#64748b' }}>🤖 MULTI-AGENT RAG:</span>
                    {msg.model_used && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 8px', borderRadius: '10px', background: '#eff6ff', border: '1px solid #93c5fd', color: '#1d4ed8', fontSize: '10.5px', fontWeight: 700, fontFamily: 'monospace' }}>
                        ⚡ {msg.model_used}
                      </span>
                    )}
                    {msg.agent_steps && msg.agent_steps.map((st, si) => (
                      <span key={si} title={st.note} style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 7px', borderRadius: '10px', background: '#ecfdf5', border: '1px solid #6ee7b7', color: '#047857', fontSize: '10.5px', fontWeight: 700, fontFamily: 'monospace' }}>
                        ✓ {st.agent}
                      </span>
                    ))}
                    {msg.rag_citations && msg.rag_citations.length > 0 && (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '2px 7px', borderRadius: '10px', background: '#fdf4ff', border: '1px solid #f0abfc', color: '#86198f', fontSize: '10px', fontWeight: 600 }}>
                        📚 {msg.rag_citations.length} RAG Sources
                      </span>
                    )}
                  </div>
                )}

                {/* Error Banner */}
                {msg.isError && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 12px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    background: '#fef2f2',
                    border: '1.5px solid #f87171',
                    color: '#991b1b',
                    fontSize: '12px',
                    fontWeight: 700
                  }}>
                    <span>⚠️</span>
                    <span>Backend Communication Error</span>
                  </div>
                )}

                {/* Missing Data Explanation Notice */}
                {msg.intent === 'MISSING_DATA_EXPLANATION' && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '10px 14px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    background: '#fffbeb',
                    border: '1.5px solid #fde68a',
                    color: '#92400e',
                    fontSize: '12px',
                    lineHeight: '1.5'
                  }}>
                    <span style={{ fontSize: '15px' }}>ℹ️</span>
                    <div>
                      <div style={{ fontWeight: 800 }}>Data Availability &amp; Audit Notice:</div>
                      <div>The requested metric or dimension cannot be calculated because underlying records are not present in current operational datasets.</div>
                    </div>
                  </div>
                )}

                {/* Unsupported Geography Notice */}
                {msg.intent === 'UNSUPPORTED_GEOGRAPHY' && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    padding: '10px 14px',
                    marginBottom: '10px',
                    borderRadius: '8px',
                    background: '#fef2f2',
                    border: '1.5px solid #fecaca',
                    color: '#991b1b',
                    fontSize: '12px',
                    lineHeight: '1.5'
                  }}>
                    <span style={{ fontSize: '15px' }}>📍</span>
                    <div>
                      <div style={{ fontWeight: 800 }}>Geographic Coverage Notice:</div>
                      <div>Zenve Pets operational records currently cover 14 hospital hubs in India. No operational records exist for this location.</div>
                    </div>
                  </div>
                )}

                {/* Message Body */}
                {msg.role === 'ai' ? renderFormattedText(msg.text) : msg.text}

                {/* KPI Pills */}
                {msg.kpis && msg.kpis.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', margin: '10px 0' }}>
                    {msg.kpis.map((k, ki) => {
                      const trendStyles = {
                        success: { bg: '#dcfce7', border: '#86efac', color: '#15803d', dot: '#16a34a' },
                        up:      { bg: '#eff6ff', border: '#93c5fd', color: '#1d4ed8', dot: '#2563eb' },
                        warn:    { bg: '#fffbeb', border: '#fde68a', color: '#92400e', dot: '#d97706' },
                        danger:  { bg: '#fef2f2', border: '#fecaca', color: '#b91c1c', dot: '#dc2626' },
                        neutral: { bg: '#f8fafc', border: '#e2e8f0', color: '#475569', dot: '#94a3b8' },
                      };
                      const ts = trendStyles[k.trend] || trendStyles.neutral;
                      return (
                        <div key={ki} style={{
                          padding: '7px 13px',
                          borderRadius: '10px',
                          background: ts.bg,
                          border: `1px solid ${ts.border}`,
                          fontSize: '11.5px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '2px',
                          minWidth: '110px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            {k.icon && <span style={{ fontSize: '13px' }}>{k.icon}</span>}
                            <span style={{ fontSize: '10px', color: ts.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.03em' }}>{k.label}</span>
                          </div>
                          <strong style={{ color: '#0f172a', fontFamily: 'monospace', fontSize: '13px' }}>{k.val}</strong>
                          {k.delta && <span style={{ fontSize: '10px', color: ts.dot, fontWeight: 600 }}>{k.delta}</span>}
                          {k.subtext && <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 500 }}>{k.subtext}</span>}
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Dynamic Visualizations */}
                {msg.chart && renderChart(msg.chart)}

                {/* In-Chat Tables */}
                {msg.table && renderTable(msg.table)}

                {/* Action Proposals */}
                {msg.actions && msg.actions.map((act) => renderActionProposal(act, i))}

                {/* Contextual Follow-up Chips */}
                {msg.followups && msg.followups.length > 0 && (
                  <div style={{ marginTop: '14px', paddingTop: '10px', borderTop: '1px dashed #e2e8f0' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#047857', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      🐾 Dr. Zenve Recommends Exploring:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {msg.followups.map((f, fi) => (
                        <button
                          key={fi}
                          type="button"
                          onClick={() => handleSendFollowup(f)}
                          style={{
                            padding: '5px 12px',
                            borderRadius: '16px',
                            border: '1px solid #a7f3d0',
                            background: '#ecfdf5',
                            color: '#065f46',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.15s ease'
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#d1fae5'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#ecfdf5'; }}
                        >
                          {f} →
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{
                  fontSize: '10px',
                  color: msg.role === 'user' ? 'rgba(255,255,255,0.7)' : '#94a3b8',
                  marginTop: '8px',
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  fontWeight: 500
                }}>
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                flexShrink: 0
              }}>
                🐾
              </div>
              <div style={{
                padding: '12px 18px',
                borderRadius: '16px 16px 16px 4px',
                background: '#ffffff',
                border: '1px solid #f1f5f9',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12.5px',
                color: '#64748b',
                fontWeight: 600
              }}>
                <span>🧠 Orchestrating Multi-Agent reasoning &amp; live MySQL query...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* ─── Quick Suggestions ─── */}
        <div style={{
          padding: '10px 22px 0',
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap',
          borderTop: '1px solid #f1f5f9',
          background: '#ffffff',
          flexShrink: 0
        }}>
          <span style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, display: 'flex', alignItems: 'center', marginRight: '4px' }}>
            ⚡ Quick Prompts:
          </span>
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              type="button"
              onClick={() => sendQueryToBackend(p.prompt)}
              title={p.prompt}
              style={{
                padding: p.featured ? '6px 14px' : '5px 12px',
                borderRadius: '16px',
                border: p.featured ? '1.5px solid #10b981' : '1px solid #e2e8f0',
                background: p.featured ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)' : '#f8fafc',
                color: p.featured ? '#ffffff' : '#475569',
                fontSize: '11.5px',
                fontWeight: p.featured ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: p.featured ? '0 2px 8px rgba(16, 185, 129, 0.25)' : 'none'
              }}
              onMouseEnter={e => {
                if (p.featured) { e.currentTarget.style.boxShadow = '0 4px 14px rgba(16,185,129,0.4)'; }
                else { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.borderColor = '#cbd5e1'; }
              }}
              onMouseLeave={e => {
                if (p.featured) { e.currentTarget.style.boxShadow = '0 2px 8px rgba(16,185,129,0.25)'; }
                else { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e2e8f0'; }
              }}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* ─── Input Bar ─── */}
        <form
          onSubmit={handleAsk}
          style={{
            display: 'flex',
            gap: '10px',
            padding: '14px 22px',
            borderTop: '1px solid #f1f5f9',
            background: '#ffffff',
            alignItems: 'center',
            flexShrink: 0
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Summarize everything, ask about sales, clinics, inventory, pets, logistics, or command actions..."
            disabled={isTyping}
            style={{
              flex: 1,
              padding: '12px 18px',
              borderRadius: '12px',
              border: '1.5px solid #e2e8f0',
              fontSize: '13.5px',
              outline: 'none',
              background: '#f8fafc',
              color: '#0f172a'
            }}
          />
          <button
            type="submit"
            disabled={isTyping || !query.trim()}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: 'none',
              background: (isTyping || !query.trim())
                ? '#cbd5e1'
                : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: 700,
              cursor: (isTyping || !query.trim()) ? 'not-allowed' : 'pointer'
            }}
          >
            Ask / Execute →
          </button>
        </form>
      </div>

      {/* ─── Executive Action Audit Modal ─── */}
      {showAuditModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '680px',
            width: '100%',
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
          }}>
            <div style={{ padding: '18px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                📋 Executive Action Audit Ledger (MySQL zenve_engine)
              </h3>
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
              {auditLogs.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#64748b', padding: '30px 0' }}>
                  No actions executed yet. Click "⚡ Approve &amp; Execute Action" on any proposal card.
                </div>
              ) : (
                auditLogs.map((log, idx) => (
                  <div key={idx} style={{ marginBottom: '14px', padding: '14px', borderRadius: '10px', background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 800, color: '#047857', fontFamily: 'monospace' }}>{log.action_id}</span>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{log.executed_at}</span>
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#334155', marginBottom: '6px' }}>{log.summary}</div>
                    <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'monospace' }}>
                      Txn Ref: {log.transaction_ref} · By: {log.executed_by}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: '14px 24px', borderTop: '1px solid #e2e8f0', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setShowAuditModal(false)}
                style={{ padding: '8px 16px', borderRadius: '8px', background: '#0f172a', color: '#ffffff', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                Close Ledger
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
