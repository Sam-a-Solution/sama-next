import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import { userSliceActions } from '@features/user/userSlice';

import { setToken } from '@utils/localStorage/token';

import AuthCheckbox from './_fragments/AuthCheckbox';
import AuthLabelInput from './_fragments/AuthLabelInput';
import FindIdButton from './_fragments/FindIdButton';
import useLoginForm from './_hooks/LoginSchema';

import { useUserLoginCreateMutation } from 'generated/apis/User/User.query';

function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = useLoginForm();

  const [disabled, setDisabled] = useState(false);

  const { mutate: createLoginMutate } = useUserLoginCreateMutation({
    options: {
      onSuccess: (data) => {
        if (data.access && data.refresh) {
          const { access, refresh } = data;
          dispatch(userSliceActions.setIsLogin(true));
          setToken({
            access,
            refresh,
          });
        }
        // TODO: 로그인 성공 시, 토큰 저장
        router.push('/');
      },
      onError: (error) => {
        setDisabled(true);
        if (error.response?.status === 400) {
          methods.setError('nickname', {
            type: 'validate',
            message: '아이디 또는 비밀번호를 다시 확인해주세요.',
          });
          methods.setError('password', {
            type: 'validate',
            message: '아이디 또는 비밀번호를 다시 확인해주세요.',
          });
        }
        if (error.response?.status === 404) {
          methods.setError('nickname', {
            type: 'validate',
            message: '아이디 또는 비밀번호를 다시 확인해주세요.',
          });
          methods.setError('password', {
            type: 'validate',
            message: '아이디 또는 비밀번호를 다시 확인해주세요.',
          });
        }
      },
    },
  });

  const nicknameValue = useWatch({
    name: 'nickname',
    defaultValue: '',
    control: methods.control,
  });
  const passwordValue = useWatch({
    name: 'password',
    defaultValue: '',
    control: methods.control,
  });

  const isDisabled = useMemo(
    () => !nicknameValue || !passwordValue,
    [nicknameValue, passwordValue],
  );

  const onSubmit = methods.handleSubmit(
    (data) => {
      const { nickname, password } = data;
      createLoginMutate({
        data: {
          nickname,
          password,
        },
      });
    },
    (error) => {
      console.log(error);
    },
  );

  const onClickFindIdBtn = () => {
    router.push('/login/findId');
  };

  useEffect(() => {
    if (nicknameValue && !methods.formState.errors.nickname) {
      methods.clearErrors('nickname');
    }
    if (passwordValue && !methods.formState.errors.password) {
      methods.clearErrors('password');
    }
    if (
      !methods.formState.errors.nickname &&
      !methods.formState.errors.password
    ) {
      setDisabled(false);
    }
  }, [nicknameValue, passwordValue, methods]);

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
            <Text textStyle="TitleLarge">로그인</Text>
            <AuthLabelInput
              label="아이디"
              type="text"
              placeholderText="아이디를 입력하세요."
              flexProps={{
                mt: '0 !important',
              }}
              errorMessage={methods.formState.errors.nickname?.message}
              name="nickname"
            />
            <AuthLabelInput
              label="비밀번호"
              placeholderText="비밀번호를 입력하세요."
              type="password"
              flexProps={{
                mt: '0 !important',
              }}
              errorMessage={methods.formState.errors.password?.message}
              name="password"
            />
            <Flex w="100%" gap="24px" mt="0 !important">
              {/* TODO: 아이디 저장 기능 */}
              <AuthCheckbox labelText="아이디 저장" />
              {/* TODO: 로그인 상태 유지 기능 */}
              <AuthCheckbox labelText="로그인 상태 유지" />
            </Flex>
          </VStack>
          <Button
            type="submit"
            w="100%"
            size="lg"
            colorScheme={'primary'}
            borderRadius="5px"
            isDisabled={isDisabled || disabled}
            _disabled={{
              bg: 'gray.400',
              border: 'none',
              _hover: {
                bg: 'gray.400',
              },
            }}
          >
            <Text textStyle="Button">로그인</Text>
          </Button>
          <FindIdButton onClickFindIdBtn={onClickFindIdBtn} />
        </Box>
      </FormProvider>
    </Flex>
  );
}

export default LoginPage;
