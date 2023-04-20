import Head from 'next/head';

import LoginPage from '@components/LoginPage';
import LoginHeader from '@components/common/@Layout/Header/LoginHeader';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import withUnAuthGuard from '@hocs/withUnAuthGuard';

function Login() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>똑똑한개발자 | login</title>
      </Head>
      <HomeLayout header={<LoginHeader />} content={<LoginPage />} />
    </>
  );
}

export default withUnAuthGuard(Login);
