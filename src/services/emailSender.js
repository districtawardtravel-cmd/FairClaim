export const sendCompensationEmail = async (emailData) => {
  const {
    recipientEmail,
    recipientName,
    subject,
    emailContent,
    senderEmail,
    senderName,
    attachments = [],
  } = emailData;

  // For Gmail via SMTP (backend recommended)
  if (import.meta.env.VITE_EMAIL_SERVICE === 'gmail') {
    return await sendViaGmailBackend({
      to: recipientEmail,
      subject,
      text: emailContent,
      from: senderEmail,
      senderName,
    });
  }

  throw new Error('Email service not configured');
};

const sendViaGmailBackend = async (emailData) => {
  // In production, call your backend endpoint
  // This prevents exposing credentials in frontend
  
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
  
  try {
    const response = await fetch(`${backendUrl}/api/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Email send error:', error);
    // Fallback: Use node-mailer on backend or show manual send instructions
    throw new Error('Failed to send email. Please configure email service.');
  }
};

export const findAirlineEmail = async (airline) => {
  // Database of airline customer service emails
  const airlineEmails = {
    'American Airlines': 'reservations@aa.com',
    'United Airlines': 'customerrelations@united.com',
    'Delta Air Lines': 'reservations@delta.com',
    'Southwest Airlines': 'customerrelations@southwest.com',
    'Lufthansa': 'reservations@lufthansa.com',
    'Air France': 'customerservice@airfrance.com',
    'British Airways': 'customer.relations@ba.com',
    'Ryanair': 'customerservice@ryanair.com',
    'EasyJet': 'customer@easyjet.com',
    'KLM': 'customerservice@klm.com',
  };

  return airlineEmails[airline] || 'customerservice@airline.com';
};
