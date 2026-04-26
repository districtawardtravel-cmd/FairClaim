export const verifyPriceDrop = async (airline, flightNumber, originalPrice) => {
  // Real-time price verification
  // In production, integrate with:
  // - Skyscanner API
  // - Google Flights API  
  // - Airline's booking system
  // - Kayak API
  // - Expedia API

  return new Promise((resolve) => {
    setTimeout(() => {
      const currentPrice = originalPrice * 0.85;
      const verified = true;
      const proofUrl = `https://prices.example.com/${airline}/${flightNumber}`;

      resolve({
        currentPrice,
        verified,
        proofUrl,
        lastChecked: new Date().toISOString(),
        priceHistory: [
          { date: new Date(Date.now() - 7*24*60*60*1000).toISOString(), price: originalPrice },
          { date: new Date(Date.now() - 3*24*60*60*1000).toISOString(), price: originalPrice * 0.92 },
          { date: new Date().toISOString(), price: currentPrice },
        ],
      });
    }, 2000);
  });
};

// Daily price monitoring service
export const startDailyPriceMonitoring = (bookingData, callback) => {
  // Check immediately
  checkPriceAndNotify(bookingData, callback);
  
  // Then check every 24 hours
  const dailyCheckInterval = setInterval(
    () => checkPriceAndNotify(bookingData, callback),
    24 * 60 * 60 * 1000 // 24 hours
  );
  
  return dailyCheckInterval; // Return to stop monitoring if needed
};

// Also check every 12 hours for more frequent updates
export const startIntensiveMonitoring = (bookingData, callback) => {
  checkPriceAndNotify(bookingData, callback);
  
  const intensiveCheckInterval = setInterval(
    () => checkPriceAndNotify(bookingData, callback),
    12 * 60 * 60 * 1000 // 12 hours
  );
  
  return intensiveCheckInterval;
};

const checkPriceAndNotify = async (bookingData, callback) => {
  try {
    const result = await verifyPriceDrop(
      bookingData.airline,
      bookingData.flightNumber,
      bookingData.originalPrice
    );
    
    const priceDropPercentage = (
      (bookingData.originalPrice - result.currentPrice) / 
      bookingData.originalPrice * 100
    ).toFixed(2);
    
    const notification = {
      timestamp: new Date().toISOString(),
      currentPrice: result.currentPrice,
      originalPrice: bookingData.originalPrice,
      priceDropAmount: bookingData.originalPrice - result.currentPrice,
      priceDropPercentage,
      detected: true,
      message: `Price dropped ${priceDropPercentage}% from ${bookingData.currency} ${bookingData.originalPrice.toFixed(2)} to ${bookingData.currency} ${result.currentPrice.toFixed(2)}`,
    };
    
    // Store in localStorage for persistence
    const monitoringData = JSON.parse(localStorage.getItem('priceMonitoring') || '{}');
    const bookingKey = `${bookingData.airline}_${bookingData.flightNumber}_${bookingData.bookingReference}`;
    
    if (!monitoringData[bookingKey]) {
      monitoringData[bookingKey] = {
        booking: bookingData,
        checks: [],
        priceDropDetected: false,
        lastDropNotification: null,
      };
    }
    
    monitoringData[bookingKey].checks.push(notification);
    
    // If price drop detected and >= 5%, mark it
    if (priceDropPercentage >= 5) {
      monitoringData[bookingKey].priceDropDetected = true;
      monitoringData[bookingKey].lastDropNotification = notification;
    }
    
    localStorage.setItem('priceMonitoring', JSON.stringify(monitoringData));
    
    // Call callback with notification
    if (callback) {
      callback(notification);
    }
  } catch (error) {
    console.error('Error during price check:', error);
  }
};

// Get all monitoring data
export const getMonitoringData = () => {
  return JSON.parse(localStorage.getItem('priceMonitoring') || '{}');
};

// Get specific booking monitoring history
export const getBookingMonitoringHistory = (airline, flightNumber, bookingReference) => {
  const bookingKey = `${airline}_${flightNumber}_${bookingReference}`;
  const monitoringData = getMonitoringData();
  return monitoringData[bookingKey] || null;
};
