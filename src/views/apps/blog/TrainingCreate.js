import PageContainer from '../../../components/container/PageContainer';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Button, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Table, TableBody, TableCell, TableRow, Autocomplete } from '@mui/material';
import React, { useState } from 'react';
import ParentCard from '../../../components/shared/ParentCard';
import { Box } from '@mui/system';
import axios from 'axios';

const TrainingCreate = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    resourceUserCount: '',
    maxPhishingEmails: '',
    departTarget: []
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value
    }));
  };

  const handleDepartmentChange = (event, newValue) => {
    setFormData((prevState) => ({
      ...prevState,
      departTarget: newValue.map(dept => dept.id) // id를 저장
    }));
  };

  const depart = [
    { title: '인사부', code: 'HR', id: 1 },
    { title: '정보기술부', code: 'IT', id: 2 },
    { title: '재무부', code: 'FN', id: 3 },
    { title: '마케팅부', code: 'MK', id: 4 },
    { title: '영업부', code: 'SL', id: 5 },
    { title: '연구개발부', code: 'RD', id: 6 },
    { title: '고객지원부', code: 'CS', id: 7 },
    { title: '운영부', code: 'OP', id: 8 },
    { title: '법무부', code: 'LG', id: 9 },
    { title: '제품관리부', code: 'PM', id: 10 },
    { title: '품질보증부', code: 'QA', id: 11 },
    { title: '홍보부', code: 'PR', id: 12 }
  ];

  const handleSubmit = () => {
    const payload = {
      trainingName: formData.title,
      trainingDesc: formData.description,
      trainingStart: formData.startDate,
      trainingEnd: formData.endDate,
      resourceUser: formData.resourceUserCount,
      maxPhishingMail: formData.maxPhishingEmails,
      departTarget: formData.departTarget
    };

    // POST 요청 보내기 (예: axios를 사용)
    axios.post('/training', payload)
      .then((response) => {
        console.log('성공:', response);
        handleClose();
      })
      .catch((error) => {
        console.error('오류:', error);
      });
  };

  return (
    <div>
      <PageContainer>
        <Breadcrumb title="훈련 생성" subtitle="새로운 훈련을 생성합니다." />
        <ParentCard title="새로운 훈련">
          <div>
            <Grid container spacing={3}>
              {/* 1 */}
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="title" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  훈련 제목
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField id="title" placeholder="훈련 제목을 입력 해주세요." fullWidth onChange={handleChange} />
              </Grid>
              {/* 2 */}
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="description" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  훈련 설명
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField id="description" placeholder="훈련 설명을 입력 해주세요." fullWidth onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="startDate" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  훈련 시작일
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField type="date" id="startDate" fullWidth onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="endDate" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  훈련 종료일
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField type="date" id="endDate" fullWidth onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="departTarget" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  훈련 대상 부서 선택
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <Autocomplete
                  multiple
                  fullWidth
                  id="departTarget"
                  options={depart.filter(dept => !formData.departTarget.includes(dept.id))} // 선택된 부서의 id를 필터링
                  getOptionLabel={(option) => option.title}
                  filterSelectedOptions
                  onChange={handleDepartmentChange}
                  renderInput={(params) => (
                    <CustomTextField {...params} placeholder="부서 선택" aria-label="Departments" />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="resourceUserCount" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  리소스 유저 수
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField type="number" id="resourceUserCount" placeholder="피싱 메일을 발송하는 계정의 수" fullWidth onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={3} display="flex" alignItems="center">
                <CustomFormLabel htmlFor="maxPhishingEmails" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                  인당 최대 피싱 메일 발송 수
                </CustomFormLabel>
              </Grid>
              <Grid item xs={12} sm={9}>
                <CustomTextField type="number" id="maxPhishingEmails" placeholder="리소스 유저의 최대 메일 발송 수" fullWidth onChange={handleChange} />
              </Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={6}>
                <Stack justifyContent={'center'}>
                  <Button variant="contained" color="primary" onClick={handleClickOpen}>생성</Button>
                </Stack>
              </Grid>
            </Grid>

            <Dialog
              fullWidth
              maxWidth={'lg'}
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>훈련 생성 요약</DialogTitle>
              <DialogContent>

                <Box>
                  <Table>
                    <TableBody>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>훈련 제목</TableCell>
                        <TableCell>{formData.title}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>훈련 설명</TableCell>
                        <TableCell>{formData.description}</TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>훈련 시작일</TableCell>
                        <TableCell>{formData.startDate}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>훈련 종료일</TableCell>
                        <TableCell>{formData.endDate}</TableCell>
                      </TableRow>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell>리소스 유저 수</TableCell>
                        <TableCell>{formData.resourceUserCount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>인당 최대 피싱 메일 발송 수</TableCell>
                        <TableCell>{formData.maxPhishingEmails}</TableCell>
                      </TableRow>
                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                          <TableCell>훈련 부서 선택</TableCell>
                          <TableCell>
                            {formData.departTarget
                              .map((id) => depart.find((dept) => dept.id === id)?.title)
                              .join(', ')}
                          </TableCell>
                        </TableRow>
                      <TableRow>
                        <TableCell>전체 발송 가능한 최대 피싱 메일 수</TableCell>
                        <TableCell>{formData.maxPhishingEmails * formData.resourceUserCount}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button color="error" variant="contained" onClick={handleClose}>취소</Button>
                <Button color="primary" variant="contained" onClick={handleSubmit}>생성</Button>
              </DialogActions>
            </Dialog>
          </div>
        </ParentCard>
      </PageContainer>
    </div>
  );
};

export default TrainingCreate;
