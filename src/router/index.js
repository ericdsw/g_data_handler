import React from 'react';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import InfoIcon from '@mui/icons-material/Info';

import {
  CutscenePage,
  DialoguePage,
  StorylinePage,
  NotFound,
  AboutPage,
} from '../components/pages';

export const fallbackRoute = {
  component: NotFound,
};

const routes = [
  {
    path: '/',
    exact: true,
    component: <CutscenePage />,
    icon: <SubscriptionsIcon />,
    text: 'Cutscenes',
  },
  {
    path: '/dialogues',
    exact: true,
    component: <DialoguePage />,
    icon: <QuestionAnswerIcon />,
    text: 'Dialogues',
  },
  {
    path: '/storylines',
    exact: true,
    component: <StorylinePage />,
    icon: <BubbleChartIcon />,
    text: 'Storylines',
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
