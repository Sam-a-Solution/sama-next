import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import regex from '@utils/regex';

export type findIdSchemaType = {
  phone: string;
  code: string;
};
export const findIdSchema = yup.object().shape({
  phone: yup
    .string()
    .required('휴대폰 번호를 입력해주세요.')
    .matches(regex.phone, '잘못된 휴대폰 번호입니다.'),
  code: yup.string().matches(/^(\d{6})$/, '6자리의 인증번호를 입력해주세요.'),
});

const useFindIdForm = (options?: UseFormProps<findIdSchemaType>) => {
  return useForm<findIdSchemaType>({
    resolver: yupResolver(findIdSchema),
    mode: 'onSubmit',
    ...options,
  });
};

export default useFindIdForm;
