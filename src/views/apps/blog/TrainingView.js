import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, TableContainer } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';
import CollapsibleTable from '../../tables/CollapsibleTable';

// 부서 ID와 한글 이름을 매핑하는 배열
const depart = [
  { title: '인사부', id: 1 },
  { title: '정보기술부', id: 2 },
  { title: '재무부', id: 3 },
  { title: '마케팅부', id: 4 },
  { title: '영업부', id: 5 },
  { title: '연구개발부', id: 6 },
  { title: '고객지원부', id: 7 },
  { title: '운영부', id: 8 },
  { title: '법무부', id: 9 },
  { title: '제품관리부', id: 10 },
  { title: '품질보증부', id: 11 },
  { title: '홍보부', id: 12 },
];

const TrainingView = () => {
  const { id } = useParams(); // URL에서 ID 추출
  const [trainingData, setTrainingData] = useState(null);

  useEffect(() => {
    // 더미 데이터를 설정
    const dummyData = {
      training: {
        training_name: 'Social Engineering Phishing Simulation',
        training_desc: '이 훈련은 피싱 메일 대응을 위한 모의 훈련입니다.',
        training_start: '2023-09-28T00:00:00Z',
        training_end: '2023-10-20T23:59:59Z',
        dept_target: JSON.stringify([1, 2, 3]), // 부서 ID 리스트
        max_phishing_mail: 50,
        resource_user: '홍길동',
        status: 'RUN',
      },
      emails: [],
      event_logs: [],
      user_event_logs: [],
    };

    // 더미 데이터로 상태 업데이트
    setTrainingData(dummyData);
  }, []);

  if (!trainingData) {
    return <div>Loading...</div>;
  }

  const { training, emails, event_logs, user_event_logs } = trainingData;

  // 부서 ID를 한글 부서명으로 매핑하는 함수
  const getDeptNames = (ids) => {
    if (!Array.isArray(ids)) return 'Unknown';
    return ids
      .map((id) => depart.find((dept) => dept.id === id)?.title || `Unknown (${id})`)
      .join(', ');
  };

  // UTF-8 인코딩된 문자열을 디코딩하는 함수
  const decodeUTF8 = (str) => {
    try {
      return decodeURIComponent(escape(str)); // UTF-8 디코딩
    } catch (e) {
      return str; // 디코딩 실패 시 원본 반환
    }
  };

  return (
    <div>
      <PageContainer>
        <Breadcrumb title="Training" subtitle="훈련 대시보드입니다." />
        
        {/* 훈련 기본 정보 표시 */}
        <Grid container spacing={3}>
          <Grid item lg={4} md={12} xs={12}>
            <ParentCard title={"훈련 정보 - "+ (training.status === 'RUN' ? '진행 중' : '종료됨')}>
            <p>제목:{training.training_name}</p>
              <p>{training.training_desc}</p>
            </ParentCard>
          </Grid>
          <Grid item lg={4} md={12} xs={12}>
            <ParentCard title="훈련 기간">
              <p>훈련 시작일: {new Date(training.training_start).toLocaleDateString()}</p>
              <p>훈련 종료일: {new Date(training.training_end).toLocaleDateString()}</p>
          
            </ParentCard>
          </Grid>
          <Grid item lg={4} md={12} xs={12}>
            <ParentCard title="참여 부서">
              <p>참여 부서: {getDeptNames(JSON.parse(training.dept_target))}</p>
              <p>최대 피싱 메일: {training.max_phishing_mail}</p>
            </ParentCard>
          </Grid>
        </Grid>
        
        <br />

        {/* Emails 정보 테이블 */}
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
          <ParentCard title="훈련 현황">
            <CollapsibleTable/>
            </ParentCard>
          </Grid>
        </Grid>

      </PageContainer>
    </div>
  );
};

export default TrainingView;
