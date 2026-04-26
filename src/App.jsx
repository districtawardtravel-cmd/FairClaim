import React from 'react';
import './App.css';
import { useAppStore } from './store/appStore';
import StepperHeader from './components/StepperHeader';
import Step1Document from './components/steps/Step1Document';
import Step2Verification from './components/steps/Step2Verification';
import Step3PolicyAnalysis from './components/steps/Step3PolicyAnalysis';
import Step4EmailReview from './components/steps/Step4EmailReview';
import Step5Submission from './components/steps/Step5Submission';

function App() {
  const currentStep = useAppStore((state) => state.currentStep);
  const setCurrentStep = useAppStore((state) => state.setCurrentStep);

  return (
    <div className="app-container">
      <div className="gradient-background"></div>
      
      <div className="content-wrapper">
        <header className="app-header">
          <h1>✈️ FairClaim</h1>
          <p>Automated Airline Price Compensation</p>
          <span className="tagline">We handle everything - upload, verify, analyze, and claim</span>
        </header>

        <StepperHeader currentStep={currentStep} totalSteps={5} />

        <main className="steps-container">
          {currentStep === 1 && <Step1Document />}
          {currentStep === 2 && <Step2Verification />}
          {currentStep === 3 && <Step3PolicyAnalysis />}
          {currentStep === 4 && <Step4EmailReview />}
          {currentStep === 5 && <Step5Submission />}
        </main>
      </div>
    </div>
  );
}

export default App;
