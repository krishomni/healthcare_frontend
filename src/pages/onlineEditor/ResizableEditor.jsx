import React, { useRef, useEffect, useState } from 'react';
import MonacoCodeEditor from './MonacoCodeEditor';
import EditorControls from './EditorControls';
import MultiPageInfo from './MultiPageInfo';
import BackendEditor from './BackendEditor';
import DataViewer from './DataViewer';
import PromoSection from './PromoSection';

const ResizableEditor = ({
  current,
  health,
  blobUrl,
  leftPanelWidth,
  setLeftPanelWidth,
  frontendText,
  setFrontendText,
  backendText,
  setBackendText,
  setMonacoEditor,
  mpInfo,
  data,
  dataLoading,
  dataError,
  promoTarget,
  promoPrompt,
  promoBusy,
  promoTweet,
  setPromoTarget,
  setPromoPrompt,
  parseHTMLToElementMap,
  onSaveEdits,
  onOpenProject,
  onToggleView,
  onGoHome,
  onRunPromo
}) => {
  const iframeRef = useRef();

  // resize handling
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
    document.querySelector('.editor-main-container')?.classList.remove('resizing');
  };

  const handleResizeStart = () => {
    document.addEventListener('mousemove', handleMouseMove, true);
    document.addEventListener('mouseup', handleMouseUp, true);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.querySelector('.editor-main-container')?.classList.add('resizing');
  };

  // handle window resize
  useEffect(() => {
    const handleWindowResize = () => {
      const maxWidth = window.innerWidth * 0.8;
      if (leftPanelWidth > maxWidth) {
        setLeftPanelWidth(maxWidth);
      }
    };

    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [leftPanelWidth, setLeftPanelWidth]);

  const handleLineHover = (lineNumber) => {
    // send to iframe for DOM highlighting
    const elementMap = parseHTMLToElementMap(frontendText);
    const selector = elementMap.get(lineNumber);
    
    if (selector && iframeRef.current) {
      iframeRef.current.contentWindow?.postMessage({
        type: 'highlight-element',
        selector: selector,
        lineNumber: lineNumber
      }, '*');
    }
  };

  const handleLineHoverEnd = () => {
    // clear iframe highlighting
    iframeRef.current?.contentWindow?.postMessage({
      type: 'clear-highlight'
    }, '*');
  };

  return (
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
          ref={iframeRef} 
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
          onSave={onSaveEdits}
          onReload={onOpenProject}
          onToggleView={onToggleView}
          onGoHome={onGoHome}
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
              onMouseMove={handleLineHover}
              onMouseLeave={handleLineHoverEnd}
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
          data={data}
          loading={dataLoading}
          error={dataError}
        />

        <hr className="editor-separator" />

        <PromoSection
          promoTarget={promoTarget}
          promoPrompt={promoPrompt}
          promoBusy={promoBusy}
          promoTweet={promoTweet}
          onTargetChange={setPromoTarget}
          onPromptChange={setPromoPrompt}
          onRunPromo={onRunPromo}
        />
      </div>
    </div>
  );
};

export default ResizableEditor;
