import React from 'react';

const PromoSection = ({ 
  promoTarget, 
  promoPrompt, 
  promoBusy, 
  promoTweet, 
  onTargetChange, 
  onPromptChange, 
  onRunPromo 
}) => {
  return (
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
            onChange={() => onTargetChange("frontend")}
          />{" "}
          Send Frontend JSON
        </label>
        <label>
          <input
            type="radio"
            name="promoTarget"
            value="backend"
            checked={promoTarget === "backend"}
            onChange={() => onTargetChange("backend")}
          />{" "}
          Send Backend JSON
        </label>
      </div>

      <textarea
        placeholder="Type here to ask for changes (e.g., 'Make the button text more descriptive and center the title. Write a tweet announcing the update.')"
        value={promoPrompt}
        onChange={(e) => onPromptChange(e.target.value)}
        className="editor-promo-textarea"
      />

      <div className="editor-promo-controls">
        <button onClick={onRunPromo} disabled={promoBusy}>
          {promoBusy ? "Sending…" : "Send to AI"}
        </button>
        {promoTweet && <span className="editor-tweet">Tweet: {promoTweet}</span>}
      </div>

      <div className="editor-ai-note">
        The AI returns updated lines for the selected file. We apply them and refresh the preview.
      </div>
    </div>
  );
};

export default PromoSection;
