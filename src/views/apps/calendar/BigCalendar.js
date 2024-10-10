import React, { useState, useEffect } from 'react';
import {
  CardContent,
  Typography,
} from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';
import PageContainer from '../../../components/container/PageContainer';
import Breadcrumb from '../../../layouts/full/shared/breadcrumb/Breadcrumb';
import BlankCard from '../../../components/shared/BlankCard';

moment.locale('en-GB');
const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [calevents, setCalEvents] = useState([]);
  const navigate = useNavigate();

  // 데이터 가져오기
  useEffect(() => {
    fetch('http://43.203.225.15:8000/training')
      .then((response) => response.json())
      .then((data) => {
        // 훈련 데이터를 캘린더 이벤트 형식으로 변환
        const events = data.data.map((training) => ({
          id: training.id,
          title: training.training_name,
          start: new Date(training.training_start),
          end: new Date(training.training_end),
          desc: training.training_desc,
          status: training.status, // status 값 저장
        }));
        setCalEvents(events);
      })
      .catch((error) => console.error('Error fetching training data:', error));
  }, []);

  // 이벤트 클릭 시 해당 URL로 이동
  const handleEventClick = (event) => {
    navigate(`/apps/training/view/${event.id}`); // useNavigate를 사용하여 URL 이동
  };

  // 이벤트 스타일 설정 (status 값에 따라 색상 지정)
  const eventColors = (event) => {
    let backgroundColor;

    // `status` 값에 따라 배경색 설정
    switch (event.status) {
      case 'PLAN':
        backgroundColor = '#1a97f5'; // 노란색
        break;
      case 'RUN':
        backgroundColor = '#4caf50'; // 초록색
        break;
      case 'FIN':
        backgroundColor = '#f44336'; // 빨간색
        break;
      default:
        backgroundColor = '#1a97f5'; // 기본색 (파랑)
        break;
    }

    return {
      style: {
        backgroundColor: backgroundColor,
        borderRadius: '6px',
        border: 'none',
        color: '#fff',
        padding: '4px 8px',
      },
    };
  };

  return (
    <PageContainer title="Calendar UI" description="This is the Calendar page">
      <Breadcrumb title="훈련 일정" subtitle="진행 중이거나 완료된 훈련 일정을 확인 할 수 있습니다." />
      <BlankCard variant="outlined">
        <CardContent>
          <Calendar
            selectable
            events={calevents}
            defaultView="month"
            views={['month']} // Month 뷰만 활성화
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            localizer={localizer}
            style={{ height: 'calc(100vh - 350px' }}
            onSelectEvent={handleEventClick}
            eventPropGetter={eventColors} // 이벤트 색상 설정
          />
        </CardContent>
      </BlankCard>
    </PageContainer>
  );
};

export default BigCalendar;
