import React, { useRef } from 'react';
import './StepStyles.css';
import { Upload, FileText, X } from 'lucide-react';

const Step1Upload = ({ state, setState, onNext }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        setState({
          ...state,
          file: file,
          fileContent: content,
        });
      };
      reader.readAsText(file);
    }
  };

  const handleRemoveFile = () => {
    setState({
      ...state,
      file: null,
      fileContent: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 1: Upload Flight Document</h2>
        <p>Upload your flight booking confirmation or invoice</p>
      </div>

      <div className="step-content">
        {!state.file ? (
          <div
            className="upload-zone"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload size={48} />
            <h3>Click to upload or drag and drop</h3>
            <p>PDF, TXT, or image formats supported</p>
            <input
              ref={fileInputRef}
              type="file"
              hidden
              accept=".pdf,.txt,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileSelect}
            />
          </div>
        ) : (
          <div className="file-preview">
            <div className="file-info">
              <FileText size={32} />
              <div className="file-details">
                <p className="file-name">{state.file.name}</p>
                <p className="file-size">{(state.file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button
              className="btn-remove"
              onClick={handleRemoveFile}
              aria-label="Remove file"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {state.fileContent && (
          <div className="preview-section">
            <h3>Document Preview</h3>
            <div className="preview-content">
              {state.fileContent.substring(0, 500)}
              {state.fileContent.length > 500 && '...'}
            </div>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!state.file}
        >
          Next: Extract Data →
        </button>
      </div>
    </div>
  );
};

export default Step1Upload;
