import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import { userSliceActions } from '@features/user/userSlice';

import { LOCAL_KEY } from '@constants/local-key';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '@utils/localStorage/helper';
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

  const [isSaveId, setIsSaveId] = useState(false);
  const [isSaveLogin, setIsSaveLogin] = useState(true);

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
        // 로그인 유지여부, 아이디 저장여부
        setLocalStorage(LOCAL_KEY.IS_SAVE_LOGIN, JSON.stringify(isSaveLogin));
        if (isSaveId) {
          setLocalStorage(LOCAL_KEY.SAVE_ID, methods.watch('nickname'));
        } else {
          removeLocalStorage(LOCAL_KEY.SAVE_ID);
        }

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

  // 아이디 / 로그인유지 여부 확인 후 default 세팅
  useEffect(() => {
    if (!methods) return;

    const savedId: string | null = getLocalStorage(LOCAL_KEY.SAVE_ID);
    if (savedId) {
      setIsSaveId(true);
      methods.setValue('nickname', savedId);
    }

    const stringifiedSaveLogin: string | null = getLocalStorage(
      LOCAL_KEY.IS_SAVE_LOGIN,
    );
    if (stringifiedSaveLogin) {
      const parsedIsSaveLogin: boolean = JSON.parse(stringifiedSaveLogin);
      setIsSaveLogin(parsedIsSaveLogin);
    }
  }, [methods]);

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
              <AuthCheckbox
                labelText="아이디 저장"
                isChecked={isSaveId}
                onChange={(e) => {
                  setIsSaveId(e.target.checked);
                }}
              />
              <AuthCheckbox
                labelText="로그인 상태 유지"
                isChecked={isSaveLogin}
                onChange={(e) => {
                  setIsSaveLogin(e.target.checked);
                }}
              />
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
