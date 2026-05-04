import { useState, useCallback } from 'react';

type DialogueAction = 'show' | 'hide';
type UseDialogueManagerResult = [{}, (dialogueName: string, action: DialogueAction) => void];

/**
 * A hook used to keep track of multiple dialogues inside a component
 */
export default function useDialogueManager(...dialoguesToTrack: string[]): UseDialogueManagerResult {
  const [activeDialogues, manageActiveDialogues] = useState(() => {
    let initialState = {};
    dialoguesToTrack.forEach((dialogueName) => {
      initialState[dialogueName] = false;
    });
    return initialState;
  });

  const toggleDialogue = useCallback((dialogueName: string, action: DialogueAction = 'show') => {
    manageActiveDialogues((previousState) => {
      var newState = { ...previousState };
      newState[dialogueName] = action === 'show';
      return newState;
    });
  }, []);

  return [activeDialogues, toggleDialogue];
}
