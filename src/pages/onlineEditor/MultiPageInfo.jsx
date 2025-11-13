import React from 'react';

const MultiPageInfo = ({ mpInfo }) => {
  if (!mpInfo.detected) return null;

  return (
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
  );
};

export default MultiPageInfo;
