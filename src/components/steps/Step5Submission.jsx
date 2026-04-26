import React, { useState } from 'react';
import { Send, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { useAppStore } from '../../store/appStore';
import { findAirlineEmail } from '../../services/emailSender';
import './StepStyles.css';

const Step5Submission = () => {
  const { flightData, senderEmail, setSenderEmail, senderName, setSenderName, setEmailSent, setLoading, loading } = useAppStore();
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);
  const [airlineEmail, setAirlineEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!senderEmail || !senderName) {
        throw new Error('Please provide your email and name');
      }

      // Find airline email
      const email = await findAirlineEmail(flightData.airline);
      setAirlineEmail(email);

      // In production: Send email via backend
      // await sendCompensationEmail({
      //   recipientEmail: email,
      //   recipientName: flightData.airline,
      //   subject: `Compensation Claim - Booking ${flightData.bookingReference}`,
      //   emailContent: emailContent,
      //   senderEmail: senderEmail,
      //   senderName: senderName,
      // });

      // Simulate successful submission
      setTimeout(() => {
        setSuccess(true);
        setEmailSent(true, new Date().toISOString());
        setLoading(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="step-card">
        <div className="step-header">
          <h2>✅ Claim Submitted Successfully!</h2>
          <p>Your compensation request has been sent to the airline</p>
        </div>

        <div className="step-content">
          <div className="success-box">
            <CheckCircle size={48} />
            <h3>Email Sent to {flightData.airline}</h3>
            <p>Recipient: {airlineEmail}</p>
            <p className="timestamp">Sent: {new Date().toLocaleString()}</p>

            <div className="next-steps">
              <h4>📋 Next Steps:</h4>
              <ul>
                <li>Watch for airline response in your email</li>
                <li>Response typically arrives within 14 days</li>
                <li>We'll notify you of any updates</li>
                <li>Keep your booking reference handy: {flightData.bookingReference}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="step-card">
      <div className="step-header">
        <h2>Step 5: Send Claim to Airline</h2>
        <p>Enter your contact information to authorize email submission</p>
      </div>

      <div className="step-content">
        <form onSubmit={handleSubmit} className="submission-form">
          <div className="form-group">
            <label>Your Email Address</label>
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Full Name</label>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="info-box">
            <AlertCircle size={20} />
            <p>
              By submitting, you authorize FairClaim to send this compensation request to {flightData.airline} on your behalf.
              The airline will respond to your email address.
            </p>
          </div>

          {error && (
            <div className="error-box">
              <AlertCircle size={20} />
              <p>{error}</p>
            </div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? (
              <>
                <Loader size={18} className="spin" />
                Sending to {flightData.airline}...
              </>
            ) : (
              <>
                <Send size={18} />
                Send Claim Now
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Step5Submission;
