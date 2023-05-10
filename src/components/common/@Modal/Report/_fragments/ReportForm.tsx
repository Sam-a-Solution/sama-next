import React, { useCallback } from 'react';
import { useFormContext } from 'react-hook-form';

import { Flex, Text, VStack } from '@chakra-ui/react';

import CustomInput from '@components/common/@Input/CustomInput';
import DateInput from '@components/common/@Input/DateInput';
import CustomSelector from '@components/common/@Select/CustomSelector';
import FormHelper from '@components/common/FormHelper';

import {
  WorkBusinessType,
  WorkFacilityType,
  WorkHeavyEquipmentType,
  WorkOperationDepartmentType,
} from 'generated/apis/@types/data-contracts';

interface ReportFormProps {
  isReadOnly?: boolean;
  heavyEquipmentSelectList?: WorkHeavyEquipmentType[];
  businesSelectList?: WorkBusinessType[];
  operationDepartmentSelectList?: WorkOperationDepartmentType[];
  facilitySelectList?: WorkFacilityType[];
}

function ReportForm({
  isReadOnly = false,
  heavyEquipmentSelectList,
  businesSelectList,
  facilitySelectList,
  operationDepartmentSelectList,
}: ReportFormProps) {
  const methods = useFormContext();
  console.log('ReportForm', {
    isReadOnly,
    values: methods.watch(),
    heavyEquipmentSelectList,
    businesSelectList,
    facilitySelectList,
    operationDepartmentSelectList,
  });

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
          {methods.watch('user') || ''}
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
          isReadOnly={true}
          _readOnly={styles.readOnly}
          _active={{
            border: 'none',
          }}
          _focus={{
            border: 'none',
          }}
          cursor="pointer"
          onClick={() => alert('주소 검색 API 연동')}
          {...methods.register('locationName')}
        />
      </FormHelper>
      <FormHelper label="공사구분">
        <CustomInput
          isReadOnly={isReadOnly}
          _readOnly={styles.readOnly}
          {...methods.register('construction')}
        />
      </FormHelper>
      <FormHelper label="중장비 종류">
        <CustomSelector
          options={
            heavyEquipmentSelectList?.map((item) => item.koreaName) || []
          }
          list={heavyEquipmentSelectList}
          onChange={handleSelectOption}
          keyName="heavyEquipmentType"
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
          options={businesSelectList?.map((item) => item.koreaName) || []}
          list={businesSelectList}
          keyName="business"
          onChange={handleSelectOption}
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
          options={facilitySelectList?.map((item) => item.koreaName) || []}
          list={facilitySelectList}
          keyName="facility"
          onChange={handleSelectOption}
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
          options={
            operationDepartmentSelectList?.map((item) => item.koreaName) || []
          }
          list={operationDepartmentSelectList}
          keyName="operationDepartment"
          onChange={handleSelectOption}
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
    bg: 'gray.300',
    textStyle: 'Text',
    color: 'gray.500',
  },
};
