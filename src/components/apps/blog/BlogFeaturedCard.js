import React, { useEffect, useState } from 'react';
import {
  CardContent,
  Stack,
  Typography,
  Chip,
  Grid,
  Tooltip,
  Box,
  alpha,
  styled,
  Skeleton,
} from '@mui/material';
import { format, differenceInDays, isBefore, isAfter } from 'date-fns';
import BlankCard from '../../shared/BlankCard';
import { useNavigate } from 'react-router-dom'; // useNavigate import 추가

const CoverImgStyle = styled(CardContent)({
  position: 'absolute',
  top: '0',
  left: '0',
  zIndex: 1,
  width: '100%',
  height: '100%',
  color: 'white',
});

const CoverBox = styled(Box)({
  top: 0,
  content: "''",
  width: '100%',
  height: '100%',
  position: 'absolute',
});

// 부서 코드 -> 한글 부서명 매핑
const depart = [
  { title: '인사부', code: 'HR', id: 1 },
  { title: '정보기술부', code: 'IT', id: 2 },
  { title: '재무부', code: 'FN', id: 3 },
  { title: '마케팅부', code: 'MK', id: 4 },
  { title: '영업부', code: 'SL', id: 5 },
  { title: '연구개발부', code: 'RD', id: 6 },
  { title: '고객지원부', code: 'CS', id: 7 },
  { title: '운영부', code: 'OP', id: 8 },
  { title: '법무부', code: 'LG', id: 9 },
  { title: '제품관리부', code: 'PM', id: 10 },
  { title: '품질보증부', code: 'QA', id: 11 },
  { title: '홍보부', code: 'PR', id: 12 },
];

const BlogFeaturedCard = ({ post, index }) => {
  const navigate = useNavigate(); // useNavigate hook 사용

  const {
    trainingName,
    trainingDesc,
    departTarget,
    trainingStart,
    trainingEnd,
    maxPhishingMail,
    resourceUser,
    id, // id 추가
  } = post;

  const mainPost = index === 0;

  // 이미지 배열 (기존 Mock 데이터에서 사용된 이미지들)
  const images = [
    '/src/assets/images/blog/blog-img1.jpg',
    '/src/assets/images/blog/blog-img2.jpg',
    '/src/assets/images/blog/blog-img3.jpg',
    '/src/assets/images/blog/blog-img4.jpg',
    '/src/assets/images/blog/blog-img5.jpg',
    '/src/assets/images/blog/blog-img6.jpg',
    '/src/assets/images/blog/blog-img7.jpg',
    '/src/assets/images/blog/blog-img8.jpg',
    '/src/assets/images/blog/blog-img9.jpg',
    '/src/assets/images/blog/blog-img10.jpg',
  ];

  // 랜덤 이미지 선택
  const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

  const CoverImgBg = styled(BlankCard)({
    p: 0,
    height: '400px',
    position: 'relative',
    background: `url(${getRandomImage()}) no-repeat center`,
    backgroundSize: 'cover',
  });

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, []);

  // 부서 코드 -> 한글 부서명 치환
  const getDeptNames = (ids) => {
    return ids
      .map((id) => depart.find((dept) => dept.id === id)?.title || `Unknown (${id})`)
      .join(', ');
  };

  // 훈련 상태 계산
  const today = new Date();
  let statusLabel = '';
  let dDayLabel = '';

  if (isBefore(today, new Date(trainingStart))) {
    statusLabel = '대기중';
  } else if (isAfter(today, new Date(trainingEnd))) {
    statusLabel = '종료됨';
  } else {
    const dDay = differenceInDays(new Date(trainingEnd), today);
    statusLabel = '진행 중';
    dDayLabel = `D-${dDay}`;
  }

  // 카드 클릭 시 해당 훈련의 상세 페이지로 이동
  const handleCardClick = () => {
    navigate(`/apps/training/view/${id}`); // 해당 훈련의 ID로 이동
  };

  return (
    <Grid
      item
      xs={12}
      lg={mainPost ? 8 : 4}
      md={12}
      sm={12}
      display="flex"
      alignItems="stretch"
      onClick={handleCardClick} // 카드 클릭 시 handleCardClick 함수 호출
    >
      {isLoading ? (
        <Skeleton
          variant="square"
          animation="wave"
          width="100%"
          height={400}
          sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
        />
      ) : (
        <CoverImgBg className="hoverCard">
          <CoverBox
            sx={{ backgroundColor: (theme) => alpha(theme.palette.grey[900], 0.6) }}
          />
          <CoverImgStyle>
            <Box
              height={'100%'}
              display={'flex'}
              justifyContent="space-between"
              flexDirection="column"
            >
              <Box>
                <Stack direction="row" justifyContent="space-between">
                  {/* 상태 Chip 출력 (왼쪽 상단) */}
                  <Chip
                    label={statusLabel === '진행 중' ? `${statusLabel} (${dDayLabel})` : statusLabel}
                    color={statusLabel === '대기중' ? 'warning' : statusLabel === '종료됨' ? 'default' : 'success'}
                    size="small"
                  />
                  
                  {/* 부서명 Chip 출력 (오른쪽 상단) - 개수만 표시 */}
                  <Tooltip title={`훈련 부서: ${getDeptNames(departTarget)}`} placement="top">
                    <Chip
                      sx={{ marginLeft: 'auto' }}
                      label={`${departTarget.length}개 부서`}
                      size="small"
                      color="primary"
                    />
                  </Tooltip>
                </Stack>
              </Box>
              <Box>
                <Box my={3}>
                  <Typography
                    gutterBottom
                    variant="h3"
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                  >
                    {trainingName}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="inherit"
                    sx={{ textDecoration: 'none' }}
                  >
                    {trainingDesc}
                  </Typography>
                </Box>
                <Stack direction="row" gap={3} alignItems="center">
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography variant="body2">
                      {format(new Date(trainingStart), 'yyyy-MM-dd')}
                    </Typography>
                  </Stack>
                  ~
                  <Stack direction="row" gap={1} alignItems="center">
                    <Typography variant="body2">
                      {format(new Date(trainingEnd), 'yyyy-MM-dd')}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </CoverImgStyle>
        </CoverImgBg>
      )}
    </Grid>
  );
};

export default BlogFeaturedCard;
