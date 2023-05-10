import { useState } from 'react';

import { Box, Button, Flex, ListItem, UnorderedList } from '@chakra-ui/react';

import {
  FirstPageIcon,
  LastPageIcon,
  NextPageIcon,
  PrevPageIcon,
} from 'generated/icons/MyIcons';

type PaginationProps = {
  totalItems?: number;
  currentPage: number;
  itemsPerPage: number;
  onChangePage: (pageNumber: number) => void;
};

const Pagination = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onChangePage,
}: PaginationProps) => {
  const totalPages = Math.ceil((totalItems as number) / itemsPerPage);
  const [pageRange, setPageRange] = useState([1, 5]);

  const handleClick = (page: number) => {
    if (page <= 0) return; // 1페이지 이하로 내려가지 않도록
    if (page > totalPages) return; // 마지막 페이지 이상으로 올라가지 않도록

    onChangePage(page); // 페이지 변경

    if (page === 1) return;
    if (page > totalPages) return;

    const lastPage = Math.min(totalPages, pageRange[1]);
    const firstPage = Math.max(1, pageRange[0]);

    // 마지막 페이지보다 큰 경우
    if (page > lastPage) {
      const newLastRange = totalPages - 5 > 4 ? page + 4 : totalPages;
      setPageRange([page, newLastRange]);
    }

    // 첫 페이지보다 작은 경우
    if (page < firstPage) {
      const newFirstRange = page - 4 > 1 ? page - 5 : 1;
      setPageRange([newFirstRange, page]);
    }
  };

  const pages = [];
  for (let i = pageRange[0]; i <= Math.min(totalPages, pageRange[1]); i++) {
    pages.push(i);
  }

  const handleFirstPageClick = () => {
    handleClick(1);
    setPageRange([1, 5]);
  };

  const handleLastPageClick = () => {
    if (pageRange[1] === totalPages) return;
    handleClick(totalPages);
    const newLastPageRange =
      ((totalItems as number) - itemsPerPage * 5) / 10 + pageRange[1];
    setPageRange([pageRange[1] + 1, newLastPageRange]);
  };

  // TODO: 페에징 아이콘 변경
  return (
    <Flex h="80px" justifyContent="center" alignItems="center" gap="20px">
      <Flex>
        <button
          className={`page-item ${pageRange[0] === 1 ? 'disabled' : ''}`}
          onClick={handleFirstPageClick}
        >
          <FirstPageIcon w="24px" h="24px" />
        </button>
        <button
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={() => handleClick(currentPage - 1)}
        >
          <PrevPageIcon w="24px" h="24px" />
        </button>
      </Flex>
      <UnorderedList listStyleType="none" gap="30px">
        {pages.map((page) => (
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
              onClick={() => handleClick(page)}
            >
              {page}
            </Button>
          </ListItem>
        ))}
      </UnorderedList>
      <Flex>
        <button
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
          onClick={() => handleClick(currentPage + 1)}
        >
          <NextPageIcon w="24px" h="24px" />
        </button>
        <button
          className={`page-item ${
            pageRange[1] >= totalPages ? 'disabled' : ''
          }`}
          onClick={handleLastPageClick}
        >
          <LastPageIcon w="24px" h="24px" />
        </button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
