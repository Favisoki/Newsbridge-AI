import { useState, useEffect, useCallback } from 'react';

interface UseCountdownTimerReturn {
  timeLeft: string;
  isActive: boolean;
  canResend: boolean;
  startTimer: () => void;
  resetTimer: () => void;
}

export function useCountdownTimer(
  initialSeconds: number = 30,
  storageKey: string = 'countdown-timer'
): UseCountdownTimerReturn {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Initialize timer from localStorage on mount
  useEffect(() => {
    const storedEndTime = localStorage.getItem(storageKey);
    
    if (storedEndTime) {
      const endTime = parseInt(storedEndTime, 10);
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      
      if (remaining > 0) {
        setSeconds(remaining);
        setIsActive(true);
      } else {
        // Timer expired, clean up
        localStorage.removeItem(storageKey);
        setSeconds(0);
        setIsActive(false);
      }
    }
  }, [storageKey]);

  // Countdown logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            setIsActive(false);
            localStorage.removeItem(storageKey);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds, storageKey]);

  const startTimer = useCallback(() => {
    const endTime = Date.now() + initialSeconds * 1000;
    localStorage.setItem(storageKey, endTime.toString());
    setSeconds(initialSeconds);
    setIsActive(true);
  }, [initialSeconds, storageKey]);

  const resetTimer = useCallback(() => {
    localStorage.removeItem(storageKey);
    setSeconds(0);
    setIsActive(false);
  }, [storageKey]);

  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')} : ${secs.toString().padStart(2, '0')}`;
  };

  return {
    timeLeft: formatTime(seconds),
    isActive,
    canResend: seconds === 0,
    startTimer,
    resetTimer,
  };
}