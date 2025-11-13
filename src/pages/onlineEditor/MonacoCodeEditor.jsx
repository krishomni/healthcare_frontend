import React, { useEffect, useRef } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './MonacoCodeEditor.css';

const MonacoCodeEditor = ({ 
  value, 
  onChange, 
  onMount, 
  language = "html",
  theme = "vs-dark",
  height = "100%",
  options = {},
  onMouseMove,
  onMouseLeave
}) => {
  const editorRef = useRef(null);

  const defaultOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    renderWhitespace: 'boundary',
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    automaticLayout: true,
    ...options
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Set up hover highlighting if callbacks are provided
    if (onMouseMove || onMouseLeave) {
      setupHoverHighlighting(editor, monaco, onMouseMove, onMouseLeave);
    }
    
    // Call the parent's onMount callback if provided
    if (onMount) {
      onMount(editor, monaco);
    }
  };

  const setupHoverHighlighting = (editor, monaco, onMouseMoveCallback, onMouseLeaveCallback) => {
    let currentDecoration = [];
    let hoverTimeout;
    
    if (onMouseMoveCallback) {
      editor.onMouseMove((e) => {
        clearTimeout(hoverTimeout);
        hoverTimeout = setTimeout(() => {
          if (e.target.position) {
            const lineNumber = e.target.position.lineNumber;
            
            // Clear previous highlighting
            currentDecoration = editor.deltaDecorations(currentDecoration, []);
            
            if (lineNumber) {
              // Highlight current line
              currentDecoration = editor.deltaDecorations([], [{
                range: new monaco.Range(lineNumber, 1, lineNumber, 1),
                options: {
                  isWholeLine: true,
                  className: 'monaco-line-highlight',
                  glyphMarginClassName: 'monaco-line-highlight-glyph'
                }
              }]);
              
              // Call parent callback
              onMouseMoveCallback(lineNumber);
            }
          }
        }, 50); // 50ms debounce
      });
    }
    
    if (onMouseLeaveCallback) {
      editor.onMouseLeave(() => {
        clearTimeout(hoverTimeout);
        
        // Clear highlighting
        currentDecoration = editor.deltaDecorations(currentDecoration, []);
        
        // Call parent callback
        onMouseLeaveCallback();
      });
    }
  };

  return (
    <div className="monaco-editor-container" style={{ height }}>
      <MonacoEditor
        height={height}
        language={language}
        theme={theme}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={defaultOptions}
      />
    </div>
  );
};

export default MonacoCodeEditor;
