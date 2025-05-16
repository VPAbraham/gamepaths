import React, { useState } from 'react';
import { adventureSteps } from '../../utils/adventureSteps';
import type { AdventureOption, GameFilters } from '../../types/adventure.types';

interface AdventureSelectorProps {
  onComplete?: (filters: GameFilters) => void;
}

const AdventureSelector = ({ onComplete }: AdventureSelectorProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<AdventureOption[]>([]);

  const currentStepData = adventureSteps[currentStep];
  const isLastStep = currentStep === adventureSteps.length - 1;

  const handleOptionSelect = (option: AdventureOption) => {
    const newSelectedOptions = [...selectedOptions, option];
    setSelectedOptions(newSelectedOptions);

    if (isLastStep) {
      // Combine all the filters
      const finalFilters = newSelectedOptions.reduce(
        (acc, opt) => ({
          ...acc,
          ...opt.filters,
        }),
        {} as GameFilters
      );

      onComplete?.(finalFilters);
    } else {
      // Move to next step
      setCurrentStep(currentStep + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setSelectedOptions([]);
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Can't choose a game to play?
        </h2>
        <p className="text-gray-400">
          Answer a few questions and we'll find some great suggestions for you!
        </p>
      </div>

      <div className="flex justify-center mb-6">
        {adventureSteps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full mx-1 ${
              index <= currentStep ? 'bg-blue-500' : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white">
          {currentStepData.question}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {currentStepData.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-center transition-colors"
          >
            <div className="text-3xl mb-2">{option.icon}</div>
            <div className="text-white font-medium">{option.label}</div>
          </button>
        ))}
      </div>

      {selectedOptions.length > 0 && (
        <div className="text-center">
          <button
            onClick={handleReset}
            className="text-gray-400 hover:text-white text-sm"
          >
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

export default AdventureSelector;
