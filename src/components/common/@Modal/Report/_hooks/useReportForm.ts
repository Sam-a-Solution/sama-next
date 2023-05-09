import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type reportFormType = {
  nickname: string;
  username: string;
  affiliation: string;
  phone: string;
  password: string;
  passwordConfirm: string;
};

export const reportForm = yup.object().shape({
  user: yup.string(),
  name: yup.string().required('작업명을 입력해 주세요.'),
  startTime: yup.string().required('시작시간을 입력해 주세요.'),
  endTime: yup.string().required('종료시간을 입력해 주세요.'),
  locationName: yup.string().required('장소명을 입력해 주세요.'),
  construction: yup.string().required('공사명을 입력해 주세요.'),
  heavyEquipmentType: yup.object().shape({
    id: yup.number().required('중장비 종류를 선택해 주세요.'),
  }),
  facility: yup.object().shape({
    id: yup.number().required('시설물을 선택해 주세요.'),
  }),
  business: yup.object().shape({
    id: yup.number().required('업무를 선택해 주세요.'),
  }),
  operationDepartment: yup.object().shape({
    id: yup.number().required('운영부서를 선택해 주세요.'),
  }),
  roadControl: yup.string().required('도로통제를 입력해 주세요.'),
});

const useReportForm = (options?: UseFormProps<reportFormType>) => {
  return useForm<reportFormType>({
    resolver: yupResolver(reportForm),
    mode: 'onChange',
    ...options,
  });
};

export default useReportForm;
