import React from 'react';

import {
  Box,
  Button,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Text,
  Thead,
  Tr,
} from '@chakra-ui/react';

import StatusBadge from '@components/common/@Badge/StatusBadge';
import CustomTd from '@components/common/@Table/CustomTd';
import CustomTh from '@components/common/@Table/CustomTh';

import { FoldIcon, UnfoldIcon } from 'generated/icons/MyIcons';

interface RightFloatListProps {
  isOpenList: boolean;
  onOpenList: () => void;
  onCloseList: () => void;
}

const heavyEquipmentList = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  driver: ['김운전', '이운전', '박운전'][Math.floor(Math.random() * 3)],
  carType: [
    '지게차',
    '크레인',
    '굴삭기',
    '포크레인',
    '불도저',
    '덤프트럭',
    '로더',
  ][Math.floor(Math.random() * 7)],
  status: ['정지', '운전', '비상'][Math.floor(Math.random() * 3)],
}));

const totalStatus = [
  { id: 1, type: '운전 중', count: 9999 },
  { id: 2, type: '정지', count: 999 },
  { id: 3, type: '비상상황', count: 9999 },
];

function RightFloatList({
  isOpenList,
  onCloseList,
  onOpenList,
}: RightFloatListProps) {
  return (
    <>
      <Box
        h="100vh"
        position="absolute"
        top="0"
        right={!isOpenList ? '0' : '-300px'}
        zIndex="sticky"
        bg="white"
        borderRadius="15px 0px 0px 15px"
        filter="drop-shadow(0px 0px 10px rgba(26, 26, 26, 0.1))"
        transition="all 0.5s ease-in-out"
        overflow="scroll"
      >
        <TableContainer>
          <Flex
            h="30px"
            justifyContent="center"
            alignItems="center"
            bg="gray.800"
          >
            <Text textStyle="TitleSmall" color="white">
              중장비 리스트
            </Text>
          </Flex>
          <Table
            css={{
              tableLayout: 'fixed',
            }}
            display="inline-block"
          >
            <Thead bg="gray.200" h="30px">
              <Tr>
                <CustomTh w="60px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    순번
                  </Text>
                </CustomTh>
                <CustomTh w="80px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    운전자
                  </Text>
                </CustomTh>
                <CustomTh w="80px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    차종
                  </Text>
                </CustomTh>
                <CustomTh w="80px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    현재상태
                  </Text>
                </CustomTh>
              </Tr>
            </Thead>
            <Tbody minH="570px" overflowY="auto" display="inline-block">
              {heavyEquipmentList.map((item, index) => (
                <Tr key={item.id} h="36px">
                  <CustomTd w="60px">
                    <Text textStyle="TextSmall" color="black">
                      {index + 1}
                    </Text>
                  </CustomTd>
                  <CustomTd w="80px">
                    <Text textStyle="TextSmall" color="black">
                      {item.driver}
                    </Text>
                  </CustomTd>
                  <CustomTd w="80px">
                    <Text textStyle="TextSmall" color="black">
                      {item.carType}
                    </Text>
                  </CustomTd>
                  <CustomTd w="80px">
                    <StatusBadge status={item.status} />
                  </CustomTd>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <TableContainer>
          <Flex
            h="30px"
            justifyContent="center"
            alignItems="center"
            bg="gray.800"
          >
            <Text textStyle="TitleSmall" color="white">
              전체현황
            </Text>
          </Flex>
          <Table>
            <Thead h="36px" bg="gray.200">
              <Tr>
                <CustomTh w="100px">
                  <Text textStyle="TitleSmall" color="gray.700">
                    구분
                  </Text>
                </CustomTh>
                <CustomTh w="calc(100% - 100px)">
                  <Text
                    textStyle="TitleSmall"
                    color="gray.700"
                    textAlign="right"
                    px="9px"
                  >
                    대수
                  </Text>
                </CustomTh>
              </Tr>
            </Thead>
            <Tbody>
              {totalStatus.map((item) => (
                <Tr key={item.id} h="36px">
                  <CustomTd w="" borderColor="secondary.100" bg="secondary.50">
                    <Text textStyle="TitleSmall" color="primary.500">
                      {item.type}
                    </Text>
                  </CustomTd>
                  <CustomTd w="">
                    <Text textAlign="right" px="9px">
                      {item.count}
                    </Text>
                  </CustomTd>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Button
        w="24px"
        h="80px"
        position="absolute"
        // right="300px"
        right={!isOpenList ? '300px' : '0'}
        top="50%"
        zIndex="sticky"
        colorScheme="whiteAlpha"
        bg="white"
        border="none"
        borderRadius="8px 0 0 8px"
        transition="all 0.5s ease-in-out"
        boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
        onClick={isOpenList ? onCloseList : onOpenList}
      >
        <>
          {isOpenList ? (
            <UnfoldIcon w="14px" h="14px" />
          ) : (
            <FoldIcon w="14px" h="14px" />
          )}
        </>
      </Button>
    </>
  );
}

export default RightFloatList;
