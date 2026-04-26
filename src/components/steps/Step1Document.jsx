import React, { useRef, useState } from 'react';
import { Upload, FileText, X, Loader } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import './StepStyles.css';

const Step1Document = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const { flightData, setFlightData, setCurrentStep, setError, setLoading: setStoreLoading } = useAppStore();

  const handleFileSelect = async (event) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setLoading(true);

    try {
      // Read file
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result;
        setPreview(typeof content === 'string' ? content.substring(0, 300) : 'Binary file');

        // Extract flight data using AI
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const extractPrompt = `Extract flight booking information from this document. Return JSON:
{
  "passengerName": "string",
  "bookingReference": "string",
  "airline": "string",
  "flightNumber": "string",
  "departureDate": "YYYY-MM-DD",
  "departureTime": "HH:MM",
  "arrivalDate": "YYYY-MM-DD",
  "arrivalTime": "HH:MM",
  "departureCity": "string",
  "arrivalCity": "string",
  "departureAirport": "code",
  "arrivalAirport": "code",
  "originalPrice": number,
  "currency": "USD|EUR|GBP",
  "ticketNumber": "string"
}

Document: ${content}

Return ONLY valid JSON.`;

        const response = await model.generateContent(extractPrompt);
        const text = response.response.text();
        const jsonMatch = text.match(/\{[\s\S]*\}/);

        if (jsonMatch) {
          const extracted = JSON.parse(jsonMatch[0]);
          setFlightData(extracted);
          setCurrentStep(2);
        } else {
          throw new Error('Could not extract flight data');
        }
      };
      reader.readAsText(selectedFile);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (loading) {
    return (
      <div className="step-card">
        <div className="step-header">
          <h2>Step 1: Upload Booking Document</h2>
          <p>Processing your document...</p>
        </div>
        <div className="step-content" style={{ textAlign: 'center', padding: '3rem' }}>
          <Loader size={48} className="spin" style={{ margin: '0 auto', color: 'var(--primary)' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Extracting flight details with AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 1: Upload Booking Document</h2>
        <p>Upload your flight booking confirmation (PDF, image, email)</p>
      </div>

      <div className="step-content">
        {!file ? (
          <div className="upload-zone" onClick={() => fileInputRef.current?.click()}>
            <Upload size={48} />
            <h3>Click to upload or drag and drop</h3>
            <p>PDF, PNG, JPG, TXT - your booking confirmation</p>
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
              <div>
                <p className="file-name">{file.name}</p>
                <p className="file-size">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <button className="btn-remove" onClick={handleRemoveFile}>
              <X size={20} />
            </button>
          </div>
        )}

        {preview && (
          <div className="preview-section">
            <h3>Preview</h3>
            <div className="preview-content">{preview}...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Step1Document;
