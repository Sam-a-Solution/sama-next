import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

interface HomeLayoutProps {
  header?: JSX.Element;
  footer?: JSX.Element;
  content?: JSX.Element;
  flexProps?: FlexProps;
}

const HomeLayout = ({
  //
  header,
  footer,
  content,
  flexProps,
}: HomeLayoutProps) => {
  return (
    <>
      {header}
      <Flex {...flexProps}>{content}</Flex>
      {footer}
    </>
  );
};

export default HomeLayout;
