import Head from 'next/head';
import React from 'react';

import HomePage from '@components/HomePage';
import HomeLayout from '@components/common/@Layout/HomeLayout';

import withAuthGuard from '@hocs/withAuthGuard';

import { SITE_NAME } from './_document';

function Home() {
  return (
    <>
      <Head>
        {/* ex) Your App Name | Page Name */}
        <title>{SITE_NAME} | 메인</title>
      </Head>
      <HomeLayout content={<HomePage />} />
    </>
  );
}

export default withAuthGuard(Home);
