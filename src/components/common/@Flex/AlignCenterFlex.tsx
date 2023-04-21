import React from 'react';

import { Flex, FlexProps } from '@chakra-ui/react';

interface AlignCenterFlexProps extends FlexProps {}

function AlignCenterFlex({
  children,
  ...basisProps
}: AlignCenterFlexProps & { children: React.ReactNode }) {
  return (
    <Flex
      w="50px"
      h="50px"
      justifyContent="center"
      alignItems="center"
      {...basisProps}
    >
      {children}
    </Flex>
  );
}

export default AlignCenterFlex;
