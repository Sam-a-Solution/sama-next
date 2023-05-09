import React, { memo } from 'react';

import { Button, Flex, Text } from '@chakra-ui/react';

interface FindIdButtonProps {
  onClickFindIdBtn: () => void;
}

const FindIdButton = ({ onClickFindIdBtn }: FindIdButtonProps) => {
  return (
    <Button
      variant="unstyled"
      onClick={onClickFindIdBtn}
      w="100%"
      h="50px"
      mt="10px"
      justifyContent="center"
      alignItems="center"
    >
      <Text textAlign="center" color="gray.700" textDecorationLine="underline">
        아이디 찾기/비밀번호 재설정
      </Text>
    </Button>
  );
};

export default memo(FindIdButton);
