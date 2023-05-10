import Head from 'next/head';

import FindIdPage from '@components/FindIdPage/FindIdPage';
import FindIdResultPage from '@components/FindIdResultPage/FindIdResultPage';
import ResetPasswordResultPage from '@components/ResetPasswordResultPage';
import LoginHeader from '@components/common/@Layout/Header/LoginHeader';
import HomeLayout from '@components/common/@Layout/HomeLayout';
import LoginLayout from '@components/common/@Layout/LoginLayout';

import withUnAuthGuard from '@hocs/withUnAuthGuard';

function ResetPasswordResult() {
  return (
    <>
      <Head>
        <title>똑똑한개발자 | 아이디/비밀번호 찾기</title>
      </Head>
      {/* <HomeLayout header={<LoginHeader />} content={<FindIdResultPage />} /> */}
      <LoginLayout content={<ResetPasswordResultPage />} />
    </>
  );
}

export default withUnAuthGuard(ResetPasswordResult);
