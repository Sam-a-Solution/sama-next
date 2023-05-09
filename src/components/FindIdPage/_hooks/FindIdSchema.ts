import { UseFormProps, useForm } from 'react-hook-form';
import regex from 'react-syntax-highlighter/dist/esm/languages/prism/regex';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type findIdSchemaType = {
  phone: string;
  code: string;
};
export const findIdSchema = yup.object().shape({
  phone: yup
    .string()
    .required('아이디를 입력해주세요.')
    .matches(regex.phone, '잘못된 휴대폰 번호입니다.'),
  code: yup.string().required('비밀번호를 입력해주세요.'),
});

const useFindIdForm = (options?: UseFormProps<findIdSchemaType>) => {
  return useForm<findIdSchemaType>({
    resolver: yupResolver(findIdSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useFindIdForm;
