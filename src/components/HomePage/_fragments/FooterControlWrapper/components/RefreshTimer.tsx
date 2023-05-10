import { memo } from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { RefreshIcon } from 'generated/icons/MyIcons';

export interface RefreshTimerProps {
  onClickRefreshWork: () => void;
  minutes: number;
  seconds: number;
}

const RefreshTimer = ({
  minutes,
  seconds,
  onClickRefreshWork,
}: RefreshTimerProps) => {
  return (
    <Flex
      gap="8px"
      bgColor="white"
      py="6px"
      px="8px"
      rounded="full"
      alignItems="center"
    >
      <RefreshIcon
        boxSize="24px"
        onClick={onClickRefreshWork}
        bgColor="gray.200"
        rounded="full"
        cursor="pointer"
      />
      <Text textStyle="sm" fontWeight="700" color="gray.700">
        {`${minutes > 9 ? minutes : '0' + minutes} : ${
          seconds > 9 ? seconds : '0' + seconds
        }`}
      </Text>
    </Flex>
  );
};

export default memo(RefreshTimer);
