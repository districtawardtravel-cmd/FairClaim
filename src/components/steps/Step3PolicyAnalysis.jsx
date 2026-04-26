import React, { useEffect, useState } from 'react';
import { Shield, Loader, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { analyzePolicies } from '../../services/policyAnalyzer';
import './StepStyles.css';

const Step3PolicyAnalysis = () => {
  const { flightData, currentPrice, setAirlinePolicy, setEligibilityStatus, setLegalBasis, setCurrentStep, setLoading, loading } = useAppStore();
  const [analysis, setAnalysis] = useState(null);
  const [analyzed, setAnalyzed] = useState(false);

  useEffect(() => {
    if (flightData && currentPrice && !analyzed) {
      analyzePolicy();
    }
  }, [flightData, currentPrice, analyzed]);

  const analyzePolicy = async () => {
    setLoading(true);
    try {
      const flightDataWithPrice = {
        ...flightData,
        currentPrice: currentPrice,
      };
      const result = await analyzePolicies(flightData.airline, flightDataWithPrice);
      setAnalysis(result);
      setAirlinePolicy(result.airlineRules);
      setEligibilityStatus(result.eligibility);
      setLegalBasis(result.compensationBasis);
      setAnalyzed(true);
    } catch (error) {
      console.error('Analysis error:', error);
      setAnalyzed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 3: Airline Policy Analysis</h2>
        <p>Analyzing policies and regulations...</p>
      </div>

      <div className="step-content">
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Loader size={40} className="spin" style={{ margin: '0 auto', color: 'var(--primary)' }} />
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Analyzing airline policies and regulations...</p>
          </div>
        )}

        {analysis && (
          <>
            <div className={`eligibility-badge ${analysis.eligibility.toLowerCase()}`}>
              {analysis.eligibility === 'ELIGIBLE' ? (
                <CheckCircle size={24} />
              ) : (
                <AlertCircle size={24} />
              )}
              <div>
                <h3>{analysis.eligibility}</h3>
                <p>{analysis.eligibilityReason}</p>
              </div>
            </div>

            <div className="policy-section">
              <h3>📋 Airline Policy</h3>
              <p>{analysis.airlineRules}</p>
            </div>

            <div className="policy-section">
              <h3>⚖️ Regulatory Basis</h3>
              <p>{analysis.regulatoryBasis}</p>
            </div>

            <div className="compensation-section">
              <h4>💰 Compensation Amount</h4>
              <p className="compensation-amount">{flightData.currency} {analysis.compensationAmount.toFixed(2)}</p>
              <p className="compensation-basis">{analysis.compensationBasis}</p>
            </div>

            {analysis.eligibility === 'ELIGIBLE' && (
              <button
                className="btn-primary"
                onClick={() => setCurrentStep(4)}
                style={{ width: '100%', marginTop: '1rem' }}
              >
                Review Email Draft →
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Step3PolicyAnalysis;
