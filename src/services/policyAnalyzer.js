import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export const analyzePolicies = async (airline, flightData) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `You are an expert in airline refund policies and passenger compensation regulations.

Analyze the following flight booking and determine eligibility for price compensation:

Airline: ${airline}
Passenger: ${flightData.passengerName}
Booking Reference: ${flightData.bookingReference}
Flight Number: ${flightData.flightNumber}
Departure Date: ${flightData.departureDate}
Original Price: ${flightData.currency} ${flightData.originalPrice}
Current Airline Price: ${flightData.currency} ${flightData.currentPrice}
Price Difference: ${flightData.currency} ${flightData.originalPrice - flightData.currentPrice}

Provide analysis in JSON format:
{
  "airlineRules": "Specific airline policy regarding price drops",
  "regulatoryBasis": "Applicable regulations (EU261, DOT, IATA, etc.)",
  "eligibility": "ELIGIBLE" | "NOT_ELIGIBLE" | "CONDITIONAL",
  "eligibilityReason": "Detailed explanation",
  "compensationAmount": number,
  "compensationBasis": "Legal/policy basis for compensation",
  "recommendedAction": "Specific next steps",
  "riskLevel": "LOW" | "MEDIUM" | "HIGH",
  "estimatedSuccessRate": "percentage (0-100)"
}

Return ONLY valid JSON.`;

  try {
    const response = await model.generateContent(prompt);
    const text = response.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (!jsonMatch) throw new Error('Invalid policy analysis response');
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Policy analysis error:', error);
    throw new Error('Failed to analyze airline policies');
  }
};

export const generateEmailContent = async (flightData, policyAnalysis) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
  
  const prompt = `Write a professional, legally sound email to a major airline requesting price compensation.

Flight Details:
- Passenger: ${flightData.passengerName}
- Booking Reference: ${flightData.bookingReference}
- Airline: ${flightData.airline}
- Flight Number: ${flightData.flightNumber}
- Departure: ${flightData.departureDate}
- Original Price: ${flightData.currency} ${flightData.originalPrice}
- Current Price: ${flightData.currency} ${flightData.currentPrice}
- Price Difference: ${flightData.currency} ${flightData.originalPrice - flightData.currentPrice}

Legal Basis:
${policyAnalysis.compensationBasis}

Policy Reference:
${policyAnalysis.airlineRules}

Requirements:
1. Professional but firm tone
2. Include booking reference, flight details
3. Cite airline policy and applicable regulations
4. Clearly state the price difference and compensation requested
5. Request response within 14 days
6. Include passenger contact information placeholder
7. Be concise (200-300 words)
8. Ready to send - no placeholders except [CONTACT_EMAIL] and [CONTACT_PHONE]

Generate ONLY the email body, ready to send.`;

  try {
    const response = await model.generateContent(prompt);
    return response.response.text();
  } catch (error) {
    console.error('Email generation error:', error);
    throw new Error('Failed to generate compensation email');
  }
};
