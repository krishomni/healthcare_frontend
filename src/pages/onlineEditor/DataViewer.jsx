
import React from 'react';

const DataViewer = ({ current, data, loading, error }) => {
  const DataTab = (() => {
    if (loading) return <div>Loading data...</div>;
    if (error) return <div className="error">Error: {error}</div>;
    if (!data || Object.keys(data).length === 0) {
      return <div>No data found for this project.</div>;
    }

    return (
      <div className="data-viewer">
        <pre className="json-display">{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  })();

  return (
    <details className="editor-section">
      <summary>
        <strong>Data (read-only)</strong>
      </summary>
      {DataTab}
      <div className="editor-note">
        To change data, use the form inside the live preview (left). The preview posts to <code>/name</code>.
      </div>
    </details>
  );
};

export default DataViewer;
