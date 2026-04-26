import React, { useState, useEffect } from 'react';
import './StepStyles.css';
import { TrendingDown, TrendingUp } from 'lucide-react';

const Step3Compare = ({ state, setState, onNext, onPrev }) => {
  const [localPrice, setLocalPrice] = useState('');
  const [delta, setDelta] = useState(null);
  const [deltaPercentage, setDeltaPercentage] = useState(null);

  useEffect(() => {
    if (localPrice && state.flightData?.originalPrice) {
      const current = parseFloat(localPrice);
      const original = state.flightData.originalPrice;
      const difference = original - current;
      const percentage = ((difference / original) * 100).toFixed(2);
      
      setDelta(difference);
      setDeltaPercentage(percentage);
    } else {
      setDelta(null);
      setDeltaPercentage(null);
    }
  }, [localPrice, state.flightData?.originalPrice]);

  const handlePriceChange = (e) => {
    const value = e.target.value;
    setLocalPrice(value);
    setState({
      ...state,
      currentPrice: value ? parseFloat(value) : null,
    });
  };

  const isPositiveDelta = delta && delta > 0;
  const badgeClass = isPositiveDelta ? 'positive' : 'negative';

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 3: Compare Prices</h2>
        <p>Enter the current flight price and we'll calculate the difference</p>
      </div>

      <div className="step-content">
        {state.flightData && (
          <div className="flight-summary">
            <div className="summary-item">
              <span className="label">Passenger:</span>
              <span className="value">{state.flightData.passengerName || 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span className="label">Airline:</span>
              <span className="value">{state.flightData.airline || 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span className="label">Flight Number:</span>
              <span className="value">{state.flightData.flightNumber || 'N/A'}</span>
            </div>
            <div className="summary-item">
              <span className="label">Original Price:</span>
              <span className="value highlight">
                {state.flightData.currency || '$'} {state.flightData.originalPrice?.toFixed(2) || 'N/A'}
              </span>
            </div>
          </div>
        )}

        <div className="price-input-section">
          <label htmlFor="currentPrice">Current Flight Price</label>
          <div className="input-group">
            <span className="currency">
              {state.flightData?.currency || '$'}
            </span>
            <input
              id="currentPrice"
              type="number"
              placeholder="Enter current price"
              value={localPrice}
              onChange={handlePriceChange}
              step="0.01"
              min="0"
            />
          </div>
        </div>

        {delta !== null && (
          <div className={`price-delta-box ${badgeClass}`}>
            <div className="delta-header">
              {isPositiveDelta ? (
                <TrendingDown size={24} />
              ) : (
                <TrendingUp size={24} />
              )}
              <h3>{isPositiveDelta ? 'Price Decreased' : 'Price Increased'}</h3>
            </div>
            <div className="delta-values">
              <div className="delta-amount">
                <span className="label">Price Difference:</span>
                <span className="amount">
                  {state.flightData?.currency || '$'} {Math.abs(delta).toFixed(2)}
                </span>
              </div>
              <div className="delta-percentage">
                <span className="label">Percentage:</span>
                <span className="percentage">{Math.abs(deltaPercentage)}%</span>
              </div>
            </div>
            {isPositiveDelta && (
              <p className="compensation-note">
                ✈️ You may be eligible for {state.flightData?.currency || '$'} {delta.toFixed(2)} compensation
              </p>
            )}
          </div>
        )}
      </div>

      <div className="step-actions">
        <button className="btn-secondary" onClick={onPrev}>
          ← Back
        </button>
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!delta || !isPositiveDelta}
        >
          Next: Generate Email →
        </button>
      </div>
    </div>
  );
};

export default Step3Compare;
