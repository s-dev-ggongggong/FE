import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const Attach = () => {
    return (
        <div>
            <PageContainer>
            <Breadcrumb title="훈련 데이터 관리" subtitle="훈련에 사용될 훈련용 첨부파일을 관리합니다." />
            </PageContainer>
        </div>
    );
};

export default Attach;