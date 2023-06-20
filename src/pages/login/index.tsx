import Head from 'next/head';

import LoginPage from '@components/LoginPage';
import MainHeader from '@components/common/@Layout/Header/MainHeader';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import withUnAuthGuard from '@hocs/withUnAuthGuard';

import { SITE_NAME } from 'pages/_document';

function Login() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>{SITE_NAME} | login</title>
      </Head>
      <HomeLayout header={<MainHeader />} content={<LoginPage />} />
    </>
  );
}

export default withUnAuthGuard(Login);
