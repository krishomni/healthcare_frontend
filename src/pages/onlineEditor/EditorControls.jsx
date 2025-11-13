
import React from 'react';

const EditorControls = ({ 
  onSave, 
  onReload, 
  onToggleView, 
  onGoHome,
  current 
}) => {
  return (
    <div className="editor-controls">
      <button onClick={onSave}>Save</button>
      <button onClick={() => onReload(current.projectId)}>Reload</button>
      <button onClick={onToggleView}>Preview</button>
      <button onClick={onGoHome}>Home</button>
    </div>
  );
};

export default EditorControls;
