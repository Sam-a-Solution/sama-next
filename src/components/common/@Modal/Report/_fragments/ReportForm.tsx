import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Flex, Text, VStack } from '@chakra-ui/react';

import CustomInput from '@components/common/@Input/CustomInput';
import DateInput from '@components/common/@Input/DateInput';
import FormSelect from '@components/common/@Select/FormSelect';
import FormHelper from '@components/common/FormHelper';

import { choiceToSelect } from '@utils/format';

import {
  WorkBusinessType,
  WorkChoiceType,
  WorkFacilityType,
  WorkHeavyEquipmentType,
  WorkOperationDepartmentType,
} from 'generated/apis/@types/data-contracts';

interface ReportFormProps {
  isReadOnly?: boolean;
  selects?: WorkChoiceType;
  userName?: string;
}

function ReportForm({
  isReadOnly = false,
  selects,
  userName,
}: ReportFormProps) {
  const methods = useFormContext();

  const handleSelectOption = useCallback(
    (
      keyName: string,
      option: string,
      list:
        | WorkHeavyEquipmentType[]
        | WorkBusinessType[]
        | WorkOperationDepartmentType[]
        | WorkFacilityType[]
        | undefined,
    ) => {
      console.log('실행되니');
      console.log({ keyName, option, list });

      methods.setValue(
        keyName,
        list?.find((item) => item.koreaName === option),
      );
    },
    [methods],
  );

  return (
    <VStack alignItems="flex-start" pb="30px" gap="24px">
      <Flex w="100%" h="50px" alignItems="center" gap="12px">
        <Text w="100px" textStyle="Title" color="primary.500">
          작업자
        </Text>
        <Text textStyle="Text" color="black">
          {userName || ''}
        </Text>
      </Flex>
      <FormHelper label="작업명">
        <CustomInput
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
          {...methods.register('name')}
        />
      </FormHelper>
      {/* TODO: 달력 구현 */}
      <FormHelper label="작업기간">
        <Flex w="100%" alignItems="center" gap="4px">
          <DateInput
            isReadOnly={isReadOnly}
            _readOnly={styles.readOnly}
            registerName="startTime"
          />
          <Text>~</Text>
          <DateInput
            isReadOnly={isReadOnly}
            _readOnly={styles.readOnly}
            registerName="endTime"
          />
        </Flex>
      </FormHelper>
      {/* 주소 검색 API 연동 */}
      <FormHelper label="작업위치">
        <CustomInput
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
          _active={{
            border: 'none',
          }}
          _focus={{
            border: 'none',
          }}
          {...methods.register('locationName')}
        />
      </FormHelper>
      <FormHelper label="공사구분">
        <CustomInput
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
          {...methods.register('construction')}
          _disabled={{
            bgColor: 'gray.200',
          }}
        />
      </FormHelper>
      {/* 작업내역 4개 */}
      <FormSelect
        keyName="heavyEquipmentType"
        selectList={choiceToSelect(selects?.heavyEquipmentType as any)}
        label="중장비 종류"
        isDisabled={isReadOnly}
      />
      <FormSelect
        keyName="business"
        selectList={choiceToSelect(selects?.business as any)}
        label="사업장"
        isDisabled={isReadOnly}
      />
      <FormSelect
        keyName="facility"
        selectList={choiceToSelect(selects?.facility as any)}
        label="시설부서"
        isDisabled={isReadOnly}
      />
      <FormSelect
        keyName="operationDepartment"
        selectList={choiceToSelect(selects?.operationDepartment as any)}
        label="작업수행부서"
        isDisabled={isReadOnly}
      />

      <FormHelper label="도로 통제 항목">
        <CustomInput
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
          {...methods.register('roadControl')}
        />
      </FormHelper>
    </VStack>
  );
}

export default ReportForm;

const styles = {
  readOnly: {
    bg: 'gray.200',
    textStyle: 'Text',
    color: 'gray.500',
  },
};
