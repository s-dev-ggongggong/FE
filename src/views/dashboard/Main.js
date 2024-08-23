import React from 'react';
import PageContainer from '../../components/container/PageContainer';
import Breadcrumb from '../../layouts/full/shared/breadcrumb/Breadcrumb';

const Main = () => {
    return (
        <div>
            <PageContainer>
            <Breadcrumb title="대시 보드" subtitle="대시 보드 입니다." />
            </PageContainer>
        </div>
    );
};

export default Main;