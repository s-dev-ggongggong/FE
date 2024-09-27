import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';
import ParentCard from '../../components/shared/ParentCard';

const Main = () => {
    return (
        <div>
            <PageContainer>
                <Breadcrumb title="Dashboard" subtitle="대시보드 입니다." />
                <Grid container spacing={3}>
                    <Grid item lg={6} md={12} xs={12}>
                        <ParentCard title="전체 훈련 현황">

                        </ParentCard>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <ParentCard title='서비스 사용량'>

                        </ParentCard>
                    </Grid>
                    
                </Grid>
                <br></br>
                <Grid container spacing={3}>
                    <Grid item lg={6} md={12} xs={12}>
                        <ParentCard title="진행 중인 훈련 현황">

                        </ParentCard>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <ParentCard title='종료된 훈련 현황'>

                        </ParentCard>
                    </Grid>
                    
                </Grid>
                <br></br>
                <Grid container spacing={3}>
                    <Grid item lg={12} md={12} xs={12}>
                        <ParentCard title="이벤트 로그">

                        </ParentCard>
                    </Grid>
                    
                </Grid>
            </PageContainer>
        </div>
    );
};

export default Main;