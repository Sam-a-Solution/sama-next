import React, { useState } from 'react';

import { Box, Button, Checkbox, Flex, Text, VStack } from '@chakra-ui/react';

import AuthCheckbox from './_fragments/AuthCheckbox';
import AuthLabelInput from './_fragments/AuthLabelInput';

function LoginPage() {
  const [isDisabled] = useState(true);
  return (
    <Flex
      w="100%"
      h="100vh"
      justifyContent="center"
      alignItems="center"
      bg="#FAFAFA"
    >
      <Box
        p="60px 50px"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        borderRadius="15px"
      >
        <VStack w="402px" gap="18px" mb="40px">
          <Text textStyle="TitleLarge">로그인</Text>
          <AuthLabelInput
            label="아이디"
            type="text"
            placeholderText="아이디를 입력하세요."
            flexProps={{
              mt: '0 !important',
            }}
          />
          <AuthLabelInput
            label="비밀번호"
            placeholderText="비밀번호를 입력하세요."
            type="password"
            flexProps={{
              mt: '0 !important',
            }}
          />
          <Flex w="100%" gap="24px" mt="0 !important">
            <AuthCheckbox labelText="아이디 저장" />
            <AuthCheckbox labelText="로그인 상태 유지" />
          </Flex>
        </VStack>
        <Button
          w="100%"
          size="lg"
          variant={isDisabled ? 'disabled' : 'none'}
          colorScheme={'primary'}
          borderRadius="5px"
          isDisabled={isDisabled}
        >
          <Text textStyle="Button">로그인</Text>
        </Button>
      </Box>
    </Flex>
  );
}

export default LoginPage;
