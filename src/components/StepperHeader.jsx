import React from 'react';
import './StepperHeader.css';
import { Check } from 'lucide-react';

const StepperHeader = ({ currentStep, totalSteps }) => {
  const steps = [
    { num: 1, title: 'Upload', icon: '📄' },
    { num: 2, title: 'Extract', icon: '🔍' },
    { num: 3, title: 'Compare', icon: '⚖️' },
    { num: 4, title: 'Generate', icon: '✉️' },
  ];

  return (
    <div className="stepper-container">
      <div className="stepper-track">
        {steps.map((step, index) => (
          <React.Fragment key={step.num}>
            <div
              className={`stepper-step ${
                step.num < currentStep
                  ? 'completed'
                  : step.num === currentStep
                  ? 'active'
                  : 'pending'
              }`}
            >
              <div className="step-badge">
                {step.num < currentStep ? (
                  <Check size={20} />
                ) : (
                  <span>{step.icon}</span>
                )}
              </div>
              <span className="step-title">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`stepper-line ${
                  step.num < currentStep ? 'completed' : ''
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default StepperHeader;
