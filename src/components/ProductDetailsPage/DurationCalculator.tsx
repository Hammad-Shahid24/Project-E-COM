import { FC, useEffect, useState } from 'react';
import { Timestamp } from 'firebase/firestore';
import Lottie from 'lottie-react';
import hourglassAnimation from '../../assets/hourglass.json';
import darkModeHourGlassAnimation from '../../assets/hourglass-darkmode.json';
import { useTheme } from '../../hooks/useTheme';

interface DurationCalculatorProps {
  startDate: Timestamp | Date | string;
  endDate: Timestamp | Date | string;
}
const DurationCalculator: FC<DurationCalculatorProps> = ({ startDate, endDate }) => {
  const {theme} = useTheme();
  const [timeLeft, setTimeLeft] = useState('');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  // This hook only runs once on mount to set up the interval
  useEffect(() => {
    

    const updateCountdown = () => {
      if (endDate) {
        const now = new Date();
        const end = endDate instanceof Timestamp ? endDate.toDate() : new Date(endDate);
        const timeDiff = end.getTime() - now.getTime();

        if (timeDiff <= 0) {
          setTimeLeft('Time is up!');
          if (intervalId) clearInterval(intervalId); // Clean up on time up
        } else {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

          setTimeLeft(`${days}D, ${hours}H, ${minutes}M`);
        }
      }
    };

    // Calculate the duration once on mount
    updateCountdown();

    // Set up a new interval and save the intervalId in state (we're only setting it up once)
    const id = setInterval(updateCountdown, 60000); // update every minute
    setIntervalId(id);

    // Clean up the interval on unmount
    return () => {
      clearInterval(id);
    };
  }, [startDate, endDate]); // Only depend on startDate and endDate

  return (
    <div className=" w-fit text-center ">
      <div className="flex items-center justify-center text-lg text-red-600 dark:text-amber-400">
        <div className="  relative">
        <span className=" h-12 w-12 absolute top-4 left-4 pl-0.5  "></span>
        <Lottie className='h-20' animationData={theme === "dark" ? darkModeHourGlassAnimation : hourglassAnimation} />
        </div>
        <div className="flex flex-col items-center">

        <p className='pr-4 text-center font-poppins'>Sale Ends in</p>
        <p className='pr-4 text-center font-poppins'>{timeLeft}</p>
        </div>
      </div>
    </div>
  );
};

export default DurationCalculator;