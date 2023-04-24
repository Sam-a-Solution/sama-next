import React, { useEffect, useRef } from 'react';

import { Box } from '@chakra-ui/react';

function CustomMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      new window.google.maps.Map(mapRef.current, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10,
      });
    }
  }, []);
  return <Box ref={mapRef} w="100vw" h="100vh" />;
}

export default CustomMap;
