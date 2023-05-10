import Head from 'next/head';

import FindIdPage from '@components/FindIdPage/FindIdPage';
import ResetPasswordPage from '@components/ResetPasswordPage';
import LoginHeader from '@components/common/@Layout/Header/LoginHeader';
import HomeLayout from '@components/common/@Layout/HomeLayout';
import LoginLayout from '@components/common/@Layout/LoginLayout';

import withUnAuthGuard from '@hocs/withUnAuthGuard';

function ResetPassword() {
  return (
    <>
      <Head>
        <title>똑똑한개발자 | 아이디/비밀번호 찾기</title>
      </Head>
      <LoginLayout content={<ResetPasswordPage />} />
    </>
  );
}

export default withUnAuthGuard(ResetPassword);
