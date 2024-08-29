import React from 'react';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import PageContainer from '../../../components/container/PageContainer';
import BlogListing from 'src/components/apps/blog/BlogListing';
import { Button, Stack } from '@mui/material';

const Blog = () => {
  return (
    <PageContainer title="훈련 현황" description="훈련 현황을 볼 수 있습니다.">
      <Breadcrumb title="훈련 현황" subtitle="진행 중인 훈련을 보거나 훈련을 새롭게 생성 할 수 있습니다." />
      {/* ------------------------------------------- */}
      {/* Blog Listing */}
      {/* ------------------------------------------- */}
      <BlogListing />
    </PageContainer>
  );
};

export default Blog;
