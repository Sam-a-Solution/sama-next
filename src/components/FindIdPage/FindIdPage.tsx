import { useRouter } from 'next/router';
import React, { BaseSyntheticEvent, useEffect, useMemo, useState } from 'react';
import { FormProvider, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';

import { userSliceActions } from '@features/user/userSlice';
import useModals from '@hooks/useModals';

import CustomAlert from '@components/common/@Modal/@Alert/CustomAlert';
import CustomConfirmAlert from '@components/common/@Modal/@Alert/CustomConfirmAlert';
import PrimaryButton from '@components/common/PrimaryButton';

import { setToken } from '@utils/localStorage/token';

import AuthLabelInput from './_fragments/AuthLabelInput';
import FindIdSchema from './_hooks/FindIdSchema';

import { useUserLoginCreateMutation } from 'generated/apis/User/User.query';
import {
  useVerifierPhoneVerifierConfirmCreateMutation,
  useVerifierPhoneVerifierCreateMutation,
} from 'generated/apis/Verifier/Verifier.query';

function FindIdPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const methods = FindIdSchema();
  const { openModal, closeModal } = useModals();
  const {
    handleSubmit,
    watch,
    setError,
    getValues,
    formState: { isLoading },
  } = methods;

  const [progress, setProgress] = useState(1);

  const { mutate: verifierPhoneMutate } =
    useVerifierPhoneVerifierCreateMutation({
      options: {
        onSuccess: () => {
          setProgress(2);
        },
        onError: (e: any) => {
          for (const keyName in e.response.data) {
            setError(keyName as any, { message: e.response.data[keyName][0] });
          }
        },
      },
    });

  const { mutate: verifierPhoneConfirmMutate } =
    useVerifierPhoneVerifierConfirmCreateMutation({
      options: {
        onSuccess: (data) => {
          router.push({
            pathname: '/login/find-id/result',
            query: {
              phone: watch('phone'),
              username: data.username,
            },
          });
        },
        onError: (e: any) => {
          for (const keyName in e.response.data) {
            if (keyName === 'user') {
              openModal(CustomAlert, {
                auxProps: {
                  title: '회원 정보',
                  content: `입력하신 정보와\n일치하는 아이디가 없습니다.`,
                  submitText: '확인',
                  onSubmit: () => {
                    router.replace('/login');
                    closeModal('a');
                  },
                },
              });
            } else {
              setError(keyName as any, {
                message: e.response.data[keyName][0],
              });
            }
          }
        },
      },
    });

  const onSubmit = handleSubmit(({ phone, code }) => {
    if (progress === 1) {
      verifierPhoneMutate({ data: { phone } });
      setProgress(2);
    } else if (progress === 2) {
      verifierPhoneConfirmMutate({ data: { phone, code } });
    }
  });

  const onPressReRequestAuthCode = () => {
    verifierPhoneMutate({ data: { phone: getValues('phone') } });
    setError('code', { message: '' });
    openModal(CustomAlert, {
      auxProps: {
        title: '인증번호 재전송',
        content: '인증번호가 재전송되었습니다.',
        submitText: '확인',
        onSubmit: () => closeModal('a'),
      },
    });
  };

  const isValid = useMemo(() => {
    return watch(['code', 'phone']).some((v) => v) && !isLoading;
  }, [watch(['code', 'phone'])]);

  return (
    <Flex flexDir="column" gap="40px" as="form" onSubmit={onSubmit}>
      <VStack gap="12px">
        <Text textStyle="TitleLarge" w="100%" mb="48px">
          아이디 찾기/비밀번호 재설정
        </Text>

        <FormProvider {...methods}>
          <AuthLabelInput
            isDisabled={progress === 2}
            label="휴대폰 번호"
            type="number"
            placeholderText="휴대폰 번호를 입력해주세요. (‘-’ 제외)"
            errorMessage={methods.formState.errors.phone?.message}
            name="phone"
          />

          {progress === 2 && (
            <Flex flexDir="column" w="100%" gap="10px">
              <AuthLabelInput
                label="인증번호"
                type="number"
                placeholderText="인증번호를 입력해주세요."
                errorMessage={methods.formState.errors.code?.message}
                name="code"
              />
              <PrimaryButton
                isDisabled={!isValid}
                onClick={onPressReRequestAuthCode}
                variant="outline"
              >
                인증번호 재전송
              </PrimaryButton>
            </Flex>
          )}
        </FormProvider>
      </VStack>

      <PrimaryButton isDisabled={!isValid} type="submit">
        다음
      </PrimaryButton>
    </Flex>
  );
}

export default FindIdPage;
