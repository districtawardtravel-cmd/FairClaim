import React, { useEffect, useState } from 'react';
import { Mail, Loader, Copy, Check } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { generateEmailContent } from '../../services/policyAnalyzer';
import './StepStyles.css';

const Step4EmailReview = () => {
  const { flightData, currentPrice, legalBasis, setCurrentStep, setLoading, loading } = useAppStore();
  const [emailContent, setEmailContent] = useState('');
  const [generated, setGenerated] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (flightData && currentPrice && !generated) {
      generateEmail();
    }
  }, [flightData, currentPrice, generated]);

  const generateEmail = async () => {
    setLoading(true);
    try {
      const content = await generateEmailContent(flightData, {
        compensationBasis: legalBasis,
        airlineRules: 'Policy analysis completed',
      });
      setEmailContent(content);
      setGenerated(true);
    } catch (error) {
      console.error('Email generation error:', error);
      setGenerated(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(emailContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 4: Review Compensation Email</h2>
        <p>AI-generated professional email ready to send to airline</p>
      </div>

      <div className="step-content">
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Loader size={40} className="spin" style={{ margin: '0 auto', color: 'var(--primary)' }} />
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Generating professional email...</p>
          </div>
        )}

        {emailContent && (
          <>
            <div className="email-box">
              <div className="email-header">
                <Mail size={24} />
                <h3>Compensation Request Email</h3>
                <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={handleCopy}>
                  {copied ? (
                    <>
                      <Check size={18} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <div className="email-content">{emailContent}</div>
            </div>

            <div className="action-buttons">
              <button
                className="btn-secondary"
                onClick={() => setCurrentStep(3)}
              >
                ← Back to Analysis
              </button>
              <button
                className="btn-primary"
                onClick={() => setCurrentStep(5)}
              >
                Send to Airline →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Step4EmailReview;
