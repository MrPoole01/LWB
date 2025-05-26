import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  endDate: Date;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const calculateTimeLeft = () => {
    const difference = +endDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <div className="flex justify-center items-center space-x-4">
      {timeBlocks.map((block, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-[#1A2744] text-white text-2xl font-bold w-16 h-16 rounded-lg flex items-center justify-center">
            {block.value < 10 ? `0${block.value}` : block.value}
          </div>
          <span className="text-sm text-gray-600 mt-1">{block.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;