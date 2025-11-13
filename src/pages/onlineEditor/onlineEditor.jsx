import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./editor.css";
import { AuthContext } from "../../context/AuthContext";
import MonacoCodeEditor from './MonacoCodeEditor';
import ProjectsList from './ProjectsList';
import PreviewPanel from './PreviewPanel';
import PromoSection from './PromoSection';
import EditorControls from './EditorControls';
import MultiPageInfo from './MultiPageInfo';
import BackendEditor from './BackendEditor';
import DataViewer from './DataViewer';
import { useSearchParams, useNavigate } from "react-router-dom";

// Helper functions
const linesToText = (linesObj = {}) => {
  try {
    if (!linesObj || Object.keys(linesObj).length === 0) return "<!DOCTYPE html>";
    return Object.keys(linesObj)
      .sort((a, b) => Number(a) - Number(b))
      .map((k) => linesObj[k] ?? "")
      .join("\n");
  } catch (error) {
    console.error("Error in linesToText:", error);
    return "<!DOCTYPE html>"; // Fallback to a default value
  }
};

const textToLines = (text = "") => {
  try {
    if (!text.trim()) return { 1: "<!DOCTYPE html>" };
    const out = {};
    text.split("\n").forEach((ln, i) => {
      out[String(i + 1)] = ln;
    });
    return out;
  } catch (error) {
    console.error("Error in textToLines:", error);
    return { 1: "<!DOCTYPE html>" }; // Fallback to a default value
  }
};

function detectMultiPage(html = "") {
  const pages = new Set();
  const hints = [];

  const reDataPage = /data-page\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = reDataPage.exec(html))) {
    const id = m[1].trim();
    if (id) pages.add(id);
  }

  const reHash = /href\s*=\s*["']#\/?([^"'\s>\/]+)[^"']*["']/gi;
  while ((m = reHash.exec(html))) {
    const id = m[1].trim();
    if (id) pages.add(id);
  }

  if (/"pages"\s*:/.test(html)) {
    const rePagesName = /"name"\s*:\s*["']([^"']+)["']/gi;
    let mm;
    while ((mm = rePagesName.exec(html))) {
      const id = mm[1].trim();
      if (id) pages.add(id);
    }
  }

  let defaultPage = null;
  const reDefaultOn = /<[^>]*data-page\s*=\s*["']([^"']+)["'][^>]*data-default\s*=\s*["']true["'][^>]*>/i;
  const dAttr = reDefaultOn.exec(html);
  if (dAttr && dAttr[1]) defaultPage = dAttr[1].trim();

  if (!defaultPage) {
    const dp = /"defaultPage"\s*:\s*["']([^"']+)["']/i.exec(html);
    if (dp && dp[1]) defaultPage = dp[1].trim();
  }

  const list = Array.from(pages);
  if (list.length <= 1) {
    return { detected: false, pages: list, defaultPage: defaultPage || null, hints };
  }

  const seen = {};
  list.forEach((p) => (seen[p] = (seen[p] || 0) + 1));
  Object.entries(seen).forEach(([k, v]) => {
    if (v > 1) hints.push(`Duplicate page id: "${k}"`);
  });

  if (!defaultPage) defaultPage = list[0];

  return { detected: true, pages: list, defaultPage, hints };
}

// HTML parsing and element mapping 
const parseHTMLToElementMap = (html) => {
  const lines = html.split('\n');
  const elementMap = new Map();
  let elementCount = 0; 
  
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed.startsWith('<') && !trimmed.startsWith('<!') && !trimmed.startsWith('</') && !trimmed.includes('</')) {
      // opening tag
      elementCount++;
      
      const tagMatch = trimmed.match(/^<(\w+)([^>]*)/);
      if (tagMatch) {
        const tagName = tagMatch[1].toLowerCase();
        const attributes = tagMatch[2];
        
        let selector = tagName;
      
        const idMatch = attributes.match(/id\s*=\s*["']([^"']+)["']/);
        if (idMatch) {
          selector = `#${idMatch[1]}`;
        } else {
          const classMatch = attributes.match(/class\s*=\s*["']([^"']+)["']/);
          if (classMatch) {
            const classes = classMatch[1].split(/\s+/).filter(c => c).join('.');
            selector = `${tagName}.${classes}`;
          } else {
            selector = `${tagName}:nth-of-type(${elementCount})`;
          }
        }
        
        if (import.meta.env.DEV) {
          console.log(`Line ${index + 1}: "${trimmed}" -> Selector: "${selector}"`);
        }
        elementMap.set(index + 1, selector);
      }
    }
  });
  
  return elementMap;
};

