import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import "./editor.css";
import { AuthContext } from "../../context/AuthContext";

// Helper functions
const linesToText = (linesObj = {}) =>
  Object.keys(linesObj)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => linesObj[k] ?? "")
    .join("\n");

const textToLines = (text = "") => {
  const out = {};
  text.split("\n").forEach((ln, i) => (out[String(i + 1)] = ln));
  return out;
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

//change later
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
  const iframeRef = useRef(null);
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

  const { token } = useContext(AuthContext);

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
    await fetch(`${API}/api/projects/${current.projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        frontendText,
        backendText,
      }),
    });
    await openProject(current.projectId);
    alert("Saved.");
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

    // Get backend base URL (use your .env variable or fallback)
    const backendAPI = import.meta.env.VITE_BACKEND_API || "http://localhost:5000";

    // Build small script to inject before the user’s HTML
    const injectedGlobals = `
    <script>
      window.API_URL = "${backendAPI}";
      window.TOKEN = "${token}";
      console.log("Injected globals:", window.API_URL, window.TOKEN);
    </script>
  `;

    // Combine injection + user code
    const htmlWithGlobals = injectedGlobals + "\n" + frontendText;

    // Create blob URL
    const url = URL.createObjectURL(new Blob([htmlWithGlobals], { type: "text/html" }));

    setBlobUrl(url);
  }, [frontendText, view, token]);

  useEffect(() => {
    if (view !== "editor") return;
    const info = detectMultiPage(frontendText || "");
    setMpInfo(info);
  }, [frontendText, view]);

  const DataTab = useMemo(() => <pre className="editor-data-tab">{JSON.stringify(dataJson, null, 2)}</pre>, [dataJson]);

  const Home = (
    <div className="editor-home">
      <div className="editor-header">
        <h2>Projects</h2>
        <div>
          <button onClick={createProject}>New Project</button>
        </div>
      </div>
      {loading ? (
        <div>Loading…</div>
      ) : projects.length === 0 ? (
        <div>No projects yet. Click "New Project".</div>
      ) : (
        <table className="editor-projects-table" width="100%" cellPadding="8">
          <thead>
            <tr>
              <th>Name</th>
              <th>Project ID</th>
              <th>Updated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.projectId}>
                <td>{p.name}</td>
                <td>{p.projectId}</td>
                <td>{new Date(p.updatedAt).toLocaleString?.() || ""}</td>
                <td>
                  <button onClick={() => openProject(p.projectId)}>Edit</button>{" "}
                  <button onClick={() => openPreview(p.projectId)}>Preview Live</button>{" "}
                  <button onClick={() => deleteProject(p.projectId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  const Preview = current && (
    <div className="editor-preview-container">
      <div className="editor-preview-header">
        <div>
          <strong>Preview — {current.name}</strong> &nbsp;&nbsp;
          <span className="editor-project-id">Project: {current.projectId}</span>
        </div>
        <div className="editor-preview-buttons">
          <button onClick={() => setView("home")}>Back to Home</button>
          <button
            onClick={() => {
              if (!previewUrl) return;
              window.open(previewUrl, "_blank", "noopener,noreferrer");
            }}
          >
            Open in New Tab
          </button>
          <button
            onClick={async () => {
              if (!current) return;
              const res = await fetch(`${API}/api/projects/${current.projectId}`, {
                headers: { Authorization: `Bearer ${token}` },
              });
              const p = await res.json();
              const html = linesToText(p.frontendJson?.lines || {});
              if (previewUrl) URL.revokeObjectURL(previewUrl);
              const url = URL.createObjectURL(new Blob([html], { type: "text/html" }));
              setPreviewUrl(url);
              setCurrent(p);
            }}
          >
            Reload Preview
          </button>
        </div>
      </div>
      <div className="editor-preview-frame">
        <iframe title="live-preview" src={previewUrl} className="editor-iframe" />
      </div>
    </div>
  );

  const Editor = current && (
    <div className="editor-main-container">
      <div className="editor-left-panel">
        <div className="editor-preview-info">
          <div>
            <strong>Live Preview</strong> — Active Project: {current.projectId}
          </div>
          <div>Health: Mongo = {health.mongo || "checking"}</div>
        </div>
        <iframe ref={iframeRef} title="preview" src={blobUrl || "about:blank"} className="editor-preview-iframe" />
      </div>

      <div className="editor-right-panel">
        <div className="editor-controls">
          <button onClick={saveEdits}>Save</button>
          <button onClick={() => openProject(current.projectId)}>Reload</button>
          <button onClick={() => setView("home")}>Home</button>
        </div>

        {mpInfo.detected && (
          <div className="editor-multipage-info">
            <div>
              <strong>Multiple pages detected</strong>
            </div>
            <div className="editor-pages-list">
              Pages: {mpInfo.pages.join(", ")}
              {mpInfo.defaultPage ? ` • Default: ${mpInfo.defaultPage}` : ""}
            </div>
            {mpInfo.hints.length > 0 && (
              <div className="editor-hints">
                {mpInfo.hints.map((h, i) => (
                  <div key={i}>⚠️ {h}</div>
                ))}
              </div>
            )}
            <div className="editor-routing-note">
              Routing is controlled by the user's HTML/JS. We don't modify their file; this preview just informs you.
            </div>
          </div>
        )}

        <details open className="editor-section">
          <summary>
            <strong>Frontend (editable)</strong>
          </summary>
          <textarea
            value={frontendText}
            onChange={(e) => setFrontendText(e.target.value)}
            className="editor-textarea"
          />
          <div className="editor-note">
            This is the HTML/JS/CSS lines joined as text. Saving will split back into numbered lines in Mongo.
          </div>
        </details>

        <details className="editor-section">
          <summary>
            <strong>Backend (editable)</strong>
          </summary>
          <textarea value={backendText} onChange={(e) => setBackendText(e.target.value)} className="editor-textarea" />
          <div className="editor-note">
            Stored for display/versioning in MVP. The running backend doesn't hot-reload from this text (by design).
          </div>
        </details>

        <details className="editor-section">
          <summary>
            <strong>Data (read-only)</strong>
          </summary>
          {DataTab}
          <div className="editor-note">
            To change data, use the form inside the live preview (left). The preview posts to <code>/name</code>.
          </div>
        </details>

        <hr className="editor-separator" />

        <div className="editor-promo-section">
          <div className="editor-promo-header">
            <strong>Promo / AI Changes</strong>
            <span className="editor-promo-subtitle">Select exactly one file to send</span>
          </div>

          <div className="editor-radio-group">
            <label>
              <input
                type="radio"
                name="promoTarget"
                value="frontend"
                checked={promoTarget === "frontend"}
                onChange={() => setPromoTarget("frontend")}
              />{" "}
              Send Frontend JSON
            </label>
            <label>
              <input
                type="radio"
                name="promoTarget"
                value="backend"
                checked={promoTarget === "backend"}
                onChange={() => setPromoTarget("backend")}
              />{" "}
              Send Backend JSON
            </label>
          </div>

          <textarea
            placeholder="Type here to ask for changes (e.g., 'Make the button text more descriptive and center the title. Write a tweet announcing the update.')"
            value={promoPrompt}
            onChange={(e) => setPromoPrompt(e.target.value)}
            className="editor-promo-textarea"
          />

          <div className="editor-promo-controls">
            <button onClick={runPromo} disabled={promoBusy}>
              {promoBusy ? "Sending…" : "Send to AI"}
            </button>
            {promoTweet && <span className="editor-tweet">Tweet: {promoTweet}</span>}
          </div>

          <div className="editor-ai-note">
            The AI returns updated lines for the selected file. We apply them and refresh the preview.
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="online-editor">
      <div className="editor-top-bar">
        <div>
          <strong>FindVirtual.me — Online Editor</strong>
        </div>
        <div className="editor-top-buttons">
          <button onClick={() => setView("home")}>Home</button>
          <button onClick={createProject}>New Project</button>
        </div>
      </div>
      {view === "home" ? Home : view === "editor" ? Editor : Preview}
    </div>
  );
}
