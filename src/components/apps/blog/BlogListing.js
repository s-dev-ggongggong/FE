import React, { useEffect, useState } from 'react';
import { Button, Grid, Stack, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import BlogFeaturedCard from './BlogFeaturedCard';
import { useNavigate } from 'react-router-dom';
import { isBefore, isAfter, compareAsc, compareDesc } from 'date-fns';

const BlogListing = () => {
    const navigate = useNavigate();
    const [trainings, setTrainings] = useState([]);
    const [filteredTrainings, setFilteredTrainings] = useState([]);
    const [filter, setFilter] = useState('date-desc'); // 기본 필터: 최신순

    // 훈련 데이터 API 호출
    useEffect(() => {
        fetch('http://43.203.225.15:8000/training')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const trainingData = data?.data?.data;
                if (trainingData && Array.isArray(trainingData)) {
                    setTrainings(trainingData);
                    setFilteredTrainings(trainingData); // 초기 필터 데이터 설정
                } else {
                    console.error('Unexpected response structure or no training data:', data);
                }
            })
            .catch((error) => {
                console.error('Error fetching training data:', error);
            });
    }, []);

    // 필터가 변경될 때마다 trainings 배열을 정렬하여 filteredTrainings에 저장
    useEffect(() => {
        applyFilter();
    }, [filter, trainings]);

    const applyFilter = () => {
        let sortedTrainings = [...trainings];

        switch (filter) {
            case 'date-asc': // 시간 기준 오름차순 (오래된 순)
                sortedTrainings.sort((a, b) => compareAsc(new Date(a.trainingStart), new Date(b.trainingStart)));
                break;
            case 'date-desc': // 시간 기준 내림차순 (최신순)
                sortedTrainings.sort((a, b) => compareDesc(new Date(a.trainingStart), new Date(b.trainingStart)));
                break;
            case 'status-in-progress': // 진행 중인 훈련
                sortedTrainings = sortedTrainings.filter(training => {
                    const today = new Date();
                    return isBefore(new Date(training.trainingStart), today) && isAfter(new Date(training.trainingEnd), today);
                });
                break;
            case 'status-completed': // 종료된 훈련
                sortedTrainings = sortedTrainings.filter(training => isBefore(new Date(training.trainingEnd), new Date()));
                break;
            case 'status-upcoming': // 대기 중인 훈련
                sortedTrainings = sortedTrainings.filter(training => isAfter(new Date(training.trainingStart), new Date()));
                break;
            default:
                break;
        }

        setFilteredTrainings(sortedTrainings);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleCreateClick = () => {
        navigate('/apps/training/create');
    };

    return (
        <div>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                <Typography variant='h3'>전체 {filteredTrainings.length}개</Typography>

                <Stack direction={'row'} spacing={2}>
                    {/* 필터 선택 */}
                    <FormControl variant="outlined" size="small">
                        <Select value={filter} onChange={handleFilterChange} displayEmpty>
                            {/* 기본 선택 항목 */}
                            <MenuItem value="" disabled>
                                정렬 기준 선택
                            </MenuItem>
                            <MenuItem value="date-desc">시간 (최신순)</MenuItem>
                            <MenuItem value="date-asc">시간 (오래된 순)</MenuItem>
                            <MenuItem value="status-in-progress">상태 (진행 중)</MenuItem>
                            <MenuItem value="status-completed">상태 (종료됨)</MenuItem>
                            <MenuItem value="status-upcoming">상태 (대기 중)</MenuItem>
                        </Select>
                    </FormControl>


                    <Button variant="contained" onClick={handleCreateClick}>
                        새로 만들기
                    </Button>
                </Stack>
            </Stack>

            <br />

            <Grid container spacing={3}>
                {filteredTrainings.length > 0 ? (
                    filteredTrainings.map((training, index) => (
                        <BlogFeaturedCard index={index} post={training} key={training.id} />
                    ))
                ) : (
                    <Typography variant='h6'>No training data available.</Typography>
                )}
            </Grid>
        </div>
    );
};

export default BlogListing;
