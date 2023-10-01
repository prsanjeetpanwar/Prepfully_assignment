import React, { useState, useEffect } from 'react';

const LoadingIndicator = () => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let animationInterval;

    if (isLoading && !isPaused) {
      animationInterval = setInterval(() => {
        if (progress < 100) {
          setProgress(prevProgress => prevProgress + 1);
        } else {
          setIsLoading(false);
          clearInterval(animationInterval);
        }
      }, 50);
    } else {
      clearInterval(animationInterval);
    }

    return () => {
      clearInterval(animationInterval);
    };
  }, [isLoading, isPaused, progress]);

  const startLoading = () => {
    setIsLoading(true);
    setIsPaused(false);
  };

  const pauseLoading = () => {
    setIsPaused(true);
  };

  const resumeLoading = () => {
    setIsPaused(false);
  };

  const stopLoading = () => {
    setIsLoading(false);
    setIsPaused(false);
    setProgress(0);
  };


  const getColor = () => {
    if (progress <= 50) {
      return `rgb(${255 - (progress * 5)}, ${progress * 5}, 0)`;
    } else {
      return `rgb(0, ${255 - ((progress - 50) * 5)}, ${(progress - 50) * 5})`;
    }
  };

  // Style the progress bar dynamically
  const progressBarStyle = {
    stroke: getColor(),
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <style>
        {`
          body {
            animation: colorChange 5s infinite alternate;
          }

          @keyframes colorChange {
            0% {
              background-color: #ffcccb;
            }
            100% {
              background-color: #cbf0f8;
            }
          }
        `}
      </style>
      <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          stroke="gray"
          strokeWidth="12"
        />
        <circle
          cx="100"
          cy="100"
          r="90"
          fill="none"
          style={progressBarStyle}
          strokeWidth="12"
          strokeDasharray="565"
          strokeDashoffset={(565 * (100 - progress)) / 100}
        />
        <text x="50%" y="50%" textAnchor="middle" fill="black" fontSize="36">
          {`${progress}%`}
        </text>
      </svg>
      <div className="mt-6">
        {isLoading && !isPaused ? (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded-full"
            onClick={pauseLoading}
          >
            Pause
          </button>
        ) : (
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-full ${
              isLoading ? 'bg-red-500' : ''
            }`}
            onClick={isLoading ? resumeLoading : startLoading}
          >
            {isLoading ? 'Resume' : 'Start'}
          </button>
        )}
        <button
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-full"
          onClick={stopLoading}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default LoadingIndicator;
