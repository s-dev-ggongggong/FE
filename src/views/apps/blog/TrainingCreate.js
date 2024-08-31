import PageContainer from '../../../components/container/PageContainer';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import { Grid, Button, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import ParentCard from '../../../components/shared/ParentCard';
import { Box } from '@mui/system';

const TrainingCreate = () => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        csvFile: null,
        resourceUserCount: '',
        maxPhishingEmails: ''
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { id, value, files } = e.target;
        if (files) {
            setFormData((prevState) => ({
                ...prevState,
                [id]: files[0]
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [id]: value
            }));
        }
    };

    const handleSubmit = () => {
        // 여기에서 formData를 API에 제출하는 로직을 추가할 수 있습니다.
        // 예: axios.post('/training/create', formData)
        handleClose();
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
                                <CustomTextField type="date" id="startDate" placeholder="" fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={3} display="flex" alignItems="center">
                                <CustomFormLabel htmlFor="endDate" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                                    훈련 종료일
                                </CustomFormLabel>
                            </Grid>
                            <Grid item xs={12} sm={9}>
                                <CustomTextField type="date" id="endDate" placeholder="" fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={3} display="flex" alignItems="center">
                                <CustomFormLabel htmlFor="csvFile" sx={{ mt: 0, mb: { xs: '-10px', sm: 0 } }}>
                                    훈련 대상 업로드 (csv)
                                </CustomFormLabel>
                            </Grid>
                            <Grid item xs={12} sm={7}>
                                <CustomTextField type="file" id="csvFile" placeholder="" fullWidth onChange={handleChange} />
                            </Grid>
                            <Grid item xs={12} sm={2}>
                                <Button variant="outlined" size="medium">
                                    양식 다운로드
                                </Button>
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
                                            {/* CSV 파일은 이름만 표시 */}
                                            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                                <TableCell>훈련 대상 파일</TableCell>
                                                <TableCell>{formData.csvFile ? formData.csvFile.name : '파일이 선택되지 않았습니다.'}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>전체 발송 가능한 최대 피싱 메일 수</TableCell>
                                                <TableCell>{formData.maxPhishingEmails*formData.resourceUserCount}</TableCell>
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
