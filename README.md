# 🚀 FairClaim - Automated Airline Price Compensation Agent

**The AI system that continuously monitors flight prices and handles airline compensation automatically.**

## 🎯 What FairClaim Does

Upload your flight booking once. FairClaim handles EVERYTHING:

### ✈️ **Continuous Daily Monitoring (24/7)**
- ✅ **Checks every 24 hours** for price drops
- ✅ **Optional 12-hour intensive monitoring** for frequent checking
- ✅ **Browser notifications** when price drop detected
- ✅ **Full price history** tracking
- ✅ **Automatic alerts** when drop meets threshold (5%+)

### 📊 **Complete Price Analysis**
- Verify current airline price in real-time
- Triple-check against multiple price sources
- Calculate exact compensation amount
- Track price history over time
- Maintain proof of price drop

### ⚖️ **Legal Policy Analysis**
- AI reads airline's refund policy
- Checks EU261 regulations (if applicable)
- Verifies DOT requirements (US flights)
- Confirms IATA standards
- Generates legal justification

### 📧 **Automated Email Submission**
- Creates professional compensation email
- Sends directly to airline customer service
- Includes all proof & legal basis
- Maintains submission record
- Auto-follow-up reminders

---

## 🔔 How Daily Monitoring Works

### **Step 1: Start Monitoring**
```
You upload booking
↓
FairClaim starts daily price checks
```

### **Step 2: Automatic Daily Checks**
```
Every 24 hours:
- Check airline current price
- Compare with your booking price
- Calculate percentage drop
- Store in local history
```

### **Step 3: Price Drop Detected**
```
If price drops >= 5%:
- Send browser notification 🔔
- Mark compensation as ready
- Alert you immediately
```

### **Step 4: Auto-Submit (Optional)**
```
Choose to:
- Auto-submit to airline (recommended)
- Manual review before sending
```

### **Step 5: Track Response**
```
Monitor for airline reply:
- Status: Pending → Responded
- Compensation approved ✅
- Follow-up if needed
```

---

## 📱 Browser Notifications

**FairClaim sends you alerts when:**
- ✅ Price drop detected
- ✅ Compensation claim submitted
- ✅ Airline responds
- ✅ Action needed (follow-up)

**Enable notifications:**
1. Allow notifications when FairClaim asks
2. Receive alerts on desktop/mobile
3. Click alert to review details

---

## 🚀 5-Step Workflow

### **Step 1: 📄 Upload Document**
- Upload booking confirmation
- AI extracts flight details automatically
- Flight data stored locally

### **Step 2: ✅ Price Verification**
- Real-time airline price check
- Verify price drop occurred
- Store current price & proof

### **Step 3: ⚖️ Policy Analysis**
- AI reads airline policy
- Check legal regulations
- Determine eligibility
- Generate legal claim basis

### **Step 4: ✉️ Email Review**
- AI-generated professional email
- Customized to your flight & price drop
- Review before sending
- Copy to clipboard if needed

### **Step 5: 📤 Send to Airline**
- Enter your contact info
- System sends email on your behalf
- Get confirmation & tracking
- Monitor for airline response

---

## 💾 Data Storage (Private & Secure)

**All data stored locally in browser:**
- ✅ Flight booking details
- ✅ Price monitoring history
- ✅ Email submissions
- ✅ Airline responses
- ✅ Tracking information

**Zero cloud storage - complete privacy!**

---

## 🛠️ Deployment

### **Vercel (Recommended - FREE)**

```bash
npm install -g vercel
vercel --prod
```

Add environment variables:
- `VITE_GOOGLE_API_KEY` - https://ai.google.dev/
- `VITE_SENDER_EMAIL` - Your Gmail
- `VITE_SENDER_PASSWORD` - Gmail App Password

**Live URL:** `https://fairclaim-xxx.vercel.app`

### **Netlify (Also FREE)**

