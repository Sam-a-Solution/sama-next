import { useRouter } from 'next/router';
import React from 'react';

import { Flex, Text, VStack } from '@chakra-ui/react';

import PrimaryButton from '@components/common/PrimaryButton';

import { PrimaryCheckRound } from 'generated/icons/MyIcons';

const ResetPasswordResultPage = () => {
  const router = useRouter();

  const onClickGoLogin = () => {
    router.replace('/login');
  };

  return (
    <>
      <VStack alignItems="center" gap="20px">
        <PrimaryCheckRound w="108px" h="108px" />
        <Text fontWeight="700" textAlign="center">
          비밀번호가 재설정 되었습니다.
        </Text>
      </VStack>

      <Flex flexDir="column" gap="10px" bgColor="white" w="100%">
        <PrimaryButton onClick={onClickGoLogin}>로그인</PrimaryButton>
      </Flex>
    </>
  );
};

export default ResetPasswordResultPage;
