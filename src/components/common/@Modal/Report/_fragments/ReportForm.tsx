import React from 'react';

import { Flex, Text, VStack } from '@chakra-ui/react';

import CustomInput from '@components/common/@Input/CustomInput';
import DateInput from '@components/common/@Input/DateInput';
import CustomSelector from '@components/common/@Select/CustomSelector';
import FormHelper from '@components/common/FormHelper';

interface ReportFormProps {
  isReadOnly?: boolean;
}

function ReportForm({ isReadOnly = false }: ReportFormProps) {
  return (
    // TODO: react-hook-form 연동
    <VStack alignItems="flex-start" pb="30px" gap="24px">
      <Flex w="100%" h="50px" alignItems="center" gap="12px">
        <Text w="100px" textStyle="Title" color="primary.500">
          작업자
        </Text>
        <Text textStyle="Text" color="black">
          박미선
        </Text>
      </Flex>
      <FormHelper label="작업명">
        <CustomInput
          value="로프 외부 작업"
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
        />
      </FormHelper>
      <FormHelper label="작업기간">
        <Flex w="100%" alignItems="center" gap="4px">
          <DateInput
            value="2023-04-06"
            isReadOnly={isReadOnly}
            _readOnly={styles.readOnly}
          />
          <Text>~</Text>
          <DateInput
            value="2023-04-06"
            isReadOnly={isReadOnly}
            _readOnly={styles.readOnly}
          />
        </Flex>
      </FormHelper>
      <FormHelper label="작업위치">
        <CustomInput
          value="서울특별시 영등포구 양평로 157"
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
        />
      </FormHelper>
      <FormHelper label="공사구분">
        <CustomInput
          value="기계설비공사"
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
        />
      </FormHelper>
      <FormHelper label="중장비 종류">
        <CustomSelector
          options={['지게차']}
          onChange={(option: string) => console.log(option)}
          menuButtonProps={{
            disabled: isReadOnly,
            _disabled: {
              bg: 'gray.300',
              textStyle: 'Text',
              color: 'gray.500',
            },
          }}
        />
      </FormHelper>
      <FormHelper label="사업장">
        <CustomSelector
          options={['삼아솔루션']}
          onChange={(option: string) => console.log(option)}
          menuButtonProps={{
            disabled: isReadOnly,
            _disabled: {
              bg: 'gray.300',
              textStyle: 'Text',
              color: 'gray.500',
            },
          }}
        />
      </FormHelper>
      <FormHelper label="시설부서">
        <CustomSelector
          options={['시설1팀']}
          onChange={(option: string) => console.log(option)}
          menuButtonProps={{
            disabled: isReadOnly,
            _disabled: {
              bg: 'gray.300',
              textStyle: 'Text',
              color: 'gray.500',
            },
          }}
        />
      </FormHelper>
      <FormHelper label="작업수행부서">
        <CustomSelector
          options={['운전부서']}
          onChange={(option: string) => console.log(option)}
          menuButtonProps={{
            disabled: isReadOnly,
            _disabled: {
              bg: 'gray.300',
              textStyle: 'Text',
              color: 'gray.500',
            },
          }}
        />
      </FormHelper>
      <FormHelper label="도로 통제 항목">
        <CustomInput
          value="도로 통제 항목"
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
        />
      </FormHelper>
    </VStack>
  );
}

export default ReportForm;

const styles = {
  readOnly: {
    bg: 'gray.300',
    textStyle: 'Text',
    color: 'gray.500',
  },
};
