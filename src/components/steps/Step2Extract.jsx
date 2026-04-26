import React, { useState } from 'react';
import './StepStyles.css';
import { Loader, AlertCircle } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Step2Extract = ({ state, setState, onNext, onPrev }) => {
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const extractFlightData = async () => {
    if (!state.fileContent) return;
    setLoading(true);

    try {
      if (!apiKey) {
        throw new Error('Google API key not configured. Set VITE_GOOGLE_API_KEY in .env.local');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Extract flight information from the following document. Return a JSON object with these fields:
{
  "passengerName": "string",
  "bookingReference": "string",
  "airline": "string",
  "flightNumber": "string",
  "departureDate": "YYYY-MM-DD",
  "departureTime": "HH:MM",
  "arrivalDate": "YYYY-MM-DD",
  "arrivalTime": "HH:MM",
  "departureAirport": "string (airport code)",
  "arrivalAirport": "string (airport code)",
  "originalPrice": "number",
  "currency": "string",
  "ticketNumber": "string"
}

Document content:
${state.fileContent}

If any field is not found, use null. Return only valid JSON.`;

      const response = await model.generateContent(prompt);
      const text = response.response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Could not extract structured data from document');
      }
      
      const flightData = JSON.parse(jsonMatch[0]);

      setState({
        ...state,
        flightData: flightData,
        extractionError: null,
      });

      onNext();
    } catch (error) {
      console.error('Extraction error:', error);
      setState({
        ...state,
        extractionError: error.message || 'Failed to extract flight data. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 2: Extract Flight Data</h2>
        <p>AI-powered extraction of flight information from your document</p>
      </div>

      <div className="step-content">
        <div className="info-box">
          <p>We'll use AI to automatically extract flight details from your uploaded document.</p>
        </div>

        {state.extractionError && (
          <div className="error-box">
            <AlertCircle size={20} />
            <div>
              <p className="error-title">Extraction Error</p>
              <p className="error-message">{state.extractionError}</p>
            </div>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onPrev}>
          ← Back
        </button>
        <button
          className="btn-primary"
          onClick={extractFlightData}
          disabled={loading || !state.fileContent}
        >
          {loading ? (
            <>
              <Loader size={18} className="spin" />
              Extracting...
            </>
          ) : (
            'Extract Data →'
          )}
        </button>
      </div>
    </div>
  );
};

export default Step2Extract;
