import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid } from '@mui/material';
import ParentCard from '../../../components/shared/ParentCard';

const Dashboard = () => {
    return (
        <div>
            <PageContainer>
                <Breadcrumb title="Dashboard" subtitle="대시보드 입니다." />
                <Grid container spacing={3}>
                    <Grid item lg={6} md={12} xs={12}>
                        <ParentCard title="Doughnut Charts">
                            
                        </ParentCard>
                    </Grid>
                    <Grid item lg={6} md={12} xs={12}>
                        <ParentCard title='Pie Charts'>

                        </ParentCard>
                    </Grid>
                </Grid>
            </PageContainer>
        </div>
    );
};

export default Dashboard;