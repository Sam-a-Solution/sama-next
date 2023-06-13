import Head from 'next/head';

import FindIdPage from '@components/FindIdPage/FindIdPage';
import LoginLayout from '@components/common/@Layout/LoginLayout';

import withUnAuthGuard from '@hocs/withUnAuthGuard';

import { SITE_NAME } from 'pages/_document';

function FindId() {
  return (
    <>
      <Head>
        <title>{SITE_NAME} | 아이디/비밀번호 찾기</title>
      </Head>

      <LoginLayout content={<FindIdPage />} />
    </>
  );
}

export default withUnAuthGuard(FindId);
