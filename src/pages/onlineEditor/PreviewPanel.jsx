import React from "react";

const PreviewPanel = ({
  current,
  previewUrl,
  onToggleView,
  onGoHome,
  onOpenInNewTab,
  onReloadPreview,
  token,
  API,
  linesToText,
}) => {
  const handleReloadPreview = async () => {
    if (!current) return;

    try {
      const res = await fetch(`${API}/api/projects/${current.projectId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const p = await res.json();
      const html = linesToText(p.frontendJson?.lines || {});

      onReloadPreview(html, p);
    } catch (error) {
      console.error("Error reloading preview:", error);
    }
  };

  if (!current) return null;

  return (
    <div className="editor-preview-container">
      <div className="editor-preview-header">
        <div>
          <strong>Preview — {current.name}</strong> &nbsp;&nbsp;
          <span className="editor-project-id">Project: {current.projectId}</span>
        </div>
        <div className="editor-preview-buttons">
          <button onClick={onToggleView}>Edit</button>
          <button onClick={onGoHome}>Back to Home</button>
          <button
            onClick={() => {
              if (!previewUrl) return;
              window.open(previewUrl, "_blank", "noopener,noreferrer");
            }}
          >
            Open in New Tab
          </button>
          <button onClick={handleReloadPreview}>Reload Preview</button>
        </div>
      </div>
      <div className="editor-preview-frame">
        <iframe title="live-preview" src={previewUrl} className="editor-iframe" />
      </div>
    </div>
  );
};

export default PreviewPanel;
