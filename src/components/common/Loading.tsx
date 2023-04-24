import React, { useEffect, useRef } from 'react';

import Lottie from 'lottie-web';

import { Box, Center } from '@chakra-ui/react';

import animationData from '../../../public/loading.json';

const Loading = ({ width = '100px', height = '100px' }) => {
  const lottieRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lottieRef.current) {
      Lottie.loadAnimation({
        container: lottieRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      });
    }
  }, []);

  return (
    <Center>
      <Box ref={lottieRef} w={width} h={height} />
    </Center>
  );
};

export default Loading;
