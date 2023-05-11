import { UseFormProps, useForm } from 'react-hook-form';

import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

export interface WorkInfoFormType {
  worklogSet: string; // 가장 최근 진행중인 work_log_id
  name: string; // 작업 이름
  locationName: string; // 위치이름
  construction: string; // 공사구분;
  startTime: string | Date; // 공사 시작일
  endTime: string | Date; // 공사 종료일
  heavyEquipmentType: string; // 중장비 종류
  business: string; // 사업장
  facility: string; // 시설부서
  operationDepartment: string; // 작업 수행 부서
  roadControl: string; // 도로 통제항목
  latitude: number;
  longitude: number;
}

export const reportSchema = yup.object({
  // workId: yup.number(),
  // user: yup.string(),
  // longitude: yup.number(),
  // latitude: yup.number(),
  name: yup.string().required('작업명을 입력해주세요.'), // 작업 이름
  startTime: yup.string().required('작업기간을 선택해주세요.'),
  endTime: yup.string().required('작업기간을 선택해주세요.'),
  construction: yup.string().required('공사 구분을 입력해주세요.'),
  locationName: yup.string().required('작업 위치를 입력해주세요.'),
  heavyEquipmentType: yup.number().required('중장비를 선택해주세요.'),
  business: yup.number().required('사업장을 선택해주세요.'),
  facility: yup.number().required('시설부서를 선택해주세요.'),
  operationDepartment: yup.number().required('작업수행부서를 선택해주세요.'),
  roadControl: yup.string().required('도로통제를 입력해 주세요.'),
});

const useReportForm = (options?: UseFormProps<WorkInfoFormType>) => {
  return useForm<WorkInfoFormType>({
    resolver: yupResolver(reportSchema),
    mode: 'onChange',
    ...options,
  });
};

export default useReportForm;
