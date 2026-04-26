# ✈️ FairClaim - Automated Airline Compensation Agent

**The AI-powered system that handles airline price compensation automatically.** Upload your booking, we handle everything: policy analysis, price verification, eligibility checks, and email submission to the airline.

## 🎯 What FairClaim Does (Completely Automated)

### 1. 📄 Document Upload & Extraction
- Upload flight booking confirmation (PDF, image, email)
- AI extracts passenger name, booking reference, airline, flight details, original price
- Automatic document validation

### 2. 🔍 Triple-Check Price Verification
- Scans airline's current pricing in real-time
- Compares with your booking price
- Verifies price drop occurred legitimately
- Calculates exact compensation amount

### 3. ⚖️ Legal Policy Analysis
- AI analyzes airline's refund & price adjustment policies
- Checks EU261, DOT regulations (if applicable)
- Verifies passenger eligibility
- Identifies which airline policy applies
- Generates legal justification for claim

### 4. ✉️ Automated Email Submission
- **Sends email directly to airline's compensation department on your behalf**
- Includes:
  - Booking details
  - Current/original price proof
  - Legal justification based on airline policy
  - Compensation amount calculation
  - Your contact information for airline response
- Maintains conversation thread for follow-ups

### 5. 📊 Track & Monitor
- Email sent confirmation with timestamp
- Airline contact info stored
- Status tracking (Pending → Airline Response → Resolved)
- Automatic follow-up reminders

---

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Free & Easy)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Set environment variables on Vercel dashboard:
# - VITE_GOOGLE_API_KEY
# - VITE_SENDER_EMAIL
# - VITE_SENDER_PASSWORD (Gmail App Password)

# Production deployment
vercel --prod
```

**Your app:** `https://your-app.vercel.app`

### Option 2: Netlify (Free Tier)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist

# Or connect GitHub repo for auto-deployment
```

### Option 3: GitHub Pages (Static Only)

```bash
npm run build
# Upload dist/ folder to gh-pages branch
```

### Option 4: Self-Hosted (Docker)

```bash
# Build production
npm run build

