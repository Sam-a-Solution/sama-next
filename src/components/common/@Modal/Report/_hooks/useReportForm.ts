import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export type reportFormType = {
  workId: number | undefined;
  name: string;
  user: string;
  startTime: string;
  endTime: string;
  locationName: string;
  construction: string;
  heavyEquipmentType: {
    id: number;
    koreaName: string;
  };
  facility: {
    id: number;
    koreaName: string;
  };
  business: {
    id: number;
    koreaName: string;
  };
  operationDepartment: {
    id: number;
    koreaName: string;
  };
  roadControl: string;
  koreaName: string;
  latitude: number;
  logitude: number;
};

export const reportForm = yup.object().shape({
  workId: yup.number(),
  user: yup.string(),
  name: yup.string().required('작업명을 입력해 주세요.'),
  startTime: yup.string().required('시작시간을 입력해 주세요.'),
  endTime: yup.string().required('종료시간을 입력해 주세요.'),
  locationName: yup.string().required('작업 위치를 입력해 주세요.'),
  construction: yup.string().required('공사 구분을 입력해 주세요.'),
  heavyEquipmentType: yup.object().shape({
    id: yup.number(),
    koreaName: yup.string(),
  }),
  facility: yup.object().shape({
    id: yup.number(),
    koreaName: yup.string(),
  }),
  business: yup.object().shape({
    id: yup.number(),
    koreaName: yup.string(),
  }),
  operationDepartment: yup.object().shape({
    id: yup.number(),
    koreaName: yup.string(),
  }),
  roadControl: yup.string().required('도로통제를 입력해 주세요.'),
  longitutde: yup.number(),
  latitude: yup.number(),
});

const useReportForm = (options?: UseFormProps<reportFormType>) => {
  return useForm<reportFormType>({
    resolver: yupResolver(reportForm),
    mode: 'onChange',
    ...options,
  });
};

export default useReportForm;
