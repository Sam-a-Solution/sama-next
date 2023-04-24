import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type loginSchemaType = {
  nickname: string;
  password: string;
};
export const loginSchema = yup.object().shape({
  nickname: yup.string().required('아이디를 입력해주세요.'),
  password: yup.string().required('비밀번호를 입력해주세요.'),
});

const useLoginForm = (options?: UseFormProps<loginSchemaType>) => {
  return useForm<loginSchemaType>({
    resolver: yupResolver(loginSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useLoginForm;
