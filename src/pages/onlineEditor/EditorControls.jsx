const EditorControls = ({ onSave, onReload, onToggleView, onGoHome, current, onTogglePublic, isPublic }) => {
  return (
    <div className="editor-controls">
      <button onClick={onSave}>Save</button>
      <button onClick={() => onReload(current.projectId)}>Reload</button>
      <button onClick={onToggleView}>Preview</button>
      <button onClick={onGoHome}>Home</button>
      <div
        onClick={onTogglePublic}
        className={`relative w-24 h-9 rounded-full cursor-pointer transition-colors duration-300 flex items-center
    ${isPublic ? "bg-blue-600" : "bg-gray-300"}`}
      >
        <div
          className={`border border-slate-900 absolute w-3/4 py-2 flex items-center justify-center rounded-full bg-gray-900 text-white text-sm font-medium transition-transform duration-300
      ${isPublic ? "translate-x-[24px]" : "translate-x-0"}`}
        >
          {isPublic ? "public" : "private"}
        </div>
      </div>
    </div>
  );
};

export default EditorControls;
