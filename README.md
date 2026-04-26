# ✈️ Flight Compensation App

A powerful 4-step web application to calculate flight price compensation and generate professional compensation request emails using AI.

## 🎯 Features

### Step 1: Upload
- Local file reader with document preview
- Support for PDF, TXT, images, and Word documents
- Drag-and-drop interface
- Document preview with snippet display

### Step 2: Extract
- AI-powered flight data extraction using Google Generative AI (Gemini API)
- Automatically extracts:
  - Passenger name
  - Booking reference
  - Airline and flight number
  - Departure/arrival dates and airports
  - Original ticket price
  - And more...

### Step 3: Compare
- Visual flight information summary
- Current price input field
- Real-time price delta calculation
- Color-coded badge (green for price drops, red for increases)
- Compensation eligibility check

### Step 4: Generate
- AI-generated professional compensation email
- Copy-to-clipboard functionality
- Customized based on flight details and price difference

## 🎨 Design Features

- **Fully Responsive**: Mobile, tablet, and desktop optimized
- **Dark Mode**: Beautiful dark theme with gradient backgrounds
- **Horizontal Stepper**: Clear workflow visualization
- **Powerful Background**: Dynamic gradients with blur effects
- **Smooth Animations**: Slide-in effects and transitions
- **Accessibility**: Semantic HTML and ARIA attributes

## 💾 Data Management

- **Browser LocalStorage**: All data stored locally in the browser
- **No External Database**: Complete privacy - no data sent to servers except API calls
- **Persistent State**: Your progress is saved across browser sessions

## 🤖 AI Integration

- Uses **Google Generative AI (Gemini API)** for:
  - Intelligent flight data extraction from documents
  - Professional compensation email generation

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm
- Google API Key (free tier available at https://ai.google.dev/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/districtawardtravel-cmd/FairClaim.git
cd FairClaim
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file and add your Google API key:
```bash
cp .env.example .env.local
# Edit .env.local and add your VITE_GOOGLE_API_KEY
```

4. Start the development server:
```bash
npm run dev
```

5. Open http://localhost:5173 in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## 📋 Workflow

1. **Upload** your flight booking confirmation or invoice
2. **Extract** flight data using AI
3. **Compare** original price with current price
4. **Generate** a professional compensation email

## 🔐 Privacy

- All document processing happens in your browser
- Only API calls go to Google's servers
- No data is stored on external databases
- Clear and delete your data anytime

## 📱 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🛠️ Tech Stack

- **React 18** - UI framework
- **Vite 4** - Build tool
- **Google Generative AI** - AI/ML
- **Lucide React** - Icons
- **CSS3** - Styling with gradients and animations

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📧 Support

For issues or questions, please open an GitHub issue in this repository.

---

**Made with ❤️ for travelers seeking fair compensation**
