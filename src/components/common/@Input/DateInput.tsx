import React from 'react';
import { useFormContext } from 'react-hook-form';

import {
  InputGroup,
  InputGroupProps,
  InputProps,
  InputRightElement,
  InputRightElementProps,
} from '@chakra-ui/react';

import CustomInput from './CustomInput';

import { CalendarIcon } from 'generated/icons/MyIcons';

interface DateInputProps extends InputProps {
  inputGroupProps?: InputGroupProps;
  inputRightElementProps?: InputRightElementProps;
  registerName: string;
}

function DateInput({
  inputGroupProps,
  inputRightElementProps,
  registerName,
  ...props
}: DateInputProps) {
  const methods = useFormContext();
  return (
    <InputGroup {...inputGroupProps}>
      <CustomInput {...props} {...methods.register(registerName)} />
      <InputRightElement ml="8px" {...inputRightElementProps}>
        <CalendarIcon />
      </InputRightElement>
    </InputGroup>
  );
}

export default DateInput;
