
import React, { Fragment, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import { useMemoryStatus } from '../utils/hooks';
import AnimationEmulationContext from '../components/AnimationEmulationContext';

const Loading = () => <Fragment>Loading...</Fragment>;

const MyApp = ({ Component, pageProps, router }) => {
  const [manualEnabled, setManualEnabled] = useState(false);
  const [isAnimationOn, setIsAnimationOn] = useState(true);

  useEffect(() => {
    if (manualEnabled) {
      setManualEnabled(manualEnabled);
    }
    if (isAnimationOn) {
      setIsAnimationOn(isAnimationOn);
    }
  }, []);
  
  // ray test touch <
  const clientHintDeviceMemory = pageProps.clientHintDeviceMemory;
  console.log('_app.js => MyApp => clientHintDeviceMemory: ', clientHintDeviceMemory);
  // ray test touch >

  // ray test touch <
  let animationAllowed = true;
  const memoryStatus = useMemoryStatus();
  if (!memoryStatus) return <Loading />;

  const { overLoaded } = clientHintDeviceMemory ? false : memoryStatus;
  // ray test touch >
  
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
      {/* ray test touch < */}
      { animationAllowed ? (
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} key={router.route} />
        </AnimatePresence>
      ) : (
        <Component {...pageProps} key={router.route} />
      ) }
      {/* ray test touch > */}
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