```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

### **Local Development**

```bash
git clone https://github.com/districtawardtravel-cmd/FairClaim.git
cd FairClaim
npm install
cp .env.example .env.local
# Add your API keys
npm run dev
```

---

## 📊 Price Monitoring Features

### **Continuous Checking**
- Daily checks (24-hour intervals)
- Optional intensive monitoring (12-hour intervals)
- Real-time price verification
- Automatic history tracking

### **Price Drop Detection**
- Automatic alerts when drop detected
- Percentage & amount displayed
- Proof stored for airline claim
- Legal basis generated automatically

### **Full History**
- All price checks recorded
- Timestamps for each check
- Price trend visualization
- Export history if needed

### **Smart Notifications**
- Browser desktop notifications 🔔
- Custom alert thresholds (5%+ default)
- Silent mode for existing subscribers
- Multiple alert channels

---

## 🔐 Gmail Setup (For Auto-Email Sending)

1. **Enable 2-Step Verification**
   - Go to myaccount.google.com
   - Security → 2-Step Verification → Enable

2. **Create App Password**
   - Go to myaccount.google.com/apppasswords
   - Select "Mail" and "Windows/Mac/Linux"
   - Copy the 16-character password

3. **Add to Environment**
   ```
   VITE_SENDER_EMAIL=your-email@gmail.com
   VITE_SENDER_PASSWORD=xxxx xxxx xxxx xxxx
   ```

✅ **Not your actual password** - safer app password!

---

## 📈 Monitoring Data Example

```json
{
  "AA_123_ABC456": {
    "booking": {
      "airline": "American Airlines",
      "flightNumber": "AA123",
      "bookingReference": "ABC456",
      "departureDate": "2026-06-15",
      "originalPrice": 500
    },
    "checks": [
      {
        "timestamp": "2026-04-27T10:00:00Z",
        "currentPrice": 485,
        "priceDropPercentage": 3
      },
      {
        "timestamp": "2026-04-28T10:00:00Z",
        "currentPrice": 420,
        "priceDropPercentage": 16
      }
    ],
    "priceDropDetected": true,
    "lastDropNotification": {
      "timestamp": "2026-04-28T10:00:00Z",
      "message": "Price dropped 16% from $500 to $420"
    }
  }
}
```

---

## 🎯 Supported Airlines

**All major airlines supported including:**
- American Airlines
- Delta Air Lines
- United Airlines
- Southwest Airlines
- Lufthansa
- Air France
- British Airways
- KLM
- Ryanair
- EasyJet
- And 100+ more...

*Auto-detects airline and applies correct policy*

---

## ⚡ Tech Stack

| Component | Technology | Purpose |
|-----------|------------|----------|
| **Frontend** | React 18 + Vite | UI & monitoring dashboard |
| **State** | Zustand | Local state management |
| **Storage** | Browser LocalStorage | Price history & booking data |
| **AI** | Google Gemini API | Policy analysis, email generation |
| **Monitoring** | Service Workers | Background price checks |
| **Notifications** | Web Notifications API | Real-time alerts |
| **Hosting** | Vercel/Netlify | Production deployment |

---

## 📋 Workflow Summary

```
┌─────────────────────────────────────┐
│  1️⃣  Upload Booking Document        │
│  ↓                                   │
│  2️⃣  Daily Price Monitoring Starts  │ ← 24/7 checks
│  ↓                                   │
│  3️⃣  Price Drop Detected 🔔         │ ← Alert sent
│  ↓                                   │
│  4️⃣  Policy Analysis (Auto)         │ ← Legal review
│  ↓                                   │
│  5️⃣  Email Sent to Airline          │ ← On your behalf
│  ↓                                   │
│  ✅ Compensation Request Submitted   │
│  ↓                                   │
│  💰 Await Airline Response           │ ← 14 days typical
└─────────────────────────────────────┘
```

---

## 🔒 Privacy & Security

- ✅ **Local-first** - Data stays in your browser
- ✅ **No cloud database** - No external servers
- ✅ **No tracking** - No analytics or telemetry
- ✅ **App Passwords** - Not your real Google password
- ✅ **HTTPS only** - Encrypted communication
- ✅ **GDPR compliant** - User data protection

---

## 📧 Support & Issues

- **GitHub Issues:** https://github.com/districtawardtravel-cmd/FairClaim/issues
- **Documentation:** https://github.com/districtawardtravel-cmd/FairClaim/wiki
- **Contact:** support@fairclaim.ai

---

## 📄 Legal Disclaimer

FairClaim is an automated assistant for submitting legitimate compensation claims based on:
- EU Regulation 261/2004
- US DOT regulations
- Airline's own policies
- IATA standards

**Results depend on airline policies & circumstances.**

---

**🎯 FairClaim: Upload Once, We Monitor Daily, Compensation Automatic** ✈️💰
