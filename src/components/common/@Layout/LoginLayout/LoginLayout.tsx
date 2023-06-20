import React from 'react';

import { Flex, FlexProps, VStack } from '@chakra-ui/react';

import MainHeader from '../Header/MainHeader';
import LoginHeader from './components/LoginHeader';

interface LoginLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  flexProps?: FlexProps;
}

const LoginLayout = ({
  header = <MainHeader />,
  footer,
  content,
  flexProps,
}: LoginLayoutProps) => {
  return (
    <>
      {header}
      <Flex
        w="100%"
        h="100vh"
        justifyContent="center"
        alignItems="center"
        bg="#FAFAFA"
      >
        <Flex
          flexDir="column"
          gap="40px"
          w="502px"
          p="60px 50px"
          bg="white"
          border="1px solid"
          borderColor="gray.200"
          borderRadius="15px"
          justifyContent="center"
        >
          {content}
        </Flex>
      </Flex>

      {footer}
    </>
  );
};

export default LoginLayout;
