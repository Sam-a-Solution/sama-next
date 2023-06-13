import Head from 'next/head';

import FindIdResultPage from '@components/FindIdResultPage/FindIdResultPage';
import LoginLayout from '@components/common/@Layout/LoginLayout';

import withUnAuthGuard from '@hocs/withUnAuthGuard';

function FindIdResult() {
  return (
    <>
      <Head>
        <title>똑똑한개발자 | 아이디/비밀번호 찾기</title>
      </Head>

      <LoginLayout content={<FindIdResultPage />} />
    </>
  );
}

export default withUnAuthGuard(FindIdResult);
