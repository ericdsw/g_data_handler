import { useState } from "react";

export default function useDialogueManager(...dialoguesToTrack) {
  const [activeDialogues, manageActiveDialogues] = useState(() => {
    let initialState = {};
    dialoguesToTrack.forEach((dialogueName) => {
      initialState[dialogueName] = false;
    });
    return initialState;
  });

  return [
    activeDialogues,
    (dialogueName, action = "show") => {
      manageActiveDialogues((previousState) => {
        var newState = { ...previousState };
        newState[dialogueName] = action === "show";
        return newState;
      });
    },
  ];
}
