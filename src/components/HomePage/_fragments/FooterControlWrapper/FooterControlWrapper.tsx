import { memo, useCallback, useEffect } from 'react';

import { Divider, Flex } from '@chakra-ui/react';

import useTimer from '@hooks/useTimer';

import RefreshTimer, { RefreshTimerProps } from './components/RefreshTimer';
import ZoomController, {
  ZoomControllerProps,
} from './components/ZoomController';

interface FooterControlWrapperProps extends ZoomControllerProps {
  refetchWorkListData: () => void;
  minutes: number;
  seconds: number;
}

// P_TODO: 임시로 값 바꿔둠. 추후 10분으로 변경 예정
const REFRESH_TERM = 1000 * 60 * 1;

const FooterControlWrapper = ({
  onClickMinusZoom,
  onClickPlusZoom,
  refetchWorkListData,
}: FooterControlWrapperProps) => {
  const { ms, seconds, minutes, setUseTimer, stopTimer } = useTimer();

  const onClickRefreshWork = useCallback(() => {
    setUseTimer(REFRESH_TERM);
    refetchWorkListData();
  }, [refetchWorkListData, setUseTimer]);

  useEffect(() => {
    if (ms === 0) {
      setUseTimer(REFRESH_TERM);
      refetchWorkListData();
    }
  }, [ms, refetchWorkListData, setUseTimer, stopTimer]);

  return (
    <Flex
      position="absolute"
      bottom="20px"
      left="50%"
      transform="translateX(-50%)"
      gap="12px"
    >
      <RefreshTimer
        minutes={minutes}
        seconds={seconds}
        onClickRefreshWork={onClickRefreshWork}
      />

      <ZoomController
        onClickMinusZoom={onClickMinusZoom}
        onClickPlusZoom={onClickPlusZoom}
      />
    </Flex>
  );
};

export default memo(FooterControlWrapper);
