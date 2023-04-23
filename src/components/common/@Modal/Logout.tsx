import React from 'react';

import { Box, Divider, Flex, ModalProps, Text, VStack } from '@chakra-ui/react';

import ModalContainer from './ModalContainer';

interface LogoutProps extends Omit<ModalProps, 'children'> {}

function Logout({ ...props }: LogoutProps) {
  return (
    <ModalContainer
      header={<></>}
      body={
        <VStack gap="16px">
          <Text textStyle="Title" color="primary.500">
            로그아웃
          </Text>
          <Text textStyle="Text" color="gray.600">
            로그아웃 하시겠습니까?
          </Text>
        </VStack>
      }
      footer={
        <Flex w="100%" borderTop="1px solid" borderColor="gray.300">
          <Flex
            flex="1"
            justifyContent="center"
            alignItems="center"
            p="14.5px 0"
            borderRight="1px solid"
            borderColor="gray.300"
            cursor="pointer"
            onClick={props.onClose}
          >
            <Text textStyle="Text" color="black">
              취소
            </Text>
          </Flex>
          <Flex
            flex="1"
            justifyContent="center"
            alignItems="center"
            p="14.5px 0"
            cursor="pointer"
            // TODO: 로그아웃 API 연동
            onClick={() => alert('로그아웃 API 연동')}
          >
            <Text textStyle="Text" color="primary.500">
              로그아웃
            </Text>
          </Flex>
        </Flex>
      }
      modalHeaderProps={{
        p: '0',
      }}
      modalBodyProps={{
        p: '32px 20px',
      }}
      modalFooterProps={{
        p: '0',
      }}
      {...props}
    />
  );
}

export default Logout;
