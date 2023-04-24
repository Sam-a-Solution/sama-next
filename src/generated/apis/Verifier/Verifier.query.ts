import { AxiosError } from 'axios';

import { useMutation } from '@tanstack/react-query';

import {
  PhoneVerifierConfirmValidationErrorType,
  PhoneVerifierCreateValidationErrorType,
} from '../@types/data-contracts';
import { MutationHookParams } from '../@types/react-query-type';
import { verifierApi } from './Verifier.api';

/**
 * QUERY_KEYS
 */
export const QUERY_KEY_VERIFIER_API = {
  PHONE_VERIFIER_CREATE: () =>
    ['VERIFIER_PHONE_VERIFIER_CREATE'].filter(
      (key) => typeof key !== 'undefined',
    ),
  PHONE_VERIFIER_CONFIRM_CREATE: () =>
    ['VERIFIER_PHONE_VERIFIER_CONFIRM_CREATE'].filter(
      (key) => typeof key !== 'undefined',
    ),
};

/**
 * @description 휴대폰 인증 ---
 *
 * @tags verifier
 * @name VerifierPhoneVerifierCreate
 * @request POST:/v1/verifier/phone_verifier/
 * @secure
 */
export const useVerifierPhoneVerifierCreateMutation = (
  params: MutationHookParams<
    typeof verifierApi.verifierPhoneVerifierCreate,
    AxiosError<PhoneVerifierCreateValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_VERIFIER_API.PHONE_VERIFIER_CREATE();
  const result = useMutation(
    mutationKey,
    verifierApi.verifierPhoneVerifierCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};

/**
 * @description 휴대폰 인증 확인 --- 응답값의 token값으로 회원가입의 phoneToken으로 사용
 *
 * @tags verifier
 * @name VerifierPhoneVerifierConfirmCreate
 * @request POST:/v1/verifier/phone_verifier/confirm/
 * @secure
 */
export const useVerifierPhoneVerifierConfirmCreateMutation = (
  params: MutationHookParams<
    typeof verifierApi.verifierPhoneVerifierConfirmCreate,
    AxiosError<PhoneVerifierConfirmValidationErrorType>
  >,
) => {
  const mutationKey = QUERY_KEY_VERIFIER_API.PHONE_VERIFIER_CONFIRM_CREATE();
  const result = useMutation(
    mutationKey,
    verifierApi.verifierPhoneVerifierConfirmCreate,
    params?.options,
  );

  return { ...result, mutationKey };
};
