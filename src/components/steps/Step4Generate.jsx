import React, { useState } from 'react';
import './StepStyles.css';
import { Loader, Copy, Check } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Step4Generate = ({ state, setState, onReset, onPrev }) => {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;

  const generateEmail = async () => {
    setLoading(true);

    try {
      if (!apiKey) {
        throw new Error('Google API key not configured. Set VITE_GOOGLE_API_KEY in .env.local');
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const delta = state.flightData.originalPrice - state.currentPrice;
      const deltaPercentage = ((delta / state.flightData.originalPrice) * 100).toFixed(2);

      const prompt = `Generate a professional, polite email requesting flight price compensation. Use the following flight details:

Passenger Name: ${state.flightData.passengerName}
Booking Reference: ${state.flightData.bookingReference}
Airline: ${state.flightData.airline}
Flight Number: ${state.flightData.flightNumber}
Departure: ${state.flightData.departureAirport} on ${state.flightData.departureDate}
Arrival: ${state.flightData.arrivalAirport} on ${state.flightData.arrivalDate}
Original Price: ${state.flightData.currency} ${state.flightData.originalPrice.toFixed(2)}
Current Price: ${state.flightData.currency} ${state.currentPrice.toFixed(2)}
Price Difference: ${state.flightData.currency} ${delta.toFixed(2)} (${deltaPercentage}%)

The email should:
1. Be professional and courteous
2. Clearly state the price reduction
3. Request compensation for the price difference
4. Include relevant flight details
5. Be concise but complete (200-300 words)
6. Include a call to action

Generate only the email body, ready to send.`;

      const response = await model.generateContent(prompt);
      const emailText = response.response.text();

      setState({
        ...state,
        emailText: emailText,
        generationError: null,
      });
    } catch (error) {
      console.error('Generation error:', error);
      setState({
        ...state,
        generationError: error.message || 'Failed to generate email. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopyEmail = () => {
    if (state.emailText) {
      navigator.clipboard.writeText(state.emailText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 4: Generate Compensation Email</h2>
        <p>Create a professional email to claim your flight price compensation</p>
      </div>

      <div className="step-content">
        {!state.emailText ? (
          <div className="info-box">
            <p>Click below to generate a professional email requesting compensation for the price difference.</p>
          </div>
        ) : (
          <div className="email-box">
            <div className="email-header">
              <h3>Generated Email</h3>
              <button
                className={`btn-copy ${copied ? 'copied' : ''}`}
                onClick={handleCopyEmail}
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy to Clipboard
                  </>
                )}
              </button>
            </div>
            <div className="email-content">
              {state.emailText}
            </div>
          </div>
        )}

        {state.generationError && (
          <div className="error-box">
            <p className="error-title">Generation Error</p>
            <p className="error-message">{state.generationError}</p>
          </div>
        )}
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onPrev}>
          ← Back
        </button>
        {!state.emailText ? (
          <button
            className="btn-primary"
            onClick={generateEmail}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader size={18} className="spin" />
                Generating...
              </>
            ) : (
              'Generate Email ✨'
            )}
          </button>
        ) : (
          <button className="btn-success" onClick={onReset}>
            Start Over →
          </button>
        )}
      </div>
    </div>
  );
};

export default Step4Generate;
