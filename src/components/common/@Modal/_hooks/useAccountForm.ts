import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import regex from '@utils/regex';

export type accountSchemaType = {
  nickname: string;
  username: string;
  affiliation: string;
  phone: string;
  password: string;
  passwordConfirm: string;
};

export const accountSchema = yup.object().shape({
  nickname: yup
    .string()
    .required('아이디를 입력해주세요.')
    .matches(
      /^[a-zA-Z0-9]{6,12}$/,
      '아이디는 6~12자의 영문, 숫자만 사용 가능합니다.',
    ),
  username: yup.string().required('이름을 입력해주세요.'),
  affiliation: yup.string().required('소속을 입력해주세요.'),
  phone: yup
    .string()
    .required('휴대폰 번호를 입력해주세요.')
    .matches(regex.phone, '잘못된 휴대폰 번호입니다.'),
  password: yup
    .string()
    .required('비밀번호를 입력해주세요.')
    .matches(
      regex.password,
      '8~16자 / 영문, 숫자, 특수문자 중 2가지 이상 조합',
    ),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], '동일한 비밀번호를 입력해주세요.'),
});

const useAccountForm = (options?: UseFormProps<accountSchemaType>) => {
  return useForm<accountSchemaType>({
    resolver: yupResolver(accountSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useAccountForm;
