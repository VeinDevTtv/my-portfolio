import React from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  return (
    <LazyMotion features={domAnimation}>
      <div className="App">
        <LandingPage />
      </div>
    </LazyMotion>
  );
}

export default App;