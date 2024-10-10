import React, { useState } from 'react';
import { Grid, FormControl, MenuItem, FormControlLabel, Button, RadioGroup, Typography } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import CustomRadio from '../../../components/forms/theme-elements/CustomRadio';
import CustomSwitch from '../../../components/forms/theme-elements/CustomSwitch';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';

const Tickets = () => {
  // 상태 관리 변수 선언
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const [localModelEnabled, setLocalModelEnabled] = useState(false);

  // AI 모델 드롭다운 선택 처리 함수
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  // 로컬 모델 스위치 처리 함수
  const handleLocalModelSwitch = (event) => {
    setLocalModelEnabled(event.target.checked);
  };

  return (
    <div>
      <PageContainer>
        <Breadcrumb title="에이전트 관리" subtitle="이메일을 스캔하는 에이전트를 관리하는 페이지 입니다." />

        {/* 에이전트 관리 카드 */}
        <ParentCard title="피싱 메일 생성 AI 모델 선택 및 설정">
          <Grid container spacing={3}>
            {/* AI 모델 선택 드롭다운 */}
            <Grid item xs={12} sm={6} lg={4}>
              <CustomFormLabel htmlFor="ai-model-select">AI 모델 선택</CustomFormLabel>
              <CustomSelect
                id="ai-model-select"
                value={selectedModel}
                onChange={handleModelChange}
                fullWidth
                size="small"
              >
                <MenuItem value="gpt-3.5">GPT-3.5</MenuItem>
                <MenuItem value="gpt-4">GPT-4</MenuItem>
                <MenuItem value="local-llm">로컬 LLM</MenuItem>
                <MenuItem value="custom-model">사용자 정의 모델</MenuItem>
              </CustomSelect>
            </Grid>

            {/* 로컬 모델 활성화 스위치 */}
            <Grid item xs={12} sm={6} lg={4}>
              <CustomFormLabel>로컬 모델 활성화</CustomFormLabel>
              <FormControlLabel
                control={<CustomSwitch checked={localModelEnabled} onChange={handleLocalModelSwitch} />}
                label="로컬 LLM 사용"
              />
            </Grid>

            {/* 선택된 모델 설명 */}
            <Grid item xs={12} sm={12} lg={12}>
              <CustomFormLabel>선택된 모델 정보</CustomFormLabel>
              <Typography variant="body2">
                현재 선택된 AI 모델: {selectedModel}
              </Typography>
              <Typography variant="body2">
                {selectedModel === 'gpt-3.5' && '기본 AI 모델로 GPT-3.5가 설정되어 있습니다.'}
                {selectedModel === 'gpt-4' && '고급 AI 모델로 GPT-4가 설정되어 있습니다.'}
                {selectedModel === 'local-llm' && '로컬 환경에서 실행되는 LLM 모델이 활성화되었습니다.'}
                {selectedModel === 'custom-model' && '사용자 정의 AI 모델이 선택되었습니다. 설정을 확인하세요.'}
              </Typography>
            </Grid>
          </Grid>

          {/* AI 모델 저장 버튼 */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <Button variant="contained" color="primary">
              저장
            </Button>
            <Button variant="outlined" color="secondary">
              취소
            </Button>
          </Stack>
        </ParentCard>
      </PageContainer>
    </div>
  );
};

export default Tickets;
