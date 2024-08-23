import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const Tickets = () => {
  return (
    <div>
      <PageContainer>
      <Breadcrumb title="에이전트 관리" subtitle="이메일을 스캔하는 에이전트를 관리하는 페이지 입니다." />
      </PageContainer>
    </div>
  );
};

export default Tickets;