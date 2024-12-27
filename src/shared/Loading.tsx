import React from 'react';
import Lottie from 'lottie-react';
import LoadingAnimation from '../assets/loading.json';

      const Loading: React.FC = () => {
        return (
          <div className="w-full h-screen flex items-center justify-center">
            <Lottie animationData={LoadingAnimation} loop={true} />
          </div>
        );
      }

      export default Loading;