import React from 'react';

import { Flex, Highlight, Text } from '@chakra-ui/react';

import useModals from '@hooks/useModals';

import AlignCenterFlex from '@components/common/@Flex/AlignCenterFlex';
import CustomConfirmAlert from '@components/common/@Modal/@Alert/CustomConfirmAlert';
import EmergencyStatusManagement from '@components/common/@Modal/EmergencyStatusManagement';
import WorkStatusManagement from '@components/common/@Modal/WorkStatusManagement';
import WorkerAccount from '@components/common/@Modal/WorkerAccount';

import {
  AccountIcon,
  EmergencyIcon,
  LogoutIcon,
  MenuIcon,
  WorkManagementIcon,
} from 'generated/icons/MyIcons';

interface HomeNavigationBarProps {
  isOpenNavbar: boolean;
  onOpenNavbar: () => void;
  onCloseNavbar: () => void;
}

function HomeNavigationBar({
  isOpenNavbar,
  onCloseNavbar,
  onOpenNavbar,
}: HomeNavigationBarProps) {
  const { openModal } = useModals();
  return (
    <Flex
      position="fixed"
      zIndex="sticky"
      h="100vh"
      flexDir="column"
      justifyContent="space-between"
      p="10px"
      boxShadow="0 0 10px rgba(26, 26, 26, 0.1)"
      transition="all ease-in 1s"
      bg="white"
    >
      <Flex flexDir="column" gap="40px">
        <AlignCenterFlex w="100%">
          <Flex alignItems="center" gap="23px">
            <MenuIcon
              w="24px"
              h="24px"
              cursor="pointer"
              onClick={isOpenNavbar ? onCloseNavbar : onOpenNavbar}
            />
            {isOpenNavbar && (
              <Text textStyle="TitleSmall" color="black">
                <Highlight
                  query="samasolution"
                  styles={{
                    color: 'primary.500',
                  }}
                >
                  samasolution 님
                </Highlight>
              </Text>
            )}
          </Flex>
        </AlignCenterFlex>
        <Flex w="100%" flexDir="column" gap="10px">
          <AlignCenterFlex w="100%">
            {/* TODO: 작업현황관리 모달 열기 */}
            <Flex
              w="100%"
              gap="8px"
              alignItems="center"
              cursor="pointer"
              onClick={() => openModal(WorkStatusManagement)}
            >
              <WorkManagementIcon w="24px" h="24px" />
              {isOpenNavbar && (
                <Text textStyle="TitleSmall" color="black">
                  작업 현황 관리
                </Text>
              )}
            </Flex>
          </AlignCenterFlex>

          <AlignCenterFlex w="100%">
            <Flex
              w="100%"
              gap="8px"
              alignItems="center"
              cursor="pointer"
              onClick={() => openModal(EmergencyStatusManagement)}
            >
              <EmergencyIcon w="24px" h="24px" />
              {isOpenNavbar && (
                <Text textStyle="TitleSmall" color="black">
                  비상상황 관리
                </Text>
              )}
            </Flex>
          </AlignCenterFlex>

          <AlignCenterFlex w="100%">
            <Flex
              w="100%"
              gap="8px"
              alignItems="center"
              cursor="pointer"
              onClick={() => openModal(WorkerAccount)}
            >
              <AccountIcon w="24px" h="24px" cursor="pointer" />
              {isOpenNavbar && (
                <Text textStyle="TitleSmall" color="black">
                  작업자 계정 추가
                </Text>
              )}
            </Flex>
          </AlignCenterFlex>
        </Flex>
      </Flex>
      <AlignCenterFlex w="100%">
        <Flex
          w="100%"
          gap="8px"
          alignItems="center"
          onClick={() =>
            openModal(CustomConfirmAlert, {
              auxProps: {
                title: '로그아웃',
                content: '로그아웃 하시겠습니까?',
                cancelText: '취소',
                submitText: '로그아웃',
                onSubmit: () => {
                  alert('로그아웃 API 연동');
                },
              },
            })
          }
        >
          <LogoutIcon w="24px" h="24px" cursor="pointer" />
          {isOpenNavbar && (
            <Text textStyle="TitleSmall" color="black">
              로그아웃
            </Text>
          )}
        </Flex>
      </AlignCenterFlex>
    </Flex>
  );
}

export default HomeNavigationBar;
