export interface CursorPaginatedWorkLogListType {
  cursor?: string;
  results?: WorkLogType[];
}

export interface DeviceType {
  /** @maxLength 64 */
  uid: string;
  /**
   * 값
   * @maxLength 256
   */
  token: string;
}

export interface DeviceValidationErrorType {
  uid?: string[];
  token?: string[];
}

export interface NicknameValidationType {
  readonly id: number;
  /** 아이디 */
  nickname: string;
}

export interface NicknameValidationValidationErrorType {
  nonField?: string[];
  nickname?: string[];
}

export interface PaginateWorkEmergencyListType {
  count?: number;
  isNext?: boolean;
  results?: WorkEmergencyType[];
}

export interface PaginatedWorkListType {
  count?: number;
  isNext?: boolean;
  results?: WorkType[];
}

export interface PaginatedWorkLogListType {
  count?: number;
  isNext?: boolean;
  results?: WorkLogType[];
}

export interface PhoneVerifierConfirmType {
  phone: string;
  code: string;
  readonly token: string;
  readonly username: string;
}

export interface PhoneVerifierConfirmValidationErrorType {
  nonField?: string[];
  phone?: string[];
  code?: string[];
}

export interface PhoneVerifierCreateType {
  /**
   * 휴대폰번호
   * @minLength 10
   * @maxLength 11
   */
  phone: string;
}

export interface PhoneVerifierCreateValidationErrorType {
  nonField?: string[];
  phone?: string[];
}

export interface TokenRefreshType {
  readonly access: string;
  refresh: string;
}

export interface TokenRefreshValidationErrorType {
  nonField?: string[];
  refresh?: string[];
}

export interface UserType {
  readonly id: number;
  /**
   * 유저 이름
   * @maxLength 12
   */
  username: string;
  /**
   * 휴대폰
   * @maxLength 11
   */
  phone: string;
  /**
   * 유저 아이디
   * @maxLength 12
   */
  nickname: string;
  /**
   * 소속
   * @maxLength 32
   */
  affiliation?: string;
}

export interface UserLoginType {
  nickname: string;
  password: string;
  /** 모바일앱에서만 사용합니다. */
  device?: DeviceType | null;
  readonly access: string;
  readonly refresh: string;
}

export interface UserLoginValidationErrorType {
  nonField?: string[];
  nickname?: string[];
  password?: string[];
  device?: DeviceValidationErrorType;
}

export interface UserLogoutType {
  /** 기기의 고유id */
  uid?: string;
}

export interface UserLogoutValidationErrorType {
  nonField?: string[];
  uid?: string[];
}

export interface UserPasswordResetType {
  /** 핸드폰 번호 */
  phone: string;
  /** 비밀번호 */
  password: string;
  /** 비밀번호 확인 */
  passwordConfirm: string;
}

export interface UserPasswordResetValidationErrorType {
  nonField?: string[];
  phone?: string[];
  password?: string[];
  passwordConfirm?: string[];
}

export interface UserRegisterType {
  /** 아이디 */
  nickname: string;
  /** 이름 */
  username: string;
  /** 소속 */
  affiliation: string;
  /** 핸드폰 */
  phone: string;
  password: string;
  passwordConfirm: string;
  readonly access: string;
  readonly refresh: string;
}

export interface UserRegisterValidationErrorType {
  nonField?: string[];
  nickname?: string[];
  username?: string[];
  affiliation?: string[];
  phone?: string[];
  password?: string[];
  passwordConfirm?: string[];
}

export interface UserValidationErrorType {
  nonField?: string[];
  username?: string[];
  phone?: string[];
  nickname?: string[];
  affiliation?: string[];
}

export interface WorkType {
  readonly id: number;
  readonly user: string;
  readonly worklogSet: number;
  /**
   * 작업명
   * @maxLength 64
   */
  name: string;
  /**
   * 시작 날짜
   * @format date
   */
  startTime?: string | null;
  /**
   * 종료 날짜
   * @format date
   */
  endTime?: string | null;
  /**
   * 위치 이름
   * @maxLength 32
   */
  locationName: string;
  /**
   * 공사 구분
   * @maxLength 32
   */
  construction: string;
  /**
   * 위도
   * @format double
   */
  latitude: number;
  /**
   * 경도
   * @format double
   */
  longitude: number;
  heavyEquipmentType: WorkHeavyEquipmentType;
  business: WorkBusinessType;
  facility: WorkFacilityType;
  operationDepartment: WorkOperationDepartmentType;
  /**
   * 도로통제항목
   * @maxLength 32
   */
  roadControl: string;
  /** 상태 */
  readonly status: WorkStatusType;
}

export interface WorkBusinessType {
  id: number;
  /** 한국 이름 */
  readonly koreaName: string;
}

export interface WorkBusinessValidationErrorType {
  id?: string[];
}

