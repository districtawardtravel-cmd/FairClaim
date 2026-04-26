import React, { useEffect, useState } from 'react';
import { TrendingDown, Loader, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { verifyPriceDrop } from '../../services/priceVerifier';
import './StepStyles.css';

const Step2Verification = () => {
  const { flightData, currentPrice, setCurrentPrice, setPriceVerified, setCurrentStep, loading, setLoading, error } = useAppStore();
  const [verification, setVerification] = useState(null);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (flightData && !verified) {
      verifyPriceDrop();
    }
  }, [flightData, verified]);

  const verifyPriceDrop = async () => {
    setLoading(true);
    try {
      const result = await verifyPriceDrop(
        flightData.airline,
        flightData.flightNumber,
        flightData.originalPrice
      );
      setVerification(result);
      setCurrentPrice(result.currentPrice);
      setPriceVerified(true);
      setVerified(true);
    } catch (err) {
      setVerified(true);
    } finally {
      setLoading(false);
    }
  };

  const discount = verification
    ? ((flightData.originalPrice - verification.currentPrice) / flightData.originalPrice * 100).toFixed(1)
    : 0;

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 2: Price Verification</h2>
        <p>Triple-checking current airline price...</p>
      </div>

      <div className="step-content">
        {loading && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <Loader size={40} className="spin" style={{ margin: '0 auto', color: 'var(--primary)' }} />
            <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Verifying price drop from airline database...</p>
          </div>
        )}

        {verification && (
          <>
            <div className="price-box">
              <div className="price-row">
                <span>Original Price</span>
                <span className="amount">{flightData.currency} {flightData.originalPrice.toFixed(2)}</span>
              </div>
              <div className="price-row">
                <span>Current Price</span>
                <span className="amount highlight">{flightData.currency} {verification.currentPrice.toFixed(2)}</span>
              </div>
              <div className="price-row savings">
                <span>You Save</span>
                <span className="amount">{flightData.currency} {(flightData.originalPrice - verification.currentPrice).toFixed(2)}</span>
              </div>
            </div>

            <div className="verification-badge success">
              <TrendingDown size={24} />
              <div>
                <h3>{discount}% Price Drop Confirmed</h3>
                <p>Verified via airline database</p>
              </div>
            </div>

            <button
              className="btn-primary"
              onClick={() => setCurrentStep(3)}
              style={{ width: '100%', marginTop: '1rem' }}
            >
              Continue to Policy Analysis →
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Step2Verification;
