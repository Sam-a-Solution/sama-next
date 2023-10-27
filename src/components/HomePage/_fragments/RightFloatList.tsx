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

import {
  WorkStatusCountType,
  WorkType,
} from 'generated/apis/@types/data-contracts';
import { FoldIcon, UnfoldIcon } from 'generated/icons/MyIcons';

type WorkStatusKey = keyof WorkStatusCountType;

const convertingKeyMap: Record<WorkStatusKey, string> = {
  emergencyCount: '비상상황',
  endCount: '정지',
  progressCount: '운전 중',
  pauseCount: '일시중지',
} as const;

interface RightFloatListProps {
  isOpenList: boolean;
  onOpenList: () => void;
  onCloseList: () => void;
  totalStatus: WorkStatusCountType;
  workListData: WorkType[];
}

function RightFloatList({
  isOpenList,
  onCloseList,
  onOpenList,
  totalStatus,
  workListData,
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
            <Tbody
              minH="578px"
              maxH="calc(100vh - 234px)"
              overflowY="auto"
              display="inline-block"
            >
              {workListData?.map((item, index) => (
                <Tr key={`${item.id}-${index}`} h="36px">
                  <CustomTd w="60px">
                    <Text textStyle="TextSmall" color="black">
                      {item.id}
                    </Text>
                  </CustomTd>
                  <CustomTd w="80px">
                    <Text
                      textStyle="TextSmall"
                      color="black"
                      textOverflow="ellipsis"
                      w="80px"
                      overflow="hidden"
                    >
                      {item.user}
                    </Text>
                  </CustomTd>
                  <CustomTd w="80px">
                    <Text
                      textStyle="TextSmall"
                      color="black"
                      textOverflow="ellipsis"
                      w="80px"
                      overflow="hidden"
                    >
                      {item.heavyEquipmentType.koreaName}
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
        <TableContainer w="100%" position="fixed" bottom="0">
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
              {Object.keys(totalStatus).map((item, index) => {
                return (
                  <Tr key={`${item}-${index}`} h="36px">
                    <CustomTd
                      w=""
                      borderColor="secondary.100"
                      bg="secondary.50"
                    >
                      <Text textStyle="TitleSmall" color="primary.500">
                        {convertingKeyMap[item as keyof WorkStatusCountType]}
                      </Text>
                    </CustomTd>
                    <CustomTd w="">
                      <Text
                        textAlign="right"
                        px="9px"
                        textStyle="Text"
                        color="black"
                      >
                        {totalStatus[item as keyof WorkStatusCountType]}
                      </Text>
                    </CustomTd>
                  </Tr>
                );
              })}
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
        bg="white"
        border="none"
        borderRadius="8px 0 0 8px"
        transition="all 0.5s ease-in-out"
        boxShadow="0px 0px 10px rgba(26, 26, 26, 0.1)"
        onClick={isOpenList ? onCloseList : onOpenList}
        _hover={{
          bgColor: 'white',
        }}
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
