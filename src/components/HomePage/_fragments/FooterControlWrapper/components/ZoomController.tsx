import { memo } from 'react';

import { Divider, Flex } from '@chakra-ui/react';

import { MinusIcon, PlusIcon } from 'generated/icons/MyIcons';

export interface ZoomControllerProps {
  onClickPlusZoom: () => void;
  onClickMinusZoom: () => void;
}

const ZoomController = ({
  onClickMinusZoom,
  onClickPlusZoom,
}: ZoomControllerProps) => {
  return (
    <Flex
      gap="8px"
      bgColor="white"
      py="6px"
      px="8px"
      rounded="full"
      alignItems="center"
    >
      <PlusIcon onClick={onClickPlusZoom} cursor="pointer" boxSize="24px" />
      <Divider bgColor="gray.300" h="20px" w="1px" />
      <MinusIcon onClick={onClickMinusZoom} cursor="pointer" boxSize="24px" />
    </Flex>
  );
};

export default memo(ZoomController);