export interface WorkCheckType {
  readonly id: number;
}

export interface WorkCheckValidationErrorType {
  nonField?: string[];
}

export interface WorkChoiceType {
  heavyEquipmentType: WorkHeavyEquipmentType[];
  business: WorkBusinessType[];
  facility: WorkFacilityType[];
  operationDepartment: WorkOperationDepartmentType[];
}

export interface WorkEmergencyType {
  readonly id: number;
  /**
   * 종료 시간
   * @format date-time
   */
  readonly endTime: string | null;
  readonly user: string;
  /** 중장비 종류 표시 */
  readonly heavyEquipmentType: string;
  /** 상태 표시 */
  readonly statusDisplay: string;
  /**
   * 생성일시
   * @format date-time
   */
  readonly createdAt: string;
  /**
   * 비상 해제 시간
   * @format date-time
   */
  readonly emergencyReleaseTime: string | null;
  /** 관리자 확인 여부 */
  readonly isChecked: boolean;
  /** 비상 해재 여부 */
  readonly isEmergencyReleased: boolean;
}

export interface WorkEmergencyReleaseType {
  readonly id: number;
}

export interface WorkEmergencyReleaseValidationErrorType {
  nonField?: string[];
}

export interface WorkEmergencyValidationErrorType {
  nonField?: string[];
}

export interface WorkEndType {
  readonly id: number;
}

export interface WorkEndValidationErrorType {
  nonField?: string[];
}

export interface WorkFacilityType {
  id: number;
  /** 한국 이름 */
  readonly koreaName: string;
}

export interface WorkFacilityValidationErrorType {
  id?: string[];
}

export interface WorkHeavyEquipmentType {
  id: number;
  /** 한국 이름 */
  readonly koreaName: string;
}

export interface WorkHeavyEquipmentValidationErrorType {
  id?: string[];
}

export interface WorkLogType {
  readonly id: number;
  readonly user: string;
  workId?: number;
  /**
   * 작업명
   * @maxLength 64
   */
  name: string;
  /**
   * 시작 시간
   * @format date-time
   */
  startTime?: string | Date | null;
  /**
   * 종료 시간
   * @format date-time
   */
  endTime?: string | Date | null;
  /**
   * 위치 이름
   * @maxLength 32
   */
  locationName: string;
  /**
   * 공사 구분
   * @maxLength 32
   */
  construction: string;
  heavyEquipmentType: WorkHeavyEquipmentType;
  business: WorkBusinessType;
  facility: WorkFacilityType;
  operationDepartment: WorkOperationDepartmentType;
  /** 상태 표시 */
  readonly statusDisplay: string;
  /** 확인한 관리자 아이디 */
  readonly checkManager: string;
  /**
   * 관리자 확인 시간
   * @format date-time
   */
  readonly checkManagerTime: string | null;
  /** 관리자 확인 여부 */
  readonly isChecked: boolean;
  /**
   * 위도
   * @format double
   */
  latitude?: number | null;
  /**
   * 경도
   * @format double
   */
  longitude?: number | null;
  /**
   * 도로통제항목
   * @maxLength 32
   */
  roadControl: string;
  /** 관리자가 수정 여부 */
  byManager?: boolean | null;
}

export interface WorkLogValidationErrorType {
  nonField?: string[];
  workId?: string[];
  name?: string[];
  startTime?: string[];
  endTime?: string[];
  locationName?: string[];
  construction?: string[];
  heavyEquipmentType?: WorkHeavyEquipmentValidationErrorType;
  business?: WorkBusinessValidationErrorType;
  facility?: WorkFacilityValidationErrorType;
  operationDepartment?: WorkOperationDepartmentValidationErrorType;
  latitude?: string[];
  longitude?: string[];
  roadControl?: string[];
  byManager?: string[];
}

export interface WorkOperationDepartmentType {
  id: number;
  /** 한국 이름 */
  readonly koreaName: string;
}

export interface WorkOperationDepartmentValidationErrorType {
  id?: string[];
}

export interface WorkStatusCountType {
  progressCount?: number;
  endCount?: number;
  emergencyCount?: number;
}

export interface WorkValidationErrorType {
  nonField?: string[];
  name?: string[];
  startTime?: string[];
  endTime?: string[];
  locationName?: string[];
  construction?: string[];
  latitude?: string[];
  longitude?: string[];
  heavyEquipmentType?: WorkHeavyEquipmentValidationErrorType;
  business?: WorkBusinessValidationErrorType;
  facility?: WorkFacilityValidationErrorType;
  operationDepartment?: WorkOperationDepartmentValidationErrorType;
  roadControl?: string[];
}

export type WorkStatusType = keyof typeof WorkStatusTypeMap;
export const WorkStatusTypeMap = {
  READY: '비상',
  PROGRESS: '종료',
  END: '진행 중',
  EMERGENCY: '대기',
} as const;
