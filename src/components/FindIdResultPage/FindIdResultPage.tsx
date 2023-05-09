import { useRouter } from 'next/router';
import React from 'react';

import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import PrimaryButton from '@components/common/PrimaryButton';

import { PrimaryCheckRound } from 'generated/icons/MyIcons';

const FindIdResultPage = () => {
  const router = useRouter();

  const { phone, username } = router.query;

  const onClickResetPassword = () => {
    router.push({
      pathname: '/login/resetPassword',
      query: { phone: phone },
    });
  };

  const onClickGoLogin = () => {
    router.push('/login');
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="#FAFAFA"
    >
      <Flex
        flexDir="column"
        gap="40px"
        p="60px 50px"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="15px"
      >
        <VStack
          w="402px"
          gap="32px"
          bgColor="white"
          px="20px"
          alignItems="center"
          justifyContent="center"
        >
          <VStack alignItems="center" gap="20px">
            <PrimaryCheckRound w="108px" h="108px" />
            <Flex flexDir="column">
              <Text
                fontWeight="700"
                textAlign="center"
              >{`회원님의 아이디는`}</Text>
              <Flex gap="4px" justifyContent="center">
                <Text fontWeight="700" color="primary.500">
                  {username}
                </Text>
                <Text fontWeight="700">{` 입니다.`}</Text>
              </Flex>
            </Flex>
          </VStack>
        </VStack>
        <Flex flexDir="column" gap="10px" bgColor="white" w="100%">
          <PrimaryButton variant="outline" onClick={onClickResetPassword}>
            비밀번호 재설정
          </PrimaryButton>
          <PrimaryButton onClick={onClickGoLogin}>로그인</PrimaryButton>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default FindIdResultPage;
