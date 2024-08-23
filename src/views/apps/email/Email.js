import React from 'react';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';

const Email = () => {
  return (
    <div>
      <PageContainer title="이메일 서버 관리" description="이메일 서버 관리">
      <Breadcrumb title="이메일 서버 관리" subtitle="이메일 서버를 등록하고 관리하는 페이지 입니다." />
      </PageContainer>
    </div>
  );
};

export default Email;