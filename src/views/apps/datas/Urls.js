import React, { useState } from 'react';
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete } from '@mui/icons-material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import ParentCard from '../../../components/shared/ParentCard';

const Urls = () => {
  // URL 목록 및 선택한 URL 상태 정의
  const [urlList, setUrlList] = useState([
    { id: 1, title: 'www.microsoft.com', url: '/phishing_templates/마이크로소프트에 로그인.html', description: 'Outlook Login' },
    { id: 2, title: 'www.facebook.com', url: '/phishing_templates/Log into Facebook _ Facebook.html', description: 'Facebook Login' },
    { id: 3, title: 'www.zoom.com', url: '/phishing_templates/줌 - 로그인.html', description: 'Zoom Login' },
    { id: 4, title: 'www.github.com', url: '/phishing_templates/GitHub - Login.html', description: 'GitHub Login' },
    { id: 5, title: 'www.google.com', url: '/phishing_templates/로그인 - 구글 계정.html', description: 'Google Login' },
  ]);

  const [selectedUrl, setSelectedUrl] = useState('');

  // 파일 입력창을 위한 참조 생성
  const fileInputRef = React.createRef();

  // URL 클릭 시 선택된 URL을 상태로 설정하는 함수
  const handleUrlClick = (url) => {
    setSelectedUrl(url);
  };

  // 파일 업로드 핸들러
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newUrl = {
          id: urlList.length + 1,
          title: `New Uploaded: ${file.name}`,
          url: `/phishing_templates/${file.name}`, // 업로드된 파일 경로를 public 폴더 기준으로 설정
          description: `Uploaded: ${file.name}`,
        };
        setUrlList((prev) => [...prev, newUrl]);
      };
      reader.readAsText(file);
    }
  };

  // + 버튼 클릭 시 파일 입력창 열기
  const handleAddClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // URL 삭제 핸들러
  const handleDelete = (id) => {
    const updatedList = urlList.filter((item) => item.id !== id);
    setUrlList(updatedList);
  };

  return (
    <PageContainer>
      <Breadcrumb title="훈련 데이터 관리" subtitle="훈련에 사용될 훈련용 피싱 링크를 관리합니다." />

      <Grid container spacing={2}>
        {/* 왼쪽: URL 목록 */}
        <Grid item xs={6}>
          <ParentCard title="URL 목록">
            {/* URL 리스트 테이블 */}
            <TableContainer component={Paper} style={{ height: '500px' }}>
              <Table size="small"> {/* DenseTable 스타일을 적용하기 위해 size="small" 사용 */}
                <TableHead>
                  <TableRow>
                    <TableCell>도메인</TableCell>
                    <TableCell>템플릿</TableCell>
                    <TableCell>Action</TableCell> {/* Action 컬럼 추가 */}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {urlList.map((urlItem) => (
                    <TableRow
                      key={urlItem.id}
                      hover
                      sx={{ cursor: 'pointer' }}
                      onClick={() => handleUrlClick(urlItem.url)} // URL 클릭 시 함수 호출
                    >
                      <TableCell>{urlItem.title}</TableCell>
                      <TableCell>{urlItem.description}</TableCell>
                      <TableCell>
                        {/* 편집 및 삭제 버튼 추가 */}
                        <IconButton
                          aria-label="edit"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation(); // 클릭 이벤트가 부모로 전파되는 것을 방지
                          }}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          size="small"
                          onClick={(e) => {
                            e.stopPropagation(); // 클릭 이벤트가 부모로 전파되는 것을 방지
                            handleDelete(urlItem.id);
                          }}
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                  {/* + 버튼을 위한 행 추가 */}
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      <IconButton onClick={handleAddClick}>
                        <Add fontSize="large" />
                      </IconButton>
                      {/* 파일 업로드 input hidden */}
                      <input
                        type="file"
                        accept=".html,.txt,.csv"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </ParentCard>
        </Grid>

        {/* 오른쪽: 선택된 URL 미리보기 */}
        <Grid item xs={6}>
          <ParentCard>
            <TableContainer component={Paper} style={{ height: '525px' }}>
              {/* iframe으로 선택된 URL을 보여줌 */}
              {selectedUrl ? (
                <iframe
                  src={selectedUrl}
                  title="URL Preview"
                  style={{ width: '100%', height: '100%', border: 'none', padding: '0', overflow: 'hidden' }}
                  scrolling="no" // 스크롤바 제거
                  frameBorder="0" // 기본 테두리 제거
                />
              ) : (
                <></>
              )}
            </TableContainer>
          </ParentCard>
        </Grid>

      </Grid>
    </PageContainer>
  );
};

export default Urls;
