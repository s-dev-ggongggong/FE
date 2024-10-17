import React, { useState } from 'react';
import { Grid, FormControlLabel, Button, Typography, MenuItem } from '@mui/material'; // MenuItem 추가
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import CustomSwitch from '../../../components/forms/theme-elements/CustomSwitch';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import './CodeBlock.css'; // Custom CSS for code block

const Tickets = () => {
  // 상태 관리 변수 선언
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const [localModelEnabled, setLocalModelEnabled] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  // 모델별 프롬프트 및 결과 예시 데이터
  const modelExamples = {
    'gpt-3.5': {
      prompt: `
        phishing_prompt = (
            이메일 내용을 분석해서 한국어로 그 이메일 내용에 답장을 하기 위한 이메일을 작성해 주세요."
            발신자와 수신자는 같은 부서의 직원입니다."
            답장 이메일 내용에는 기존 이메일에서 원했던 요청에 대한 답변 내용이 들어가 있어야 합니다."
            답변에 따라 링크를 넣을 경우, example.com이라는 url이 들어있어야 합니다."
            답장 이메일의 제목은 RE: (기존 이메일의 제목) 형식이어야 합니다."
            발신자: {from_text}"
            수신자: {to_text}"
            제목: {subject_text}"
            본문:{body_text}"
            이메일 제목과 본문을 구분하여 작성해 주세요."
        )`,
      result: 'The capital of France is Paris.',
    },
    'gpt-4': {
      prompt: `phishing_prompt = (
            다음 원본 이메일 내용을 분석해서 한국어로 그 이메일 내용에 답장을 하기 위한 이메일을 작성해 주세요."
            발신자와 수신자는 같은 부서의 직원입니다."
            답장 이메일 내용에는 기존 이메일에서 원했던 요청에 대한 답변 내용이 들어가 있어야 합니다."
            답변에 따라 링크를 넣을 경우, example.com이라는 url이 들어있어야 합니다."
            답장 이메일의 제목은 RE: (기존 이메일의 제목) 형식이어야 합니다."
            발신자: {from_text}"
            수신자: {to_text}"
            제목: {subject_text}"
            본문:{body_text}"
            이메일 제목과 본문을 구분하여 작성해 주세요."
        )`,
      result: 'The theory of relativity, proposed by Einstein, states that time and space are relative and not absolute concepts.',
    },
    'local-llm': {
      prompt: `phishing_prompt = (
            다음 원본 이메일 내용을 분석해서 한국어로 그 이메일 내용에 답장을 하기 위한 이메일을 작성해 주세요."
            발신자와 수신자는 같은 부서의 직원입니다."
            답장 이메일 내용에는 기존 이메일에서 원했던 요청에 대한 답변 내용이 들어가 있어야 합니다."
            답변에 따라 링크를 넣을 경우, example.com이라는 url이 들어있어야 합니다."
            답장 이메일의 제목은 RE: (기존 이메일의 제목) 형식이어야 합니다."
            발신자: {from_text}"
            수신자: {to_text}"
            제목: {subject_text}"
            본문:{body_text}"
            이메일 제목과 본문을 구분하여 작성해 주세요."
        )`,
      result: '안녕하세요, 어떻게 지내세요?',
    },
    'custom-model': {
      prompt: `phishing_prompt = (
            다음 원본 이메일 내용을 분석해서 한국어로 그 이메일 내용에 답장을 하기 위한 이메일을 작성해 주세요."
            발신자와 수신자는 같은 부서의 직원입니다."
            답장 이메일 내용에는 기존 이메일에서 원했던 요청에 대한 답변 내용이 들어가 있어야 합니다."
            답변에 따라 링크를 넣을 경우, example.com이라는 url이 들어있어야 합니다."
            답장 이메일의 제목은 RE: (기존 이메일의 제목) 형식이어야 합니다."
            발신자: {from_text}"
            수신자: {to_text}"
            제목: {subject_text}"
            본문:{body_text}"
            이메일 제목과 본문을 구분하여 작성해 주세요."
        )`,
      result: 'The stock market has seen significant volatility recently, with tech stocks experiencing a sharp decline...',
    },
  };
  const sample = `
  
  안녕하세요, 김철수님.

아래 요청하신 자료 검토 요청에 대한 회신입니다. 
추가 요청 자료를 다음과 같이 정리해 보았습니다.

<a href="http://43.203.225.15:7777/click?user=eyJlbXBsb3llZV9pZCI6IDIsICJpZCI6IDEwMSwgIm5hbWUiOiAiXHVhZTQwXHVjY2EwXHVjMjE4IiwgInRyYWluaW5nX2lkIjogMzMsICJlbWFpbF9pZCI6ICJ0ZXN0MUBpcC0xMC0wLTEwLTE2Mi5hcC1ub3J0aGVhc3QtMi5jb21wdXRlLmludGVybmFsIiwgImRlcGFydG1lbnRfaWQiOiAyfQ">링크</a>

해당 링크를 통해 자료를 확인해 주시면 감사하겠습니다.


---

**Original Message:**

From: 박철수 (it.support@company.com)
To: 김철수 (employee1@company.com)
Sent: 2024년 9월 13일 14:00
Subject: 자료 검토 요청

안녕하세요, 김철수님.

요청하신 프로젝트 검토 자료를 첨부합니다. 파일을 확인하시고 의견 부탁드립니다.

감사합니다.

박철수 드림  
IT 지원팀

---


김철수 대리
IT 보안팀  
Company Inc.`;

  // AI 모델 드롭다운 선택 처리 함수
  const handleModelChange = (event) => {
    const model = event.target.value;
    setSelectedModel(model);
    setPrompt(modelExamples[model].prompt);
    setResult(modelExamples[model].result);
  };

  // 로컬 모델 스위치 처리 함수
  const handleLocalModelSwitch = (event) => {
    setLocalModelEnabled(event.target.checked);
  };

  return (
    <div>
      <PageContainer>
        <Breadcrumb title="에이전트 관리" subtitle="이메일을 스캔하는 에이전트를 관리하는 페이지 입니다." />
        <ParentCard title="피싱 메일 생성 AI 모델 선택 및 설정">
          <Grid container spacing={3}>
            {/* AI 모델 선택 드롭다운 */}
            <Grid item xs={12} sm={6} lg={3}>
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
            <Grid item xs={12} sm={6} lg={9}>
              <CustomFormLabel>로컬 모델 활성화</CustomFormLabel>
              <FormControlLabel
                control={<CustomSwitch checked={localModelEnabled} onChange={handleLocalModelSwitch} />}
                label="로컬 LLM 사용"
              />
               <CustomFormLabel>프롬프트 코드</CustomFormLabel>
              <pre className="code-block">
                <code>
                  {prompt}
                </code>
              </pre>
              <hr/>
              <CustomFormLabel>샘플 피싱 메일</CustomFormLabel>
              <pre className="code-block">
                <code>
                  {sample}
                </code>
              </pre>
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
