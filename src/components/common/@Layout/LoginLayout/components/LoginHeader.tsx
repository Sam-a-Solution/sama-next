import Image from 'next/image';
import React from 'react';

import { Flex } from '@chakra-ui/react';

function LoginHeader() {
  return (
    <>
      <Flex //
        as="header"
        px="80px"
        position="fixed"
        zIndex="sticky"
        transition="all 0.3s"
        w="100%"
        bg="gray.800"
      >
        <Image
          width={200}
          height={60}
          src="/images/header-logo-x2.png"
          alt="logo"
        />
      </Flex>
    </>
  );
}

export default LoginHeader;
