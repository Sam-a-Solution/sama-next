import { memo } from 'react';

import { Flex, Text } from '@chakra-ui/react';

import { LABEL } from '@constants/label';
import { LAYOUT } from '@constants/layout';

interface MapTypeSelectWrapperProps {
  viewMapType: string;
  setViewMapType: ReactSetter<string>;
}
const MapTypeSelectWrapper = ({
  viewMapType,
  setViewMapType,
}: MapTypeSelectWrapperProps) => {
  return (
    <Flex
      position="absolute"
      alignItems="center"
      top={LAYOUT.HEADER.HEIGHT}
      left="50%"
      gap="12px"
    >
      <Flex p="4px" rounded="full" bgColor="white" w="160px">
        {Object.entries(LABEL.MAP).map(([value, label]) => (
          <Flex
            key={value}
            onClick={() => setViewMapType(value)}
            justifyContent="center"
            alignItems="center"
            w="50px"
            h="32px"
            rounded="full"
            bgColor={viewMapType === value ? 'secondary.500' : 'white'}
          >
            <Text
              textStyle="sm"
              fontWeight="700"
              color={viewMapType === value ? 'white' : 'gray.600'}
            >
              {label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default memo(MapTypeSelectWrapper);
