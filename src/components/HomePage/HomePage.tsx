import React, { useCallback, useMemo, useState } from 'react';

import GoogleMapReact from 'google-map-react';

import { CONFIG } from '@config';

import { Box, BoxProps, Flex, useDisclosure, useToast } from '@chakra-ui/react';

import useModals from '@hooks/useModals';
import { useEmergencySocket } from '@hooks/useSocket';

import EmergencyStatusManagement from '@components/common/@Modal/EmergencyStatusManagement';
import EmergencyToast from '@components/common/EmergencyToast';

import { TOAST_DURATION } from '@constants/index';
import { useQueryClient } from '@tanstack/react-query';

import FooterControlWrapper from './_fragments/FooterControlWrapper';
import HomeNavigationBar from './_fragments/HomeNavigationBar';
import MapTypeSelectWrapper from './_fragments/MapTypeSelectWrapper';
import RightFloatList from './_fragments/RightFloatList';
import WorkMarker from './_fragments/WorkMarker';

import {
  WorkStatusCountType,
  WorkStatusType,
  WorkType,
} from 'generated/apis/@types/data-contracts';
import {
  QUERY_KEY_WORK_API,
  useWorkListQuery,
} from 'generated/apis/Work/Work.query';
import {
  QUERY_KEY_WORK_LOG_API,
  useWorkLogStatusCountRetrieveQuery,
} from 'generated/apis/WorkLog/WorkLog.query';
import { ToastEmergencyIcon } from 'generated/icons/MyIcons';

export type HeavyEquipment = {
  id?: number;
  driver?: string;
  carType?: string;
  status?: string;
};

interface HomePageContentProps extends BoxProps {}

function HomePageContent({ ...basisProps }: HomePageContentProps) {
  const { openModal } = useModals();
  const toast = useToast();
  const queryClient = useQueryClient();

  const [mapZoom, setMapZoom] = useState(11);
  const [viewMapType, setViewMapType] = useState('satellite');

  // P_MEMO: 해당 목록은 페이지네이션이 아닌, 전체로 받아옴
  const { data: workListData } = useWorkListQuery({});

  const { data: WorkLogStatusCountRetrieveData } =
    useWorkLogStatusCountRetrieveQuery();

  // P_TODO: 가중치 계산 로직, 임시
  const getStatusWeight = (status: WorkStatusType) => {
    if (status === 'EMERGENCY') return 3;
    else if (status === 'PROGRESS') return 2;
    else return 1;
  };

  const sortedWorkList = useMemo(() => {
    if (!workListData) return [];
    else {
      const clone = [...(workListData as WorkType[])];
      return clone?.sort((a, b) => {
        const aWeight = getStatusWeight(a.status);
        const bWeight = getStatusWeight(b.status);
        return aWeight - bWeight;
      });
    }
  }, [workListData]);

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

  const onClickPlusZoom = useCallback(() => {
    setMapZoom((prev) => (prev === 20 ? prev : prev + 1));
  }, []);

  const onClickMinusZoom = useCallback(
    () => setMapZoom((prev) => (prev === 1 ? prev : prev - 1)),
    [],
  );

  const onClickConfirm = () => {
    openModal(EmergencyStatusManagement);
    toast.closeAll();
  };

  const onOpenToast = (data: string) => {
    toast({
      duration: TOAST_DURATION,
      position: 'top',
      icon: <ToastEmergencyIcon boxSize="24px" />,
      render: () => {
        return <EmergencyToast data={data} onClickConfirm={onClickConfirm} />;
      },
    });
  };

  const refreshHomeData = useCallback(() => {
    queryClient.invalidateQueries(QUERY_KEY_WORK_API.LIST());
    queryClient.invalidateQueries(
      QUERY_KEY_WORK_LOG_API.STATUS_COUNT_RETRIEVE(),
    );
  }, [queryClient]);

  useEmergencySocket({
    callback: (data: any) => {
      queryClient.invalidateQueries(['WORK_LIST']);
      onOpenToast(data);
    },
  });

  return (
    <Box position="relative" {...basisProps}>
      <HomeNavigationBar
        isOpenNavbar={isOpenNavbar}
        onOpenNavbar={onOpenNavbar}
        onCloseNavbar={onCloseNavbar}
      />
      <Box w="100vw" h="100vh">
        <GoogleMapReact
          zoom={mapZoom}
          options={{
            mapTypeId: viewMapType,
            disableDefaultUI: true,
          }}
          bootstrapURLKeys={{ key: CONFIG.GOOGLE_MAP_KEY as string }}
          defaultCenter={{ lat: 37.5665, lng: 126.978 }}
          defaultZoom={11}

          //   center: {
          //   lat: 10.99835602,
          //   lng: 77.01502627
          // },
          // zoom: 11
          // yesIWantToUseGoogleMapApiInternals
          // onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          {/* // P_MEMO: 해당 props를 넘겨야하는데 props가 없기 떄문에 ignore 설정
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore: Unreachable code error */}
          {sortedWorkList?.map((work) => (
            <Flex
              key={work.id}
              flexDir="column"
              // P_MEMO: 해당 props를 넘겨야하는데 props가 없기 떄문에 ignore 설정
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore: Unreachable code error
              lat={work.latitude}
              lng={work.longitude}
            >
              <WorkMarker work={work} />
            </Flex>
          ))}
        </GoogleMapReact>
      </Box>

      {/* 우측 work 목록 */}
      <RightFloatList
        isOpenList={isOpenList}
        onOpenList={onOpenList}
        onCloseList={onCloseList}
        workListData={workListData as WorkType[]}
        totalStatus={WorkLogStatusCountRetrieveData}
      />
      {/* 하단 타이머, 컨트롤러 */}
      <FooterControlWrapper
        minutes={0}
        seconds={0}
        // P_MEMO: 타이머가 돌아갈 때 마다 전체 리랜더링을 막기 위해 컴포넌트 내에서 useTimer 선언, 사용 -> 핸들러가 아닌 refetch 자체를 넘겨줌
        refreshHomeData={refreshHomeData}
        onClickMinusZoom={onClickMinusZoom}
        onClickPlusZoom={onClickPlusZoom}
      />

      <MapTypeSelectWrapper
        setViewMapType={setViewMapType}
        viewMapType={viewMapType}
      />
    </Box>
  );
}

export default HomePageContent;
