import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import { userSliceActions } from '@features/user/userSlice';

import { setToken } from '@utils/localStorage/token';

import AuthLabelInput from './_fragments/AuthLabelInput';
import FindIdSchema from './_hooks/FindIdSchema';

import { useUserLoginCreateMutation } from 'generated/apis/User/User.query';

function FindIdPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = FindIdSchema();

  const [disabled, setDisabled] = useState(false);

  const onSubmit = () => {
    console.log('아이디찾기 제출임시');
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="#FAFAFA"
    >
      <FormProvider {...methods}>
        <Box
          p="60px 50px"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="15px"
          as="form"
          onSubmit={onSubmit}
        >
          <VStack w="402px" gap="18px" mb="40px">
            <Text textStyle="TitleLarge" w="100%">
              아이디 찾기/비밀번호 재설정
            </Text>
          </VStack>
        </Box>
      </FormProvider>
    </Flex>
  );
}

export default FindIdPage;
