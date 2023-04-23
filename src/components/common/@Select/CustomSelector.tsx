import React, { useState } from 'react';

import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuList,
  MenuListProps,
  MenuProps,
  Text,
} from '@chakra-ui/react';

import useInputWidth from '@hooks/useInputWidth';

import { DropdownIconIcon, DropupIconIcon } from 'generated/icons/MyIcons';

interface CustomSelectorProps extends Omit<MenuProps, 'children'> {
  options: string[];
  onChange: (option: string) => void;
  menuButtonProps?: MenuButtonProps;
  menuListProps?: MenuListProps;
}

const CustomSelector = ({
  options,
  onChange,
  menuButtonProps,
  menuListProps,
  ...props
}: CustomSelectorProps) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const menuButtonRef = React.useRef<HTMLButtonElement>(null);
  const menuButtonWidth = useInputWidth(menuButtonRef);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    onChange(option);
  };

  return (
    <Box w="100%">
      <Menu {...props}>
        {({ isOpen }) => (
          <>
            <MenuButton
              ref={menuButtonRef}
              w="100%"
              h="50px"
              px="10px"
              bg="gray.50"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="5px"
              textAlign="left"
              {...menuButtonProps}
            >
              <Flex justifyContent="space-between" alignItems="center">
                <Text>{selectedOption}</Text>{' '}
                {isOpen ? (
                  <DropupIconIcon w="24px" h="24px" fill="none" />
                ) : (
                  <DropdownIconIcon w="24px" h="24px" fill="none" />
                )}
              </Flex>
            </MenuButton>
            <MenuList w="100%" flex="1" {...menuListProps}>
              {options.map((option) => (
                <MenuItem
                  w={menuButtonWidth || '100%'}
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default CustomSelector;
