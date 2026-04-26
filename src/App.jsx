import React, { useState, useEffect } from 'react';
import './App.css';
import StepperHeader from './components/StepperHeader';
import Step1Upload from './components/steps/Step1Upload';
import Step2Extract from './components/steps/Step2Extract';
import Step3Compare from './components/steps/Step3Compare';
import Step4Generate from './components/steps/Step4Generate';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useLocalStorage('flightCompensationState', {
    file: null,
    fileContent: null,
    flightData: null,
    currentPrice: null,
    emailText: null,
    extractionError: null,
    generationError: null,
  });

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleReset = () => {
    setState({
      file: null,
      fileContent: null,
      flightData: null,
      currentPrice: null,
      emailText: null,
      extractionError: null,
      generationError: null,
    });
    setCurrentStep(1);
  };

  return (
    <div className="app-container">
      <div className="gradient-background"></div>
      
      <div className="content-wrapper">
        <header className="app-header">
          <div className="header-content">
            <h1>✈️ Flight Compensation Calculator</h1>
            <p>Claim your rightful compensation in 4 easy steps</p>
          </div>
        </header>

        <StepperHeader currentStep={currentStep} totalSteps={4} />

        <main className="steps-container">
          {currentStep === 1 && (
            <Step1Upload
              state={state}
              setState={setState}
              onNext={handleNext}
            />
          )}
          {currentStep === 2 && (
            <Step2Extract
              state={state}
              setState={setState}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
          {currentStep === 3 && (
            <Step3Compare
              state={state}
              setState={setState}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
          {currentStep === 4 && (
            <Step4Generate
              state={state}
              setState={setState}
              onReset={handleReset}
              onPrev={handlePrev}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
