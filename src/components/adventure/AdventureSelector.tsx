import { useState } from 'react';
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
    <div className="bg-gradient-to-r from-blue-900/30 to-purple-00/30 rounded-lg p-6 border border-blue-700/50 shadow-lg shadow-blue-500/10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white mb-3">
          Can't choose a game to play?
        </h2>
        <p className="text-gray-300 text-lg">
          Answer a few questions and we'll find some great suggestions for you!
        </p>
      </div>

      <div className="flex justify-center mb-6">
        {adventureSteps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full mx-1.5 transition-all duration-300 ${
              index < currentStep
                ? 'bg-blue-500'
                : index === currentStep
                ? 'bg-blue-400 animate-pulse'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      <div className="text-center mb-8">
        <h3 className="text-2xl font-semibold text-white">
          {currentStepData.question}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {currentStepData.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className="bg-gray-800 hover:bg-gray-700 rounded-lg p-5 text-center 
          transition-all duration-300 hover:shadow-md border border-gray-700 
          hover:border-blue-500 hover:translate-y-[-2px]"
          >
            <div className="text-3xl mb-3">{option.icon}</div>
            <div className="text-white font-medium text-lg">{option.label}</div>
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
