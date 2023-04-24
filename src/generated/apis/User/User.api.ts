import instance from '@apis/_axios/instance';

import { ContentType, HttpClient, RequestParams } from '../@http-client';
import {
  NicknameValidationType,
  NicknameValidationValidationErrorType,
  TokenRefreshType,
  TokenRefreshValidationErrorType,
  UserLoginType,
  UserLoginValidationErrorType,
  UserLogoutType,
  UserLogoutValidationErrorType,
  UserPasswordResetType,
  UserPasswordResetValidationErrorType,
  UserRegisterType,
  UserRegisterValidationErrorType,
  UserType,
  UserValidationErrorType,
} from '../@types/data-contracts';
import { DeepOmitReadOnly } from '../@types/util-types';

export class UserApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags user
   * @name UserLoginCreate
   * @summary 유저 로그인
   * @request POST:/v1/user/login/
   * @secure
   */
  userLoginCreate = (variables: {
    data: DeepOmitReadOnly<UserLoginType>;
    params?: RequestParams;
  }) =>
    this.request<UserLoginType, UserLoginValidationErrorType>({
      path: `/v1/user/login/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * @description 모바일앱에서만 사용하며, 유저와 디바이스 토큰의 연결을 끊어주기위해 사용합니다.
   *
   * @tags user
   * @name UserLogoutCreate
   * @summary 유저 로그아웃
   * @request POST:/v1/user/logout/
   * @secure
   */
  userLogoutCreate = (variables: {
    data: DeepOmitReadOnly<UserLogoutType>;
    params?: RequestParams;
  }) =>
    this.request<UserLogoutType, UserLogoutValidationErrorType>({
      path: `/v1/user/logout/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags user
   * @name UserMeRetrieve
   * @summary 유저 조회
   * @request GET:/v1/user/me/
   * @secure
   */
  userMeRetrieve = (variables?: { params?: RequestParams }) =>
    this.request<UserType, any>({
      path: `/v1/user/me/`,
      method: 'GET',
      secure: true,
      format: 'json',
      ...variables?.params,
    });

  /**
   * No description
   *
   * @tags user
   * @name UserMeUpdate
   * @summary 유저 조회
   * @request PUT:/v1/user/me/
   * @secure
   */
  userMeUpdate = (variables: {
    data: DeepOmitReadOnly<UserType>;
    params?: RequestParams;
  }) =>
    this.request<UserType, UserValidationErrorType>({
      path: `/v1/user/me/`,
      method: 'PUT',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags user
   * @name UserNicknameValidationCreate
   * @summary 아이디 중복 검사
   * @request POST:/v1/user/nickname_validation/
   * @secure
   */
  userNicknameValidationCreate = (variables: {
    data: DeepOmitReadOnly<NicknameValidationType>;
    params?: RequestParams;
  }) =>
    this.request<NicknameValidationType, NicknameValidationValidationErrorType>(
      {
        path: `/v1/user/nickname_validation/`,
        method: 'POST',
        body: variables.data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...variables.params,
      },
    );

  /**
   * No description
   *
   * @tags user
   * @name UserPasswordResetCreate
   * @summary 유저 비밀번호 재설정
   * @request POST:/v1/user/password_reset/
   * @secure
   */
  userPasswordResetCreate = (variables: {
    data: DeepOmitReadOnly<UserPasswordResetType>;
    params?: RequestParams;
  }) =>
    this.request<UserPasswordResetType, UserPasswordResetValidationErrorType>({
      path: `/v1/user/password_reset/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags user
   * @name UserRefreshCreate
   * @summary 유저 리프레시
   * @request POST:/v1/user/refresh/
   * @secure
   */
  userRefreshCreate = (variables: {
    data: DeepOmitReadOnly<TokenRefreshType>;
    params?: RequestParams;
  }) =>
    this.request<TokenRefreshType, TokenRefreshValidationErrorType>({
      path: `/v1/user/refresh/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * No description
   *
   * @tags user
   * @name UserRegisterCreate
   * @summary 유저 회원가입
   * @request POST:/v1/user/register/
   * @secure
   */
  userRegisterCreate = (variables: {
    data: DeepOmitReadOnly<UserRegisterType>;
    params?: RequestParams;
  }) =>
    this.request<UserRegisterType, UserRegisterValidationErrorType>({
      path: `/v1/user/register/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
}

export const userApi = new UserApi({ instance });

//
