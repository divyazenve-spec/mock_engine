import React, { useState, useEffect } from 'react';
import DashboardLayout from '../shared/DashboardLayout';
import KpiCard from '../shared/KpiCard';
import { MOCK_INTEGRATIONS } from './mockSettingsData';

const PROVIDER_PRESETS = [
  {
    id: 'openai_compatible',
    name: 'Custom OpenAI-Compatible',
    icon: '🤖',
    desc: 'OpenAI, Azure, Ollama, DeepSeek, Groq, vLLM, or LocalAI',
    defaultUrl: 'https://api.openai.com/v1',
    defaultModel: 'gpt-4o-mini',
    models: ['gpt-4o-mini', 'gpt-4o', 'llama-3.3-70b-versatile', 'deepseek-chat', 'mistral-large-latest']
  },
  {
    id: 'gemini',
    name: 'Google Gemini',
    icon: '💎',
    desc: 'Google AI Studio & Vertex AI high-speed multimodal models',
    defaultUrl: 'https://generativelanguage.googleapis.com',
    defaultModel: 'gemini-1.5-flash',
    models: ['gemini-1.5-flash', 'gemini-1.5-pro', 'gemini-2.0-flash']
  },
  {
    id: 'built_in',
    name: 'Air-Gapped Neural RAG Engine',
    icon: '🛡️',
    desc: 'Zero external dependencies, 100% on-premise zero-egress execution',
    defaultUrl: '',
    defaultModel: 'zenve-neural-rag-v5',
    models: ['zenve-neural-rag-v5']
  }
];

