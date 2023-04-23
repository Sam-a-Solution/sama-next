import { ReactNode } from 'react';

import {
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
  Text,
  TextProps,
} from '@chakra-ui/react';

interface FormHelperProps extends FormControlProps {
  helperText?: ReactNode;
  errorText?: ReactNode;
  successText?: ReactNode;
  label?: string;
  children: ReactNode | ReactNode[];

  labelProps?: FormLabelProps;
  successTextProps?: TextProps;
  helperTextProps?: TextProps;
  errorTextProps?: FormErrorMessageProps;
}

/**
 * Chakra 의 FormControl 을 Wrapping 하여 Label, Error Text, Success Text 등을 추가로 넘겨 줄수 있는 컴포넌트입니다.
 *
 * Chakra FormControl 은
 * Chakra 의 Form Element 를 children 으로 받아, isInvalid, isDisabled, isRequired 와 같은 상태를
 * 자식 Chakra Form Component 에게 Context 로 전달해줍니다.
 *
 * @see https://chakra-ui.com/docs/components/form/form-control
 * */
const FormHelper = ({
  //
  helperText,
  errorText,
  successText,
  children,
  label,

  labelProps,
  successTextProps,
  helperTextProps,
  errorTextProps,

  ...basisProps
}: FormHelperProps) => {
  const isShowErrorText = !!errorText;
  const isShowSuccessText = !!successText && !isShowErrorText;
  const isShowHelper = !!helperText && !isShowErrorText && !isShowErrorText;

  return (
    <FormControl isInvalid={!!errorText} {...basisProps}>
      <Flex h="50px" alignItems="center" gap="12px">
        {!!label && (
          <FormLabel
            margin="0 !important"
            // w="100px !important"
            // color="primary.500"
            // fontWeight="700"
            {...labelProps}
          >
            {/* <Text >{label}</Text> */}
            <Text w="100px" textStyle="Title" color="primary.500">
              {label}
            </Text>
          </FormLabel>
        )}
        {children}
        {isShowErrorText && (
          <FormErrorMessage {...errorTextProps}>{errorText}</FormErrorMessage>
        )}
        {isShowSuccessText && (
          <FormHelperText color="custom.primary" {...successTextProps}>
            {successText}
          </FormHelperText>
        )}
        {isShowHelper && (
          <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>
        )}
      </Flex>
    </FormControl>
  );
};

export default FormHelper;
