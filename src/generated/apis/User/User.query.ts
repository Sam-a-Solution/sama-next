import { AxiosError } from 'axios';

import { useMutation, useQuery } from '@tanstack/react-query';

import {
  NicknameValidationValidationErrorType,
  TokenRefreshValidationErrorType,
  UserLoginValidationErrorType,
  UserLogoutValidationErrorType,
  UserPasswordResetValidationErrorType,
  UserRegisterValidationErrorType,
  UserValidationErrorType,
} from '../@types/data-contracts';
import {
  MutationHookParams,
  Parameter,
  QueryHookParams,
} from '../@types/react-query-type';
import { userApi } from './User.api';

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_USER_API = {
  LOGIN_CREATE: () =>
    ['USER_LOGIN_CREATE'].filter((key) => typeof key !== 'undefined'),
  LOGOUT_CREATE: () =>
    ['USER_LOGOUT_CREATE'].filter((key) => typeof key !== 'undefined'),
  ME_RETRIEVE: (variables?: Parameter<typeof userApi.userMeRetrieve>) =>
    ['USER_ME_RETRIEVE', variables].filter((key) => typeof key !== 'undefined'),
  ME_UPDATE: () =>
    ['USER_ME_UPDATE'].filter((key) => typeof key !== 'undefined'),
  NICKNAME_VALIDATION_CREATE: () =>
    ['USER_NICKNAME_VALIDATION_CREATE'].filter(
      (key) => typeof key !== 'undefined',
    ),
  PASSWORD_RESET_CREATE: () =>
    ['USER_PASSWORD_RESET_CREATE'].filter((key) => typeof key !== 'undefined'),
  REFRESH_CREATE: () =>
    ['USER_REFRESH_CREATE'].filter((key) => typeof key !== 'undefined'),
  REGISTER_CREATE: () =>
    ['USER_REGISTER_CREATE'].filter((key) => typeof key !== 'undefined'),
};

/**
 * No description
 *
 * @tags user
 * @name UserLoginCreate
 * @summary 유저 로그인
 * @request POST:/v1/user/login/
 * @secure
 */
export const useUserLoginCreateMutation = (
  params: MutationHookParams<
    typeof userApi.userLoginCreate,
    AxiosError<UserLoginValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_USER_API.LOGIN_CREATE();
  const result = useMutation(
    mutationKey,
    userApi.userLoginCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * @description 모바일앱에서만 사용하며, 유저와 디바이스 토큰의 연결을 끊어주기위해 사용합니다.
 *
 * @tags user
 * @name UserLogoutCreate
 * @summary 유저 로그아웃
 * @request POST:/v1/user/logout/
 * @secure
 */
export const useUserLogoutCreateMutation = (
  params: MutationHookParams<
    typeof userApi.userLogoutCreate,
    AxiosError<UserLogoutValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_USER_API.LOGOUT_CREATE();
  const result = useMutation(
    mutationKey,
    userApi.userLogoutCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags user
 * @name UserMeRetrieve
 * @summary 유저 조회
 * @request GET:/v1/user/me/
 * @secure
 */
export const useUserMeRetrieveQuery = (
  params?: QueryHookParams<typeof userApi.userMeRetrieve, AxiosError<any>>,
) => {
  const queryKey = QUERY_KEY_USER_API.ME_RETRIEVE(params?.variables);
  const result = useQuery(
    queryKey,
    () => userApi.userMeRetrieve(params?.variables),
    params?.options,
  );

  return { ...result, queryKey };
};

/**
 * No description
 *
 * @tags user
 * @name UserMeUpdate
 * @summary 유저 조회
 * @request PUT:/v1/user/me/
 * @secure
 */
export const useUserMeUpdateMutation = (
  params: MutationHookParams<
    typeof userApi.userMeUpdate,
    AxiosError<UserValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_USER_API.ME_UPDATE();
  const result = useMutation(
    mutationKey,
    userApi.userMeUpdate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags user
 * @name UserNicknameValidationCreate
 * @summary 아이디 중복 검사
 * @request POST:/v1/user/nickname_validation/
 * @secure
 */
export const useUserNicknameValidationCreateMutation = (
  params: MutationHookParams<
    typeof userApi.userNicknameValidationCreate,
    AxiosError<NicknameValidationValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_USER_API.NICKNAME_VALIDATION_CREATE();
  const result = useMutation(
    mutationKey,
    userApi.userNicknameValidationCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags user
 * @name UserPasswordResetCreate
 * @summary 유저 비밀번호 재설정
 * @request POST:/v1/user/password_reset/
 * @secure
 */
export const useUserPasswordResetCreateMutation = (
  params: MutationHookParams<
    typeof userApi.userPasswordResetCreate,
    AxiosError<UserPasswordResetValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_USER_API.PASSWORD_RESET_CREATE();
  const result = useMutation(
    mutationKey,
    userApi.userPasswordResetCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags user
 * @name UserRefreshCreate
 * @summary 유저 리프레시
 * @request POST:/v1/user/refresh/
 * @secure
 */
export const useUserRefreshCreateMutation = (
  params: MutationHookParams<
    typeof userApi.userRefreshCreate,
    AxiosError<TokenRefreshValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_USER_API.REFRESH_CREATE();
  const result = useMutation(
    mutationKey,
    userApi.userRefreshCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * No description
 *
 * @tags user
 * @name UserRegisterCreate
 * @summary 유저 회원가입
 * @request POST:/v1/user/register/
 * @secure
 */
export const useUserRegisterCreateMutation = (
  params: MutationHookParams<
    typeof userApi.userRegisterCreate,
    AxiosError<UserRegisterValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_USER_API.REGISTER_CREATE();
  const result = useMutation(
    mutationKey,
    userApi.userRegisterCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};
