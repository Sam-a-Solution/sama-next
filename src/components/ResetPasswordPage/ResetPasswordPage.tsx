import { useRouter } from 'next/router';
import React from 'react';

import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import PrimaryButton from '@components/common/PrimaryButton';

import { PrimaryCheckRound } from 'generated/icons/MyIcons';

const ResetPasswordPage = () => {
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
    <>
      <Text textAlign="center">비밀번호 재설정</Text>
    </>
  );
};

export default ResetPasswordPage;
