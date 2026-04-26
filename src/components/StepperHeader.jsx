import React from 'react';
import './StepperHeader.css';
import { Check, Upload, Check as CheckIcon, FileText, Lock, Send, CheckCircle } from 'lucide-react';

const StepperHeader = ({ currentStep, totalSteps }) => {
  const steps = [
    { num: 1, title: 'Upload', icon: Upload, description: 'Document' },
    { num: 2, title: 'Verify', icon: CheckIcon, description: 'Price' },
    { num: 3, title: 'Analyze', icon: Lock, description: 'Policies' },
    { num: 4, title: 'Review', icon: FileText, description: 'Email' },
    { num: 5, title: 'Send', icon: Send, description: 'Claim' },
  ];

  return (
    <div className="stepper-container">
      <div className="stepper-track">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.num < currentStep;
          const isActive = step.num === currentStep;
          const isPending = step.num > currentStep;

          return (
            <React.Fragment key={step.num}>
              <div className={`stepper-step ${isCompleted ? 'completed' : isActive ? 'active' : 'pending'}`}>
                <div className="step-badge">
                  {isCompleted ? <Check size={20} /> : <Icon size={20} />}
                </div>
                <span className="step-title">{step.title}</span>
                <span className="step-description">{step.description}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`stepper-line ${isCompleted ? 'completed' : ''}`}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepperHeader;
