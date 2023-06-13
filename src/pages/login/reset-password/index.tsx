import Head from 'next/head';

import ResetPasswordPage from '@components/ResetPasswordPage';
import LoginLayout from '@components/common/@Layout/LoginLayout';

import withUnAuthGuard from '@hocs/withUnAuthGuard';

import { SITE_NAME } from 'pages/_document';

function ResetPassword() {
  return (
    <>
      <Head>
        <title>{SITE_NAME} | 아이디/비밀번호 찾기</title>
      </Head>
      <LoginLayout content={<ResetPasswordPage />} />
    </>
  );
}

export default withUnAuthGuard(ResetPassword);
