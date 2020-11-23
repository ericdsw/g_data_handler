import React from "react";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import InfoIcon from "@material-ui/icons/Info";
import {
  CutscenePage,
  DialoguePage,
  StorylinePage,
  NotFound,
  AboutPage,
} from "../components/pages";

export const fallbackRoute = {
  component: NotFound,
};

const routes = [
  {
    path: "/",
    exact: true,
    component: CutscenePage,
    icon: <SubscriptionsIcon />,
    text: "Cutscenes",
  },
  {
    path: "/dialogues",
    exact: true,
    component: DialoguePage,
    icon: <QuestionAnswerIcon />,
    text: "Dialogues",
  },
  {
    path: "/storylines",
    exact: true,
    component: StorylinePage,
    icon: <BubbleChartIcon />,
    text: "Storylines",
  },
  {
    path: "/about",
    exact: true,
    component: AboutPage,
    icon: <InfoIcon />,
    text: "About",
  },
];
export default routes;