# Create Dockerfile
# Deploy to your server (DigitalOcean, Heroku, etc.)
```

---

## 🔐 Security & Privacy

### Email Sending Security
- **Gmail App Passwords**: Use app-specific passwords (not your main password)
- **No data stored**: Emails sent immediately, data cleared
- **HTTPS only**: All communication encrypted
- **User control**: You authorize every email sent

### Getting Gmail App Password
1. Enable 2-Step Verification on your Google Account
2. Go to myaccount.google.com/apppasswords
3. Create app password for "Mail" and "Windows/Mac/Linux"
4. Use this 16-char password in `.env.local`

### Policy Data
- Real-time airline policy lookup
- No personal data stored
- Compliant with GDPR/CCPA

---

## 📋 How It Works (Step by Step)

### Step 1: Upload Document
```
You upload booking confirmation
↓
AI extracts flight details automatically
↓
System stores temporarily in browser
```

### Step 2: Fetch Current Price
```
System searches airline website for current price
↓
Third-party price API verifies the drop
↓
Calculates compensation amount
```

### Step 3: Analyze Policies
```
AI fetches airline's cancellation/price adjustment policy
↓
Analyzes eligibility (EU261, DOT, IATA, airline's own policy)
↓
Generates legal claim basis
```

### Step 4: Generate & Send Email
```
AI writes professional compensation request email
↓
Includes all proof, policy references, calculations
↓
Sends to airline's customer service email on your behalf
↓
Stores proof of submission
```

### Step 5: Track Response
```
System monitors for airline response
↓
Notifies you of updates
↓
Auto-suggest follow-ups if needed
```

---

## 🛠️ Technology Stack

| Component | Tech | Purpose |
|-----------|------|----------|
| **Frontend** | React 18 + Vite | UI & user interactions |
| **AI Engine** | Google Gemini API | Policy analysis, email generation, data extraction |
| **State** | Zustand | Global state management |
| **HTTP** | Axios | API calls for price verification |
| **Styling** | CSS3 + Dark Mode | Beautiful, responsive design |
| **Deployment** | Vercel/Netlify | Production hosting |
| **Email** | Gmail API / SMTP | Direct airline contact |

---

## 📦 Installation & Setup

### Local Development

```bash
# Clone repo
git clone https://github.com/districtawardtravel-cmd/FairClaim.git
cd FairClaim

# Install dependencies
npm install

# Setup environment
cp .env.example .env.local

# Edit .env.local with your keys:
# 1. Google API Key: https://ai.google.dev/
# 2. Gmail App Password (see Security section above)

# Run development server
npm run dev

# Open http://localhost:5173
```

### Production Deployment

#### With Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel
vercel link

# Add environment variables in Vercel Dashboard
# Project Settings → Environment Variables

# Deploy
vercel deploy --prod
```

#### With Netlify
```bash
npm run build
netlify deploy --prod --dir=dist
```

#### With Docker (Self-Hosted)
```bash
docker build -t fairclaim .
docker run -p 3000:3000 \
  -e VITE_GOOGLE_API_KEY=xxx \
  -e VITE_SENDER_EMAIL=xxx \
  -e VITE_SENDER_PASSWORD=xxx \
  fairclaim
```

---

## ✨ Features Breakdown

### Intelligent Document Processing
- ✅ PDF, image, email format support
- ✅ OCR for scanned documents (via Gemini)
- ✅ Automatic field extraction
- ✅ Validation & error detection

### Real-Time Price Verification
- ✅ Airline website scraping (where allowed)
- ✅ Third-party price API integration
- ✅ Proof of current price
- ✅ Historical price tracking

### Policy Intelligence
- ✅ Airline-specific policy lookup
- ✅ Regulatory compliance check (EU261, DOT)
- ✅ Eligibility assessment
- ✅ Legal claim generation

### Automated Email System
- ✅ Find airline customer service email
- ✅ Professional email composition
- ✅ Multi-language support
- ✅ Direct SMTP/Gmail sending
- ✅ Delivery confirmation

### Tracking & Follow-Up
- ✅ Submission history
- ✅ Response monitoring
- ✅ Reminder system
- ✅ Status updates

---

## 🎯 Supported Airlines

Airlines with auto-policy lookup (constantly updated):
- ✈️ All EU airlines (IATA member)
- ✈️ US carriers (DOT regulated)
- ✈️ Major international airlines
- ✈️ Budget carriers (Ryanair, EasyJet, etc.)

*System automatically detects airline and fetches applicable policies*

---

## 📊 Status & Roadmap

- [x] Document upload & AI extraction
- [x] Price verification system
- [x] Policy analysis engine
- [x] Email generation & sending
- [x] Dark mode UI
- [x] Responsive design
- [ ] SMS notifications
- [ ] Multi-language support (beta)
- [ ] WhatsApp integration
- [ ] Payment tracking (if airline owes refund)

---

## 🔗 API References

### Google Gemini API
- Documentation: https://ai.google.dev/
- Free tier: 60 requests/minute
- Perfect for policy analysis & email generation

### Gmail API (Optional - for native integration)
- Documentation: https://developers.google.com/gmail/api
- Requires OAuth2 setup
- Alternative: Use App Password with SMTP

### Airline Policy APIs
- Sabre: https://developer.sabre.com/
- Amadeus: https://developers.amadeus.com/
- Custom scraping for specific airlines

---

## 🤝 Contributing

Want to add:
- ✅ New airline support?
- ✅ New regulations (Australia, Canada, etc.)?
- ✅ Multi-language email templates?

Pull requests welcome!

---

## ⚖️ Legal Disclaimer

FairClaim is an automated assistant for submitting legitimate compensation claims based on:
- EU Regulation 261/2004 (EU passengers)
- US DOT regulations
- Airline's own refund/price adjustment policies
- IATA standards

**Not a law firm.** Results depend on airline policies & individual circumstances.

---

## 📞 Support

- Issues: https://github.com/districtawardtravel-cmd/FairClaim/issues
- Email: support@fairclaim.ai
- Docs: https://github.com/districtawardtravel-cmd/FairClaim/wiki

---

**🚀 Get Your Compensation Automatically - FairClaim Does the Work**
