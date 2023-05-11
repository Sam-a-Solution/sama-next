import React, { ReactNode, memo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { Flex, Select, SelectProps, Text } from '@chakra-ui/react';

import { SelectType } from '@apis/type';

interface CustomSelectProps extends SelectProps {
  selectList?: (SelectType<string> | string)[];
  placeholder?: string;
  label?: string;
  keyName: string;
}

const CustomSelect = ({
  selectList,
  placeholder,
  label,
  keyName,
  ...props
}: CustomSelectProps) => {
  const { formState, register } = useFormContext();

  return (
    <Flex gap="12px" justifyContent="space-between" w="100%">
      {!!label && (
        <Text size="sm" fontWeight="700" color="primary.500" w="100px">
          {label}
        </Text>
      )}
      <Flex flexDir="column" w="100%" maxW="402px">
        <Select
          {...register(keyName)}
          disabled={props.isDisabled}
          w="100%"
          flexGrow="1"
          bgColor="background.secondary"
          borderWidth="1px"
          borderColor={formState.errors[keyName] ? 'warning.500' : 'gray.200'} // P_TODO: 에러 상태를 받아서 처리해줘야 할듯. 에러일 때 width나 저거 설정
          h="50px"
          color="black"
          _active={{
            bgColor: 'secondary.50',
          }}
          _hover={{
            bgColor: 'secondary.50',
          }}
          _disabled={{
            bgColor: 'gray.200',
          }}
        >
          {selectList?.map((v) => (
            <option
              key={typeof v === 'string' ? v : v?.value}
              value={typeof v === 'string' ? v : v?.value}
              // onClick={() => setValue(keyName, v.value)}
              // _pressed={{
              //   backgroundColor: 'primary.50',
              // }}
              // py="6px"
              // px="10px"
              // bgColor="red.100"
              // w="100%"
            >
              {typeof v === 'string' ? v : v?.label}
            </option>
          ))}
        </Select>

        {!!formState.errors[keyName] && (
          <Text size="sm" color="warning.500">
            {formState.errors[keyName]?.message as string}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default memo(CustomSelect);
