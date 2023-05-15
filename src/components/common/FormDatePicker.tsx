import React, { memo } from 'react';
import ReactDatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useFormContext } from 'react-hook-form';

import dayjs from 'dayjs';

import { Flex, Text } from '@chakra-ui/react';

import styled from '@emotion/styled';

import ArrowLeftIcon from './@Icons/System/ArrowLeft';
import ArrowRightIcon from './@Icons/System/ArrowRight';
import CustomInput from './@Input/CustomInput';

import ko from 'date-fns/locale/ko';
import 'dayjs/locale/ko';

interface FormDatePickerProps extends Omit<ReactDatePickerProps, 'onChange'> {
  label?: string;
  keyName: string;
}

dayjs.locale('ko');

const FormDatePicker = ({ label, keyName, ...props }: FormDatePickerProps) => {
  const { watch, setValue } = useFormContext();

  const onChangeDate = (date: Date | null) => {
    setValue(keyName, date);
  };

  const selectedDate = dayjs(watch(keyName)).toDate() || '';

  return (
    <DatePickerContainer zIndex={100}>
      <ReactDatePicker
        showTimeInput={true}
        selected={selectedDate}
        onChange={onChangeDate}
        locale={ko}
        customInput={
          <CustomInput
            isDisabled={props.disabled}
            _disabled={{
              bg: 'gray.200',
              textStyle: 'Text',
              color: 'gray.500',
            }}
          />
        }
        dateFormat="yy-MM-dd hh:mm"
        renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
          <Flex alignItems="center" justifyContent="space-between" h="60px">
            <ArrowLeftIcon boxSize="20px" onClick={decreaseMonth} />
            <Text fontWeight="700" color="primary">
              {dayjs(date).locale('ko').format('MMM')}
            </Text>
            <ArrowRightIcon boxSize="20px" onClick={increaseMonth} />
          </Flex>
        )}
        {...props}
      />
    </DatePickerContainer>
  );
};

export default memo(FormDatePicker);

const DatePickerContainer = styled(Flex)`
  // 전체 container
  & .react-datepicker {
    padding: 0 12px;
    /* display: flex; */
    z-index: 100 !important;
  }
  // 월 선택 달력 컨테이너
  & .react-datepicker__month-container {
    z-index: 100;
  }
  // 달력 헤더
  & .react-datepicker__header {
    background-color: white;
    padding: 0px;
    border-bottom: 0px;

    // 선택된 달
    & .react-datepicker__current-month {
    }
    // 주
    & .react-datepicker__day-names {
      width: 280px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      // 주 하나하나
      & .react-datepicker__day-name {
        color: #757983;
      }
    }
  }

  // 일
  & .react-datepicker__day {
    width: 40px;
    height: 40px;
    margin: 0px;
    line-height: 40px;
    font-size: 15px;
  }
  // 선택일
  & .react-datepicker__day--selected {
    background-color: #2bad76;
    border-radius: 100%;
  }
  & .react-datepicker__day--outside-month {
    visibility: hidden;
  }

  & .react-datepicker__header--has-time-select {
  }
  & .react-datepicker__month {
  }

  /* 하단 시간 input */
  & .react-datepicker__input-time-container {
    margin: 0px;
    margin-bottom: 12px;
    width: 100%;

    background-color: #fafafa;
    height: 50px;
    display: flex;
    align-items: center;
    border: 1px solid #f2f3f4;
    border-radius: 5px;

    & .react-datepicker-time__caption {
      display: none;

      background-color: red;
    }
    & .react-datepicker-time__input {
      margin: 0px 6px;
      background-color: #fafafa;
      width: 100%;
    }
    & .react-datepicker-time__input:focus {
      margin: 0px 6px;
      border: 0px solid #2bad76;
      border-radius: 5px;
      outline: none;
    }
  }
`;
