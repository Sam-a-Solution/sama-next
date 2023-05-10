import { useRouter } from 'next/router';
import React from 'react';
import { FormProvider } from 'react-hook-form';

import { watch } from 'fs';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

import CustomInput from '@components/common/@Input/CustomInput';
import FormHelper from '@components/common/FormHelper';
import PrimaryButton from '@components/common/PrimaryButton';

import useResetPasswordForm from './useResetPasswordForm';

import { useUserPasswordResetCreateMutation } from 'generated/apis/User/User.query';

const ResetPasswordPage = () => {
  const router = useRouter();

  const { phone, username } = router.query;

  const methods = useResetPasswordForm();

  const {
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = methods;

  const { mutate: postUserPasswordResetMutate } =
    useUserPasswordResetCreateMutation({
      options: {
        onSuccess: (data) => {
          console.log('비밀번호 변경 완료', data);

          router.replace('/login/resetPassword/result');
        },
        onError: (e: any) => {
          console.log('비밀번호 변경 에러', e.response.data);
          for (const keyName in e.response.data) {
            setError(keyName as any, { message: e.response.data[keyName][0] });
          }
        },
      },
    });

  const onPressResetPassword = handleSubmit(({ password, passwordConfirm }) => {
    postUserPasswordResetMutate({
      data: { password, passwordConfirm, phone: phone as string },
    });
  });

  return (
    <>
      <FormProvider {...methods}>
        <Text textStyle="TitleLarge" w="100%" mb="8px">
          비밀번호 재설정
        </Text>
        <Flex flexDir="column" gap="18px">
          <FormHelper
            label="비밀번호"
            flexDir="column"
            wrapperProps={{ flexDir: 'column' }}
            labelProps={{ w: '100%' }}
            errorText={errors.password?.message}
          >
            <CustomInput
              type="password"
              flex="1"
              placeholder="새 비밀번호를 입력해주세요."
              {...methods.register('password')}
            />
          </FormHelper>
          <FormHelper
            label="비밀번호 확인"
            flexDir="column"
            wrapperProps={{ flexDir: 'column' }}
            labelProps={{ w: '100%' }}
            errorText={errors.passwordConfirm?.message}
          >
            <CustomInput
              type="password"
              flex="1"
              placeholder="새 비밀번호를 다시 입력해주세요."
              {...methods.register('passwordConfirm')}
            />
          </FormHelper>
        </Flex>
        <PrimaryButton isDisabled={!isValid} onClick={onPressResetPassword}>
          재설정
        </PrimaryButton>
      </FormProvider>
    </>
  );
};

export default ResetPasswordPage;