const fetchJson = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers.get("content-type");

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error ${res.status}: ${res.statusText}`, errorText);
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }

    if (contentType && contentType.includes("application/json")) {
      return await res.json();
    } else {
      const text = await res.text();
      console.error("Non-JSON response:", text);
      throw new Error("Expected JSON response but received non-JSON content.");
    }
  } catch (error) {
    console.error("Error fetching JSON from", url, error);
    throw error;
  }
};

const API = import.meta.env.VITE_BACKEND_API || "http://localhost:5000";

export default function OnlineEditor() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [activeProjectId, setActiveProjectId] = useState("");
  const [view, setView] = useState("home");
  const [previewUrl, setPreviewUrl] = useState("");
  const [current, setCurrent] = useState(null);
  const [frontendText, setFrontendText] = useState("");
  const [backendText, setBackendText] = useState("");
  const [dataJson, setDataJson] = useState({ name: "" });
  const [health, setHealth] = useState({ mongo: "checking" });
  const [blobUrl, setBlobUrl] = useState("");
  const [promoPrompt, setPromoPrompt] = useState("");
  const [promoTarget, setPromoTarget] = useState("frontend");
  const [promoBusy, setPromoBusy] = useState(false);
  const [promoTweet, setPromoTweet] = useState("");
  const [mpInfo, setMpInfo] = useState({
    detected: false,
    pages: [],
    defaultPage: null,
    hints: [],
  });
  const [leftPanelWidth, setLeftPanelWidth] = useState(window.innerWidth * 0.5);
  const [monacoEditor, setMonacoEditor] = useState(null);

  const { token } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Load user + projects
  const loadUser = async () => {
    setLoading(true);
    const res = await fetch(`${API}/api/user`, { headers: { Authorization: `Bearer ${token}` } });
    const json = await res.json();
    setProjects(json.projects || []);
    setActiveProjectId(json.activeProjectId || "");
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    console.log("token: ", token);
  }, [token]);

  // handle proj param from URL
  useEffect(() => {
    const projectParam = searchParams.get('project');
    if (projectParam && projects.length > 0) {
      // check if the project exists in user's projects
      const project = projects.find(p => p.projectId === projectParam);
      if (project) {
        openProject(projectParam);
      }
    }
  }, [searchParams, projects]);

  useEffect(() => {
    console.log("======project:", projects);
  }, [projects]);

  const runHealth = async () => {
    try {
      const res = await fetch(`${API}/api/health`, { headers: { Authorization: `Bearer ${token}` } });
      const h = await res.json();
      setHealth(h);
    } catch {
      setHealth({ mongo: "disconnected", ok: false });
    }
  };

  const openProject = async (projectId) => {
    await fetch(`${API}/api/active/${projectId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    const res = await fetch(`${API}/api/projects/${projectId}`, { headers: { Authorization: `Bearer ${token}` } });
    const p = await res.json();
    setCurrent(p);
    setFrontendText(linesToText(p.frontendJson?.lines));
    setBackendText(linesToText(p.backendJson?.lines));
    setDataJson(p.dataJson || { name: "" });
    setActiveProjectId(projectId);
    setView("editor");
    runHealth();
  };

  const openPreview = async (projectId) => {
    await fetch(`${API}/api/active/${projectId}`, { method: "POST", headers: { Authorization: `Bearer ${token}` } });
    const res = await fetch(`${API}/api/projects/${projectId}`, { headers: { Authorization: `Bearer ${token}` } });
    const p = await res.json();
    const html = linesToText(p.frontendJson?.lines || {});
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    setPreviewUrl(url);
    setCurrent(p);
    setView("preview");
    runHealth();
  };

  const createProject = async () => {
    const res = await fetch(`${API}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({}),
    });
    const json = await res.json();
    await loadUser();
    await openProject(json.activeProjectId);
  };

  const deleteProject = async (projectId) => {
    if (!window.confirm("Delete this project?")) return;
    await fetch(`${API}/api/projects/${projectId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    await loadUser();
    if (projectId === activeProjectId) {
      setView("home");
      setCurrent(null);
      setBlobUrl("");
    }
  };

  const saveEdits = async () => {
    if (!current) return;

    if (!frontendText.trim()) {
      alert("Frontend code is empty. Not saving.");
      return;
    }

    try {
      console.log("Saving frontend text:", frontendText);
      console.log("Saving backend text:", backendText);

      const body = JSON.stringify({
        frontendText: frontendText,  
        backendText: backendText     
      });

      const res = await fetchJson(`${API}/api/projects/${current.projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body,
      });

      console.log("Save successful:", res);
      await openProject(current.projectId);
      alert("Saved.");
    } catch (error) {
      console.error("Save error:", error);
      alert(`Error saving project: ${error.message}`);
    }
  };

  const runPromo = async () => {
    if (!current) return;
    if (!promoTarget) {
      alert("Pick Frontend or Backend");
      return;
    }
    setPromoBusy(true);
    setPromoTweet("");
    try {
      const res = await fetch(`${API}/api/promo`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          projectId: current.projectId,
          target: promoTarget,
          prompt: promoPrompt,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        alert(`AI change failed: ${json.error || "Unknown error"}`);
        setPromoBusy(false);
        return;
      }
      setPromoTweet(json.tweet || "");
      await openProject(current.projectId);
      alert("AI changes applied.");
    } catch (e) {
      alert("Network error while sending to AI");
    } finally {
      setPromoBusy(false);
    }
  };

  useEffect(() => {
    if (view !== "editor") return;
    if (blobUrl) URL.revokeObjectURL(blobUrl);

    const backendAPI = import.meta.env.VITE_BACKEND_API || "http://localhost:5000";

    const injectedGlobals = `
      <script>
        window.API_URL = "${backendAPI}";
        window.TOKEN = "${token}";
        
        // Override fetch for auth
        const originalFetch = window.fetch;
        window.fetch = function(url, options = {}) {
          console.log('Fetch called with:', url, options);
          
          // Ensure options is an object and has headers
          if (!options) options = {};
          if (!options.headers) options.headers = {};
          
          // Add auth headers for API calls - only for actual backend API calls
          const shouldAddAuth = url.startsWith(window.API_URL) || 
                               url.includes('/api/');
          
          if (shouldAddAuth && window.TOKEN) {
            console.log('Adding auth header for URL:', url);
            options.headers = {
              ...options.headers,
              'Authorization': 'Bearer ' + window.TOKEN
            };
          }
          
          console.log('Final fetch options:', options);
          return originalFetch(url, options);
        };
        
        // Chrome DevTools-style highlighting system
        let currentHighlighted = null;
        
        window.addEventListener('message', function(e) {
          if (e.data && e.data.type === 'highlight-element') {
            clearHighlight();
            
            try {
              const element = document.querySelector(e.data.selector);
              if (element) {
                element.classList.add('devtools-highlight');
                currentHighlighted = element;
                
                // Add overlay similar to Chrome DevTools
                const rect = element.getBoundingClientRect();
                const overlay = document.createElement('div');
                overlay.className = 'devtools-overlay';
                overlay.style.cssText = \`
                  position: fixed;
                  top: \${rect.top}px;
                  left: \${rect.left}px;
                  width: \${rect.width}px;
                  height: \${rect.height}px;
                  pointer-events: none;
                  z-index: 10000;
                  border: 2px solid #1976d2;
                  background: rgba(25, 118, 210, 0.1);
                  box-shadow: 0 0 0 1px rgba(25, 118, 210, 0.3);
                \`;
                document.body.appendChild(overlay);
                overlay.setAttribute('data-devtools-overlay', 'true');
              }
            } catch (err) {
              console.warn('Element not found:', e.data.selector);
            }
          }
          
          if (e.data && e.data.type === 'clear-highlight') {
            clearHighlight();
          }
        });
        
        function clearHighlight() {
          // Remove previous highlights
          document.querySelectorAll('.devtools-highlight').forEach(el => {
            el.classList.remove('devtools-highlight');
          });
          
          // Remove overlay
          document.querySelectorAll('[data-devtools-overlay]').forEach(el => {
            el.remove();
          });
          
          currentHighlighted = null;
        }
      </script>
      
      <style>
        .devtools-highlight {
          outline: 2px solid #1976d2 !important;
          outline-offset: -2px !important;
        }
        
        .devtools-overlay {
          animation: devtools-pulse 1.5s ease-in-out infinite;
        }
        
        @keyframes devtools-pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
      </style>
    `;

    const htmlWithGlobals = injectedGlobals + "\n" + frontendText;
    const url = URL.createObjectURL(new Blob([htmlWithGlobals], { type: "text/html" }));
    setBlobUrl(url);
  }, [frontendText, view, token]);

  useEffect(() => {
    if (view !== "editor") return;
    const info = detectMultiPage(frontendText || "");
    setMpInfo(info);
  }, [frontendText, view]);

  const toggleView = async () => {
    if (view === "editor") {
      // switch to preview mode - create preview URL from current editor content
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      const html = frontendText; // use current editor content
      const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
      setPreviewUrl(url);
      setView("preview");
    } else if (view === "preview") {
      // switch to editor mode
      setView("editor");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'p' && current) {
        e.preventDefault();
        toggleView();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [current, view]);

  const handleReloadPreview = (html, project) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
    setPreviewUrl(url);
    setCurrent(project);
  };

  // sesize handling for editor panels
  const handleResizeStart = (e) => {
    e.preventDefault();
    document.body.style.cursor = 'ew-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    const newWidth = e.clientX;
    const minWidth = 200;
    const maxWidth = window.innerWidth * 0.8;
    setLeftPanelWidth(Math.max(minWidth, Math.min(newWidth, maxWidth)));
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  };

  // Handle window resize
  useEffect(() => {
    const handleWindowResize = () => {
      const maxWidth = window.innerWidth * 0.8;
      if (leftPanelWidth > maxWidth) {
        setLeftPanelWidth(maxWidth);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [leftPanelWidth]);

  return (
    <div className="online-editor">
      <div className="editor-top-bar">
        <div>
          <strong>FindVirtual.me — Online Editor</strong>
          {current && (
            <span style={{ marginLeft: '20px', color: '#8aadf4' }}>
              {view === 'editor' ? '📝 Edit Mode' : view === 'preview' ? '👁 Preview Mode' : ''}
            </span>
          )}
        </div>
        <div className="editor-top-buttons">
          <button onClick={() => setView("home")}>Home</button>
          <button onClick={createProject}>New Project</button>
        </div>
      </div>
      {view === "home" ? (
        <ProjectsList
          projects={projects}
          loading={loading}
          onCreateProject={createProject}
          onOpenProject={openProject}
          onDeleteProject={deleteProject}
          onNavigateToDashboard={() => navigate("/dashboard")}
        />
      ) : view === "editor" ? (
        <div className="editor-main-container">
          <div 
            className="editor-left-panel"
            style={{ width: leftPanelWidth }}
          >
            <div className="editor-preview-info">
              <div>
                <strong>Live Preview</strong> — Active Project: {current.projectId}
              </div>
              <div>Health: Mongo = {health.mongo || "checking"}</div>
            </div>
            <iframe 
              title="preview" 
              src={blobUrl || null}
              className="editor-preview-iframe" 
            />
          </div>

          <div 
            className="editor-resize-handle"
            onMouseDown={handleResizeStart}
          />

          <div className="editor-right-panel">
            <EditorControls
              onSave={saveEdits}
              onReload={openProject}
              onToggleView={toggleView}
              onGoHome={() => setView("home")}
              current={current}
            />

            <MultiPageInfo mpInfo={mpInfo} />

            <details open className="editor-section">
              <summary>
                <strong>Frontend (editable)</strong>
              </summary>
              <div className="editor-monaco-container" style={{ height: '400px' }}>
                <MonacoCodeEditor
                  height="100%"
                  language="html"
                  theme="vs-dark"
                  value={frontendText}
                  onChange={(value) => setFrontendText(value || '')}
                  onMount={(editor, monaco) => {
                    setMonacoEditor(editor);
                  }}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    renderWhitespace: 'boundary',
                    scrollBeyondLastLine: false,
                    wordWrap: 'on',
                    automaticLayout: true,
                  }}
                />
              </div>
              <div className="editor-note">
                This is the HTML/JS/CSS lines joined as text. Saving will split back into numbered lines in Mongo.
              </div>
            </details>

            <BackendEditor
              backendText={backendText}
              onBackendTextChange={setBackendText}
            />

            <DataViewer
              current={current}
              data={dataJson}
              loading={false}
              error={null}
            />

            <hr className="editor-separator" />

            <PromoSection
              promoTarget={promoTarget}
              promoPrompt={promoPrompt}
              promoBusy={promoBusy}
              promoTweet={promoTweet}
              onTargetChange={setPromoTarget}
              onPromptChange={setPromoPrompt}
              onRunPromo={runPromo}
            />
          </div>
        </div>
      ) : (
        <PreviewPanel
          current={current}
          previewUrl={previewUrl}
          onToggleView={toggleView}
          onGoHome={() => setView("home")}
          onReloadPreview={handleReloadPreview}
          token={token}
          API={API}
          linesToText={linesToText}
        />
      )}
    </div>
  );
}
