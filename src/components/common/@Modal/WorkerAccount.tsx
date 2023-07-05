import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider } from 'react-hook-form';

import {
  Button,
  CloseButton,
  Flex,
  ModalProps,
  Text,
  VStack,
} from '@chakra-ui/react';

import useModals from '@hooks/useModals';

import CustomInput from '../@Input/CustomInput';
import FormHelper from '../FormHelper';
import CustomAlert from './@Alert/CustomAlert';
import CustomConfirmAlert from './@Alert/CustomConfirmAlert';
import ModalContainer from './ModalContainer';
import useAccountForm from './_hooks/useAccountForm';

import {
  useUserNicknameValidationCreateMutation,
  useUserRegisterCreateMutation,
} from 'generated/apis/User/User.query';
import { AccountIcon, AddIcon, GrayAddIcon } from 'generated/icons/MyIcons';

interface WorkerAccountProps extends Omit<ModalProps, 'children'> {}

function WorkerAccount({ ...props }: WorkerAccountProps) {
  const methods = useAccountForm();
  const {
    watch,
    setError,
    formState: { isValid },
  } = methods;
  const { openModal } = useModals();
  const [successText, setSuccessText] = useState('');

  const nicknameErrorMessage = useMemo(
    () => methods.formState?.errors?.nickname?.message,
    [methods.formState?.errors?.nickname?.message],
  );

  const passwordErrorMessage = useMemo(
    () => methods.formState?.errors?.password?.message,
    [methods.formState?.errors?.password?.message],
  );

  const passwordConfirmErrorMessage = useMemo(
    () => methods.formState?.errors?.passwordConfirm?.message,
    [methods.formState?.errors?.passwordConfirm?.message],
  );

  const usernameErrorMessage = useMemo(
    () => methods.formState?.errors?.username?.message,
    [methods.formState?.errors?.username?.message],
  );

  const affiliationErrorMessage = useMemo(
    () => methods.formState?.errors?.affiliation?.message,
    [methods.formState?.errors?.affiliation?.message],
  );

  const phoneErrorMessage = useMemo(
    () => methods.formState?.errors?.phone?.message,
    [methods.formState?.errors?.phone?.message],
  );

  const isValidButton = useMemo(
    () => isValid && !!successText.length,
    [isValid, successText.length],
  );

  // const formatInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = event.target.value;
  //   const formattedValue = formatPhoneNumber(value);
  //   event.target.value = formattedValue;
  // };

  const { mutate: nicknameValidationMutate } =
    useUserNicknameValidationCreateMutation({
      options: {
        onSuccess: () => {
          setSuccessText('사용 가능한 아이디입니다.');
        },

        onError: (error) => {
          if (error.response?.status === 400) {
            methods.setError('nickname', {
              type: 'validate',
              message: error?.response?.data?.nickname?.[0],
            });
          }
        },
      },
    });

  const { mutate: registerCreateMutate } = useUserRegisterCreateMutation({
    options: {
      onSuccess: (data) => {
        openModal(CustomAlert, {
          auxProps: {
            title: '작업자 계정 추가 완료',
            content: '신규 작업자 계정이 추가되었습니다.',
            submitText: '확인',
            onSubmit: () => {
              props.onClose();
            },
          },
        });
      },
      onError: (error: any) => {
        for (const keyName in error.response.data) {
          methods.setError(keyName as any, {
            message: error?.response?.data[keyName][0],
          });
        }
      },
    },
  });

  const handleValidationNickname = () => {
    nicknameValidationMutate({
      data: {
        nickname: methods.getValues('nickname'),
      },
    });
  };

  const handleCreateAccount = methods.handleSubmit((data) => {
    registerCreateMutate({
      data,
    });
  });

  useEffect(() => {
    if (nicknameErrorMessage) {
      setSuccessText('');
    }
  }, [nicknameErrorMessage]);

  // 중복 확인 후 아이디 변경하면 다시 인증해야 됨.
  useEffect(() => {
    setSuccessText('');
  }, [watch('nickname')]);

  return (
    <ModalContainer
      header={
        <Flex justifyContent="space-between">
          <Flex alignItems="center" gap="8px">
            <Flex
              w="40px"
              h="40px"
              justifyContent="center"
              alignItems="center"
              bg="secondary.50"
              borderRadius="30px"
            >
              <AccountIcon w="24px" h="24px" />
            </Flex>
            <Text textStyle="TitleLarge" color="black">
              작업자 계정 추가
            </Text>
          </Flex>
          <CloseButton onClick={props.onClose} />
        </Flex>
      }
      body={
        // TODO: react-hook-form 연동
        <FormProvider {...methods}>
          <VStack gap="24px" as="form" onSubmit={handleCreateAccount}>
            <FormHelper
              label="아이디"
              errorText={nicknameErrorMessage}
              successText={successText}
            >
              <Flex w="100%" flex="1" alignItems="center" gap="8px">
                <CustomInput
                  w="100%"
                  h="50px"
                  placeholder="사용할 아이디를 입력해 주세요."
                  borderColor={successText ? 'alert.success.500' : 'gray.200'}
                  {...methods.register('nickname')}
                />
                <Button
                  variant="outline"
                  w="65px"
                  h="50px"
                  borderRadius="5px"
                  colorScheme="primary"
                  isDisabled={
                    !methods.watch('nickname') ||
                    !!successText ||
                    !!nicknameErrorMessage
                  }
                  _disabled={{
                    bg: 'gray.400',
                    textStyle: 'ButtonSmall',
                    color: 'white',
                    border: 'none',
                    _hover: {
                      bg: 'gray.400',
                    },
                  }}
                  onClick={handleValidationNickname}
                >
                  중복체크
                </Button>
              </Flex>
            </FormHelper>
            <FormHelper label="비밀번호" errorText={passwordErrorMessage}>
              <CustomInput
                type="password"
                flex="1"
                placeholder="사용할 비밀번호를 입력해 주세요."
                {...methods.register('password')}
              />
            </FormHelper>
            <FormHelper
              label="비밀번호 확인"
              errorText={passwordConfirmErrorMessage}
            >
              <CustomInput
                type="password"
                flex="1"
                placeholder="비밀번호를 다시 입력해 주세요."
                {...methods.register('passwordConfirm')}
              />
            </FormHelper>
            <FormHelper label="이름" errorText={usernameErrorMessage}>
              <CustomInput
                flex="1"
                placeholder="이름을 입력해 주세요."
                {...methods.register('username')}
              />
            </FormHelper>
            <FormHelper label="소속" errorText={affiliationErrorMessage}>
              <CustomInput
                flex="1"
                placeholder="소속을 입력해 주세요."
                {...methods.register('affiliation')}
              />
            </FormHelper>
            <FormHelper label="핸드폰 번호" errorText={phoneErrorMessage}>
              <CustomInput
                flex="1"
                placeholder="핸드폰 번호를 입력해 주세요."
                // {...methods.register('phone', {
                //   onChange: formatInputValue,
                // })}
                {...methods.register('phone')}
              />
            </FormHelper>
          </VStack>
        </FormProvider>
      }
      footer={
        <Flex w="100%" h="100px" alignItems="center" gap="10px">
          <Button flex="1" h="50px" variant="outline" onClick={props.onClose}>
            <Text textStyle="Button">취소</Text>
          </Button>
          <Button
            flex="1"
            h="50px"
            isDisabled={!isValidButton}
            _disabled={{
              bg: 'gray.400',
              border: 'none',
              _hover: {
                bg: 'gray.400',
              },
            }}
            onClick={() =>
              openModal(CustomConfirmAlert, {
                auxProps: {
                  title: '작업자 계정 추가',
                  content: '신규 작업자 계정을 추가하시겠습니까?',
                  cancelText: '취소',
                  submitText: '추가',
                  onSubmit: handleCreateAccount,
                },
              })
            }
          >
            {isValidButton ? (
              <AddIcon w="24px" h="24px" mr="8px" />
            ) : (
              <GrayAddIcon boxSize="24px" mr="8px" />
            )}

            <Text textStyle="Button">계정 생성</Text>
          </Button>
        </Flex>
      }
      modalContentProps={{
        minW: '524px',
      }}
      modalHeaderProps={{
        p: '20px 30px !important',
      }}
      modalBodyProps={{
        p: '0 30px !important',
        mt: '20px !important',
      }}
      modalFooterProps={{
        p: '0 30px !important',
        mt: '30px !important',
      }}
      {...props}
    />
  );
}

export default WorkerAccount;
