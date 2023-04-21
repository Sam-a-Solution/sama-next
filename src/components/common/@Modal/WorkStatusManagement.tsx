import React, { useState } from 'react';

import {
  Button,
  CloseButton,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  TableContainer,
  Tbody,
  Text,
  Tfoot,
  Thead,
  Tr,
} from '@chakra-ui/react';

import StatusBadge from '../@Badge/StatusBadge';
import CustomTable from '../@Table/CustomTable';
import CustomTd from '../@Table/CustomTd';
import CustomTh from '../@Table/CustomTh';

import { WorkManagementIcon } from 'generated/icons/MyIcons';

const WorkStatusList = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  drivder: [
    '김철수',
    '이영희',
    '박민수',
    '손상일',
    '박찬하',
    '박찬종',
    '김건호',
    '정아인',
  ][Math.floor(Math.random() * 3)],
  carType: [
    '지게차',
    '포크레인',
    '트럭',
    '불도저',
    '로더',
    '스크레이퍼',
    '트럭믹서',
    '레미콘',
    '덤프트럭',
  ][Math.floor(Math.random() * 9)],
  status: ['운전', '정지', '비상'][Math.floor(Math.random() * 3)],
  startTime: ['10:00:00', '11:00:00', '12:00:00'][
    Math.floor(Math.random() * 3)
  ],
  endTime: ['16:00:00', '17:00:00', '18:00:00'][Math.floor(Math.random() * 3)],
  check: [true, false][Math.floor(Math.random() * 2)],
}));

interface WorkStatusManagementProps extends Omit<ModalProps, 'children'> {}

function WorkStatusManagement({ ...props }: WorkStatusManagementProps) {
  const [list, setList] = useState(WorkStatusList.slice(0, 10));
  return (
    <Modal {...props}>
      <ModalOverlay />
      <ModalContent minW="1280px">
        <ModalHeader p="20px 30px !important">
          <Flex justifyContent="space-between">
            <Flex alignItems="center" gap="8px">
              <Flex
                w="40px"
                h="40px"
                justifyContent="center"
                alignItems="center"
                bg="secondary.50"
                borderRadius="30px"
              >
                <WorkManagementIcon w="24px" h="24px" />
              </Flex>
              <Text textStyle="TitleLarge" color="black">
                작업 현황 관리
              </Text>
            </Flex>
            <CloseButton onClick={props.onClose} />
          </Flex>
        </ModalHeader>
        <ModalBody p="0" mt="10px">
          <TableContainer>
            <CustomTable>
              <Thead>
                <Tr h="40px" bg="gray.200">
                  <CustomTh w="100px">
                    <Text textStyle="TitleSmall" color="gray.700">
                      순번
                    </Text>
                  </CustomTh>
                  <CustomTh w="160px">
                    <Text textStyle="TitleSmall" color="gray.700">
                      운전자
                    </Text>
                  </CustomTh>
                  <CustomTh w="160px">
                    <Text textStyle="TitleSmall" color="gray.700">
                      차종
                    </Text>
                  </CustomTh>
                  <CustomTh w="80px">
                    <Text textStyle="TitleSmall" color="gray.700">
                      현재상태
                    </Text>
                  </CustomTh>
                  <CustomTh w="140px">
                    <Text textStyle="TitleSmall" color="gray.700">
                      작업내용
                    </Text>
                  </CustomTh>
                  <CustomTh w="220px">
                    <Text textStyle="TitleSmall" color="gray.700">
                      작업 시작 시간
                    </Text>
                  </CustomTh>
                  <CustomTh w="220px">
                    <Text textStyle="TitleSmall" color="gray.700">
                      작업 종료 시간
                    </Text>
                  </CustomTh>
                  <CustomTh w="200px">
                    <Text textStyle="TitleSmall" color="gray.700">
                      관리자 확인
                    </Text>
                  </CustomTh>
                </Tr>
              </Thead>
              <Tbody display="inline-block">
                {list.map((item) => (
                  <Tr key={item.id} h="60px">
                    <CustomTd w="100px">
                      <Text textStyle="Text" color="black">
                        {item.id}
                      </Text>
                    </CustomTd>
                    <CustomTd w="160px">
                      <Text textStyle="Text" color="black">
                        {item.drivder}
                      </Text>
                    </CustomTd>
                    <CustomTd w="160px">
                      <Text textStyle="Text" color="black">
                        {item.carType}
                      </Text>
                    </CustomTd>
                    <CustomTd w="80px">
                      <StatusBadge status={item.status} />
                    </CustomTd>
                    <CustomTd w="140px">
                      <Button
                        w="68px"
                        h="30px"
                        variant="outline"
                        colorScheme="primary"
                      >
                        작업 내용
                      </Button>
                    </CustomTd>
                    <CustomTd w="220px">
                      <Text textStyle="Text" color="black">
                        {item.startTime || '-'}
                      </Text>
                    </CustomTd>
                    <CustomTd w="220px">
                      <Text textStyle="Text" color="black">
                        {item.endTime || '-'}
                      </Text>
                    </CustomTd>
                    <CustomTd w="200px">
                      {item.status === '정지' && item.check ? (
                        <Flex flexDir="column">
                          <Text
                            textStyle="Text"
                            color="black"
                            textAlign="center"
                          >
                            관리자ID
                          </Text>
                          <Text
                            textStyle="Text"
                            color="black"
                            textAlign="center"
                          >
                            23-12-31 17:08:12
                          </Text>
                        </Flex>
                      ) : (
                        <Button
                          w="80px"
                          h="30px"
                          colorScheme={item.check ? 'gray' : 'primary'}
                        >
                          확인
                        </Button>
                      )}
                    </CustomTd>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                {/* TODO: 페이지네이션 구현 */}
                <Text>페이지네이션</Text>
              </Tfoot>
            </CustomTable>
          </TableContainer>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default WorkStatusManagement;
