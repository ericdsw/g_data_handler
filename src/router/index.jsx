import React from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import InfoIcon from '@mui/icons-material/Info';

import {
  CutsceneContainer,
  DialogueContainer,
  StorylineContainer,
  NotFound,
  AboutPage,
  SaveFileFix,
} from '../components/pages';

export const fallbackRoute = {
  component: NotFound,
};

const routes = [
  {
    path: '/',
    exact: true,
    component: <CutsceneContainer />,
    icon: <SubscriptionsIcon />,
    text: 'Cutscenes',
  },
  {
    path: '/dialogues',
    exact: true,
    component: <DialogueContainer />,
    icon: <QuestionAnswerIcon />,
    text: 'Dialogues',
  },
  {
    path: '/storylines',
    exact: true,
    component: <StorylineContainer />,
    icon: <BubbleChartIcon />,
    text: 'Storylines',
  },
  {
    path: '/saveFileFix',
    exact: true,
    component: <SaveFileFix />,
    icon: <AutoFixHighIcon />,
    text: 'SaveFileFix',
  },
  {
    path: '/about',
    exact: true,
    component: <AboutPage />,
    icon: <InfoIcon />,
    text: 'About',
  },
];
export default routes;
