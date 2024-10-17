import React from 'react';
import Chart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';
import ParentCard from '../../components/shared/ParentCard';
import PaginationTable from '../tables/PaginationTable';

// 랜덤 숫자를 생성하는 함수
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const Main = () => {
    const theme = useTheme();
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const warning = theme.palette.warning.main;

    // 도넛 차트 옵션
    const optionsdoughnutchart1 = {
        chart: {
            id: 'donut-chart',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
        },
        dataLabels: {
            enabled: false,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '70px',
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            width: '50px',
        },
        colors: [secondary, primary, warning],
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
        labels: ["예정됨", "진행 중", "완료"]
    };

    const seriesdoughnutchart1 = [17, 19, 14];
    const chartColors = optionsdoughnutchart1.colors; // 도넛 차트의 색상 배열

    // 바 차트 옵션 및 랜덤 시리즈 데이터
    const optionsbarchart = {
        chart: {
            id: 'bar-chart',
            type: 'bar',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            foreColor: '#adb0bb',
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded',
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: ["답장", "전달", "일반적인 주제"],
        },
        colors: [primary, primary, warning],
        legend: {
            show: true,
        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            theme: 'dark',
            fillSeriesColor: false,
        },
    };

    // 랜덤한 바 차트 데이터를 생성
    const seriesbarchart = [
        {
            name: '개수',
            data: [getRandomNumber(10, 50), getRandomNumber(10, 50), getRandomNumber(10, 50)]
        }
    ];

    return (
        <div>
            <PageContainer>
                <Breadcrumb title="Dashboard" subtitle="대시보드 입니다." />
                <Grid container spacing={3}>
                    <Grid item lg={6} md={12} xs={12}>
                        <ParentCard title="전체 훈련 현황">
                            <Chart
                                options={optionsdoughnutchart1}
                                series={seriesdoughnutchart1}
                                type="donut"
                                height="350px"
                            />
                        </ParentCard>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <ParentCard title='생성된 훈련용 피싱메일 유형'>
                            {/* Bar Chart 추가 */}
                            <Chart
                                options={optionsbarchart}
                                series={seriesbarchart}
                                type="bar"
                                height="300px"
                            />
                        </ParentCard>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item lg={4} md={12} xs={12}>
                        <ParentCard title='예정된 훈련 현황'>
                            {/* 도넛 차트 색상 적용 및 '개'는 기본색 */}
                            <h1 style={{ fontSize: '80px' }}>
                                <span style={{ color: chartColors[0] }}>{seriesdoughnutchart1[0]}</span>
                                <span style={{ fontSize: '72px', color: '#000' }}>건</span>
                            </h1>
                        </ParentCard>
                    </Grid>
                    <Grid item lg={4} md={12} xs={12}>
                        <ParentCard title="진행 중인 훈련 현황">
                            <h1 style={{ fontSize: '80px' }}>
                                <span style={{ color: chartColors[1] }}>{seriesdoughnutchart1[1]}</span>
                                <span style={{ fontSize: '72px', color: '#000' }}>건</span>
                            </h1>
                        </ParentCard>
                    </Grid>
                    <Grid item lg={4} md={12} xs={12}>
                        <ParentCard title='종료된 훈련 현황'>
                            <h1 style={{ fontSize: '80px' }}>
                                <span style={{ color: chartColors[2] }}>{seriesdoughnutchart1[2]}</span>
                                <span style={{ fontSize: '72px', color: '#000' }}>건</span>
                            </h1>
                        </ParentCard>
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                        <ParentCard title="이벤트 로그">
                            <PaginationTable></PaginationTable>
                        </ParentCard>
                    </Grid>
                </Grid>
            </PageContainer>
        </div>
    );
};

export default Main;
