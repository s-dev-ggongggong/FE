import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import {
  Typography,
  TableHead,
  Chip,
  Box,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  TableFooter,
  IconButton,
  Paper,
  TableContainer,
} from '@mui/material';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';

// 훈련용 더미 데이터 설정
const rows = [
  {
    title: 'Cross-Department Security Awareness',
    user: '김철수',
    email: 'test1@ggongggong.org',
    time: '2024-10-11 09:51:40',
    action: '피싱 링크 클릭함',
  },
  {
    title: 'Cross-Department Phishing Simulation',
    user: '이영희',
    email: 'test2@ggongggong.org',
    time: '2024-10-11 10:00:00',
    action: '정보 기입함',
  },
  {
    title: 'Departmental Security Drill',
    user: '박민수',
    email: 'test3@ggongggong.org',
    time: '2024-10-11 10:30:45',
    action: '악성 첨부파일 다운로드',
  },
  {
    title: 'Departmental Security Drill',
    user: '최경호',
    email: 'test4@ggongggong.org',
    time: '2024-10-11 11:00:00',
    action: '악성 첨부파일 실행',
  },
  {
    title: 'Cross-Department Email Security Training',
    user: 'Agent',
    email: '-',
    time: '2024-10-11 12:00:00',
    action: '메일 스캔',
  },
  {
    title: 'Corporate-Level Security Assessment',
    user: 'Agent',
    email: '-',
    time: '2024-10-11 12:30:00',
    action: '피싱 메일 생성',
  },
  {
    title: 'Cross-Department Security Exercise',
    user: 'Agent',
    email: '-',
    time: '2024-10-11 13:00:00',
    action: '피싱 메일 발송',
  },
  {
    title: 'Inter-Department Phishing Response',
    user: '한지민',
    email: 'test5@ggongggong.org',
    time: '2024-10-11 13:15:00',
    action: '정보 기입함',
  },
  {
    title: 'Departmental Email Security Training',
    user: '김현수',
    email: 'test6@ggongggong.org',
    time: '2024-10-11 13:30:00',
    action: '악성 첨부파일 실행',
  },
  {
    title: 'Cross-Department Phishing Awareness',
    user: '박지훈',
    email: 'test7@ggongggong.org',
    time: '2024-10-11 14:00:00',
    action: '피싱 링크 클릭함',
  },
];

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const PaginationTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper variant="outlined">
      <TableContainer>
        <Table aria-label="custom pagination table" sx={{ whiteSpace: 'nowrap' }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="h6">훈련 제목</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">사용자</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">이메일</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">시간</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="h6">행위</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Typography variant="h6">{row.title}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    {row.user}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="textSecondary" variant="h6" fontWeight="400">
                    {row.email}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{row.time}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    color={
                      row.action === '피싱 링크 클릭함' || row.action === '정보 기입함'
                        ? 'warning'
                        : row.action === '악성 첨부파일 다운로드' || row.action === '악성 첨부파일 실행'
                        ? 'error'
                        : 'default'
                    }
                    sx={{
                      borderRadius: '6px',
                    }}
                    size="small"
                    label={row.action}
                  />
                </TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={6}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PaginationTable;
