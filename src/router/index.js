import React from 'react';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import HomeIcon from '@material-ui/icons/Home';
import HelpIcon from '@material-ui/icons/Help';
import { 
    MainPage, 
    CutscenePage, 
    DialoguePage,
    NotFound
} from '../components/pages';

export const fallbackRoute = {
    component: NotFound
}

export default [
    {
        path: '/',
        exact: true,
        component: MainPage,
        icon: <HomeIcon />,
        text: 'Home',
    },
    {
        path: '/cutscenes',
        exact: true,
        component: CutscenePage,
        icon: <SubscriptionsIcon />,
        text: 'Cutscenes',
    },
    {
        path: '/dialogues',
        exact: true,
        component: DialoguePage,
        icon: <QuestionAnswerIcon />,
        text: 'Dialogues',
    },
    {
        path: '/help',
        exact: true,
        component: NotFound,
        icon: <HelpIcon />,
        text: 'Help',
    }
];

