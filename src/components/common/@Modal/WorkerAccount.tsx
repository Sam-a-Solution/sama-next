import React from 'react';

import {
  Button,
  CloseButton,
  Flex,
  ModalProps,
  Text,
  VStack,
} from '@chakra-ui/react';

import CustomInput from '../@Input/CustomInput';
import FormHelper from '../FormHelper';
import ModalContainer from './ModalContainer';

import { AccountIcon, AddIcon } from 'generated/icons/MyIcons';

interface WorkerAccountProps extends Omit<ModalProps, 'children'> {}

function WorkerAccount({ ...props }: WorkerAccountProps) {
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
        <VStack gap="24px">
          <FormHelper label="아이디">
            <Flex flex="1" alignItems="center" gap="8px">
              <CustomInput
                w="100%"
                h="50px"
                placeholder="사용할 아이디를 입력해 주세요."
              />
              <Button
                variant="outline"
                w="65px"
                h="50px"
                borderRadius="5px"
                colorScheme="primary"
                // TODO: 중복체크 API 연동
                onClick={() => console.log('중복체크 API 연동')}
              >
                중복체크
              </Button>
            </Flex>
          </FormHelper>
          <FormHelper label="비밀번호">
            <CustomInput
              flex="1"
              placeholder="사용할 비밀번호를 입력해 주세요."
            />
          </FormHelper>
          <FormHelper label="비밀번호 확인">
            <CustomInput
              flex="1"
              placeholder="비밀번호를 다시 입력해 주세요."
            />
          </FormHelper>
          <FormHelper label="이름">
            <CustomInput flex="1" placeholder="이름을 입력해 주세요." />
          </FormHelper>
          <FormHelper label="소속">
            <CustomInput flex="1" placeholder="소속을 입력해 주세요." />
          </FormHelper>
          <FormHelper label="핸드폰 번호">
            <CustomInput flex="1" placeholder="핸드폰 번호를 입력해 주세요." />
          </FormHelper>
        </VStack>
      }
      footer={
        <Flex w="100%" h="100px" alignItems="center" gap="10px">
          <Button flex="1" h="50px" variant="outline" onClick={props.onClose}>
            <Text textStyle="Button">취소</Text>
          </Button>
          <Button
            flex="1"
            h="50px"
            // TODO: 계정 생성 API 연동
            onClick={() => console.log('계정 생성 API 연동')}
          >
            <AddIcon w="24px" h="24px" mr="8px" />
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
