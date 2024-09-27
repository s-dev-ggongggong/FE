import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Box } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

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
  const [training, setTraining] = useState(null);

  useEffect(() => {
    // API 요청을 통해 특정 훈련 데이터를 가져옴
    fetch(`http://43.203.225.15:8000/training/${id}`)
      .then((response) => response.json())
      .then((responseData) => {
        setTraining(responseData.data); // 응답 데이터에서 data를 가져옴
      })
      .catch((error) => {
        console.error('Error fetching training data:', error);
      });
  }, [id]);

  if (!training) {
    return <div>Loading...</div>;
  }

  // 부서 ID를 한글 부서명으로 매핑하는 함수
  const getDeptNames = (ids) => {
    return ids
      .map((id) => depart.find((dept) => dept.id === id)?.title || `Unknown (${id})`)
      .join(', ');
  };

  return (
    <div>
      <PageContainer>
        <Breadcrumb title="Training" subtitle="훈련 대시보드 입니다." />
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            <ParentCard title={training.trainingName}>
              <p>훈련 설명: {training.trainingDesc}</p>
              <p>훈련 시작일: {new Date(training.trainingStart).toLocaleDateString()}</p>
              <p>훈련 종료일: {new Date(training.trainingEnd).toLocaleDateString()}</p>
              {/* 참여 부서를 한글로 표시 */}
              <p>참여 부서: {getDeptNames(training.departTarget)}</p>
              <p>최대 피싱 메일: {training.maxPhishingMail}</p>
              <p>리소스 유저: {training.resourceUser}</p>
            </ParentCard>
          </Grid>
        </Grid>
        <br />
        <br />
        <Grid container spacing={3}>
          {/* 왼쪽 박스 */}
          <Grid item lg={6} md={12} xs={12}>
            <Box sx={{ height: '100%' }}>
              <ParentCard title="피싱 메일 생성 현황">
                {/* 왼쪽 콘텐츠 */}
              </ParentCard>
            </Box>
          </Grid>
          {/* 오른쪽 박스 */}
          <Grid item lg={6} md={12} xs={12}>
            <Box sx={{ height: '100%' }}>
              <ParentCard title="주요 이벤트">
                {/* 오른쪽 콘텐츠 */}
              </ParentCard>
            </Box>
          </Grid>
        </Grid>
      </PageContainer>
    </div>
  );
};

export default TrainingView;
