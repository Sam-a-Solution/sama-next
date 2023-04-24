import React, { useEffect, useRef } from 'react';

import { CONFIG } from '@config';

import { Box, BoxProps, Text, useDisclosure } from '@chakra-ui/react';

import { Status, Wrapper } from '@googlemaps/react-wrapper';
import {
  GoogleMap,
  LoadScriptNext,
  useLoadScript,
} from '@react-google-maps/api';

import CustomMap from './_fragments/CustomMap';
import HomeNavigationBar from './_fragments/HomeNavigationBar';
import RightFloatList from './_fragments/RightFloatList';

interface HomePageContentProps extends BoxProps {}

const containerStyle = {
  width: '100vw',
  height: '100vh',
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

function HomePageContent({ ...basisProps }: HomePageContentProps) {
  const {
    isOpen: isOpenNavbar,
    onOpen: onOpenNavbar,
    onClose: onCloseNavbar,
  } = useDisclosure();

  const {
    isOpen: isOpenList,
    onOpen: onOpenList,
    onClose: onCloseList,
  } = useDisclosure();

  const mapRef = useRef<HTMLDivElement>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: CONFIG.GOOGLE_MAP_KEY as string,
    version: '3.52.6',
  });

  const [map, setMap] = React.useState<google.maps.Map | null>(null);

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  // useEffect(() => {
  //   if (mapRef.current) {
  //     new window.google.maps.Map(mapRef.current, {
  //       center,
  //       zoom: 10,
  //     });
  //   }
  // }, []);

  if (!isLoaded) return <Text>로딩중</Text>;

  return (
    <Box position="relative" {...basisProps}>
      <HomeNavigationBar
        isOpenNavbar={isOpenNavbar}
        onOpenNavbar={onOpenNavbar}
        onCloseNavbar={onCloseNavbar}
      />
      <Wrapper apiKey={CONFIG.GOOGLE_MAP_KEY as string}>
        <CustomMap />
      </Wrapper>
      {/* {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
          // options={{ mapId: CONFIG.GOOGLE_MAP_KEY }}
        >
          <></>
        </GoogleMap>
      ) : (
        <></>
      )} */}
      <RightFloatList
        isOpenList={isOpenList}
        onOpenList={onOpenList}
        onCloseList={onCloseList}
      />
    </Box>
  );
}

export default HomePageContent;
