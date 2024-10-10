import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  Box,
  Chip,
  Paper,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../components/container/PageContainer';
import ParentCard from '../../components/shared/ParentCard';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Container, Stack } from '@mui/system';

// 점수에 따른 행위 설정
const actionPoints = {
  "피싱 링크 클릭": -1,
  "정보 기입": -2,
  "파일 다운로드": -1,
  "파일 실행": -2,
};

// 피싱 메일 훈련 데이터
const rows = [
  {
    pname: 'RE: 자료 검토 요청',
    customer: 'employee1@company.com',
    action: '피싱 링크 클릭',
    time: '2024-09-15 08:15:30',
    score: actionPoints['피싱 링크 클릭'],
    content:`안녕하세요, 김철수님.

아래 요청하신 자료 검토 요청에 대한 회신입니다. 
추가 요청 자료를 다음과 같이 정리해 보았습니다.

<a href="">링크</a>

해당 링크를 통해 자료를 확인해 주시면 감사하겠습니다.


---

**Original Message:**

From: 박철수 (it.support@company.com)
To: 김철수 (employee1@company.com)
Sent: 2024년 9월 13일 14:00
Subject: 자료 검토 요청

안녕하세요, 김철수님.

요청하신 프로젝트 검토 자료를 첨부합니다. 파일을 확인하시고 의견 부탁드립니다.

감사합니다.

박철수 드림  
IT 지원팀

---


김철수 대리
IT 보안팀  
Company Inc.`,
    history: [
      {
        date: '2024-09-14 10:00:00',
        title: '자료 검토 요청',
        customerId: 'Agent가 이메일을 스캔했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-14 11:00:00',
        title: 'RE: 자료 검토 요청',
        customerId: 'Agent가 피싱 메일을 생성했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-14 12:00:00',
        title: 'RE: 자료 검토 요청',
        customerId: 'Agent가 피싱 메일을 발송했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-15 08:15:30',
        title: 'RE: 자료 검토 요청',
        customerId: '사용자 김철수(employee1@company.com)가 피싱 링크를 클릭했습니다.',
        category: 'User'
      },
    ],
  },
  {
    pname: 'FW: 보안 패치 전파',
    customer: 'employee2@company.com',
    action: '정보 기입',
    time: '2024-09-16 10:30:00',
    score: actionPoints['정보 기입'],
    history: [
      {
        date: '2024-09-15 09:00:00',
        title: '보안 패치 전파',
        customerId: 'Agent가 이메일을 스캔했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-15 12:00:00',
        title: 'FW: 보안 패치 전파',
        customerId: 'Agent가 피싱 메일을 생성했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-15 14:00:00',
        title: 'FW: 보안 패치 전파',
        customerId: 'Agent가 피싱메일을 발송했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-16 10:30:00',
        title: 'FW: 보안 패치 전파',
        customerId: '사용자 이영희(employee2@company.com)가 피싱 링크를 클릭했습니다.',
        category: 'User'
      },
      {
        date: '2024-09-16 10:30:00',
        title: 'FW: 보안 패치 전파',
        customerId: '사용자 이영희(employee2@company.com)가 피싱 사이트에 정보를 기입하였습니다.',
        category: 'User'
      },
    ],
  },
  {
    pname: 'RE: 프린트 드라이버 설치 문의',
    customer: 'employee3@company.com',
    action: '파일 다운로드',
    time: '2024-09-17 14:00:00',
    score: actionPoints['파일 다운로드'],
    history: [
      {
        date: '2024-09-17 09:00:00',
        title: '프린트 드라이버 설치 문의',
        customerId: 'Agent가 이메일을 스캔했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-17 09:30:00',
        title: 'RE: 프린트 드라이버 설치 문의',
        customerId: 'Agent가 피싱 메일을 생성했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-17 10:00:00',
        title: 'RE: 프린트 드라이버 설치 문의',
        customerId: 'Agent가 피싱메일을 발송했습니다.',
        category: 'Agent'
      },
      {
        date: '2024-09-17 14:00:00',
        title: 'RE: 프린트 드라이버 설치 문의',
        customerId: '사용자 박철수(employee3@company.com)가 파일을 다운로드했습니다.',
        category: 'User'
      },
    ],
  },
];


// Row 컴포넌트
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="h6" fontWeight="600">
              {row.pname}
            </Typography>
          </Stack>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {row.customer}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {row.action}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" variant="h6">
            {row.time}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography color="textSecondary" fontWeight="400">
            {row.score}
          </Typography>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.grey.A200,
                  p: '5px 15px',
                  color: (theme) =>
                    `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : 'rgba(0, 0, 0, 0.87)'}`,
                }}
              >
                메일 본문
              </Typography>
              <Container>
              <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {row.content}
                </Typography>
              </Container>
            </Box>
            <Box margin={1}>
              <Typography
                gutterBottom
                variant="h5"
                sx={{
                  mt: 2,
                  backgroundColor: (theme) => theme.palette.grey.A200,
                  p: '5px 15px',
                  color: (theme) =>
                    `${theme.palette.mode === 'dark' ? theme.palette.grey.A200 : 'rgba(0, 0, 0, 0.87)'}`,
                }}
              >
                이벤트 로그
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">메일 제목</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">메세지</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">시간</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6">분류</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.customerId}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="textSecondary" fontWeight="400">
                          {historyRow.date}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {/* Chip을 사용하여 정상과 피싱을 표시 */}
                        <Chip
                          label={historyRow.category}
                          color={historyRow.category === 'User' ? 'success' : 'error'}
                          size="small"
                          sx={{ borderRadius: '4px' }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    pname: PropTypes.string,
    customer: PropTypes.string,
    action: PropTypes.string,
    time: PropTypes.string,
    score: PropTypes.number,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        date: PropTypes.string.isRequired,
        customerId: PropTypes.string.isRequired,
        action: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired, // category 속성 추가
      }),
    ).isRequired,
  }).isRequired,
};

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Collapsible Table',
  },
];

const CollapsibleTable = () => (
       <Paper variant="outlined">
        <TableContainer component={Paper}>
          <Table
            aria-label="collapsible table"
            sx={{
              whiteSpace: {
                xs: 'nowrap',
                sm: 'unset',
              },
            }}
          >
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>
                  <Typography variant="h6">피싱 메일 제목</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">사용자 정보</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">행위</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">시간</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">점수</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <Row key={row.pname} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

);

export default CollapsibleTable;
