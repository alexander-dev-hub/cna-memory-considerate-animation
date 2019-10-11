
import React, { Fragment, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useMemoryStatus } from '../utils/hooks';
import AnimationEmulationContext from '../components/AnimationEmulationContext';

const CLIENT_HINT_MEMORY_LIMIT = 4; // Threshold is 4GB RAM

const Loading = () => <Fragment>Loading...</Fragment>;

const MyApp = ({ Component, pageProps, router }) => {
  const [manualEnabled, setManualEnabled] = useState(false);
  const [isAnimationOn, setIsAnimationOn] = useState(true);
  const memoryStatus = useMemoryStatus();

  const { clientHintDeviceMemory } = pageProps;
  console.log('[_app.js MyApp] clientHintDeviceMemory => ', clientHintDeviceMemory);
  let overLoaded;
  if (clientHintDeviceMemory) {
    overLoaded = clientHintDeviceMemory < CLIENT_HINT_MEMORY_LIMIT;
    console.log('[utils hooks useMemoryStatus] Client Hint Device Memory based Memory Overloaded => ', overLoaded);
  } else {
    if (!memoryStatus) return <Loading />;
    overLoaded = memoryStatus.overLoaded;
  }
  
  let animationAllowed;
  if (manualEnabled) {
    animationAllowed = isAnimationOn;
  } else {
    animationAllowed = !overLoaded;
  }

  const enableManualAnimationHandler = flag => {
    setManualEnabled(flag);
  };

  const toggleAnimationHandler = event => {
    setIsAnimationOn(event.target.checked);
  };

  return (
    <AnimationEmulationContext.Provider
      value={{
        manualEnabled,
        isAnimationOn,
        animationAllowed,
        enableManualAnimationHandler: enableManualAnimationHandler,
        toggleAnimationHandler: toggleAnimationHandler
      }}>
      { animationAllowed ? (
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      ) : (
        <Component {...pageProps} key={router.route} />
      ) }
    </AnimationEmulationContext.Provider>
  )
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps;
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return {pageProps};
};

export default MyApp;
