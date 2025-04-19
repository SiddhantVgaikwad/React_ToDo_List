import React, { useState, useEffect } from 'react';

const LiveDateTime = ({ darkMode }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formattedDate = currentTime.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
      <span>{formattedDate}</span>
      <span className="mx-2">•</span>
      <span>{formattedTime}</span>
    </div>
  );
};

export default LiveDateTime;