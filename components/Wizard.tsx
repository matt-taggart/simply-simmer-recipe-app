"use client";

import React from "react";

export const Wizard = () => {
  const currentStep = 1;
  // Define the total number of steps
  const totalSteps = 4;

  // Function to determine the color of the step
  const colorForStep = (step) => {
    return step === currentStep ? "bg-green-500" : "bg-gray-200";
  };

  // Function to determine the color of the line
  const colorForLine = (step) => {
    return step < currentStep ? "bg-green-500" : "bg-gray-300";
  };

  return (
    <div className="flex items-center">
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        return (
          <React.Fragment key={step}>
            {/* Step Circle */}
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-white ${colorForStep(step)}`}
            >
              {step}
            </div>

            {/* Step Title */}
            <div className="absolute mt-6 text-sm font-medium text-gray-700">
              Step {step}
            </div>

            {/* Connecting Line, except after the last step */}
            {step < totalSteps && (
              <div
                className={`flex-auto border-t-2 ${colorForLine(step)}`}
              ></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

