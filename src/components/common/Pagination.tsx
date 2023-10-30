import { useCallback, useMemo, useState } from 'react';

import {
  Button,
  Flex,
  IconButton,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';

import {
  FirstPageIcon,
  LastPageIcon,
  NextPageIcon,
  PrevPageIcon,
} from 'generated/icons/MyIcons';

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalItems?: number;
  buttonLimit?: number;
  pageSize?: number;
};

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalItems = 0,
  buttonLimit = 5,
  pageSize = 10,
}: PaginationProps) => {
  const pageGroupIndex = Math.floor(currentPage / buttonLimit);

  const pageButtonLength = useMemo(
    () => Math.ceil(totalItems / pageSize),
    [totalItems, pageSize],
  );

  const pageButtonList = useMemo(
    () =>
      Array(pageButtonLength)
        .fill(0)
        .map((_, i) => i),
    [pageButtonLength],
  );

  const isDisabledPrev = useMemo(() => currentPage <= 0, [currentPage]);
  const isDisabledNext = useMemo(
    () => currentPage >= pageButtonLength - 1,
    [pageButtonLength, currentPage],
  );

  const onClickFirstPageButton = useCallback(
    () => setCurrentPage(0),
    [setCurrentPage],
  );

  const onClickLastPageButton = useCallback(
    () => setCurrentPage(pageButtonLength - 1),
    [pageButtonLength, setCurrentPage],
  );

  const onClickPrevPageButton = useCallback(() => {
    const nextSelectedPage =
      pageGroupIndex === 0 ? 0 : pageGroupIndex * buttonLimit;
    setCurrentPage(nextSelectedPage);
  }, [buttonLimit, pageGroupIndex, setCurrentPage]);

  const onClickNextPageButton = useCallback(() => {
    const nextSelectedPage =
      pageGroupIndex === Math.floor(pageButtonLength / buttonLimit)
        ? pageButtonLength - 1
        : (pageGroupIndex + 1) * buttonLimit + 1;
    setCurrentPage(nextSelectedPage);
  }, [buttonLimit, pageButtonLength, pageGroupIndex, setCurrentPage]);

  return (
    <Flex h="80px" justifyContent="center" alignItems="center" gap="20px">
      <Flex>
        <IconButton
          isDisabled={isDisabledPrev}
          onClick={onClickFirstPageButton}
          icon={<FirstPageIcon w="24px" h="24px" />}
          size="xs"
          w="24px"
          variant="unstyled"
          aria-label={'next-page-button'}
        />

        <IconButton
          isDisabled={isDisabledPrev}
          onClick={onClickPrevPageButton}
          icon={<PrevPageIcon w="24px" h="24px" />}
          size="xs"
          w="24px"
          variant="unstyled"
          aria-label={'next-page-button'}
        />
      </Flex>
      <UnorderedList listStyleType="none" gap="30px" ml="0px">
        {pageButtonList.map((page) => (
          <ListItem
            key={page}
            display="inline-block"
            className={`page-item ${currentPage === page ? 'active' : ''}`}
          >
            <Button
              w="fit-content"
              variant="link"
              color={currentPage === page ? 'primary.500' : 'black'}
              textStyle={currentPage === page ? 'TextActive' : 'Text'}
              onClick={() => {
                setCurrentPage(page);
              }}
            >
              {page + 1}
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
      <Flex>
        <IconButton
          isDisabled={isDisabledNext}
          onClick={onClickNextPageButton}
          icon={<NextPageIcon w="24px" h="24px" />}
          size="xs"
          w="24px"
          variant="unstyled"
          aria-label={'next-page-button'}
        />
        <IconButton
          isDisabled={isDisabledNext}
          onClick={onClickLastPageButton}
          icon={<LastPageIcon w="24px" h="24px" />}
          size="xs"
          w="24px"
          variant="unstyled"
          aria-label={'last-page-button'}
        />
      </Flex>
    </Flex>
  );
};

export default Pagination;
