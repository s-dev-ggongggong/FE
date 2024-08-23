import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const Dashboard = () => {
    return (
        <div>
            <PageContainer>
                <Breadcrumb title="Dashboard" subtitle="대시보드 입니다." />
            </PageContainer>
        </div>
    );
};

export default Dashboard;