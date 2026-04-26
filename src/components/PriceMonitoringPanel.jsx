import React, { useEffect, useState } from 'react';
import { Bell, TrendingDown, Calendar, Loader } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { startDailyPriceMonitoring, getBookingMonitoringHistory } from '../../services/priceVerifier';
import './StepStyles.css';

const PriceMonitoringPanel = () => {
  const { flightData } = useAppStore();
  const [monitoringActive, setMonitoringActive] = useState(false);
  const [monitoringHistory, setMonitoringHistory] = useState(null);
  const [priceDropDetected, setPriceDropDetected] = useState(false);

  useEffect(() => {
    if (flightData && flightData.bookingReference) {
      const history = getBookingMonitoringHistory(
        flightData.airline,
        flightData.flightNumber,
        flightData.bookingReference
      );
      setMonitoringHistory(history);
    }
  }, [flightData]);

  const startMonitoring = () => {
    if (!flightData) return;

    setMonitoringActive(true);
    
    // Start daily monitoring
    const intervalId = startDailyPriceMonitoring(flightData, (notification) => {
      if (notification.priceDropPercentage >= 5) {
        setPriceDropDetected(true);
        
        // Show browser notification
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification('FairClaim: Price Drop Detected!', {
            body: notification.message,
            icon: '✈️',
          });
        }
      }
      
      // Update history
      const updated = getBookingMonitoringHistory(
        flightData.airline,
        flightData.flightNumber,
        flightData.bookingReference
      );
      setMonitoringHistory(updated);
    });

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => clearInterval(intervalId);
  };

  return (
    <div className="monitoring-panel">
      <div className="monitoring-header">
        <Bell size={24} />
        <h3>Daily Price Monitoring</h3>
      </div>

      {!monitoringActive ? (
        <div className="monitoring-inactive">
          <p>Enable daily price monitoring to automatically check for price drops</p>
          <button className="btn-primary" onClick={startMonitoring}>
            Start Daily Monitoring 🔔
          </button>
        </div>
      ) : (
        <div className="monitoring-active">
          <div className="status-badge active">
            <span className="pulse"></span>
            Monitoring Active - Checks Every 24 Hours
          </div>

          {priceDropDetected && (
            <div className="price-drop-alert">
              <TrendingDown size={24} />
              <div>
                <h4>Price Drop Detected!</h4>
                <p>A price reduction has been found. Compensation claim ready.</p>
              </div>
            </div>
          )}

          {monitoringHistory && monitoringHistory.checks && (
            <div className="monitoring-history">
              <h4>Check History</h4>
              <div className="checks-list">
                {monitoringHistory.checks.slice(-5).reverse().map((check, idx) => (
                  <div key={idx} className="check-item">
                    <div className="check-date">
                      <Calendar size={16} />
                      {new Date(check.timestamp).toLocaleDateString()}
                    </div>
                    <div className="check-price">
                      {check.priceDropPercentage > 0 ? (
                        <span className="drop">{check.priceDropPercentage}% drop</span>
                      ) : (
                        <span className="stable">No change</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PriceMonitoringPanel;
