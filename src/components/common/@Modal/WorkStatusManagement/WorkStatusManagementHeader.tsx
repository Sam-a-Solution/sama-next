import { memo } from 'react';

import { Text, Thead, Tr } from '@chakra-ui/react';

import CustomTh from '@components/common/@Table/CustomTh';

interface WorkStatusManagementHeaderProps {}

const WorkStatusManagementHeader = () => {
  return (
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
  );
};

export default memo(WorkStatusManagementHeader);