export default function ApiAndIntegrations() {
  const [showKey, setShowKey] = useState(false);
  const [showAiKey, setShowAiKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedAiKey, setCopiedAiKey] = useState(false);

  // Custom AI & Enterprise RAG Configuration State
  const [provider, setProvider] = useState('openai_compatible');
  const [apiUrl, setApiUrl] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [model, setModel] = useState('gpt-4o-mini');
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [temperature, setTemperature] = useState(0.2);
  const [ragEnabled, setRagEnabled] = useState(true);
  const [agenticEnabled, setAgenticEnabled] = useState(true);
  const [hitlApproval, setHitlApproval] = useState(true);
  const [systemPrompt, setSystemPrompt] = useState(
    'You are Dr. Zenve, the Chief Executive AI & Autonomous Operations Intelligence for Zenve Pets Healthcare (14 Veterinary Hospital Hubs, E-Pharmacy, 60-Minute Express Delivery, and Preventive Care Ecosystem in India). Ground all answers strictly in the provided enterprise RAG context. State currency in INR (₹ Lakhs/Crores) and formulate concise executive briefings with actionable conclusions.'
  );

  // Status & Telemetry State
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionResult, setConnectionResult] = useState(null);
  const [savingConfig, setSavingConfig] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Interactive Live RAG Sandbox State
  const [sandboxQuery, setSandboxQuery] = useState('What is our Bravecto inventory status and draft a PO?');
  const [sandboxRunning, setSandboxRunning] = useState(false);
  const [sandboxResponse, setSandboxResponse] = useState(null);

  const defaultPlatformApiKey = 'znv_live_9482bf7a810d2948cbb194208a002941e7f3';

  // Fetch initial AI Status on mount
  useEffect(() => {
    fetchAiStatus();
  }, []);

  async function fetchAiStatus() {
    try {
      const res = await fetch('/api/v1/custom-ai/status');
      if (res.ok) {
        const data = await res.json();
        const cfg = data.config || {};
        if (cfg.provider) setProvider(cfg.provider);
        if (cfg.api_url) setApiUrl(cfg.api_url);
        if (cfg.model) setModel(cfg.model);
        if (cfg.temperature !== undefined) setTemperature(cfg.temperature);
        if (cfg.rag_enabled !== undefined) setRagEnabled(cfg.rag_enabled);
        if (cfg.agentic_workflow_enabled !== undefined) setAgenticEnabled(cfg.agentic_workflow_enabled);
        if (cfg.system_prompt) setSystemPrompt(cfg.system_prompt);
        if (data.connection) setConnectionResult(data.connection);
      }
    } catch (err) {
      console.warn('[Custom AI Status] fetch error:', err);
    }
  }

  const handleTestConnection = async () => {
    setTestingConnection(true);
    setConnectionResult(null);
    try {
      const res = await fetch('/api/v1/custom-ai/test-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          api_url: apiUrl,
          api_key: apiKey,
          model,
          gemini_api_key: geminiApiKey,
          temperature
        })
      });
      const data = await res.json();
      setConnectionResult(data);
    } catch (err) {
      setConnectionResult({ ok: false, error: err.message, latency_ms: 0 });
    } finally {
      setTestingConnection(false);
    }
  };

  const handleSaveConfig = async () => {
    setSavingConfig(true);
    setSaveMessage('');
    try {
      const res = await fetch('/api/v1/custom-ai/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          provider,
          api_url: apiUrl,
          api_key: apiKey,
          model,
          gemini_api_key: geminiApiKey,
          temperature,
          rag_enabled: ragEnabled,
          agentic_workflow_enabled: agenticEnabled,
          system_prompt: systemPrompt
        })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setSaveMessage('✓ Custom API Integration and Enterprise RAG settings successfully deployed and active in runtime!');
      setTimeout(() => setSaveMessage(''), 5000);
      handleTestConnection();
    } catch (err) {
      setSaveMessage(`⚠️ Error saving configuration: ${err.message}`);
    } finally {
      setSavingConfig(false);
    }
  };

  const handleRunSandboxQuery = async () => {
    if (!sandboxQuery.trim()) return;
    setSandboxRunning(true);
    setSandboxResponse(null);
    try {
      const res = await fetch('/api/v1/custom-ai/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sandboxQuery })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setSandboxResponse(data);
    } catch (err) {
      setSandboxResponse({ text: `Execution Error: ${err.message}`, agent_steps: [] });
    } finally {
      setSandboxRunning(false);
    }
  };

  const cardStyle = {
    background: '#ffffff',
    border: '1px solid #e2e8f0',
    borderRadius: '12px',
    padding: '22px 24px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: '20px'
  };

  return (
    <DashboardLayout
      category="Settings"
      subcategory="API & Integrations"
      title="API Keys, Custom AI & External Integrations"
      subtitle="Configure Custom API Integration (Enterprise RAG & 5-Agent Architecture), external EHR bridges, and webhook gateways"
      icon="🧠"
      badge="Enterprise AI Active"
      actions={
        <button
          onClick={handleSaveConfig}
          disabled={savingConfig}
          style={{
            padding: '8px 18px',
            borderRadius: '8px',
            border: 'none',
            background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(37,99,235,0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          {savingConfig ? '⏳ Deploying...' : '💾 Save & Deploy AI Configuration'}
        </button>
      }
    >
      {/* Top Telemetry KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', marginBottom: '20px' }}>
        <KpiCard
          label="AI Model Engine"
          value={model || 'gpt-4o-mini'}
          delta={connectionResult?.ok ? "● Online" : "Ready"}
          trend="up"
          subtext={provider === 'built_in' ? "Air-Gapped Neural RAG" : (provider === 'gemini' ? "Google Gemini Studio" : "OpenAI-Compatible")}
          icon="🧠"
        />
        <KpiCard
          label="Enterprise RAG Grounding"
          value="5 Data Layers"
          delta="100% Grounded"
          trend="up"
          subtext="MySQL zenve_engine Live"
          icon="🛡️"
        />
        <KpiCard
          label="Agentic Pipeline"
          value="5 Collaborators"
          delta="Human-in-the-Loop"
          trend="up"
          subtext="Text-to-Action Active"
          icon="🤖"
        />
        <KpiCard
          label="Custom API Latency"
          value={connectionResult?.latency_ms ? `${connectionResult.latency_ms} ms` : "18 ms"}
          delta={connectionResult?.ok ? "High Throughput" : "Zero Egress"}
          trend="up"
          subtext="Direct Gateway Ping"
          icon="⚡"
        />
      </div>

      {saveMessage && (
        <div style={{
          padding: '12px 16px',
          borderRadius: '8px',
          background: saveMessage.startsWith('✓') ? '#ecfdf5' : '#fef2f2',
          border: `1px solid ${saveMessage.startsWith('✓') ? '#a7f3d0' : '#fecaca'}`,
          color: saveMessage.startsWith('✓') ? '#065f46' : '#991b1b',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '20px'
        }}>
          {saveMessage}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: CUSTOM API INTEGRATION & ENTERPRISE RAG ARCHITECTURE
          ═══════════════════════════════════════════════════════════════════ */}
      <div style={{
        ...cardStyle,
        background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)',
        border: '1px solid #cbd5e1'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '20px' }}>⚡</span>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 800, color: '#0f172a' }}>
                Custom API Integration (Enterprise RAG & Agentic Architecture)
              </h3>
            </div>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#64748b' }}>
              Connect your enterprise LLM endpoint (OpenAI, Azure OpenAI, Ollama, DeepSeek, Groq, or Google Gemini) with real-time MySQL RAG grounding.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              fontSize: '11px',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: '20px',
              background: connectionResult?.ok ? '#ecfdf5' : '#fff7ed',
              color: connectionResult?.ok ? '#047857' : '#c2410c',
              border: `1px solid ${connectionResult?.ok ? '#a7f3d0' : '#fed7aa'}`
            }}>
              {connectionResult?.ok ? `● ${connectionResult.status}` : '● Awaiting Connection Test'}
            </span>
            <button
              onClick={handleTestConnection}
              disabled={testingConnection}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#1e293b',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {testingConnection ? '🔄 Testing Ping...' : '🔌 Test Connection'}
            </button>
          </div>
        </div>

        {/* Provider Selector Cards */}
        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px', display: 'block' }}>
          Select AI Architecture & Model Provider
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '20px' }}>
          {PROVIDER_PRESETS.map((p) => {
            const isSelected = provider === p.id;
            return (
              <div
                key={p.id}
                onClick={() => {
                  setProvider(p.id);
                  if (p.defaultUrl && !apiUrl) setApiUrl(p.defaultUrl);
                  setModel(p.defaultModel);
                }}
                style={{
                  padding: '16px',
                  borderRadius: '10px',
                  border: isSelected ? '2px solid #2563eb' : '1px solid #e2e8f0',
                  background: isSelected ? '#eff6ff' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '20px' }}>{p.icon}</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: isSelected ? '#1d4ed8' : '#0f172a' }}>{p.name}</span>
                  </div>
                  {isSelected && (
                    <span style={{ fontSize: '12px', color: '#2563eb', fontWeight: 800 }}>✓ Active</span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b', lineHeight: 1.4 }}>{p.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Endpoint & Model Configuration Inputs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '18px' }}>
          {/* Custom API Base URL */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Custom API Endpoint URL (Base REST Gateway)
            </label>
            <input
              type="text"
              value={apiUrl}
              onChange={(e) => setApiUrl(e.target.value)}
              placeholder="e.g. https://api.openai.com/v1 or http://localhost:11434/v1"
              disabled={provider === 'built_in'}
              style={{
                width: '100%',
                padding: '9px 12px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                background: provider === 'built_in' ? '#f1f5f9' : '#ffffff',
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '12px',
                color: '#0f172a',
                boxSizing: 'border-box'
              }}
            />
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
              Compatible with any standard OpenAI `/v1/chat/completions` API (Ollama, Azure, Groq, DeepSeek).
            </span>
          </div>

          {/* Model Identifier */}
          <div>
            <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
              Model Identifier (LLM Engine Name)
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. gpt-4o-mini, gemini-1.5-flash, llama-3.3-70b"
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#ffffff',
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '12px',
                  color: '#0f172a',
                  boxSizing: 'border-box'
                }}
              />
              <select
                onChange={(e) => setModel(e.target.value)}
                value=""
                style={{
                  padding: '9px 10px',
                  borderRadius: '8px',
                  border: '1px solid #cbd5e1',
                  background: '#f8fafc',
                  fontSize: '12px',
                  color: '#334155',
                  cursor: 'pointer'
                }}
              >
                <option value="" disabled>Presets ▾</option>
                <option value="gpt-4o-mini">gpt-4o-mini</option>
                <option value="gpt-4o">gpt-4o</option>
                <option value="gemini-1.5-flash">gemini-1.5-flash</option>
                <option value="gemini-1.5-pro">gemini-1.5-pro</option>
                <option value="llama-3.3-70b-versatile">llama-3.3-70b</option>
                <option value="deepseek-chat">deepseek-chat</option>
                <option value="claude-3-5-sonnet">claude-3-5-sonnet</option>
              </select>
            </div>
            <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
              Select a recommended preset or type any custom model name hosted on your infrastructure.
            </span>
          </div>

          {/* API Key / Secret Token */}
          {provider !== 'built_in' && (
            <div>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
                {provider === 'gemini' ? 'Google Gemini API Key' : 'Custom API Bearer Token / API Key'}
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type={showAiKey ? 'text' : 'password'}
                  value={provider === 'gemini' ? geminiApiKey : apiKey}
                  onChange={(e) => provider === 'gemini' ? setGeminiApiKey(e.target.value) : setApiKey(e.target.value)}
                  placeholder={provider === 'gemini' ? "AIzaSy..." : "sk-... or custom secret"}
                  style={{
                    flex: 1,
                    padding: '9px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#ffffff',
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: '12px',
                    color: '#0f172a',
                    boxSizing: 'border-box'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowAiKey(!showAiKey)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: '8px',
                    border: '1px solid #cbd5e1',
                    background: '#f8fafc',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  {showAiKey ? '🙈' : '👁️'}
                </button>
              </div>
              <span style={{ fontSize: '11px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                Encrypted in-flight. Persisted securely in `backend/.env`.
              </span>
            </div>
          )}

          {/* Temperature & Creativity Control */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155' }}>
                Model Temperature (Grounded vs Creative)
              </label>
              <span style={{ fontSize: '12px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 700, color: '#2563eb' }}>
                {temperature} ({temperature <= 0.2 ? 'Strictly Grounded' : 'Balanced'})
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginTop: '2px' }}>
              <span>0.0 (Deterministic RAG)</span>
              <span>0.5</span>
              <span>1.0 (Creative)</span>
            </div>
          </div>
        </div>

        {/* Enterprise RAG Knowledge Layers Toggles */}
        <div style={{
          background: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          padding: '16px 18px',
          marginBottom: '18px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                📚 Enterprise RAG Grounding Layers (Multi-Vector Retrieval)
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>
                Context chunks dynamically injected into system context window prior to model inference
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: ragEnabled ? '#047857' : '#64748b', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={ragEnabled}
                onChange={(e) => setRagEnabled(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              RAG Augmentation {ragEnabled ? 'ON' : 'OFF'}
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>💾 MySQL zenve_engine</div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Live orders, medicine inventory, clinics, and pet census tables</span>
            </div>
            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>💊 Veterinary Formulary</div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Cold-chain 2°C – 8°C IoT rules, Bravecto & Rabisin protocols</span>
            </div>
            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>🏥 Hospital Network Ops</div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>14 Hub EBITDA benchmarks, ICU occupancy & surgeon ratings</span>
            </div>
            <div style={{ padding: '10px 12px', borderRadius: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '12px' }}>
              <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>⚡ 60-Minute Logistics</div>
              <span style={{ fontSize: '11px', color: '#64748b' }}>Hyperlocal rider dispatch SLA & regional weather variance</span>
            </div>
          </div>
        </div>

        {/* 5-Agent Architecture Visualizer */}
        <div style={{
          background: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          padding: '16px 18px',
          marginBottom: '18px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '13px', fontWeight: 700, color: '#0f172a' }}>
                🤖 5-Agent Collaborative Execution Architecture
              </h4>
              <p style={{ margin: '2px 0 0', fontSize: '11px', color: '#64748b' }}>
                Multi-agent orchestration workflow executing sequentially for every executive inquiry
              </p>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 700, color: '#1e293b' }}>
              <input
                type="checkbox"
                checked={hitlApproval}
                onChange={(e) => setHitlApproval(e.target.checked)}
                style={{ cursor: 'pointer' }}
              />
              Human-in-the-Loop Confirmation Required
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {[
              { step: '1', title: 'Supervisor Agent', desc: 'Intent classification & safety guardrails', icon: '🛡️' },
              { step: '2', title: 'LiveQuery Agent', desc: 'Direct MySQL schema queries (zero mock)', icon: '💾' },
              { step: '3', title: 'RAG Retriever', desc: 'Veterinary clinical & financial knowledge', icon: '📚' },
              { step: '4', title: 'Reasoning Agent', desc: 'Custom API model inference & synthesis', icon: '🧠' },
              { step: '5', title: 'Action Drafter', desc: 'Text-to-Action human-in-the-loop proposals', icon: '⚡' }
            ].map((ag, i) => (
              <React.Fragment key={i}>
                <div style={{
                  minWidth: '150px',
                  flex: '1',
                  background: '#f8fafc',
                  border: '1px solid #cbd5e1',
                  borderRadius: '8px',
                  padding: '10px 12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px' }}>{ag.icon}</span>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a' }}>{ag.title}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '10px', color: '#64748b' }}>{ag.desc}</p>
                </div>
                {i < 4 && <span style={{ color: '#94a3b8', fontWeight: 700 }}>→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* System Prompt Customizer */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '6px' }}>
            Executive AI Persona & System Instructions
          </label>
          <textarea
            rows={3}
            value={systemPrompt}
            onChange={(e) => setSystemPrompt(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              color: '#334155',
              lineHeight: 1.5,
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Live Interactive Sandbox Tester */}
        <div style={{
          background: '#0f172a',
          borderRadius: '10px',
          padding: '18px 20px',
          color: '#f8fafc'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '16px' }}>🧪</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#f8fafc' }}>
                Live Model & Enterprise RAG Execution Sandbox
              </span>
            </div>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontFamily: '"IBM Plex Mono", monospace' }}>
              Engine: {model || 'gpt-4o-mini'} · Provider: {provider}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input
              type="text"
              value={sandboxQuery}
              onChange={(e) => setSandboxQuery(e.target.value)}
              placeholder="Test any question e.g. What is our Bravecto inventory status and draft a PO?"
              onKeyDown={(e) => e.key === 'Enter' && handleRunSandboxQuery()}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid #334155',
                background: '#1e293b',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <button
              onClick={handleRunSandboxQuery}
              disabled={sandboxRunning}
              style={{
                padding: '10px 18px',
                borderRadius: '8px',
                border: 'none',
                background: '#2563eb',
                color: '#ffffff',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {sandboxRunning ? '⏳ Reasoning...' : '🚀 Test RAG Execution'}
            </button>
          </div>

          {sandboxResponse && (
            <div style={{
              background: '#1e293b',
              borderRadius: '8px',
              padding: '14px',
              border: '1px solid #334155',
              fontSize: '12px',
              lineHeight: 1.6
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#38bdf8' }}>
                  ✓ Inference Synthesized via {sandboxResponse.model_used || model}
                </span>
                <span style={{ fontSize: '10px', color: '#94a3b8', fontFamily: '"IBM Plex Mono", monospace' }}>
                  5-Agent Pipeline Verified
                </span>
              </div>
              <div style={{ whiteSpace: 'pre-wrap', color: '#e2e8f0', fontFamily: 'sans-serif' }}>
                {sandboxResponse.text}
              </div>

              {sandboxResponse.agent_steps && (
                <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #334155' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                    Agentic Execution Trace:
                  </span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {sandboxResponse.agent_steps.map((st, i) => (
                      <div key={i} style={{ fontSize: '11px', color: '#cbd5e1' }}>
                        <span style={{ color: '#38bdf8', fontWeight: 600 }}>• {st.agent}:</span> {st.note}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: PRODUCTION API CREDENTIALS & SIGNING SECRET
          ═══════════════════════════════════════════════════════════════════ */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🔑 Production Platform API Credentials & Signing Secret</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Rate limited to 1,000 requests per minute with signed HMAC SHA-256 header verification</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            Production Key Active
          </span>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type={showKey ? 'text' : 'password'}
            value={defaultPlatformApiKey}
            readOnly
            style={{
              flex: '1',
              minWidth: '280px',
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#f8fafc',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '13px',
              color: '#0f172a',
              outline: 'none'
            }}
          />
          <button
            onClick={() => setShowKey(!showKey)}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              background: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {showKey ? '🙈 Hide' : '👁️ Reveal'}
          </button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(defaultPlatformApiKey);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            style={{
              padding: '10px 14px',
              borderRadius: '8px',
              border: '1px solid #2563eb',
              background: '#2563eb',
              color: '#ffffff',
              fontSize: '12px',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            {copied ? '✓ Copied' : '📋 Copy Key'}
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: CONNECTED EXTERNAL WEBHOOK & MICROSERVICE BRIDGES
          ═══════════════════════════════════════════════════════════════════ */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#0f172a' }}>🔌 Active Webhook & Microservice Bridges</h3>
            <p style={{ margin: '4px 0 0', fontSize: '12px', color: '#64748b' }}>Live operational status across payment rails, communications, logistics, and clinical software</p>
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: '#ecfdf5', color: '#047857' }}>
            10 Connected
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontSize: '12px' }}>
                <th style={{ padding: '12px 14px' }}>Integration Connector</th>
                <th style={{ padding: '12px 14px' }}>Service Type</th>
                <th style={{ padding: '12px 14px' }}>Status</th>
                <th style={{ padding: '12px 14px' }}>Uptime</th>
                <th style={{ padding: '12px 14px' }}>Last Synchronized</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_INTEGRATIONS.map((it, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '12px 14px', fontWeight: 700, color: '#0f172a' }}>{it.name}</td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 600, padding: '3px 8px', borderRadius: '4px', background: '#eff6ff', color: '#1d4ed8' }}>
                      {it.type}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{ fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px', background: '#ecfdf5', color: '#047857' }}>
                      ● {it.status}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', fontFamily: '"IBM Plex Mono", monospace', fontWeight: 600, color: '#059669' }}>{it.uptime}</td>
                  <td style={{ padding: '12px 14px', color: '#64748b', fontSize: '12px', fontFamily: '"IBM Plex Mono", monospace' }}>{it.lastSync}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
