import React, { useState } from 'react';
import { Grid, FormControlLabel, Button, Typography, MenuItem, TextField, CircularProgress, Collapse } from '@mui/material';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import CustomSelect from '../../../components/forms/theme-elements/CustomSelect';
import CustomSwitch from '../../../components/forms/theme-elements/CustomSwitch';
import ParentCard from '../../../components/shared/ParentCard';
import { Stack } from '@mui/system';
import axios from 'axios';

const Tickets = () => {
  const [selectedModel, setSelectedModel] = useState('gpt-3.5');
  const [localModelEnabled, setLocalModelEnabled] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [showPrompt, setShowPrompt] = useState(false); // 프롬프트 표시 상태

  const phishingPrompt = `
    다음 원본 이메일 내용을 분석해서 답장하는 내용의 이메일을 작성해 주세요.
    발신자와 수신자는 같은 부서의 직원입니다.
    상대방을 부르는 호칭은 생략합니다.
    답장 이메일 내용에는 기존 이메일에서 원했던 요청에 대한 답변 내용이 들어가 있어야 합니다.
    답변에 따라 링크를 무조건 넣으며, 링크는 [example.com]이며 단 한번만 들어있어야 합니다.
    원본 메일 내용에 따라 맥락을 파악하여 템플릿 종류를 반환해줍니다. 템플릿 종류는 별도의 JSON 형식으로 함께 반환해 주세요. JSON의 키는 'template_type' 입니다.
    반환 할 수 있는 템플릿의 종류는 다음과 같습니다. NAVER, DAUM, GITHUB, MSOFFICE, ZOOM, GOOGLE, DROPBOX, FACEBOOK, COUPANG, SLACK.
    그 이외에 자체 다운로드 링크면 DOWNLOAD, 모두 해당하지 않을 경우 DEFAULT를 반환합니다.
    답장 이메일의 제목은 RE: (기존 이메일의 제목) 형식이어야 합니다.
    발신자: {from}
    수신자: {to}
    제목: {subject}
    본문: {body}

    템플릿을 이메일 본문과 구문하여 쉽게 분리할 수 있게 작성해주세요.
    이메일 제목과 본문을 구분하여 작성해 주세요.
    제목은 반드시 제목: 으로 시작하고, 본문은 반드시 본문: 으로 시작해야 합니다.
  `;

  // API 호출 함수
  const generateResult = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.post('http://43.203.225.15:7777/api/generate', {
        model: selectedModel,
        from,
        to,
        subject,
        body,
        localModelEnabled,
      });
      setResult(response.data.result);
    } catch (error) {
      console.error('Error generating result:', error);
      setResult('Error generating result. Please try again.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 모델 선택 처리
  const handleModelChange = (event) => {
    setSelectedModel(event.target.value);
  };

  // 로컬 모델 활성화 처리
  const handleLocalModelSwitch = (event) => {
    setLocalModelEnabled(event.target.checked);
  };

  return (
    <div>
      <PageContainer>
        <Breadcrumb title="에이전트 관리" subtitle="AI를 활용한 피싱 메일 생성 플랫폼" />
        <ParentCard title="피싱 메일 생성 AI">
          <Grid container spacing={3}>
            {/* AI 모델 선택 */}
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

            {/* 로컬 모델 활성화 */}
            <Grid item xs={12} sm={6} lg={3}>
              <CustomFormLabel>로컬 모델 활성화</CustomFormLabel>
              <FormControlLabel
                control={<CustomSwitch checked={localModelEnabled} onChange={handleLocalModelSwitch} />}
                label="로컬 LLM 사용"
              />
            </Grid>

            {/* 프롬프트 표시 토글 */}
            <Grid item xs={12}>
              <Button
                variant="text"
                color="primary"
                onClick={() => setShowPrompt(!showPrompt)}
              >
                {showPrompt ? '프롬프트 숨기기' : '프롬프트 보기'}
              </Button>
              <Collapse in={showPrompt}>
                <Typography
                  variant="body2"
                  style={{
                    whiteSpace: 'pre-wrap',
                    backgroundColor: '#f5f5f5',
                    padding: '10px',
                    borderRadius: '5px',
                    marginTop: '10px',
                  }}
                >
                  {phishingPrompt}
                </Typography>
              </Collapse>
            </Grid>

            {/* 이메일 입력 필드 */}
            <Grid item xs={12}>
              <CustomFormLabel>From</CustomFormLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="발신자 이메일 주소를 입력하세요."
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />

              <CustomFormLabel>To</CustomFormLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="수신자 이메일 주소를 입력하세요."
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />

              <CustomFormLabel>Subject</CustomFormLabel>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="이메일 제목을 입력하세요."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <CustomFormLabel>Body</CustomFormLabel>
              <TextField
                multiline
                rows={6}
                fullWidth
                variant="outlined"
                placeholder="이메일 본문을 입력하세요."
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </Grid>

            {/* 결과 출력 */}
            <Grid item xs={12}>
              <CustomFormLabel>생성된 결과</CustomFormLabel>
              <Typography
                variant="body1"
                style={{ whiteSpace: 'pre-wrap', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
                dangerouslySetInnerHTML={{ __html: result || '결과가 여기에 표시됩니다.' }}
              />
            </Grid>
          </Grid>

          {/* 버튼 */}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={generateResult}
              disabled={loading} // 로딩 중 버튼 비활성화
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : '결과 생성'}
            </Button>
            <Button variant="outlined" color="secondary" disabled={loading}>
              취소
            </Button>
          </Stack>
        </ParentCard>
      </PageContainer>
    </div>
  );
};

export default Tickets;
