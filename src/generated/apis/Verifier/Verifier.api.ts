import instance from '@apis/_axios/instance';

import { ContentType, HttpClient, RequestParams } from '../@http-client';
import {
  PhoneVerifierConfirmType,
  PhoneVerifierConfirmValidationErrorType,
  PhoneVerifierCreateType,
  PhoneVerifierCreateValidationErrorType,
} from '../@types/data-contracts';
import { DeepOmitReadOnly } from '../@types/util-types';

export class VerifierApi<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * @description 휴대폰 인증 ---
   *
   * @tags verifier
   * @name VerifierPhoneVerifierCreate
   * @request POST:/v1/verifier/phone_verifier/
   * @secure
   */
  verifierPhoneVerifierCreate = (variables: {
    data: DeepOmitReadOnly<PhoneVerifierCreateType>;
    params?: RequestParams;
  }) =>
    this.request<
      PhoneVerifierCreateType,
      PhoneVerifierCreateValidationErrorType
    >({
      path: `/v1/verifier/phone_verifier/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });

  /**
   * @description 휴대폰 인증 확인 --- 응답값의 token값으로 회원가입의 phoneToken으로 사용
   *
   * @tags verifier
   * @name VerifierPhoneVerifierConfirmCreate
   * @request POST:/v1/verifier/phone_verifier/confirm/
   * @secure
   */
  verifierPhoneVerifierConfirmCreate = (variables: {
    data: DeepOmitReadOnly<PhoneVerifierConfirmType>;
    params?: RequestParams;
  }) =>
    this.request<
      PhoneVerifierConfirmType,
      PhoneVerifierConfirmValidationErrorType
    >({
      path: `/v1/verifier/phone_verifier/confirm/`,
      method: 'POST',
      body: variables.data,
      secure: true,
      type: ContentType.Json,
      format: 'json',
      ...variables.params,
    });
}

export const verifierApi = new VerifierApi({ instance });

//
