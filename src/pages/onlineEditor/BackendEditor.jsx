
import React from 'react';

const BackendEditor = ({ backendText, onBackendTextChange }) => {
  return (
    <details className="editor-section">
      <summary>
        <strong>Backend (editable)</strong>
      </summary>
      <textarea 
        value={backendText} 
        onChange={(e) => onBackendTextChange(e.target.value)} 
        className="editor-textarea" 
      />
      <div className="editor-note">
        Stored for display/versioning in MVP. The running backend doesn't hot-reload from this text (by design).
      </div>
    </details>
  );
};

export default BackendEditor;
