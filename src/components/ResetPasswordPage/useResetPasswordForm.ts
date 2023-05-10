import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import regex from '@utils/regex';

export interface ResetPasswordFormType {
  password: string;
  passwordConfirm: string;
}

export const resetPasswordSchema = yup.object({
  password: yup
    .string()
    .required('새 비밀번호를 입력해주세요')
    .min(8, '최소 길이는 8자 입니다.')
    .max(16, '최대 길이는 20자 입니다.')
    .matches(regex.password, '숫자, 문자, 특수문자를 포함해야 합니다.'),
  passwordConfirm: yup
    .string()
    .required('비밀번호가 다릅니다.')
    .oneOf([yup.ref('password')], '비밀번호가 다릅니다.'),
});

const useResetPasswordForm = (
  options?: UseFormProps<ResetPasswordFormType>,
) => {
  return useForm<ResetPasswordFormType>({
    resolver: yupResolver(resetPasswordSchema),
    mode: 'onChange',
    ...options,
  });
};
export default useResetPasswordForm;
