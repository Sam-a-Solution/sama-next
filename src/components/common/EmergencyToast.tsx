import { Flex, Text, useToast } from '@chakra-ui/react';

import useModals from '@hooks/useModals';

import EmergencyStatusManagement from './@Modal/EmergencyStatusManagement';

import { ToastEmergencyIcon } from 'generated/icons/MyIcons';

interface EmergencyToastProps {
  data: string;
  onClickConfirm: () => void;
}

const EmergencyToast = ({ data, onClickConfirm }: EmergencyToastProps) => {
  return (
    <Flex
      bgColor="warning"
      w="614px"
      h="50px"
      px="12px"
      borderRadius="5px"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex gap="8px">
        <ToastEmergencyIcon boxSize="24px" />
        <Text color="white" fontWeight="700">
          {data}
        </Text>
      </Flex>
      <Text
        as="button"
        onClick={onClickConfirm}
        color="white"
        fontWeight="700"
        mr="18px"
      >
        확인
      </Text>
    </Flex>
  );
};

export default EmergencyToast;
