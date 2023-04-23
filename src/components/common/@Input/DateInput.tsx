import React from 'react';

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
}

function DateInput({
  inputGroupProps,
  inputRightElementProps,
  ...props
}: DateInputProps) {
  return (
    <InputGroup {...inputGroupProps}>
      <CustomInput {...props} />
      <InputRightElement ml="8px" {...inputRightElementProps}>
        <CalendarIcon />
      </InputRightElement>
    </InputGroup>
  );
}

export default DateInput;
