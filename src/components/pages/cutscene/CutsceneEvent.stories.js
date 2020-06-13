import React from "react";
import { action } from "@storybook/addon-actions";
import CutsceneEvent from "./CutsceneEvent";

export default {
  component: CutsceneEvent,
  title: "Cutscene Event",
};

const mockImportantEvent = {
  type: "gain_abilities",
  parameters: {
    is_important: true,
    max_level: 5,
  },
};

const mockUninportantEvent = {
  type: "animation",
  parameters: {
    is_important: false,
    object: "foo:bar",
    animation: "fooAnimation",
    loop: false,
    finish_animation: "fooFinishAnimation",
  },
};

export const importantEvent = () => (
  <CutsceneEvent
    cutsceneEventData={mockImportantEvent}
    rowNumber={0}
    eventNumber={0}
    handleEdit={action("handleEdit")}
    handleDelete={action("handleDelete")}
  />
);

export const unImportantEvent = () => (
  <CutsceneEvent
    cutsceneEventData={mockUninportantEvent}
    rowNumber={0}
    eventNumber={0}
    handleEdit={action("handleEdit")}
    handleDelete={action("handleDelete")}
  />
);
